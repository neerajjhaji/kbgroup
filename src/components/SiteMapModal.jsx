import React, { useState } from 'react';
import { X, Download } from 'lucide-react';

export default function SiteMapModal({ isOpen, onClose, onOpenSiteVisit, onOpenBrochure }) {
  const [selectedHotspot, setSelectedHotspot] = useState('all');

  if (!isOpen) return null;

  const HOTSPOTS = [
    { id: 'retail', title: '5-Level AC High-Street Shopping Arcade', zone: 'Retail Zone', desc: 'Air-conditioned high-street retail shops on Lower Ground, Ground, 1st, 2nd & 3rd Floors with glass atrium.' },
    { id: 'food-cinema', title: 'Food Court & Multi-Screen Cinema', zone: 'Entertainment Zone', desc: 'Multi-screen multiplex cinema and multi-cuisine rooftop dining on 3rd, 4th & 5th floors.' },
    { id: 'studios', title: 'State-of-the-Art Serviced Studio Suites', zone: 'Tower Zone (Floors 6-18)', desc: 'Modern serviced studio suites and executive workspaces with high rental yield.' },
    { id: 'atrium', title: 'Central Glass Atrium & Promenade', zone: 'Atrium Courtyard', desc: 'Central skylight glass atrium with escalators, brand display plazas, and high footfall promenades.' },
    { id: 'entry', title: 'Grand Entry Plaza & Basement Parking', zone: 'Main Entrance', desc: 'Grand entry plaza, automated boom barriers, and multi-level basement parking access.' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Master Site Layout Modal"
      style={{
        position: 'fixed',
        inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(5, 4, 3, 0.92)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid #A68142',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        overflowY: 'auto',
        color: '#1A1815',
        boxShadow: '0 25px 60px rgba(166, 129, 66, 0.25)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Top Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid rgba(166, 129, 66, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FAF7F2',
          sticky: 'top'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: '#A68142', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
              MASTER PLAN & ARCHITECTURAL SITE LAYOUT
            </div>
            <h2 style={{ fontFamily: "'Outfit', 'Cormorant Garamond', sans-serif", fontSize: '26px', color: '#1A1815', margin: '4px 0 0' }}>
              Master Site Map — KB West Walk, Ecotech-12, Greater Noida West
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #A68142',
              color: '#A68142',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
          {/* Left Column: Interactive Site Plan Image */}
          <div>
            <div style={{
              position: 'relative',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid #A68142',
              backgroundColor: '#FAF7F2',
              boxShadow: '0 10px 30px rgba(166, 129, 66, 0.15)'
            }}>
              <img
                src="/kbww/page_1.png"
                alt="KB West Walk Master Site Plan"
                style={{ width: '100%', height: 'auto', display: 'block', opacity: 0.95 }}
              />

              {/* Hotspot Badge Overlays */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: 'rgba(250, 247, 242, 0.92)',
                border: '1px solid #A68142',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                color: '#A68142',
                fontWeight: '700',
                letterSpacing: '1px'
              }}>
                18-LEVEL COMMERCIAL LANDMARK
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenBrochure();
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#A68142',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Download size={14} />
                DOWNLOAD HD MASTER PLAN PDF
              </button>
            </div>
          </div>

          {/* Right Column: Hotspots & Specifications */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#A68142', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px' }}>
                EXPLORE CAMPUS ZONES
              </div>

              {/* Hotspot List Cards */}
              <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {HOTSPOTS.map((hs) => (
                  <div
                    key={hs.id}
                    onClick={() => setSelectedHotspot(hs.id)}
                    style={{
                      backgroundColor: selectedHotspot === hs.id ? '#FAF7F2' : '#FFFFFF',
                      border: selectedHotspot === hs.id ? '1px solid #A68142' : '1px solid rgba(166, 129, 66, 0.2)',
                      borderRadius: '6px',
                      padding: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1815' }}>{hs.title}</span>
                      <span style={{ fontSize: '10px', color: '#A68142', textTransform: 'uppercase', fontWeight: '700' }}>{hs.zone}</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#5E574F', margin: 0, lineHeight: '1.4' }}>
                      {hs.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ borderTop: '1px solid rgba(166, 129, 66, 0.2)', paddingTop: '20px', display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenSiteVisit();
                }}
                style={{
                  flex: 1,
                  padding: '14px',
                  backgroundColor: '#A68142',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                BOOK VIP SITE MAP TOUR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
