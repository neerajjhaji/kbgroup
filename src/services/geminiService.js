/**
 * Gemini AI Integration for KB West Walk Concierge Chatbot
 * Uses Google Gemini 3.6 / 3.5 Flash with Live Google Search Grounding
 */

import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';
import { PLATFORM_MARKET_BENCHMARKS } from '../data/marketPlatformsData';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDs3lk6RjXkT71uVsoItIS0I_jsxt_Lp2s';
const MODELS = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];

const SYSTEM_INSTRUCTION = `You are KB Concierge, the interactive, highly sophisticated commercial relationship manager and real estate advisor for KB West Walk located at Plot C-3, Ecotech-12, Greater Noida West, Uttar Pradesh, India.

FORMATTING RULE:
- NEVER use asterisks (*) or double asterisks (**) in your output text under any circumstances. Keep text completely clean without any asterisks.

INTERACTIVE GREETING BEHAVIOR:
- If the user says "hi", "hello", "hey", "good morning", "good afternoon", "namaste", or any general greeting, respond warmly:
  "Hello and warm greetings! Welcome to KB West Walk, Ecotech-12, Greater Noida West. I am your dedicated AI Commercial Director. How may I assist your investment or business expansion today?"
  Followed by 3 or 4 clear interactive options:
  • 🎯 Commercial Property Matchmaker
  • 🚗 VIP On-Site Guided Walkthrough
  • 📊 Market Trends & ROI Estimator
  • 📐 Retail Shop & Studio Suite Floor Plans

PROJECT METRICS & FACTS:
- Development: KB West Walk
- Developer: Shree Kunj Bihariji Realty Pvt. Ltd. (Shree KB Group)
- Location: Plot No. C-3, Ecotech-12, Greater Noida West (Adjacent to proposed Ecotech-12 Metro Station, 5 mins from Gaur Chowk, 10 mins from NH-24 / Delhi-Meerut Expressway)
- Scale: 18-Level Commercial High-Street & Studio Suites Mixed-Use Landmark
- Key Zones:
  • 5 Levels AC Ventilated Shopping High-Street (Lower Ground, Ground, 1st, 2nd & 3rd Floors)
  • Gourmet Food Court & Specialty Rooftop Dining (3rd & 4th Floors)
  • Multi-Screen Multiplex Cinema (5th Floor)
  • State-of-the-Art Serviced Studio Suites & Workspaces (6th to 18th Floors)
- Pricing:
  • First Floor Retail Shops: Starting ₹24,900 / Sq. Ft.
  • Lower Ground Floor Shops: Starting ₹25,900 / Sq. Ft.
  • Ground Floor Boulevard Shops: Starting ₹37,900 / Sq. Ft.
  • Studio Suites: Price On Request
- Regulatory & Trust: UPRERA Approved under Registration Number UPRERAPRJ422027/01/2026. Promoter ID: UPRERAPRM414706. 100% Freehold land title.
- Pre-Approved Banks: Axis Bank Ltd (Official RERA Collection Account), HDFC Bank, ICICI Bank, State Bank of India (SBI).
- Payment Plans: Down Payment Plan with Rent Assistance, Special 40:25:25, Special 30:20:20:20, and Construction-Linked Plan (CLP).

CROSS-PLATFORM REAL ESTATE MARKET INTELLIGENCE (99acres, Housing.com, Magicbricks):
- You have real-time Google Search enabled to fetch live commercial property trends from 99acres, Housing.com, and Magicbricks.
- 99acres Data: Ecotech-12 Greater Noida West is ranked among top 3 highest appreciating commercial retail corridors in Delhi NCR (+21.2% YoY appreciation).
- Housing.com Data: Locality Rating is 4.9 / 5.0 (Top Commercial Hub). Locality score is 92/100. Surrounded by over 1,00,000 residential apartments ensuring high daily shopper footfall.
- Magicbricks Data: Investment Grade A+. Projected annual rental yield of 7.5% – 9.2% P.A. 38% – 48% cumulative capital return projected upon metro expansion and Jewar Airport operational launch.

YOUR TONE & RESPONSE ALIGNMENT:
- Always stay aligned with KB West Walk.
- Professional, corporate, consultative, reassuring, and highly transparent.
- Provide structured, clear, elegant responses using clean bullet points (•) and line breaks.
- NEVER use asterisks (*).

Keep answers concise (2 to 4 short paragraphs max) unless asked for deep comparisons.`;

export async function askGemini(userQuery, conversationHistory = []) {
  if (!GEMINI_API_KEY) {
    return null;
  }

  // Format conversation history
  const contents = [
    {
      role: 'user',
      parts: [{ text: `System context: ${SYSTEM_INSTRUCTION}` }]
    },
    {
      role: 'model',
      parts: [{ text: 'Understood. I am KB Concierge, ready to assist investors and business owners with interactive advice on KB West Walk.' }]
    }
  ];

  const recentHistory = conversationHistory.slice(-6);
  recentHistory.forEach(msg => {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  });

  contents.push({
    role: 'user',
    parts: [{ text: userQuery }]
  });

  // Try each model sequentially with Google Search Tool Grounding
  for (const model of MODELS) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          tools: [{ googleSearch: {} }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0];
        const rawAnswer = candidate?.content?.parts?.[0]?.text;
        if (rawAnswer) {
          // Remove all asterisks for clean text formatting
          return rawAnswer.replace(/\*/g, '');
        }
      } else {
        console.warn(`Gemini model ${model} returned status: ${response.status}. Retrying next model...`);
      }
    } catch (error) {
      console.error(`Gemini Error on ${model}:`, error);
    }
  }

  return null;
}
