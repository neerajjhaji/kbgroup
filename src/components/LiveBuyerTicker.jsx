import React, { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, Building, PhoneCall, ChevronRight, CheckCircle2 } from 'lucide-react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';

export default function LiveBuyerTicker({ _onOpenSiteVisit, onOpenConcierge }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Compute today's date during render
  const todayOptions = { weekday: 'short', month: 'short', day: 'numeric' };
  const todayFormatted = new Date().toLocaleDateString('en-US', todayOptions);

  const UPDATES = [
    {
      badge: 'OFFICIAL RERA STATUS',
      icon: ShieldCheck,
      text: `UPRERA Approved Project: UPRERAPRJ422027/01/2026 | Ecotech-12, Greater Noida West`
    },
    {
      badge: 'SITE OFFICE OPEN',
      icon: MapPin,
      text: `Site Office & Model Display Open Today (${todayFormatted}) • Plot C-3, Ecotech-12`
    },
    {
      badge: 'BANK COLLECTION ACCOUNT',
      icon: Building,
      text: `Official RERA Collection Account with Axis Bank Ltd (A/C: 925020035796321)`
    },
    {
      badge: 'DIRECT ASSISTANCE',
      icon: PhoneCall,
      text: `Official Helpline Active: ${FAB_LUXE_PROJECT_DETAILS.helpline} • Dedicated Commercial Desk`
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = UPDATES[currentIdx];
  const IconComponent = activeItem.icon;

  return (
    <div style={{
      backgroundColor: '#FAF7F2',
      borderBottom: '1px solid rgba(166, 129, 66, 0.3)',
      color: '#1A1815',
      fontSize: '11px',
      padding: '8px 4vw',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left Official Live Status Badge + Verified Update */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(166, 129, 66, 0.18)',
            border: '1px solid #A68142',
            color: '#A68142',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: '800',
            fontSize: '10px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}>
            <IconComponent size={12} style={{ color: '#A68142' }} />
            <span>{activeItem.badge}</span>
          </div>

          <div style={{
            color: '#1A1815',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '850px',
            fontSize: '12px'
          }}>
            {activeItem.text}
          </div>
        </div>

        {/* Right Official Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#2E7D32', fontSize: '11px', fontWeight: '700' }} className="hide-on-mobile">
            <CheckCircle2 size={13} />
            <span>VERIFIED ADVISORY</span>
          </div>

          <button
            onClick={onOpenConcierge}
            style={{
              background: 'none',
              border: 'none',
              color: '#A68142',
              fontWeight: '700',
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: 0
            }}
          >
            <span>OFFICIAL ENQUIRY</span>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
