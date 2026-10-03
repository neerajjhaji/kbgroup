import React from 'react';
import { Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';

export default function TopUtilityBar({ onOpenBrochure }) {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#FAF7F2',
      borderBottom: '1px solid rgba(166, 129, 66, 0.2)',
      boxSizing: 'border-box',
      zIndex: 100,
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '7px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11px',
        fontWeight: '500',
        color: '#A68142',
        boxSizing: 'border-box'
      }}>
        {/* Left items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span style={{ color: '#1A1815', letterSpacing: '0.5px' }}>
            RERA No: <strong style={{ color: '#A68142' }}>{FAB_LUXE_PROJECT_DETAILS.reraNo}</strong>
          </span>

          <a
            href={`tel:${FAB_LUXE_PROJECT_DETAILS.helpline.replace(/\s+/g, '')}`}
            style={{
              color: '#1A1815',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Phone size={12} style={{ color: '#A68142' }} />
            <span>Call: <strong>{FAB_LUXE_PROJECT_DETAILS.helpline}</strong></span>
          </a>

          <a
            href={`https://wa.me/${FAB_LUXE_PROJECT_DETAILS.whatsappNumber}?text=${encodeURIComponent('Hi, I want more details regarding KB West Walk Ecotech-12 Greater Noida West.')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#25D366',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <MessageSquare size={12} />
            <span>WhatsApp Connect</span>
          </a>
        </div>

        {/* Right items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ color: '#5E574F', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={13} style={{ color: '#A68142' }} />
            <span>Dedicated Mall Management & Retail Concierge</span>
          </div>

          <button
            onClick={onOpenBrochure}
            style={{
              background: 'none',
              border: 'none',
              color: '#A68142',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '3px'
            }}
          >
            Download Official PDF
          </button>
        </div>
      </div>
    </div>
  );
}
