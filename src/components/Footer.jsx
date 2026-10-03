import React from 'react';
import { Phone, MapPin, ShieldCheck, ArrowUp, Map, Users } from 'lucide-react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';

export default function Footer({ onOpenSiteVisit, _onOpenBrochure, onOpenFloorPlan, onOpenSiteMap, onOpenLeadsVault }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      backgroundColor: '#FAF7F2',
      color: '#0F172A',
      borderTop: '1px solid rgba(166, 129, 66, 0.3)',
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px'
    }}>
      {/* Top Footer Banner */}
      <div style={{
        borderBottom: '1px solid rgba(166, 129, 66, 0.2)',
        padding: '40px 4vw'
      }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          {/* Footer Brand Badges: Company Builder Logo & Property Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #C5A059',
              boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <img
                src="/shree_kb_logo.png"
                alt="Shree KB Group Main Builder Logo"
                style={{
                  height: '38px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #C5A059',
              boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <img
                src="/kbww_logo.png"
                alt="KB West Walk Project Logo"
                style={{
                  height: '36px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {onOpenLeadsVault && (
              <button
                onClick={onOpenLeadsVault}
                style={{
                  backgroundColor: 'rgba(166, 129, 66, 0.12)',
                  border: '1px solid #A68142',
                  color: '#A68142',
                  padding: '10px 20px',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '4px'
                }}
              >
                <Users size={14} />
                BUYER LEADS VAULT
              </button>
            )}

            <button
              onClick={onOpenSiteMap}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #A68142',
                color: '#A68142',
                padding: '10px 20px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '4px'
              }}
            >
              <Map size={14} />
              MASTER SITE MAP
            </button>

            <button
              onClick={onOpenSiteVisit}
              style={{
                backgroundColor: '#A68142',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 20px',
                fontSize: '11px',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(166, 129, 66, 0.3)'
              }}
            >
              BOOK SITE VISIT
            </button>
          </div>
        </div>
      </div>

      {/* Categorized Sitemap Index */}
      <div style={{ padding: '60px 4vw', borderBottom: '1px solid rgba(166, 129, 66, 0.2)' }}>
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px'
        }}>
          {/* Column 1: Commercial Typologies */}
          <div>
            <h4 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '18px',
              fontWeight: '700',
              color: '#A68142',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              COMMERCIAL TYPOLOGIES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#334155', fontWeight: '500' }}>
              <li><a onClick={onOpenFloorPlan} style={{ cursor: 'pointer' }}>Ground Floor Boulevard Retail Shops</a></li>
              <li><a onClick={onOpenFloorPlan} style={{ cursor: 'pointer' }}>Lower Ground Floor Hypermarket Outlets</a></li>
              <li><a onClick={onOpenFloorPlan} style={{ cursor: 'pointer' }}>First Floor Fashion & Brand Arcades</a></li>
              <li><a onClick={onOpenFloorPlan} style={{ cursor: 'pointer' }}>3rd & 4th Floor Food Court & Rooftop Dining</a></li>
              <li><a onClick={onOpenFloorPlan} style={{ cursor: 'pointer' }}>6th to 18th Floor Serviced Studio Suites</a></li>
              <li><a onClick={onOpenSiteMap} style={{ cursor: 'pointer', color: '#A68142', fontWeight: '700' }}>🗺️ View Master Floor & Site Layout</a></li>
            </ul>
          </div>

          {/* Column 2: Key Infrastructure */}
          <div>
            <h4 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '18px',
              fontWeight: '700',
              color: '#A68142',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              COMMERCIAL FEATURES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#334155', fontWeight: '500' }}>
              <li>5-Level AC Ventilated High-Street Arcade</li>
              <li>Double Height Central Glass Atrium</li>
              <li>Multi-Screen Multiplex Cinema & Food Court</li>
              <li>Multi-Level Basement Parking & Security</li>
            </ul>
          </div>

          {/* Column 3: Connectivity */}
          <div>
            <h4 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '18px',
              fontWeight: '700',
              color: '#A68142',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              CONNECTIVITY ADVANTAGES
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#334155', fontWeight: '500' }}>
              <li><a onClick={() => scrollToSection('location')} style={{ cursor: 'pointer' }}>Proposed Ecotech-12 Metro — 100 M</a></li>
              <li><a onClick={() => scrollToSection('location')} style={{ cursor: 'pointer' }}>Char Murti / Gaur Chowk — 5 mins</a></li>
              <li><a onClick={() => scrollToSection('location')} style={{ cursor: 'pointer' }}>NH-24 & Delhi-Meerut Exp — 10 mins</a></li>
              <li><a onClick={() => scrollToSection('location')} style={{ cursor: 'pointer' }}>Jewar Airport Corridor — 45 mins</a></li>
              <li><a onClick={() => scrollToSection('location')} style={{ cursor: 'pointer', color: '#A68142', fontWeight: '700' }}>📍 Explore Live GPS Map & Distances</a></li>
            </ul>
          </div>

          {/* Column 4: Regulatory & Contact */}
          <div>
            <h4 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '18px',
              fontWeight: '700',
              color: '#A68142',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              OFFICIAL CONTACT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#334155', fontWeight: '600' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} style={{ color: '#A68142' }} />
                <span>Helpline: {FAB_LUXE_PROJECT_DETAILS.helpline}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} style={{ color: '#A68142' }} />
                <span>Plot C-3, Ecotech-12, Greater Noida West</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={14} style={{ color: '#A68142' }} />
                <span>UPRERA: {FAB_LUXE_PROJECT_DETAILS.reraNo}</span>
              </div>
            </div>

            {/* CREDAI Official Affiliation Badge in Footer */}
            <div style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid rgba(197, 160, 89, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
              }}>
                <img
                  src="/credai_official_logo.png"
                  alt="CREDAI Actual Official Logo"
                  style={{ height: '32px', width: 'auto', display: 'block' }}
                />
              </div>
              <div style={{ fontSize: '10px', color: '#475569', lineHeight: '1.4', fontWeight: '500' }}>
                <span style={{ color: '#A68142', fontWeight: '800' }}>CREDAI NCR REGISTERED MEMBER</span>
                <br />
                Shree KB Group is an official affiliated member of CREDAI
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Disclaimer & Back To Top */}
      <div style={{ padding: '30px 4vw', backgroundColor: '#F1ECE1', color: '#475569', fontSize: '11px', lineHeight: '1.6' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '900px' }}>
            <p style={{ margin: '0 0 8px' }}>
              <strong>Disclaimer:</strong> KB West Walk is an official commercial high-street retail, food court, multiplex cinema & studio suite project developed by Shree Kunj Bihariji Realty Pvt. Ltd. (Shree KB Group) registered under Uttar Pradesh RERA with Registration Number {FAB_LUXE_PROJECT_DETAILS.reraNo} (Promoter ID: UPRERAPRM414706). All images, specifications, rendered views, and floor plans are conceptual and subject to terms.
            </p>
            <p style={{ margin: 0 }}>
              © {new Date().getFullYear()} KB West Walk (Shree Kunj Bihariji Realty Pvt. Ltd.). All rights reserved.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              backgroundColor: '#FAF7F2',
              border: '1px solid #A68142',
              color: '#A68142',
              padding: '8px 14px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
