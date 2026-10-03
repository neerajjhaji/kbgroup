import React from 'react';
import { BUYER_JOURNEY_STEPS } from '../data/projectsData';
import { Calendar } from 'lucide-react';

export default function BuyerJourneySteps({ onOpenSiteVisit, onOpenConcierge }) {
  return (
    <section id="buyer-journey" style={{
      width: '100%',
      backgroundColor: '#FAF7F2',
      padding: '100px 4vw',
      color: '#1A1815',
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
            EXCLUSIVE SEAMLESS EXPERIENCE
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#1A1815'
          }}>
            The 4-Step KB West Walk Acquisition Journey
          </h2>
          <p style={{ fontSize: '15px', color: '#5E574F', maxWidth: '640px', margin: '12px auto 0' }}>
            From initial shop selection to RERA booking allocation, experience absolute transparency and dedicated commercial executive assistance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {BUYER_JOURNEY_STEPS.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(166, 129, 66, 0.2)',
                borderRadius: '6px',
                padding: '32px 24px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#A68142';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(166, 129, 66, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(166, 129, 66, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
              }}
            >
              <div>
                <div style={{
                  fontSize: '36px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: '700',
                  color: '#A68142',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>{step.step}</span>
                  <div style={{ width: '32px', height: '1px', background: 'rgba(166, 129, 66, 0.3)' }} />
                </div>

                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1A1815',
                  marginBottom: '10px',
                  lineHeight: '1.3'
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontSize: '13px',
                  color: '#5E574F',
                  lineHeight: '1.6'
                }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          marginTop: '50px',
          backgroundColor: '#FFFFFF',
          border: '2px solid #A68142',
          borderRadius: '8px',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
        }}>
          <div>
            <div style={{ fontSize: '22px', fontFamily: "'Cormorant Garamond', serif", color: '#1A1815', fontWeight: '700' }}>
              Ready to Begin Your Private Journey?
            </div>
            <div style={{ fontSize: '14px', color: '#5E574F', marginTop: '4px' }}>
              Request a guided walkthrough & site office briefing at Plot C-3, Ecotech-12, Greater Noida West.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenSiteVisit}
              style={{
                backgroundColor: '#A68142',
                color: '#FFFFFF',
                border: 'none',
                padding: '14px 28px',
                fontWeight: '700',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderRadius: '3px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(166, 129, 66, 0.25)'
              }}
            >
              Book VIP Visit
            </button>
            <button
              onClick={onOpenConcierge}
              style={{
                backgroundColor: '#FAF7F2',
                border: '1px solid #A68142',
                color: '#A68142',
                padding: '14px 28px',
                fontWeight: '700',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Speak with Concierge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
