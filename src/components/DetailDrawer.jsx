import React from 'react';
import { X, CheckCircle2, Building2 } from 'lucide-react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';

export default function DetailDrawer({ isOpen, onClose, onOpenSiteVisit, onOpenBrochure }) {
  if (!isOpen) return null;

  const specs = [
    { category: 'Structure & Building Engineering', items: ['Earthquake Zone V Compliant RCC Framed Superstructure', 'High-speed Mitsubishi / Otis passenger & service lifts', '5 Levels AC Ventilated High-Street Shopping Arcade'] },
    { category: 'Retail & Atrium Finishes', items: ['Double-Height Glass Frontages for Maximum Brand Exposure', 'Central Glass Skylight Atrium with Natural Daylighting', 'Granite & Vitrified Flooring in High-Footfall Public Promenades'] },
    { category: 'Multiplex & Food Court', items: ['Dedicated High Utility Load Provisions for Heavy Restaurant Equipment', 'Acoustically Engineered Multi-Screen Cinema Chambers', 'Rooftop Open Dining & Gourmet Food Court Seating'] },
    { category: 'Electrical & Automation', items: ['100% Dual Generator Power Backup System', 'Central VRV Air Conditioning System in Retail Zones', 'Smart Metering & Individual Sub-Metering for Outlets'] },
    { category: 'Security & Facilities', items: ['24/7 CCTV Command Center & Security Marshals', 'Automated Boom Barriers & Multi-Level Basement Parking', 'Dedicated Commercial Management Desk & On-Site Helpdesk'] }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Technical Specifications Drawer"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.3s'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderLeft: '1px solid #A68142',
        padding: '36px 32px',
        overflowY: 'auto',
        color: '#1A1815',
        position: 'relative',
        boxShadow: '-10px 0 30px rgba(166, 129, 66, 0.2)'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'transparent',
            border: 'none',
            color: '#A68142',
            cursor: 'pointer'
          }}
        >
          <X size={28} />
        </button>

        <div style={{ fontSize: '11px', color: '#A68142', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '600', marginBottom: '8px' }}>
          ARCHITECTURAL SPECIFICATIONS
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: '#1A1815', fontWeight: '600', marginBottom: '8px' }}>
          KB West Walk Technical Specifications
        </h2>

        <p style={{ fontSize: '13px', color: '#5E574F', marginBottom: '28px' }}>
          RERA Registered: {FAB_LUXE_PROJECT_DETAILS.reraNo} • Plot C-3, Ecotech-12, Greater Noida West
        </p>

        {/* Specifications Accordion List */}
        <div style={{ display: 'grid', gap: '24px', marginBottom: '36px' }}>
          {specs.map((group, idx) => (
            <div key={idx} style={{ backgroundColor: '#FAF7F2', border: '1px solid rgba(166, 129, 66, 0.25)', borderRadius: '4px', padding: '20px' }}>
              <h3 style={{ fontSize: '15px', color: '#A68142', fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={16} />
                {group.category}
              </h3>
              <div style={{ display: 'grid', gap: '8px' }}>
                {group.items.map((item, itemIdx) => (
                  <div key={itemIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#333333', lineHeight: '1.4' }}>
                    <CheckCircle2 size={15} style={{ color: '#A68142', marginTop: '2px', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => { onClose(); onOpenSiteVisit(); }}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: '#A68142',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: '700',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
          >
            Book Site Visit
          </button>

          <button
            onClick={() => { onClose(); onOpenBrochure(); }}
            style={{
              flex: 1,
              padding: '14px',
              background: 'transparent',
              border: '1px solid #A68142',
              color: '#A68142',
              fontWeight: '600',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
