import React, { useState } from 'react';
import { Crown, Waves, Trees, Trophy, ShieldCheck, Activity, CheckCircle, ChevronRight, X } from 'lucide-react';

export default function AmenitiesSection({ onOpenSiteVisit, onOpenConcierge }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const FULL_AMENITIES = [
    {
      id: 'high-street-retail',
      title: '5-Level Air-Conditioned Shopping Arcade',
      category: 'clubhouse',
      categoryLabel: 'Retail & High-Street',
      icon: Crown,
      image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.26.jpeg',
      shortDesc: 'Hybrid high-street and atrium-facing shopping mall format with double height shops, climate control, and wide glass promenades.',
      fullSpecs: [
        'Lower Ground, Ground, 1st, 2nd & 3rd Floor Shopping Arcades',
        'Double-Height Glass Frontage for Flagship Brands',
        '24/7 Commercial Helpdesk & Mall Security Marshals',
        'Central Atrium Facing High-Visibility Retail Outlets',
        '100% Power Backup & Climate-Managed Common Areas',
        'High-Speed Escalators & Dedicated Lifts on Every Level'
      ]
    },
    {
      id: 'multiplex-cinema',
      title: 'Multi-Screen Multiplex Cinema',
      category: 'aqua',
      categoryLabel: 'Entertainment Hub',
      icon: Waves,
      image: '/kbww/page_7.png',
      shortDesc: 'State-of-the-art multi-screen cinema hall on 5th floor with gourmet concession stands, recliner seating, and high weekend footfall.',
      fullSpecs: [
        'Multi-Screen Multiplex Experience with Dolby Atmos Sound',
        'Gourmet Concession Counters & Snack Salons',
        'Recliner Seating & VIP Lounge Area',
        'High Footfall Entertainment Anchor for the Development'
      ]
    },
    {
      id: 'food-court-dining',
      title: 'Multi-Cuisine Food Court & Rooftop Dining',
      category: 'green',
      categoryLabel: 'Gastronomy & Dining',
      icon: Trees,
      image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.30.jpeg',
      shortDesc: 'Expansive 3rd & 4th floor food courts featuring international QSR brands, specialty cafes, and open-air rooftop restaurants.',
      fullSpecs: [
        'Gourmet Multi-Cuisine Food Court Seating Over 500+ Diners',
        'Open-Air Rooftop Dining & Specialty Restaurant Outlets',
        'Dedicated Kitchen Exhaust & Heavy Utility Load Provision',
        'High Daily Footfall from Nearby Residential & Corporate Sectors'
      ]
    },
    {
      id: 'studio-suites',
      title: 'State-of-the-Art Serviced Studio Suites',
      category: 'sports',
      categoryLabel: 'Serviced Living',
      icon: Trophy,
      image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.34.jpeg',
      shortDesc: 'Premium studio suites on 6th to 18th floors crafted for modern working professionals, corporate executives, and high rental yield.',
      fullSpecs: [
        'Floors 6 to 18 Serviced Workspaces & Studio Suites',
        'Boutique Hospitality Interiors & Furnished Options',
        'Dedicated Elevator Bank Separate from Retail Footfall',
        'Direct Access to Food Court, Cinema, and High-Street Retail'
      ]
    },
    {
      id: 'glass-atrium',
      title: 'Double Height Central Glass Atrium',
      category: 'sports',
      categoryLabel: 'Architecture',
      icon: Activity,
      image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.29.jpeg',
      shortDesc: 'Grand glass atrium ensuring high natural light, open ventilation, and maximum brand visibility for every store owner.',
      fullSpecs: [
        'Natural Skylight Glass Dome Architectural Canopy',
        '360° Open View Promenades Facing Central Courtyard',
        'Wide Pedestrian Walkways & Event Activity Plaza',
        'High Visual Exposure for Every Retail Level'
      ]
    },
    {
      id: 'basement-parking',
      title: 'Multi-Level Basement Parking & Security',
      category: 'security',
      categoryLabel: 'Infrastructure',
      icon: ShieldCheck,
      image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.31.jpeg',
      shortDesc: 'Ample visitor & owner parking, 24/7 CCTV surveillance, 100% power backup, and high-speed passenger & service elevators.',
      fullSpecs: [
        'Multi-Level Basement Parking with Automated Boom Barriers',
        '24/7 CCTV Camera Monitoring & Security Command Desk',
        '100% Dual Generator Power Backup System',
        'Separate Service & Goods Escalation Hoists'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Commercial Features' },
    { id: 'clubhouse', label: 'Retail & Shopping' },
    { id: 'aqua', label: 'Cinema & Entertainment' },
    { id: 'green', label: 'Food Court & Dining' },
    { id: 'sports', label: 'Studio Suites & Workspaces' },
    { id: 'security', label: 'Parking & Security' }
  ];

  const filtered = FULL_AMENITIES.filter(a => activeCategory === 'all' || a.category === activeCategory);

  return (
    <section id="amenities" style={{
      width: '100%',
      backgroundColor: '#FAF7F2',
      padding: '100px 4vw',
      color: '#1A1815',
      borderTop: '1px solid rgba(166, 129, 66, 0.2)',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{
            fontSize: '12px',
            color: '#A68142',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontWeight: '800',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Crown size={16} />
            18-LEVEL COMMERCIAL LANDMARK & WORLD-CLASS INFRASTRUCTURE
          </div>
          <h2 style={{
            fontFamily: "'Outfit', 'Cormorant Garamond', sans-serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: '700',
            color: '#1A1815'
          }}>
            Unrivaled High-Street Shopping & Entertainment Destination
          </h2>
          <p style={{ fontSize: '15px', color: '#5E574F', maxWidth: '750px', margin: '12px auto 0', lineHeight: '1.6' }}>
            KB West Walk features 5 levels of AC high-street shopping, gourmet food court dining, multi-screen multiplex cinema, and state-of-the-art studio suites in Ecotech-12, Greater Noida West.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '45px'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                border: activeCategory === cat.id ? '1px solid #A68142' : '1px solid rgba(166,129,66,0.2)',
                backgroundColor: activeCategory === cat.id ? '#A68142' : '#FFFFFF',
                color: activeCategory === cat.id ? '#FFFFFF' : '#A68142',
                transition: 'all 0.25s ease',
                boxShadow: activeCategory === cat.id ? '0 4px 20px rgba(166, 129, 66, 0.3)' : '0 2px 10px rgba(0,0,0,0.04)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Amenities Cards Showcase Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '30px'
        }}>
          {filtered.map(item => {
            const IconC = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedAmenity(item)}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(166, 129, 66, 0.25)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#A68142';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 16px 36px rgba(166, 129, 66, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(166, 129, 66, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)';
                }}
              >
                <div>
                  {/* Photo Banner */}
                  <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.92)',
                      border: '1px solid #A68142',
                      padding: '4px 10px',
                      fontSize: '10px',
                      fontWeight: '800',
                      color: '#A68142',
                      borderRadius: '3px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <IconC size={12} />
                      <span>{item.categoryLabel}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      fontFamily: "'Outfit', 'Cormorant Garamond', serif",
                      fontSize: '22px',
                      fontWeight: '700',
                      color: '#1A1815',
                      marginBottom: '10px'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#5E574F', lineHeight: '1.6', marginBottom: '16px' }}>
                      {item.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div style={{ padding: '0 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#A68142', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    EXPLORE FULL SPECS
                  </span>
                  <ChevronRight size={16} style={{ color: '#A68142' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Detailed Amenity Inspection */}
        {selectedAmenity && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(26, 24, 21, 0.75)',
            backdropFilter: 'blur(16px)',
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
              maxWidth: '850px',
              maxHeight: '90vh',
              overflowY: 'auto',
              color: '#1A1815',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '11px', color: '#A68142', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  FEATURE SPECIFICATION • {selectedAmenity.categoryLabel}
                </div>
                <button
                  onClick={() => setSelectedAmenity(null)}
                  style={{
                    backgroundColor: '#FAF7F2',
                    border: '1px solid #A68142',
                    color: '#A68142',
                    padding: '6px',
                    borderRadius: '50%',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <img
                src={selectedAmenity.image}
                alt={selectedAmenity.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '6px', marginBottom: '20px' }}
              />

              <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '28px', color: '#1A1815', marginBottom: '10px' }}>
                {selectedAmenity.title}
              </h2>

              <p style={{ fontSize: '14px', color: '#5E574F', lineHeight: '1.6', marginBottom: '24px' }}>
                {selectedAmenity.shortDesc}
              </p>

              <div style={{ borderTop: '1px solid rgba(166, 129, 66, 0.2)', paddingTop: '20px', marginBottom: '28px' }}>
                <div style={{ fontSize: '12px', color: '#A68142', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
                  HIGHLIGHT SPECIFICATIONS & INCLUSIONS
                </div>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {selectedAmenity.fullSpecs.map((spec, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#1A1815' }}>
                      <CheckCircle size={15} style={{ color: '#A68142', flexShrink: 0 }} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px' }}>
                <button
                  onClick={() => {
                    setSelectedAmenity(null);
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
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(166, 129, 66, 0.3)'
                  }}
                >
                  BOOK PRIVATE CLUBHOUSE TOUR
                </button>
                <button
                  onClick={() => {
                    setSelectedAmenity(null);
                    onOpenConcierge();
                  }}
                  style={{
                    padding: '14px 24px',
                    backgroundColor: '#FAF7F2',
                    border: '1px solid #A68142',
                    color: '#A68142',
                    fontWeight: '700',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  REQUEST AMENITIES BROCHURE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
