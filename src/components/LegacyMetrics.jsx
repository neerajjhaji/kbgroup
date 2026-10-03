import React from 'react';
import { Crown, Building2, Trees, ShieldCheck } from 'lucide-react';

export default function LegacyMetrics() {
  const stats = [
    {
      icon: Building2,
      value: '18 Levels',
      label: 'Mixed-Use Landmark',
      subtext: 'High-Street Retail, Food Court, Multiplex & Studio Suites at Ecotech-12'
    },
    {
      icon: Crown,
      value: '5 Levels',
      label: 'AC High-Street Arcade',
      subtext: 'Climate-Managed Retail Shopping Arcade with Central Glass Atrium'
    },
    {
      icon: Trees,
      value: 'Food & Cinema',
      label: 'Dining & Entertainment',
      subtext: 'Multi-Screen Multiplex & Multi-Cuisine Rooftop Dining Zones'
    },
    {
      icon: ShieldCheck,
      value: 'RERA Approved',
      label: 'UPRERAPRJ422027/01/2026',
      subtext: 'Developed by Shree Kunj Bihariji Realty (Trust Since 2005)'
    }
  ];

  return (
    <section id="highlights" style={{
      width: '100%',
      backgroundColor: '#FAF7F2',
      padding: '80px 4vw',
      position: 'relative',
      borderTop: '1px solid rgba(166, 129, 66, 0.15)',
      borderBottom: '1px solid rgba(166, 129, 66, 0.15)',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            fontSize: '12px',
            color: '#A68142',
            textTransform: 'uppercase',
            letterSpacing: '2.5px',
            fontWeight: '700',
            marginBottom: '10px'
          }}>
            ARCHITECTURAL BENCHMARKS
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: '#1A1815',
            fontWeight: '600',
            maxWidth: '750px',
            margin: '0 auto 16px'
          }}>
            A Benchmark of Excellence Crafted for the Global Elite
          </h2>
          <div style={{ width: '80px', height: '2px', background: '#A68142', margin: '0 auto' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(166, 129, 66, 0.25)',
                  borderRadius: '4px',
                  padding: '36px 28px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#A68142';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(166, 129, 66, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(166, 129, 66, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.04)';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(166, 129, 66, 0.1)',
                  border: '1px solid rgba(166, 129, 66, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: '#A68142'
                }}>
                  <Icon size={26} />
                </div>

                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '40px',
                  fontWeight: '700',
                  color: '#1A1815',
                  lineHeight: '1.1',
                  marginBottom: '8px'
                }}>
                  {stat.value}
                </div>

                <div style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#A68142',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '10px'
                }}>
                  {stat.label}
                </div>

                <p style={{
                  fontSize: '13px',
                  color: '#5E574F',
                  lineHeight: '1.5'
                }}>
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
