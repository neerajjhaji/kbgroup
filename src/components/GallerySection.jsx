import React, { useState } from 'react';
import { Eye, Download, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    id: 'g1',
    title: '5-Level AC Shopping High-Street Elevation',
    category: 'Architecture & Elevation',
    image: '/images/kbwestwalks/kb-retail.jpeg',
    desc: 'Grand double-height Glass Frontage High-Street Retail Promenade in Ecotech-12.'
  },
  {
    id: 'g2',
    title: 'Gourmet Food Court & Rooftop Dining',
    category: 'Food Court & Dining',
    image: '/images/kbwestwalks/kb-food.jpeg',
    desc: 'Noida Extension’s premier food court with multi-cuisine dining options.'
  },
  {
    id: 'g3',
    title: 'Luxury Serviced Studio Suites',
    category: 'Studio Suites',
    image: '/images/kbwestwalks/kb-studio.jpeg',
    desc: 'Fully furnished move-in ready executive boutique studio apartments.'
  },
  {
    id: 'g4',
    title: 'Facade Elevation & Architectural Illumination',
    category: 'Architecture & Elevation',
    image: '/images/kbwestwalks/k1.jpg',
    desc: 'Modern high-street architectural lighting and glass facade design.'
  },
  {
    id: 'g5',
    title: 'Shopping Atrium & High Footfall Promenade',
    category: 'High-Street Retail',
    image: '/images/kbwestwalks/k2.jpg',
    desc: 'Central atrium design ensuring max visibility and seamless pedestrian movement.'
  },
  {
    id: 'g6',
    title: 'Food Court & Lounge Seating Ambience',
    category: 'Food Court & Dining',
    image: '/images/kbwestwalks/k3.jpg',
    desc: 'Vibrant indoor dining ambience for families, shoppers and corporate executives.'
  },
  {
    id: 'g7',
    title: 'Executive Studio Suite Interior',
    category: 'Studio Suites',
    image: '/images/kbwestwalks/k4.jpg',
    desc: 'Premium interior finish with designer furniture and smart amenities.'
  },
  {
    id: 'g8',
    title: 'Ample Basement Parking & Infrastructure',
    category: 'Architecture & Elevation',
    image: '/images/kbwestwalks/k5.jpg',
    desc: 'Multi-level dedicated basement parking with smart vehicular guidance.'
  },
  {
    id: 'g9',
    title: 'Night View & Landmark Illumination',
    category: 'Architecture & Elevation',
    image: '/images/kbwestwalks/k6.jpg',
    desc: 'Iconic 18-level commercial tower illumination view along 130m expressway corridor.'
  }
];

const CATEGORIES = [
  'All',
  'Architecture & Elevation',
  'High-Street Retail',
  'Food Court & Dining',
  'Studio Suites'
];

export default function GallerySection({ onOpenSiteVisit, onOpenBrochure, onOpenFloorPlan }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = activeCategory === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const activeLightboxItem = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section id="gallery" style={{
      backgroundColor: '#FFFFFF',
      color: '#0F172A',
      padding: '90px 4vw',
      borderBottom: '1px solid rgba(166, 129, 66, 0.2)'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
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
            PROJECT VISUAL SHOWCASE
          </span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: '800',
            lineHeight: '1.15',
            color: '#0F172A'
          }}>
            Official <span style={{ color: '#A68142', fontStyle: 'italic' }}>Photo & Architecture Gallery</span>
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
            High-Resolution Architectural Visualizations, Retail Atriums, Studio Interiors & Official Layout Flyers
          </p>
          <div style={{
            width: '60px',
            height: '2px',
            backgroundColor: '#C5A059',
            margin: '20px auto 0'
          }} />
        </div>

        {/* Category Filter Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '40px'
        }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  backgroundColor: isActive ? '#B38B46' : '#FBF8F3',
                  color: isActive ? '#FFFFFF' : '#1E293B',
                  border: isActive ? '1px solid #B38B46' : '1px solid #C5A059',
                  padding: '9px 18px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '800',
                  letterSpacing: '0.8px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(179, 139, 70, 0.25)' : 'none'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {filteredImages.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              style={{
                backgroundColor: '#FBF8F3',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '10px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 6px 18px rgba(0,0,0,0.04)',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#B38B46';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(179, 139, 70, 0.18)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.3)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.04)';
              }}
            >
              {/* Image Container */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden', backgroundColor: '#0B0E14' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '800',
                  letterSpacing: '1px',
                  backdropFilter: 'blur(4px)'
                }}>
                  {item.category}
                </span>

                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(15, 23, 42, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                onMouseOut={(e) => e.currentTarget.style.opacity = 0}
                >
                  <span style={{
                    backgroundColor: '#B38B46',
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: '800',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Maximize2 size={13} />
                    <span>ENLARGE VIEW</span>
                  </span>
                </div>
              </div>

              {/* Title & Info */}
              <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '16px',
                    fontWeight: '800',
                    color: '#0F172A',
                    margin: '0 0 6px 0',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#64748B',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {item.desc}
                  </p>
                </div>

                <div style={{
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(197, 160, 89, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#B38B46', letterSpacing: '0.8px' }}>
                    KB WEST WALK OFFICIAL
                  </span>
                  <Eye size={15} style={{ color: '#B38B46' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxItem && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(11, 14, 20, 0.92)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4vw'
          }}>
            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={24} />
            </button>

            <div style={{
              maxWidth: '1000px',
              width: '100%',
              backgroundColor: '#0F172A',
              border: '1.5px solid #C5A059',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)'
            }}>
              <div style={{ maxHeight: '70vh', overflow: 'hidden', backgroundColor: '#0B0E14', display: 'flex', justifyContent: 'center' }}>
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  style={{ maxHeight: '70vh', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ padding: '24px', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#D4AF37', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {activeLightboxItem.category}
                  </span>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '20px', color: '#FFFFFF', margin: '4px 0 0 0', fontWeight: '800' }}>
                    {activeLightboxItem.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: '4px 0 0 0' }}>
                    {activeLightboxItem.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => { setLightboxIndex(null); onOpenBrochure(); }}
                    style={{
                      backgroundColor: '#B38B46',
                      color: '#FFFFFF',
                      padding: '10px 18px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '800',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={14} />
                    <span>REQUEST PRICE LIST PDF</span>
                  </button>
                  <button
                    onClick={() => { setLightboxIndex(null); onOpenSiteVisit(); }}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#D4AF37',
                      border: '1px solid #D4AF37',
                      padding: '10px 18px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}
                  >
                    BOOK SITE VISIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
