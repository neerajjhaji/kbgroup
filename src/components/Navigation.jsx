import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronRight, PhoneCall, Calendar, Download, Users } from 'lucide-react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';

export default function Navigation({ onOpenSiteVisit, onOpenConcierge, onOpenSearch, onOpenFloorPlan, onOpenLeadsVault }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = [
        { id: 'philosophy', name: 'overview' },
        { id: 'developments', name: 'retail' },
        { id: 'pricing', name: 'pricing' },
        { id: 'amenities', name: 'amenities' },
        { id: 'location', name: 'location' }
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 200) {
            setActiveSection(sec.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id, sectionName) => {
    setMobileMenuOpen(false);
    if (sectionName) setActiveSection(sectionName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'overview', label: 'OVERVIEW', targetId: 'philosophy' },
    { name: 'retail', label: 'RETAIL & STUDIOS', targetId: 'developments' },
    { name: 'pricing', label: 'PRICE LIST', targetId: 'pricing' },
    { name: 'amenities', label: 'AMENITIES', targetId: 'amenities' },
    { name: 'location', label: 'LOCATION', targetId: 'location' }
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 99,
      backgroundColor: 'rgba(255, 255, 255, 0.96)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: scrolled ? '10px 4vw' : '14px 4vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        transition: 'padding 0.3s ease'
      }}>
        {/* Top Header: Main Builder Company Logo Only */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            textDecoration: 'none',
            backgroundColor: '#FFFFFF',
            padding: '6px 14px',
            borderRadius: '6px',
            border: '1px solid #C5A059',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Shree Kunj Bihariji Group - Main Builder Company"
        >
          <img
            src="/shree_kb_logo.png"
            alt="Shree Kunj Bihariji Group Logo"
            style={{
              height: '38px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </a>

        {/* Dynamic Desktop Link Items */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '1.8px',
          textTransform: 'uppercase'
        }} className="desktop-nav-links">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name;
            return (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.targetId, link.name)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#A68142' : '#1E293B',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '8px 0',
                  fontWeight: isActive ? '800' : '700',
                  transition: 'color 0.25s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#A68142'}
                onMouseOut={(e) => e.currentTarget.style.color = isActive ? '#A68142' : '#1E293B'}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#A68142',
                    borderRadius: '2px'
                  }} />
                )}
              </button>
            );
          })}

          <button
            onClick={onOpenFloorPlan}
            style={{
              background: 'none',
              border: 'none',
              color: '#1E293B',
              cursor: 'pointer',
              padding: '8px 0',
              fontWeight: '700',
              transition: 'color 0.25s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#A68142'}
            onMouseOut={(e) => e.currentTarget.style.color = '#1E293B'}
          >
            LAYOUT PLANS
          </button>
        </div>

        {/* Right CTA Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Buyer Leads Vault Button */}
          {onOpenLeadsVault && (
            <button
              onClick={onOpenLeadsVault}
              title="Open Buyer Leads Vault (Ctrl+Shift+L)"
              aria-label="Open Buyer Leads Vault"
              style={{
                backgroundColor: 'rgba(166, 129, 66, 0.1)',
                border: '1px solid rgba(166, 129, 66, 0.4)',
                color: '#A68142',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.25s ease'
              }}
              className="desktop-visit-btn"
            >
              <Users size={13} />
              <span>BUYERS VAULT</span>
            </button>
          )}

          {/* Price List PDF Button */}
          <a
            href={FAB_LUXE_PROJECT_DETAILS.priceListUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'rgba(166, 129, 66, 0.12)',
              border: '1px solid rgba(166, 129, 66, 0.5)',
              color: '#A68142',
              padding: '8px 14px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              transition: 'all 0.25s ease'
            }}
            className="desktop-visit-btn"
          >
            <Download size={13} />
            <span>PRICE LIST</span>
          </a>

          {/* Book Site Visit Button */}
          <button
            onClick={onOpenSiteVisit}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #A68142',
              color: '#A68142',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#A68142';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#A68142';
            }}
            className="desktop-visit-btn"
          >
            <Calendar size={13} />
            <span>SITE VISIT</span>
          </button>

          {/* Enquire Now Button */}
          <button
            onClick={onOpenConcierge}
            style={{
              backgroundColor: '#A68142',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              padding: '9px 20px',
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 12px rgba(166, 129, 66, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(166, 129, 66, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(166, 129, 66, 0.25)';
            }}
          >
            <PhoneCall size={13} />
            <span>ENQUIRE NOW</span>
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: '1px solid #A68142',
              color: '#A68142',
              padding: '6px',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px'
            }}
            className="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
        }}>
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.targetId, link.name)}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === link.name ? '#A68142' : '#1E293B',
                fontSize: '13px',
                fontWeight: '700',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: '1px solid #F1F5F9',
                letterSpacing: '1px'
              }}
            >
              <span>{link.label}</span>
              <ChevronRight size={14} style={{ color: '#A68142' }} />
            </button>
          ))}

          <a
            href={FAB_LUXE_PROJECT_DETAILS.priceListUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#A68142',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #F1F5F9',
              letterSpacing: '1px'
            }}
          >
            <span>DOWNLOAD PRICE LIST (PDF)</span>
            <Download size={14} />
          </a>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSiteVisit(); }}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #D4AF37',
                color: '#D4AF37',
                padding: '12px',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: '4px'
              }}
            >
              SCHEDULE SITE VISIT
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConcierge(); }}
              style={{
                backgroundColor: '#D4AF37',
                color: '#0B0E14',
                border: 'none',
                padding: '12px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)'
              }}
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav-links {
            display: none !important;
          }
          .desktop-visit-btn {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
