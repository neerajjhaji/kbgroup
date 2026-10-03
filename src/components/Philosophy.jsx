import React from 'react';
import { Sparkles, Building2, ShieldCheck, Trophy } from 'lucide-react';
import { PHILOSOPHY_POINTS, GROUP_LEGACY_PROJECTS } from '../data/projectsData';

export default function Philosophy() {
  return (
    <section id="philosophy" style={{
      backgroundColor: '#FAF7F2',
      color: '#0F172A',
      padding: '90px 4vw',
      borderBottom: '1px solid rgba(166, 129, 66, 0.2)'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '3px',
            color: '#A68142',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px'
          }}>
            DEVELOPER LEGACY & VISION
          </span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(32px, 4vw, 50px)',
            fontWeight: '800',
            lineHeight: '1.15',
            color: '#0F172A'
          }}>
            Shree Kunj Bihariji Group <span style={{ color: '#A68142', fontStyle: 'italic' }}>— Trust Since 2005</span>
          </h2>
          <p style={{
            color: '#475569',
            maxWidth: '800px',
            margin: '14px auto 0',
            fontSize: '16px',
            lineHeight: '1.6',
            fontWeight: '500'
          }}>
            Shree Kunj Bihariji Group stands for purposeful development rooted in trust, vision, and progress. Shaping contemporary urban destinations that elevate businesses and lifestyles across NCR.
          </p>
          <div style={{
            width: '60px',
            height: '2px',
            backgroundColor: '#D4AF37',
            margin: '20px auto 0'
          }} />
        </div>

        {/* Editorial Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          marginBottom: '70px'
        }}>
          {/* Left Column: Render Showcase Card */}
          <div style={{
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)'
          }}>
            <img
              src="/kbww/WhatsApp_Image_2026-10-01_at_21.33.26.jpeg"
              alt="KB West Walk Architectural Elevation"
              style={{
                width: '100%',
                height: '460px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(11,14,20,0.95), transparent)',
              padding: '30px',
              color: '#FFFFFF'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '2px',
                color: '#D4AF37',
                textTransform: 'uppercase',
                marginBottom: '6px'
              }}>
                FLAGSHIP LAUNCH 2026
              </div>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '24px',
                fontWeight: '700',
                margin: 0
              }}>
                5 Levels of AC Ventilated Shopping Mall & Studio Suites
              </h3>
            </div>
          </div>

          {/* Right Column: Key Philosophy Points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {PHILOSOPHY_POINTS.map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '18px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(166, 129, 66, 0.3)',
                padding: '22px',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{
                  backgroundColor: 'rgba(166, 129, 66, 0.1)',
                  border: '1px solid #A68142',
                  width: '44px',
                  height: '44px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Sparkles size={20} style={{ color: '#A68142' }} />
                </div>
                <div>
                  <h4 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#0F172A',
                    margin: '0 0 6px'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '14px',
                    color: '#475569',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Legacy Track Record Banner */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(166, 129, 66, 0.3)',
          borderRadius: '8px',
          padding: '36px 30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '24px',
              fontWeight: '700',
              color: '#0F172A',
              margin: 0
            }}>
              Shree KB Group Project Portfolio Across Greater Noida
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {GROUP_LEGACY_PROJECTS.map((proj, i) => (
              <div key={i} style={{
                backgroundColor: i === 0 ? '#FAF7F2' : '#FFFFFF',
                border: i === 0 ? '2px solid #C5A059' : '1px solid #E2E8F0',
                padding: '24px',
                borderRadius: '8px',
                position: 'relative',
                boxShadow: i === 0 ? '0 8px 24px rgba(197, 160, 89, 0.15)' : '0 2px 10px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.25s ease'
              }}>
                {i === 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '16px',
                    backgroundColor: '#A68142',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '3px 12px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 6px rgba(166, 129, 66, 0.3)'
                  }}>
                    Current Flagship
                  </span>
                )}
                <div style={{ color: '#A68142', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '6px' }}>
                  {proj.year}
                </div>
                <h4 style={{ color: '#0F172A', fontSize: '22px', fontWeight: '800', margin: '0 0 6px', fontFamily: "'Outfit', sans-serif" }}>
                  {proj.title}
                </h4>
                <p style={{ color: '#334155', fontSize: '13px', margin: '0 0 4px', fontWeight: '600' }}>
                  {proj.location}
                </p>
                <p style={{ color: '#64748B', fontSize: '12px', margin: 0 }}>
                  {proj.type}
                </p>
                <div style={{
                  marginTop: '16px',
                  paddingTop: '12px',
                  borderTop: '1px solid #F1F5F9',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: i === 0 ? '#A68142' : '#0369A1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>✓</span> <span>{proj.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CREDAI Official Membership & Affiliation Badge */}
        <div style={{
          marginTop: '30px',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(197, 160, 89, 0.4)',
          borderRadius: '8px',
          padding: '24px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid #C5A059',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <img
                src="/credai_official_logo.png"
                alt="CREDAI Actual Official Logo"
                style={{
                  height: '44px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
            <div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '11px',
                fontWeight: '800',
                letterSpacing: '1.5px',
                color: '#A68142',
                textTransform: 'uppercase',
                marginBottom: '4px'
              }}>
                INDUSTRY AFFILIATION & TRUST
              </div>
              <h4 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '18px',
                fontWeight: '700',
                color: '#0F172A',
                margin: '0 0 4px'
              }}>
                Shree Kunj Bihariji Group is a Proud Member of CREDAI
              </h4>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '13px',
                color: '#475569',
                margin: 0,
                lineHeight: '1.5',
                fontWeight: '500'
              }}>
                Committed to transparent real estate practices, quality construction, and timely delivery under the Confederation of Real Estate Developers' Associations of India (CREDAI NCR).
              </p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'rgba(197, 160, 89, 0.12)',
            border: '1px solid #C5A059',
            color: '#C5A059',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            ✓ CREDAI MEMBER CODE: NCR-2026
          </div>
        </div>

      </div>
    </section>
  );
}
