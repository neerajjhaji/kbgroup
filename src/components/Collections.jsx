import React from 'react';
import { COLLECTIONS_DATA } from '../data/projectsData';
import { Layers, Check } from 'lucide-react';

export default function Collections({ onOpenFloorPlan, onOpenSiteVisit }) {
  return (
    <section id="collections" style={{
      width: '100%',
      backgroundColor: '#FAF8F5',
      padding: '100px 4vw',
      color: '#1A1815',
      borderTop: '1px solid rgba(166, 129, 66, 0.2)',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            fontSize: '12px',
            color: '#A68142',
            textTransform: 'uppercase',
            letterSpacing: '2.5px',
            fontWeight: '600',
            marginBottom: '10px'
          }}>
            CURATED LIVABLE SPACES
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '600',
            color: '#1A1815'
          }}>
            The Residential Collections
          </h2>
          <p style={{ fontSize: '15px', color: '#5E574F', maxWidth: '640px', margin: '12px auto 0' }}>
            Choose from meticulous layouts crafted with high-ceiling volumes, wrap-around terraces, and private lift access.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '30px'
        }}>
          {COLLECTIONS_DATA.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(166, 129, 66, 0.25)',
                borderRadius: '6px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#A68142';
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(166, 129, 66, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(166, 129, 66, 0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                {/* Image */}
                <div style={{ position: 'relative', height: '240px' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: '#A68142',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '2px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px'
                  }}>
                    {item.tag}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '28px 24px' }}>
                  <div style={{ fontSize: '12px', color: '#5E574F', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                    {item.subtitle}
                  </div>

                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '26px',
                    fontWeight: '600',
                    color: '#1A1815',
                    marginBottom: '8px'
                  }}>
                    {item.title}
                  </h3>

                  <div style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#A68142',
                    fontFamily: "'Cormorant Garamond', serif",
                    marginBottom: '16px'
                  }}>
                    {item.price} <span style={{ fontSize: '13px', color: '#5E574F', fontWeight: '400', fontFamily: 'sans-serif' }}>({item.area})</span>
                  </div>

                  {/* Feature Checklist */}
                  <div style={{ borderTop: '1px solid rgba(166, 129, 66, 0.15)', paddingTop: '16px', display: 'grid', gap: '8px' }}>
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333333' }}>
                        <Check size={14} style={{ color: '#A68142', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ padding: '0 24px 24px 24px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={onOpenFloorPlan}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'transparent',
                    border: '1px solid #A68142',
                    color: '#A68142',
                    fontWeight: '600',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Layers size={14} />
                  <span>View Plan</span>
                </button>

                <button
                  onClick={onOpenSiteVisit}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#A68142',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    borderRadius: '2px',
                    cursor: 'pointer'
                  }}
                >
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
