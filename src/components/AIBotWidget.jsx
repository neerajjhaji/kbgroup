import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Download, Sparkles, Database, PhoneCall, HeartHandshake, CheckCircle2, Volume2, VolumeX, Calculator, MapPin, Building2, ChevronRight, RotateCcw } from 'lucide-react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';
import { PLATFORM_MARKET_BENCHMARKS } from '../data/marketPlatformsData';
import { dispatchBuyerLead, exportLeadsToCSV, getStoredLeads } from '../data/dispatchUtils';
import { askGemini } from '../services/geminiService';

export function CrestLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#FAF7F2" />
      <circle cx="50" cy="50" r="44" stroke="#A68142" strokeWidth="3" />
      <circle cx="50" cy="50" r="38" stroke="#A68142" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M50 18 L58 32 L68 26 L62 44 L38 44 L32 26 L42 32 Z" fill="#A68142" stroke="#D4AF37" strokeWidth="1" />
      <text x="50" y="72" fontFamily="'Cormorant Garamond', serif" fontSize="24" fontWeight="700" fill="#1A1815" textAnchor="middle">
        KB
      </text>
      <circle cx="34" cy="58" r="2" fill="#A68142" />
      <circle cx="66" cy="58" r="2" fill="#A68142" />
    </svg>
  );
}

