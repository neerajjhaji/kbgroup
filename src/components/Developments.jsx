import React from 'react';
import { Eye, Calendar, CheckCircle2, ShoppingBag, Utensils, Film, Building2 } from 'lucide-react';
import { TYPOLOGIES } from '../data/projectsData';

export default function Developments({ onOpenSiteVisit, onOpenFloorPlan }) {
  return (
    <section id="developments" style={{
      backgroundColor: '#FAF7F2',
      color: '#0F172A',
      padding: '90px 4vw',
      borderBottom: '1px solid rgba(166, 129, 66, 0.2)'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>

        {/* Header */}
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
            EXPLORE THE DEVELOPMENT
          </span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: '800',
            lineHeight: '1.15',
            color: '#0F172A'
          }}>
            Retail, Food Court, Cinema <span style={{ color: '#A68142', fontStyle: 'italic' }}>& Studio Suites</span>
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '15px',
            color: '#475569',
            marginTop: '12px',
            maxWidth: '750px',
            margin: '12px auto 0',
            fontWeight: '600'
          }}>
            Plot No. C-3, Ecotech-12, Greater Noida West • RERA No.: UPRERAPRJ422027/01/2026 • 18 Levels High-Street Landmark
          </p>
        </div>

        {/* Project Typologies Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px'
        }}>
          {TYPOLOGIES.map((typo) => {
            const featureList = typo.highlights || typo.features || [];
            return (
              <div key={typo.id} style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(166, 129, 66, 0.3)',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                transition: 'transform 0.3s, border-color 0.3s'
              }}>
                {/* Image Container with Badges */}
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                  <img
                    src={typo.image}
                    alt={typo.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #A68142',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#A68142',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(6px)'
                  }}>
                    {typo.superArea}
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    backgroundColor: '#A68142',
                    color: '#FFFFFF',
                    padding: '6px 14px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '800',
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {typo.price}
                  </div>
                </div>

                {/* Details Body */}
                <div style={{ padding: '26px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#A68142',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: '6px'
                  }}>
                    KB WEST WALK • ECOTECH-12
                  </div>

                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#0F172A',
                    margin: '0 0 12px',
                    lineHeight: '1.2'
                  }}>
                    {typo.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    fontWeight: '500'
                  }}>
                    {typo.description}
                  </p>

                  {/* Key Features List */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    marginBottom: '24px',
                    borderTop: '1px solid rgba(166, 129, 66, 0.2)',
                    paddingTop: '16px'
                  }}>
                    {featureList.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#1E293B', fontWeight: '600' }}>
                        <CheckCircle2 size={14} style={{ color: '#A68142', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                    <button
                      onClick={onOpenFloorPlan}
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        border: '1px solid #A68142',
                        color: '#A68142',
                        padding: '10px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Eye size={13} />
                      <span>LAYOUT PLAN</span>
                    </button>

                    <button
                      onClick={onOpenSiteVisit}
                      style={{
                        flex: 1,
                        backgroundColor: '#A68142',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '800',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Calendar size={13} />
                      <span>ENQUIRE SHOP</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
