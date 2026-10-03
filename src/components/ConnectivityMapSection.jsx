import React, { useState } from 'react';
import { MapPin, Compass, ExternalLink } from 'lucide-react';
import { CONNECTIVITY_POINTS } from '../data/projectsData';

export default function ConnectivityMapSection({ onOpenSiteVisit, onOpenConcierge }) {
  const [activeCategory, setActiveCategory] = useState('expressways');

  const LANDMARKS = [
    { name: 'Delhi-Meerut Expressway (NH-9)', category: 'expressways', time: '5 Mins', dist: '3.2 Km', detail: 'Direct signal-free 14-lane corridor connecting straight to Central Delhi and Akshardham.' },
    { name: 'Noida-Greater Noida Link Road', category: 'expressways', time: '2 Mins', dist: '1.0 Km', detail: 'Arterial 130m wide sector road providing seamless access to Pari Chowk and Noida.' },
    { name: 'Delhi-Meerut RRTS Transit Station', category: 'expressways', time: '10 Mins', dist: '5.8 Km', detail: 'High-speed rapid rail system connecting NCR to Meerut and Sarai Kale Khan.' },

    { name: 'Hindon River Metro Station (Blue Line)', category: 'transit', time: '15 Mins', dist: '8.1 Km', detail: 'Direct metro connection to Rajiv Chowk, Connaught Place, and Dwarka.' },
    { name: 'Noida Sector 52 & 62 Metro Hub', category: 'transit', time: '15 Mins', dist: '8.5 Km', detail: 'Interchange hub for Blue Line and Aqua Line metro networks.' },

    { name: 'Hindon Airport (Ghaziabad)', category: 'airport', time: '20 Mins', dist: '14.5 Km', detail: 'Domestic regional airport operating flight connectivity across tier-2 cities.' },
    { name: 'Noida International Airport (Jewar)', category: 'airport', time: '45 Mins', dist: '52.0 Km', detail: 'Upcoming Asia-Pacific aviation hub driving massive capital appreciation for Greater Noida West.' },

    { name: 'Noida Sector 62 & 63 IT/Business Park', category: 'corporate', time: '15 Mins', dist: '9.0 Km', detail: 'Primary tech hub featuring TCS, Accenture, Cognizant, and major MNC headquarters.' },
    { name: 'Gaur City Mall & Galleria Commercial', category: 'corporate', time: '5 Mins', dist: '2.5 Km', detail: 'Premium retail high-street, multiplexes, international fashion brands, and fine dining.' },

    { name: 'Yashoda Medicity & Fortis Hospital', category: 'social', time: '12 Mins', dist: '7.5 Km', detail: 'Top-tier multi-specialty tertiary care hospitals and emergency healthcare facilities.' },
    { name: 'DPS, Ryan International & Lotus Valley School', category: 'social', time: '8 Mins', dist: '4.0 Km', detail: 'Renowned international K-12 educational institutions within 5 km radius.' }
  ];

  const filteredLandmarks = LANDMARKS.filter(item => activeCategory === 'all' || item.category === activeCategory);

  return (
    <section id="location" style={{
      width: '100%',
      backgroundColor: '#FAF8F5',
      padding: '90px 4vw',
      color: '#1A1815',
      borderTop: '1px solid rgba(166, 129, 66, 0.25)',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            fontSize: '12px',
            color: '#A68142',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontWeight: '700',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <MapPin size={16} />
            STRATEGIC LOCATION & CONNECTIVITY MAP
          </div>
          <h2 style={{
            fontFamily: "'Outfit', 'Cormorant Garamond', sans-serif",
            fontSize: 'clamp(32px, 4vw, 50px)',
            fontWeight: '700',
            color: '#1A1815'
          }}>
            Ecotech-12, Greater Noida West — Prime Gold Commercial Corridor
          </h2>
          <p style={{ fontSize: '15px', color: '#5E574F', maxWidth: '750px', margin: '12px auto 0', lineHeight: '1.6' }}>
            Enjoy unparalleled multi-modal connectivity via 14-lane expressways, RRTS bullet transit, metro corridors, and dual international airport access points.
          </p>
        </div>

        {/* Main Grid: Interactive Map + Connectivity Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '36px',
          marginBottom: '50px',
          alignItems: 'stretch'
        }}>
          {/* Left Column: Embed Google Map Container */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #A68142',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
          }}>
            <div style={{
              backgroundColor: '#FAF7F2',
              padding: '16px 24px',
              borderBottom: '1px solid rgba(166, 129, 66, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={18} style={{ color: '#A68142' }} />
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1A1815', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Live Ecotech-12 GPS Map
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Ecotech+12+Greater+Noida+West"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#A68142',
                  fontSize: '11px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Google Map iFrame */}
            <div style={{ width: '100%', height: '420px', position: 'relative' }}>
              <iframe
                title="KB West Walk Location Map"
                src="https://maps.google.com/maps?q=Ecotech%2012%20Greater%20Noida%20West&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Quick Map Bar */}
            <div style={{
              padding: '20px 24px',
              backgroundColor: '#FAF7F2',
              borderTop: '1px solid rgba(166, 129, 66, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#A68142', fontWeight: '700', textTransform: 'uppercase' }}>
                  GPS COORDINATES & ADDRESS
                </div>
                <div style={{ fontSize: '13px', color: '#1A1815', marginTop: '2px' }}>
                  Plot No. C-3, Ecotech-12, Greater Noida West - 201318
                </div>
              </div>

              <button
                onClick={onOpenSiteVisit}
                style={{
                  padding: '10px 18px',
                  backgroundColor: '#A68142',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(166, 129, 66, 0.25)'
                }}
              >
                REQUEST CAB PICKUP FOR VISIT
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Destination Tabs & List */}
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(166, 129, 66, 0.3)',
            borderRadius: '8px',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#A68142', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
                FILTER DESTINATION RADIUS
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {[
                  { id: 'expressways', label: 'Expressways & Transit' },
                  { id: 'transit', label: 'Metro Corridors' },
                  { id: 'airport', label: 'Dual Airports' },
                  { id: 'corporate', label: 'IT Parks & Malls' },
                  { id: 'social', label: 'Hospitals & Schools' },
                  { id: 'all', label: 'All Landmarks' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      cursor: 'pointer',
                      border: activeCategory === cat.id ? '1px solid #A68142' : '1px solid rgba(166,129,66,0.2)',
                      backgroundColor: activeCategory === cat.id ? '#A68142' : '#FAF7F2',
                      color: activeCategory === cat.id ? '#FFFFFF' : '#A68142',
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Landmark Item Cards */}
              <div style={{ display: 'grid', gap: '14px', maxHeight: '360px', overflowY: 'auto', paddingRight: '6px' }}>
                {filteredLandmarks.map((item, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#FAF7F2',
                    border: '1px solid rgba(166, 129, 66, 0.2)',
                    borderRadius: '6px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700', color: '#1A1815', marginBottom: '4px' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#5E574F', lineHeight: '1.4' }}>
                        {item.detail}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '80px' }}>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: '#A68142' }}>
                        {item.time}
                      </div>
                      <div style={{ fontSize: '11px', color: '#8A8275' }}>
                        {item.dist}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Enquire Action */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(166,129,66,0.2)', display: 'flex', gap: '12px' }}>
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
                  borderRadius: '3px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(166, 129, 66, 0.25)'
                }}
              >
                SCHEDULE LOCATION TOUR
              </button>
              <button
                onClick={onOpenConcierge}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #A68142',
                  color: '#A68142',
                  fontWeight: '700',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                LOCATION REPORT
              </button>
            </div>
          </div>
        </div>

        {/* Highlight Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {CONNECTIVITY_POINTS.map((cp, idx) => (
            <div key={idx} style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(166, 129, 66, 0.25)',
              padding: '20px',
              borderRadius: '6px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#A68142', fontFamily: "'Outfit', sans-serif" }}>
                {cp.time}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#1A1815', margin: '4px 0 2px' }}>
                {cp.name}
              </div>
              <div style={{ fontSize: '11px', color: '#5E574F' }}>
                Distance: {cp.distance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
