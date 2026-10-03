import React, { useState } from 'react';
import { Download, Eye, Calendar, Sparkles, Volume2, VolumeX, Building2, ShoppingBag, Utensils, Film } from 'lucide-react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';

export default function Hero({ onOpenSiteVisit, onOpenBrochure, onOpenFloorPlan }) {
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  return (
    <section style={{
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FAF7F2',
      overflow: 'hidden',
      color: '#0F172A',
      padding: '90px 4vw 50px',
      boxSizing: 'border-box'
    }}>
      {/* Background Video or Fallback Image */}
      {!videoError ? (
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onError={() => setVideoError(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.9,
            zIndex: 1,
            filter: 'contrast(1.08) brightness(0.95)'
          }}
        >
          <source src={FAB_LUXE_PROJECT_DETAILS.videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: "linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.7) 100%), url('/kbww/WhatsApp_Image_2026-10-01_at_21.33.26.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.95,
          zIndex: 1
        }} />
      )}

      {/* Cinematic Gradient Overlay for video visibility & high contrast text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.65) 0%, rgba(15, 23, 42, 0.35) 45%, rgba(15, 23, 42, 0.85) 100%)',
        zIndex: 2
      }} />

      {/* Video Audio Control */}
      {!videoError && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          style={{
            position: 'absolute',
            top: '24px',
            right: '4vw',
            zIndex: 10,
            backgroundColor: 'rgba(15, 20, 29, 0.75)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            color: '#D4AF37',
            padding: '8px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backdropFilter: 'blur(8px)'
          }}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{isMuted ? 'UNMUTE VIDEO' : 'MUTED'}</span>
        </button>
      )}

      {/* Hero Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        maxWidth: '1150px',
        margin: '0 auto'
      }}>
        {/* Property Project Logo Badge */}
        <div style={{ marginBottom: '22px', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '8px 20px',
            borderRadius: '8px',
            border: '1px solid #C5A059',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            display: 'inline-flex',
            alignItems: 'center'
          }}>
            <img
              src="/kbww_logo.png"
              alt="KB West Walk Commercial High Street Project Logo"
              style={{
                height: '46px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Top Developer Badge */}
        <div
          className="animate-fade-in"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid #C5A059',
            backdropFilter: 'blur(12px)',
            padding: '8px 24px',
            borderRadius: '30px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
          }}
        >
          <Sparkles size={14} style={{ color: '#E5C158' }} />
          <span style={{
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '2.5px',
            color: '#E5C158',
            textTransform: 'uppercase'
          }}>
            SHREE KUNJ BIHARIJI REALTY PVT. LTD. • RERA APPROVED
          </span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: 'clamp(42px, 6.5vw, 82px)',
          fontWeight: '900',
          lineHeight: '1.08',
          letterSpacing: '-0.5px',
          color: '#FFFFFF',
          marginBottom: '18px',
          fontFamily: "'Outfit', sans-serif",
          textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.9)'
        }}>
          KB WEST <span style={{ color: '#E5C158' }}>WALK</span>
        </h1>

        {/* Tagline & Key Pitch */}
        <p style={{
          fontSize: 'clamp(16px, 2.2vw, 22px)',
          color: '#F8FAFC',
          maxWidth: '920px',
          margin: '0 auto 12px',
          lineHeight: '1.5',
          fontWeight: '600',
          textShadow: '0 2px 10px rgba(0,0,0,0.8)'
        }}>
          Every Step A Story • <span style={{ color: '#E5C158', fontWeight: '800' }}>5 Levels of AC Ventilated Shopping High-Street</span>
        </p>

        <p style={{
          fontSize: 'clamp(14px, 1.6vw, 17px)',
          color: '#E2E8F0',
          maxWidth: '860px',
          margin: '0 auto 34px',
          lineHeight: '1.6',
          textShadow: '0 2px 8px rgba(0,0,0,0.8)'
        }}>
          Food Court • Retail Arcades • Multiplex Cinema • State-of-the-Art Studio Suites
          <br />
          <strong style={{ color: '#FFFFFF', fontWeight: '800' }}>
            Plot C-3, Ecotech-12, Greater Noida West | RERA Reg No: UPRERAPRJ422027/01/2026
          </strong>
        </p>

        {/* Hero CTAs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '46px'
        }}>
          <button
            onClick={onOpenSiteVisit}
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B88E12 100%)',
              color: '#0B0E14',
              border: 'none',
              padding: '16px 36px',
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '4px',
              boxShadow: '0 8px 30px rgba(212, 175, 55, 0.45)',
              transition: 'all 0.25s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(212, 175, 55, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.45)';
            }}
          >
            <Calendar size={16} />
            <span>BOOK VIP SITE VISIT</span>
          </button>

          <button
            onClick={onOpenBrochure}
            style={{
              backgroundColor: 'rgba(15, 20, 29, 0.85)',
              border: '1px solid #D4AF37',
              color: '#D4AF37',
              padding: '16px 30px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '4px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.25s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 20, 29, 0.85)'}
          >
            <Download size={16} />
            <span>DOWNLOAD COST SHEET (PDF)</span>
          </button>

          <button
            onClick={onOpenFloorPlan}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#E2E8F0',
              padding: '16px 26px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '4px',
              transition: 'all 0.25s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#D4AF37'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
          >
            <Eye size={16} style={{ color: '#D4AF37' }} />
            <span>VIEW FLOOR PLANS</span>
          </button>
        </div>
      </div>

      {/* Bottom Feature Metric Grid */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        maxWidth: '1400px',
        width: '100%',
        backgroundColor: 'rgba(15, 20, 29, 0.92)',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        borderRadius: '8px',
        backdropFilter: 'blur(16px)',
        padding: '20px 30px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        boxSizing: 'border-box',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)'
      }}>
        <div style={{ borderRight: '1px solid rgba(212, 175, 55, 0.15)', paddingRight: '15px' }}>
          <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShoppingBag size={14} />
            RETAIL BSP (1ST FLOOR)
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '800', marginTop: '4px', fontFamily: "'Outfit', sans-serif" }}>
            ₹ 24,900 / Sq. Ft.*
          </div>
        </div>

        <div style={{ borderRight: '1px solid rgba(212, 175, 55, 0.15)', paddingRight: '15px' }}>
          <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShoppingBag size={14} />
            GROUND FLOOR BSP
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '800', marginTop: '4px', fontFamily: "'Outfit', sans-serif" }}>
            ₹ 37,900 / Sq. Ft.*
          </div>
        </div>

        <div style={{ borderRight: '1px solid rgba(212, 175, 55, 0.15)', paddingRight: '15px' }}>
          <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Utensils size={14} />
            AMENITIES
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>
            Food Court, Cinema & Rooftop
          </div>
        </div>

        <div>
          <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building2 size={14} />
            STUDIO SUITES
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '700', marginTop: '4px' }}>
            6th to 18th Floor Offices & Studios
          </div>
        </div>
      </div>
    </section>
  );
}
