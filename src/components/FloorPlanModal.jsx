import React, { useState } from 'react';
import { X, Layers, CheckCircle2, Download } from 'lucide-react';
import { TYPOLOGIES, FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';

export default function FloorPlanModal({ isOpen, onClose, onOpenSiteVisit, onOpenBrochure }) {
  const [activeTab, setActiveTab] = useState('ground_retail');

  if (!isOpen) return null;

  const currentPlan = TYPOLOGIES.find(t => t.id === activeTab) || TYPOLOGIES[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Architectural Floor Plans"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #A68142',
        borderRadius: '6px',
        maxWidth: '920px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        color: '#1A1815',
        padding: '36px 32px',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(166, 129, 66, 0.25)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#A68142',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A68142', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
          <Layers size={16} />
          INTERACTIVE ARCHITECTURAL PLANS
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#1A1815', fontWeight: '600', marginBottom: '8px' }}>
          Floor Plans & Spatial Master Layouts
        </h2>

        <p style={{ fontSize: '13px', color: '#5E574F', marginBottom: '24px' }}>
          Plot C-3, Ecotech-12, Greater Noida West • Designed with double-height ceilings, glass frontages & central atrium facing shops.
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
          {TYPOLOGIES.map((typ) => (
            <button
              key={typ.id}
              onClick={() => setActiveTab(typ.id)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '4px',
                border: activeTab === typ.id ? '1px solid #A68142' : '1px solid rgba(166, 129, 66, 0.2)',
                background: activeTab === typ.id ? '#A68142' : '#FAF7F2',
                color: activeTab === typ.id ? '#FFFFFF' : '#A68142',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {typ.title}
            </button>
          ))}
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', alignItems: 'center' }}>
          {/* Floor Plan Image */}
          <div style={{
            backgroundColor: '#FAF7F2',
            border: '1px solid rgba(166, 129, 66, 0.3)',
            borderRadius: '4px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <img
              src={currentPlan.floorPlanImg}
              alt={currentPlan.title}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', borderRadius: '4px' }}
            />
            <div style={{ marginTop: '12px', fontSize: '12px', color: '#5E574F' }}>
              Architectural Schematic Blueprint • RERA {FAB_LUXE_PROJECT_DETAILS.reraNo}
            </div>
          </div>

          {/* Specs Details */}
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '26px',
              color: '#1A1815',
              fontWeight: '600',
              marginBottom: '6px'
            }}>
              {currentPlan.title}
            </div>

            <div style={{ fontSize: '20px', color: '#A68142', fontWeight: '700', fontFamily: "'Cormorant Garamond', serif", marginBottom: '16px' }}>
              {currentPlan.price}
            </div>

            <div style={{
              backgroundColor: '#FAF7F2',
              border: '1px solid rgba(166, 129, 66, 0.2)',
              borderRadius: '4px',
              padding: '16px',
              marginBottom: '20px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              fontSize: '13px'
            }}>
              <div>
                <span style={{ color: '#5E574F' }}>Super Area:</span>
                <div style={{ color: '#1A1815', fontWeight: '700' }}>{currentPlan.superArea}</div>
              </div>

              <div>
                <span style={{ color: '#5E574F' }}>Carpet Area:</span>
                <div style={{ color: '#1A1815', fontWeight: '700' }}>{currentPlan.carpetArea}</div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', color: '#A68142', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', marginBottom: '8px' }}>
                Key Layout Features
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                {currentPlan.highlights.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333333' }}>
                    <CheckCircle2 size={15} style={{ color: '#A68142', flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
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
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                Schedule Private Tour
              </button>

              <button
                onClick={() => { onClose(); onOpenBrochure(); }}
                style={{
                  padding: '14px 20px',
                  background: 'transparent',
                  border: '1px solid #A68142',
                  color: '#A68142',
                  fontWeight: '600',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Download size={15} />
                <span>PDF Blueprint</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