export default function AIBotWidget({ onOpenSiteVisit, onOpenFloorPlan }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showCrmModal, setShowCrmModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [showMatchmakerModal, setShowMatchmakerModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [storedLeadCount, setStoredLeadCount] = useState(0);

  // User Relationship Profile State (Persisted in localStorage for repeat visits)
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('kb_west_walk_user_profile');
      return saved ? JSON.parse(saved) : { name: '', goal: '', layout: '', budget: '', scheduledCall: null };
    } catch {
      return { name: '', goal: '', layout: '', budget: '', scheduledCall: null };
    }
  });

  // Math CAPTCHA State
  const [num1, setNum1] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [num2, setNum2] = useState(() => Math.floor(Math.random() * 7) + 1);
  const correctAnswer = num1 + num2;

  const refreshCaptcha = () => {
    setNum1(Math.floor(Math.random() * 8) + 2);
    setNum2(Math.floor(Math.random() * 7) + 1);
  };

  const [verifyForm, setVerifyForm] = useState({
    name: userProfile.name || '',
    email: '',
    phone: '',
    captchaAnswer: ''
  });

  const [callbackForm, setCallbackForm] = useState({
    name: userProfile.name || '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '11:00 AM - 01:00 PM',
    topic: 'Personalized Project Briefing & Layout Selection'
  });

  const [matchmakerStep, setMatchmakerStep] = useState(1);
  const [matchmakerAnswers, setMatchmakerAnswers] = useState({
    purpose: 'End-User Family Living',
    typology: '3+1 BHK Resort Suite (2,250 - 2,650 Sq.Ft.)',
    priority: '75,000 Sq.Ft. Clubhouse & Resort Amenities',
    horizon: '1-2 Years (Construction Phase)'
  });

  const [verifyError, setVerifyError] = useState('');
  const [callbackSuccess, setCallbackSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  const toggleSpeech = (text, idx) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingIndex === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#•]/g, ''));
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setSpeakingIndex(null);
      utterance.onerror = () => setSpeakingIndex(null);
      setSpeakingIndex(idx);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Initial Welcome Dialogue with personalized memory
  const [messages, setMessages] = useState(() => {
    const greetingName = userProfile.name ? ` ${userProfile.name}` : '';
    return [
      {
        sender: 'bot',
        text: `Welcome back${greetingName}! I am KB Concierge, your dedicated commercial advisor for KB West Walk in Ecotech-12, Greater Noida West.\n\nHow can I best assist your commercial investment today?\n• Tailor a shop or studio match based on your business requirements\n• Schedule a private 1-on-1 callback with a Senior Commercial Director\n• Compare Noida Extension retail corridors & rental yield benchmarks\n• Review architectural floor plans and RERA BSP price sheets`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const handleResetChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingIndex(null);

    // Clear user profile memory from localStorage and state
    try {
      localStorage.removeItem('kbww_user_profile');
    } catch {
      // ignore storage errors
    }

    const emptyProfile = { name: '', goal: '', layout: '', budget: '', scheduledCall: null };
    setUserProfile(emptyProfile);
    setVerifyForm({ name: '', email: '', phone: '', captchaAnswer: '' });
    setCallbackForm({
      name: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      timeSlot: '11:00 AM - 01:00 PM',
      topic: 'Personalized Commercial Briefing & Shop Selection'
    });

    setMessages([
      {
        sender: 'bot',
        text: `Chat cleared! Welcome to KB West Walk in Ecotech-12, Greater Noida West.\n\nI am KB Concierge, your dedicated commercial relationship manager. How can I assist your property search today?\n\n• 🎯 Interactive Commercial Property Matchmaker\n• 📞 Schedule 1-on-1 Director Advisory Call\n• 🚗 Request VIP Guided On-Site Visit\n• ⚖️ Compare Ecotech-12 vs Noida Extension Commercial Corridors`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    try {
      localStorage.setItem('forbes_luxe_user_profile', JSON.stringify(userProfile));
    } catch {
      // ignore storage errors
    }
  }, [userProfile]);

  const quickPrompts = [
    '🎯 Interactive Property Matchmaker',
    '📞 Schedule Private Advisory Call',
    '⚖️ Compare Ecotech-12 vs Noida Expressway',
    '🛡️ UPRERA Approval & Trust Assurance',
    '📄 Download Official Master Brochure PDF',
    '🚗 Request Guided On-Site Visit'
  ];

  // Comprehensive Relationship-First Real Estate Knowledgebase
  const processQuery = (query) => {
    const q = query.toLowerCase().trim();

    // GREETING HANDLER
    const isGreeting =
      q === 'hi' ||
      q === 'hello' ||
      q === 'hey' ||
      q === 'namaste' ||
      q.startsWith('hi ') ||
      q.startsWith('hello ') ||
      q.startsWith('hey ') ||
      q.includes('good morning') ||
      q.includes('good afternoon') ||
      q.includes('good evening');

    if (isGreeting) {
      const greetingName = userProfile.name ? ` ${userProfile.name}` : '';
      return {
        text: `Hello and warm greetings${greetingName}! Welcome to KB West Walk at Plot C-3, Ecotech-12, Greater Noida West.\n\nI am your dedicated AI Commercial Director. How can I assist your business or investment decisions today?\n\n• 🎯 Find suitable layout (Interactive Property Matchmaker)\n• 📞 Schedule a private 1-on-1 advisory callback\n• 🚗 Request a Guided On-Site Visit\n• 📄 Download official master brochure & price sheet`
      };
    }

    // 99ACRES, HOUSING.COM & MAGICBRICKS MARKET PLATFORM DATA
    if (q.includes('99acres') || q.includes('housing') || q.includes('magicbricks') || q.includes('platform') || q.includes('market benchmark')) {
      return {
        text: `CROSS-PLATFORM COMMERCIAL REAL ESTATE BENCHMARKS (99acres, Housing.com & Magicbricks):\n\n• 99acres Benchmark:\n  - Ecotech-12 Gr. Noida West is rated among top 3 fastest-growing commercial corridors (+21.2% YoY appreciation).\n  - Average Rate: ₹ 24,900 – ₹ 37,900 / Sq.Ft.\n\n• Housing.com Benchmark:\n  - Commercial Locality Rating: 4.9 / 5.0 (Score: 92/100).\n  - Footfall Advantage: Surrounded by 1,00,000+ residential apartments and 100M from proposed metro station.\n\n• Magicbricks Benchmark:\n  - Investment Rating: Grade A+ (Rental yield: 7.5% – 9.2% P.A. with assured return options).\n  - Capital Outlook: 38% – 48% projected growth upon Jewar Airport and metro operations.`
      };
    }

    // MATCHMAKER TRIGGER
    if (q.includes('match') || q.includes('recommend') || q.includes('suitable') || q.includes('find my')) {
      setShowMatchmakerModal(true);
      return {
        text: `I have opened our Interactive Property Matchmaker. Answer 3 quick questions to receive a custom unit recommendation tailored to your budget and business goals.`
      };
    }

    // CALLBACK TRIGGER
    if (q.includes('call') || q.includes('speak') || q.includes('meeting') || q.includes('director') || q.includes('consult')) {
      setShowCallbackModal(true);
      return {
        text: `I have opened our VIP Callback Scheduler. Please select your preferred date and time slot for a private 1-on-1 consultation with our Senior Commercial Director.`
      };
    }

    // TRUST, SECURITY & UPRERA REASSURANCE
    if (q.includes('trust') || q.includes('safe') || q.includes('rera') || q.includes('approval') || q.includes('builder') || q.includes('legal')) {
      return {
        text: `TRUST & REGULATORY TRANSPARENCY:\n\n• Developer: Shree Kunj Bihariji Realty Pvt. Ltd. (Shree KB Group - Trusted since 2005).\n• UPRERA Registration: Officially registered under UPRERAPRJ422027/01/2026 (Promoter ID: UPRERAPRM414706).\n• Bank Account: Official RERA Collection Account with Axis Bank Ltd.\n• Land Title: 100% clear freehold commercial plot (Plot C-3, Ecotech-12).\n\nWould you like me to send full legal compliance documents to your email?`
      };
    }

    // SECTOR COMPARISON
    if (q.includes('compare') || q.includes('versus') || q.includes('vs') || q.includes('difference')) {
      if (q.includes('expressway') || q.includes('sector 150') || q.includes('sector 128')) {
        return {
          text: `COMMERCIAL COMPARISON: KB West Walk (Ecotech-12) vs Central Noida / Expressway Commercial\n\n• Price & Value:\n  - Central Noida (Sec 18/62): ₹ 45,000 – ₹ 75,000 / Sq.Ft.\n  - KB West Walk (Ecotech-12): ₹ 24,900 – ₹ 37,900 / Sq.Ft. (Entry price from 1st Floor)\n\n• Footfall & Density:\n  - KB West Walk: Located directly adjacent to 1,00,000+ occupied residential flats with proposed metro 100 meters away.\n\n• Project Features:\n  - 18-Level Mixed-Use with 5 Levels AC Shopping, Food Court, Cinema & Studio Suites.\n\nRecommendation: KB West Walk offers high rental yield potential (7.5%-9.2% P.A.) and attractive entry pricing.`,
          hasComparisonCard: true,
          compData: {
            title: 'KB West Walk vs Central Noida Commercial',
            tag1: 'KB West Walk (Ecotech-12)',
            val1: '₹ 24,900/sq.ft.* (18-Level Mixed Use)',
            tag2: 'Central Noida Commercial',
            val2: '₹ 45,000+/sq.ft. (High Entry)'
          }
        };
      }

      if (q.includes('end user') || q.includes('end-user') || q.includes('investor') || q.includes('roi')) {
        return {
          text: `BUYER GUIDANCE: Business Owner vs Investor Highlights\n\nFor Retail Business Owners:\n• Prime 5-level AC high-street retail with double-height glass frontage\n• Central glass atrium with open escalators and high visibility\n• Dedicated loading/unloading zones and multi-level basement parking\n\nFor Commercial Investors:\n• Assured rental return and high rental yield (7.5% - 9.2% P.A.)\n• Multiple payment plans including Down Payment with Rent Assistance and 40:25:25\n• High footfall driven by Multiplex Cinema, Food Court, and Studio Suites`,
          actionType: 'sitevisit'
        };
      }

      return {
        text: `GREATER NOIDA WEST COMMERCIAL COMPARISON:\n\n1. KB West Walk (Ecotech-12): Premier 18-level commercial landmark starting at ₹ 24,900/sq.ft.* RERA Approved (UPRERAPRJ422027/01/2026).\n2. Gaur Chowk Commercials: High congestion area with higher rates.\n3. Knowledge Park Hub: Institutional and office focused.\n\nWhich location would you like to explore further?`
      };
    }

    // JEWAR AIRPORT & INFRASTRUCTURE
    if (q.includes('jewar') || q.includes('airport') || q.includes('infra') || q.includes('expressway') || q.includes('rrts')) {
      return {
        text: `LOCATION & CONNECTIVITY DRIVERS:\n\n• Proposed Ecotech-12 Metro Station: Walking distance (100 Meters).\n• Char Murti / Gaur Chowk: 5 mins (2.5 Km).\n• Delhi-Meerut Expressway / NH-24: 10 mins (6.0 Km).\n• Jewar International Airport: 45 mins (48.0 Km).`
      };
    }

    // PRICING & PAYMENT
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('payment') || q.includes('subvention')) {
      return {
        text: `KB WEST WALK BSP PRICE SHEET & PAYMENT PLANS:\n\n• First Floor Retail Shops: ₹ 24,900 / Sq. Ft.*\n• Lower Ground Floor Shops: ₹ 25,900 / Sq. Ft.*\n• Ground Floor Boulevard Shops: ₹ 37,900 / Sq. Ft.*\n• Studio Suites (6th-18th Fl): Price On Request\n• Payment Plans: Down Payment with Rent Assistance, Special 40:25:25, 30:20:20:20, and CLP.`
      };
    }

    // FLOOR PLANS
    if (q.includes('floor') || q.includes('plan') || q.includes('3bhk') || q.includes('4bhk') || q.includes('layout')) {
      return {
        text: `KB WEST WALK ARCHITECTURAL FLOOR LAYOUTS:\n\n• LGF, GF & 1st Floor: 5-Level AC High-Street Retail Shops with Central Atrium\n• 3rd & 4th Floor: Multi-Cuisine Food Court & Rooftop Dining\n• 5th Floor: Multi-Screen Multiplex Cinema\n• 6th to 18th Floor: State-of-the-Art Serviced Studio Suites\n\nWould you like to review floor plan layouts or schedule an on-site visit?`,
        actionType: 'floorplan'
      };
    }

    // AMENITIES
    if (q.includes('amenit') || q.includes('clubhouse') || q.includes('75k') || q.includes('pool') || q.includes('gym')) {
      return {
        text: `KB WEST WALK INFRASTRUCTURE & AMENITIES:\n\n• 5-Level Air-Conditioned High-Street Shopping Arcade\n• Multi-Screen Multiplex Cinema & Food Court\n• Double Height Central Glass Atrium with Escalators\n• Multi-Level Basement Parking & 24/7 Security\n• 100% Power Backup & High-Speed Elevators`
      };
    }

    // DEFAULT ADVISORY RESPONSE
    return {
      text: `I am KB Concierge, your dedicated commercial real estate advisor.\n\nHow can I help guide your decision today?\n• Interactive Property Matchmaker\n• Schedule a VIP Advisory Callback\n• Commercial Yield & Connectivity\n• Floor Plans & BSP Rate Sheets`
    };
  };

  const handleSendMessage = async (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    const lower = text.toLowerCase();

    // Check if user is sharing their name
    if (lower.startsWith('my name is ') || lower.startsWith('i am ')) {
      const extractedName = text.replace(/my name is /i, '').replace(/i am /i, '').trim();
      if (extractedName) {
        setUserProfile((prev) => ({ ...prev, name: extractedName }));
        setVerifyForm((prev) => ({ ...prev, name: extractedName }));
        setCallbackForm((prev) => ({ ...prev, name: extractedName }));
      }
    }

    const requiresVerification =
      lower.includes('brochure') ||
      lower.includes('send pdf') ||
      lower.includes('download') ||
      lower.includes('floor plan');

    setIsTyping(true);

    if (requiresVerification && !isVerified) {
      setTimeout(() => {
        setIsTyping(false);
        setShowVerifyModal(true);
        const botReply = {
          sender: 'bot',
          text: `To dispatch official PDF brochures, floor plan blueprints, and rate sheets directly to your email & WhatsApp, please complete a quick verification below.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botReply]);
      }, 500);
      return;
    }

    // Try Gemini API first, with fallback to local knowledgebase
    try {
      const geminiReplyText = await askGemini(text, messages);

      setIsTyping(false);

      if (geminiReplyText) {
        const botReply = {
          sender: 'bot',
          text: geminiReplyText.replace(/\*/g, ''),
          isGemini: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        // Fallback to local rule engine
        const responseObj = processQuery(text);
        const botReply = {
          sender: 'bot',
          text: responseObj.text.replace(/\*/g, ''),
          hasComparisonCard: responseObj.hasComparisonCard,
          compData: responseObj.compData,
          actionType: responseObj.actionType,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botReply]);
      }
    } catch {
      setIsTyping(false);
      const responseObj = processQuery(text);
      const botReply = {
        sender: 'bot',
        text: responseObj.text,
        hasComparisonCard: responseObj.hasComparisonCard,
        compData: responseObj.compData,
        actionType: responseObj.actionType,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botReply]);
    }
  };

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (!verifyForm.name || !verifyForm.email || !verifyForm.phone) {
      setVerifyError('Please complete all required fields.');
      return;
    }
    if (parseInt(verifyForm.captchaAnswer, 10) !== correctAnswer) {
      setVerifyError('Security CAPTCHA verification failed. Please try again.');
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);

    // Save user profile name
    setUserProfile((prev) => ({ ...prev, name: verifyForm.name }));

    const leadData = {
      name: verifyForm.name,
      email: verifyForm.email,
      phone: verifyForm.phone,
      project_name: 'KB West Walk',
      source: 'KB Concierge',
      extraData: { verifiedAt: new Date().toISOString() }
    };

    dispatchBuyerLead(leadData).then(() => {
      setIsSubmitting(false);
      setIsVerified(true);
      setShowVerifyModal(false);
      setVerifyError('');

      const confirmMsg = {
        sender: 'bot',
        text: `Thank you, ${verifyForm.name}! Your verification is complete.\n\nYou can now download official PDF brochures, floor plans, and access priority pricing allotment.`,
        hasBrochureCard: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, confirmMsg]);
    });
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!callbackForm.name || !callbackForm.phone) {
      setVerifyError('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);

    const leadData = {
      name: callbackForm.name,
      phone: callbackForm.phone,
      project_name: 'KB West Walk',
      source: 'VIP Callback Request',
      extraData: {
        preferredDate: callbackForm.date,
        preferredTime: callbackForm.timeSlot,
        topic: callbackForm.topic
      }
    };

    dispatchBuyerLead(leadData).then(() => {
      setIsSubmitting(false);
      setCallbackSuccess(true);
      setUserProfile((prev) => ({ ...prev, name: callbackForm.name, scheduledCall: `${callbackForm.date} at ${callbackForm.timeSlot}` }));

      setTimeout(() => {
        setShowCallbackModal(false);
        setCallbackSuccess(false);

        const botReply = {
          sender: 'bot',
          text: `Your private 1-on-1 advisory call has been confirmed for ${callbackForm.date} between ${callbackForm.timeSlot}.\n\nOur Senior Relationship Director will reach out to you directly at ${callbackForm.phone}.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botReply]);
      }, 1500);
    });
  };

  const handleMatchmakerFinish = () => {
    setShowMatchmakerModal(false);
    setMatchmakerStep(1);

    const recommendationText = `RECOMMENDED COMMERCIAL MATCH FOR YOU:\n\n• Unit Selection: ${matchmakerAnswers.typology}\n• Primary Focus: ${matchmakerAnswers.purpose}\n• Top Priority Feature: ${matchmakerAnswers.priority}\n• Target Horizon: ${matchmakerAnswers.horizon}\n\nWhy This Fits:\nKB West Walk at Plot C-3, Ecotech-12, Greater Noida West combines 18-level high-street commercial presence, 5 levels of AC shopping, food court, multiplex cinema, and studio suites with exceptional footfall potential.`;

    const botReply = {
      sender: 'bot',
      text: recommendationText,
      actionType: 'sitevisit',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, botReply]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 999 }}>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            style={{
              backgroundColor: '#FAF7F2',
              border: '2px solid #A68142',
              borderRadius: '50px',
              padding: '10px 20px',
              color: '#1A1815',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              boxShadow: '0 12px 36px rgba(166, 129, 66, 0.25)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 18px 45px rgba(166, 129, 66, 0.35)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(166, 129, 66, 0.25)';
            }}
          >
            <CrestLogo size={32} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#1A1815' }}>
                KB CONCIERGE
              </div>
              <div style={{ fontSize: '9px', color: '#A68142', fontWeight: '700', letterSpacing: '0.5px' }}>
                {userProfile.name ? `Welcome back, ${userProfile.name}` : 'Noida Market & Relationship Advisor'}
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Main Chat Drawer */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: 'calc(100vw - 48px)',
          maxWidth: '430px',
          height: '630px',
          maxHeight: 'calc(100vh - 100px)',
          backgroundColor: '#FAF8F5',
          border: '2px solid #A68142',
          borderRadius: '16px',
          boxShadow: '0 25px 70px rgba(0,0,0,0.18)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#FAF7F2',
            padding: '14px 18px',
            borderBottom: '1px solid rgba(166, 129, 66, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CrestLogo size={34} />
              <div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#1A1815', letterSpacing: '1px' }}>
                  KB CONCIERGE
                </div>
                <div style={{ fontSize: '10px', color: '#2E7D32', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: '#2E7D32', borderRadius: '50%' }} />
                  <span>VIP Relationship Advisory Online</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleResetChat}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(166, 129, 66, 0.3)',
                  color: '#A68142',
                  padding: '5px 8px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Refresh Chat & Start New Session"
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>

              <button
                onClick={() => setShowCallbackModal(true)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #A68142',
                  color: '#A68142',
                  padding: '5px 8px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Schedule 1-on-1 Call"
              >
                <PhoneCall size={11} />
                <span>Call</span>
              </button>

              <button
                onClick={() => {
                  setStoredLeadCount(getStoredLeads().length);
                  setShowCrmModal(true);
                }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(166, 129, 66, 0.3)',
                  color: '#5E574F',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Open Lead Vault & CRM"
              >
                <Database size={11} />
                <span>CRM</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: '#A68142', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Relationship Notification Strip if Call Scheduled */}
          {userProfile.scheduledCall && (
            <div style={{ backgroundColor: '#FAF7F2', padding: '8px 14px', borderBottom: '1px solid rgba(166,129,66,0.2)', fontSize: '10px', color: '#A68142', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={12} color="#2E7D32" />
              <span>Confirmed Advisory Call: <strong>{userProfile.scheduledCall}</strong></span>
            </div>
          )}

          {/* Quick Interactive Shortcut Tools Strip */}
          <div style={{
            backgroundColor: '#FAF7F2',
            padding: '8px 12px',
            borderBottom: '1px solid rgba(166,129,66,0.2)',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            scrollbars: 'none'
          }}>
            <button
              onClick={() => setShowMatchmakerModal(true)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #A68142',
                color: '#A68142',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '9.5px',
                fontWeight: '800',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🎯 Matchmaker</span>
            </button>
            <button
              onClick={onOpenSiteVisit}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(166, 129, 66, 0.4)',
                color: '#1A1815',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '9.5px',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>🚗 Chauffeur Visit</span>
            </button>
            <button
              onClick={onOpenFloorPlan}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(166, 129, 66, 0.4)',
                color: '#1A1815',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '9.5px',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>📐 Floor Plans</span>
            </button>
            <button
              onClick={() => handleSendMessage('Compare Sector 4 vs Expressway')}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(166, 129, 66, 0.4)',
                color: '#1A1815',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '9.5px',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>⚖️ Comparison</span>
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            backgroundColor: '#FAF8F5'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  backgroundColor: msg.sender === 'user' ? '#A68142' : '#FFFFFF',
                  color: msg.sender === 'user' ? '#FFFFFF' : '#1A1815',
                  border: msg.sender === 'user' ? 'none' : '1px solid rgba(166, 129, 66, 0.25)',
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '12.5px',
                  lineHeight: '1.55',
                  maxWidth: '88%',
                  boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(166, 129, 66, 0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}

                  {/* Interactive Comparison Card */}
                  {msg.hasComparisonCard && msg.compData && (
                    <div style={{
                      marginTop: '12px',
                      backgroundColor: '#FAF7F2',
                      border: '1px solid #A68142',
                      borderRadius: '8px',
                      padding: '12px'
                    }}>
                      <div style={{ fontSize: '10px', color: '#A68142', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px' }}>
                        {msg.compData.title}
                      </div>
                      <div style={{ display: 'grid', gap: '6px', fontSize: '11px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#1A1815' }}>
                          <span>{msg.compData.tag1}:</span>
                          <strong style={{ color: '#A68142' }}>{msg.compData.val1}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5E574F' }}>
                          <span>{msg.compData.tag2}:</span>
                          <strong>{msg.compData.val2}</strong>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interactive Brochure Download Card */}
                  {msg.hasBrochureCard && (
                    <div style={{ marginTop: '12px', borderTop: '1px solid rgba(166,129,66,0.2)', paddingTop: '10px' }}>
                      <a
                        href={FAB_LUXE_PROJECT_DETAILS.brochureUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#A68142',
                          color: '#FFFFFF',
                          padding: '8px 14px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '800',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          boxShadow: '0 4px 12px rgba(166, 129, 66, 0.3)'
                        }}
                      >
                        <Download size={13} />
                        <span>DOWNLOAD BROCHURE PDF</span>
                      </a>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {msg.actionType === 'sitevisit' && (
                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={onOpenSiteVisit}
                        style={{
                          backgroundColor: '#A68142',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '8px 14px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          boxShadow: '0 4px 12px rgba(166, 129, 66, 0.25)'
                        }}
                      >
                        BOOK VIP CHAUFFEUR VISIT
                      </button>
                      <button
                        onClick={() => setShowCallbackModal(true)}
                        style={{
                          backgroundColor: '#FAF7F2',
                          border: '1px solid #A68142',
                          color: '#A68142',
                          padding: '8px 14px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          textTransform: 'uppercase'
                        }}
                      >
                        REQUEST DIRECT CALL
                      </button>
                    </div>
                  )}

                  {msg.actionType === 'floorplan' && (
                    <div style={{ marginTop: '10px' }}>
                      <button
                        onClick={onOpenFloorPlan}
                        style={{
                          backgroundColor: '#FAF7F2',
                          border: '1px solid #A68142',
                          color: '#A68142',
                          padding: '8px 14px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          textTransform: 'uppercase'
                        }}
                      >
                        VIEW BLUEPRINT PLANS
                      </button>
                    </div>
                  )}

                  {/* Audio Voice Concierge & Refresh Controls for Bot Messages */}
                  {msg.sender === 'bot' && (
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(166,129,66,0.15)', paddingTop: '6px' }}>
                      <span style={{ fontSize: '9.5px', color: '#A68142', fontWeight: '700' }}>
                        {msg.isGemini ? '✨ Gemini 2.0 AI Advice' : '🏛️ Fab Luxe Advisory'}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button
                          onClick={handleResetChat}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#8A8275',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            fontSize: '9.5px',
                            fontWeight: '600'
                          }}
                          title="Start New Topic / Refresh Chat"
                        >
                          <RotateCcw size={11} />
                          <span>New Session</span>
                        </button>
                        <button
                          onClick={() => toggleSpeech(msg.text, index)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: speakingIndex === index ? '#2E7D32' : '#A68142',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '10px',
                            fontWeight: '700'
                          }}
                          title={speakingIndex === index ? 'Mute Audio' : 'Listen to Voice Concierge'}
                        >
                          {speakingIndex === index ? <VolumeX size={13} /> : <Volume2 size={13} />}
                          <span>{speakingIndex === index ? 'Speaking...' : 'Listen'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <span style={{ fontSize: '9px', color: '#8A8275', marginTop: '3px', padding: '0 4px' }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', color: '#A68142', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={13} className="animate-spin" />
                <span>Consulting relationship metrics & market data...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div style={{
            padding: '10px 12px',
            backgroundColor: '#FAF7F2',
            borderTop: '1px solid rgba(166, 129, 66, 0.2)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto'
          }}>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(166, 129, 66, 0.3)',
                  color: '#A68142',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '10px',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#A68142';
                  e.currentTarget.style.backgroundColor = '#A68142';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(166, 129, 66, 0.3)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#A68142';
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid rgba(166, 129, 66, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <input
              type="text"
              placeholder="Ask a question or type your name..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{
                flex: 1,
                backgroundColor: '#FAF7F2',
                border: '1px solid rgba(166, 129, 66, 0.3)',
                color: '#1A1815',
                padding: '10px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />

            <button
              onClick={() => handleSendMessage()}
              style={{
                backgroundColor: '#A68142',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(166, 129, 66, 0.3)'
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Property Matchmaker Modal */}
      {showMatchmakerModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          backgroundColor: 'rgba(26, 24, 21, 0.75)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #A68142',
            borderRadius: '12px',
            padding: '28px',
            width: '100%',
            maxWidth: '460px',
            color: '#1A1815',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: '#A68142', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HeartHandshake size={14} />
                <span>PROPERTY MATCHMAKER (STEP {matchmakerStep} OF 3)</span>
              </div>
              <button onClick={() => setShowMatchmakerModal(false)} style={{ background: 'none', border: 'none', color: '#A68142', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {matchmakerStep === 1 && (
              <div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', color: '#1A1815', marginBottom: '12px' }}>
                  What is your primary goal for this property?
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {['End-User Family Living', 'High Appreciation Capital Investment', 'Rental Income & IT Hub Proximity'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setMatchmakerAnswers({ ...matchmakerAnswers, purpose: opt });
                        setMatchmakerStep(2);
                      }}
                      style={{
                        padding: '12px',
                        backgroundColor: matchmakerAnswers.purpose === opt ? '#A68142' : '#FAF7F2',
                        color: matchmakerAnswers.purpose === opt ? '#FFFFFF' : '#1A1815',
                        border: '1px solid rgba(166,129,66,0.3)',
                        borderRadius: '6px',
                        textAlign: 'left',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchmakerStep === 2 && (
              <div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', color: '#1A1815', marginBottom: '12px' }}>
                  Which layout suits your family requirement best?
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {['3+1 BHK Resort Suite (2,250 - 2,650 Sq.Ft.)', '4+1 BHK Presidential Penthouse (3,150 - 3,850 Sq.Ft.)', 'Open to Recommendation'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setMatchmakerAnswers({ ...matchmakerAnswers, typology: opt });
                        setMatchmakerStep(3);
                      }}
                      style={{
                        padding: '12px',
                        backgroundColor: matchmakerAnswers.typology === opt ? '#A68142' : '#FAF7F2',
                        color: matchmakerAnswers.typology === opt ? '#FFFFFF' : '#1A1815',
                        border: '1px solid rgba(166,129,66,0.3)',
                        borderRadius: '6px',
                        textAlign: 'left',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchmakerStep === 3 && (
              <div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '18px', color: '#1A1815', marginBottom: '12px' }}>
                  What is your top priority amenity or feature?
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {['75,000 Sq.Ft. Clubhouse & Resort Amenities', 'Low Density (Only 11 Towers on 13 Acres)', 'Delhi-Meerut Expressway & RRTS Connectivity'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setMatchmakerAnswers({ ...matchmakerAnswers, priority: opt });
                        handleMatchmakerFinish();
                      }}
                      style={{
                        padding: '12px',
                        backgroundColor: matchmakerAnswers.priority === opt ? '#A68142' : '#FAF7F2',
                        color: matchmakerAnswers.priority === opt ? '#FFFFFF' : '#1A1815',
                        border: '1px solid rgba(166,129,66,0.3)',
                        borderRadius: '6px',
                        textAlign: 'left',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1-on-1 Callback Scheduler Modal */}
      {showCallbackModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          backgroundColor: 'rgba(26, 24, 21, 0.75)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #A68142',
            borderRadius: '12px',
            padding: '30px',
            width: '100%',
            maxWidth: '440px',
            color: '#1A1815',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: '#A68142', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PhoneCall size={14} />
                <span>SCHEDULE 1-ON-1 ADVISORY CALL</span>
              </div>
              <button onClick={() => setShowCallbackModal(false)} style={{ background: 'none', border: 'none', color: '#A68142', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '12px', color: '#5E574F', marginBottom: '18px' }}>
              Book a direct consultation with our Senior Relationship Director to discuss priority allotment, floor plan selection, and bank subvention plans.
            </p>

            <form onSubmit={handleCallbackSubmit} style={{ display: 'grid', gap: '12px' }}>
              <input
                type="text"
                placeholder="Your Full Name *"
                value={callbackForm.name}
                onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                style={{ width: '100%', padding: '10px', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', borderRadius: '4px', fontSize: '12px' }}
              />
              <input
                type="tel"
                placeholder="Mobile Number *"
                value={callbackForm.phone}
                onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                style={{ width: '100%', padding: '10px', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', borderRadius: '4px', fontSize: '12px' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '10px', color: '#A68142', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Preferred Date</label>
                  <input
                    type="date"
                    value={callbackForm.date}
                    onChange={(e) => setCallbackForm({ ...callbackForm, date: e.target.value })}
                    style={{ width: '100%', padding: '8px', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', borderRadius: '4px', fontSize: '11px' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '10px', color: '#A68142', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Preferred Time</label>
                  <select
                    value={callbackForm.timeSlot}
                    onChange={(e) => setCallbackForm({ ...callbackForm, timeSlot: e.target.value })}
                    style={{ width: '100%', padding: '8px', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', borderRadius: '4px', fontSize: '11px' }}
                  >
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 07:00 PM">04:00 PM - 07:00 PM</option>
                  </select>
                </div>
              </div>

              {callbackSuccess ? (
                <div style={{ backgroundColor: 'rgba(46,125,50,0.15)', color: '#2E7D32', border: '1px solid #2E7D32', padding: '10px', borderRadius: '4px', fontSize: '11px', textAlign: 'center' }}>
                  Call Request Submitted Successfully!
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '12px',
                    backgroundColor: '#A68142',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '8px',
                    boxShadow: '0 4px 12px rgba(166, 129, 66, 0.3)'
                  }}
                >
                  {isSubmitting ? 'Confirming...' : 'CONFIRM CALLBACK'}
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerifyModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          backgroundColor: 'rgba(26, 24, 21, 0.75)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #A68142',
            borderRadius: '12px',
            padding: '30px',
            width: '100%',
            maxWidth: '420px',
            color: '#1A1815',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', color: '#A68142', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                BUYER VERIFICATION
              </div>
              <button onClick={() => setShowVerifyModal(false)} style={{ background: 'none', border: 'none', color: '#A68142', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', color: '#1A1815', marginBottom: '8px' }}>
              Unlock Master PDF & Blueprints
            </h3>
            <p style={{ fontSize: '12px', color: '#5E574F', marginBottom: '20px' }}>
              Verify details to receive floor plans, rate sheets, and subvention plans on WhatsApp & Email.
            </p>

            <form onSubmit={handleVerifySubmit} style={{ display: 'grid', gap: '12px' }}>
              <input
                type="text"
                placeholder="Full Name *"
                value={verifyForm.name}
                onChange={(e) => setVerifyForm({ ...verifyForm, name: e.target.value })}
                style={{ width: '100%', padding: '10px', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', borderRadius: '4px', fontSize: '12px' }}
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={verifyForm.email}
                onChange={(e) => setVerifyForm({ ...verifyForm, email: e.target.value })}
                style={{ width: '100%', padding: '10px', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', borderRadius: '4px', fontSize: '12px' }}
              />
              <input
                type="tel"
                placeholder="Mobile Phone Number *"
                value={verifyForm.phone}
                onChange={(e) => setVerifyForm({ ...verifyForm, phone: e.target.value })}
                style={{ width: '100%', padding: '10px', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', borderRadius: '4px', fontSize: '12px' }}
              />

              <div style={{ backgroundColor: '#FAF7F2', padding: '10px', borderRadius: '4px', border: '1px solid rgba(166,129,66,0.2)' }}>
                <div style={{ fontSize: '11px', color: '#A68142', fontWeight: '700', marginBottom: '6px' }}>
                  Security Math CAPTCHA: Solve <strong>{num1} + {num2} = ?</strong>
                </div>
                <input
                  type="number"
                  placeholder="Enter Sum *"
                  value={verifyForm.captchaAnswer}
                  onChange={(e) => setVerifyForm({ ...verifyForm, captchaAnswer: e.target.value })}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#FFFFFF', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', borderRadius: '4px', fontSize: '12px' }}
                />
              </div>

              {verifyError && <div style={{ color: '#D32F2F', fontSize: '11px', fontWeight: '700' }}>{verifyError}</div>}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '12px',
                  backgroundColor: '#A68142',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '8px',
                  boxShadow: '0 4px 12px rgba(166, 129, 66, 0.3)'
                }}
              >
                {isSubmitting ? 'Verifying...' : 'VERIFY & ACCESS DOWNLOADS'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Local Lead Vault & CRM Modal */}
      {showCrmModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          backgroundColor: 'rgba(26, 24, 21, 0.75)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #A68142',
            borderRadius: '12px',
            padding: '30px',
            width: '100%',
            maxWidth: '650px',
            color: '#1A1815',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#A68142', fontWeight: '800', textTransform: 'uppercase' }}>
                  MULTI-CRM LEAD VAULT
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', color: '#1A1815', margin: '4px 0 0' }}>
                  Stored Buyer Leads ({storedLeadCount})
                </h3>
              </div>
              <button onClick={() => setShowCrmModal(false)} style={{ background: 'none', border: 'none', color: '#A68142', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ backgroundColor: '#FAF7F2', padding: '16px', borderRadius: '6px', marginBottom: '20px', fontSize: '12px', color: '#5E574F' }}>
              Leads captured via AI Bot, Callback Requests, Matchmaker, Site Visit Modal, and Brochure downloads are stored locally and automatically dispatched to multi-CRM endpoints (Salesforce, HubSpot, Custom Webhooks).
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => exportLeadsToCSV()}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#A68142',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(166, 129, 66, 0.3)'
                }}
              >
                <Download size={14} />
                EXPORT ALL LEADS TO CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
