import React from 'react';
import { ConciergeBell, PhoneCall } from 'lucide-react';
import { FORBES_SERVICES_LIST } from '../data/projectsData';

export default function SaintAmandSection({ onOpenConcierge }) {
  return (
    <section id="hospitality" style={{
      backgroundColor: '#FAF7F2',
      color: '#1A1815',
      padding: '100px 4vw',
      borderBottom: '1px solid rgba(166, 129, 66, 0.15)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: '700',
            letterSpacing: '3px',
            color: '#A68142',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px'
          }}>
            OUR SIGNATURE SERVICES
          </span>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: '700',
            lineHeight: '1.15',
            color: '#1A1815'
          }}>
            Elevating Commercial Excellence. <span style={{ color: '#A68142', fontStyle: 'italic' }}>Dedicated Mall Management.</span>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '15px',
            color: '#5E574F',
            maxWidth: '750px',
            margin: '12px auto 0',
            lineHeight: '1.6'
          }}>
            Every store owner and corporate tenant enjoys Professional Mall Management, 24/7 security marshals, and dedicated retail concierge support.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          marginBottom: '50px'
        }}>
          {FORBES_SERVICES_LIST.map((srv, idx) => (
            <div key={srv.title || idx} style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(166, 129, 66, 0.2)',
              padding: '32px 24px',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                backgroundColor: '#FAF7F2',
                border: '1px solid #A68142',
                width: '50px',
                height: '50px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <ConciergeBell size={24} style={{ color: '#A68142' }} />
              </div>

              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '24px',
                fontWeight: '700',
                color: '#1A1815',
                margin: '0 0 10px'
              }}>
                {srv.title}
              </h3>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#5E574F',
                lineHeight: '1.6',
                margin: 0
              }}>
                {srv.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #A68142',
          borderRadius: '8px',
          padding: '36px',
          textAlign: 'center',
          maxWidth: '900px',
          margin: '0 auto',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '28px',
            fontWeight: '700',
            color: '#1A1815',
            margin: '0 0 12px'
          }}>
            Experience Personalized Concierge Consultation
          </h3>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: '#5E574F',
            marginBottom: '24px',
            maxWidth: '650px',
            margin: '0 auto 24px'
          }}>
            Schedule a confidential call with our Retail Leasing Advisor to discuss shop allotments, footfall drivers, and commercial management support.
          </p>
          <button
            onClick={onOpenConcierge}
            style={{
              backgroundColor: '#A68142',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 30px',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '3px',
              boxShadow: '0 4px 12px rgba(166, 129, 66, 0.25)'
            }}
          >
            <PhoneCall size={14} />
            <span>REQUEST PRIVATE CONSULTATION</span>
          </button>
        </div>

      </div>
    </section>
  );
}
