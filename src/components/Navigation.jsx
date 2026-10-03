import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, ChevronDown, ChevronRight, PhoneCall, Calendar, Download, Users, Sparkles } from 'lucide-react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';

export default function Navigation({ onOpenSiteVisit, onOpenConcierge, onOpenSearch, onOpenFloorPlan, onOpenBrochure, onOpenLeadsVault }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

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

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActionsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    { name: 'location', label: 'LOCATION', targetId: 'location' },
    { name: 'gallery', label: 'GALLERY', targetId: 'gallery' }
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 99,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
      width: '100%',
      boxSizing: 'border-box',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: scrolled ? '10px 3vw' : '14px 3vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        boxSizing: 'border-box',
        transition: 'padding 0.3s ease'
      }}>
        {/* Left: Main Builder Company Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            textDecoration: 'none',
            backgroundColor: '#FFFFFF',
            padding: '4px 12px',
            borderRadius: '6px',
            border: '1px solid #C5A059',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
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

        {/* Center: Standard Horizontal Navigation Links */}
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

        {/* Right: Single Dropdown Menu accommodating BUYERS VAULT, PRICE LIST, SITE VISIT & ENQUIRE NOW */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div ref={dropdownRef} style={{ position: 'relative' }} className="desktop-actions-dropdown">
            <button
              onClick={() => setActionsDropdownOpen(!actionsDropdownOpen)}
              style={{
                backgroundColor: '#B38B46',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '1.2px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(179, 139, 70, 0.3)',
                transition: 'all 0.25s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#9A7538';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#B38B46';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Sparkles size={14} style={{ color: '#FFFFFF' }} />
              <span>QUICK ACTIONS</span>
              <ChevronDown size={14} style={{
                transform: actionsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease',
                color: '#FFFFFF'
              }} />
            </button>

            {/* Single Dropdown accommodating all 4 buttons from Image #3 */}
            {actionsDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '280px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #C5A059',
                borderRadius: '12px',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
                padding: '14px',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                animation: 'fadeIn 0.2s ease-in-out'
              }}>
                {/* 1. BUYERS VAULT */}
                {onOpenLeadsVault && (
                  <button
                    onClick={() => { setActionsDropdownOpen(false); onOpenLeadsVault(); }}
                    style={{
                      width: '100%',
                      backgroundColor: '#FBF8F3',
                      border: '1.5px solid #C5A059',
                      color: '#B38B46',
                      padding: '11px 18px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: '800',
                      letterSpacing: '1px',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '10px',
                      boxSizing: 'border-box',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#FAF2E6';
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#FBF8F3';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <Users size={16} style={{ color: '#B38B46' }} />
                    <span>BUYERS VAULT</span>
                  </button>
                )}

                {/* 2. PRICE LIST */}
                <button
                  onClick={() => { setActionsDropdownOpen(false); onOpenBrochure(); }}
                  style={{
                    width: '100%',
                    backgroundColor: '#FBF8F3',
                    border: '1.5px solid #C5A059',
                    color: '#B38B46',
                    padding: '11px 18px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '800',
                    letterSpacing: '1px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '10px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#FAF2E6';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#FBF8F3';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <Download size={16} style={{ color: '#B38B46' }} />
                  <span>PRICE LIST</span>
                </button>

                {/* 3. SITE VISIT */}
                <button
                  onClick={() => { setActionsDropdownOpen(false); onOpenSiteVisit(); }}
                  style={{
                    width: '100%',
                    backgroundColor: '#FBF8F3',
                    border: '1.5px solid #C5A059',
                    color: '#B38B46',
                    padding: '11px 18px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '800',
                    letterSpacing: '1px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '10px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#FAF2E6';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#FBF8F3';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <Calendar size={16} style={{ color: '#B38B46' }} />
                  <span>SITE VISIT</span>
                </button>

                {/* 4. ENQUIRE NOW */}
                <button
                  onClick={() => { setActionsDropdownOpen(false); onOpenConcierge(); }}
                  style={{
                    width: '100%',
                    backgroundColor: '#B38B46',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '12px 18px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '800',
                    letterSpacing: '1.2px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: '10px',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 12px rgba(179, 139, 70, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#9A7538';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#B38B46';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <PhoneCall size={16} style={{ color: '#FFFFFF' }} />
                  <span>ENQUIRE NOW</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: '#FBF8F3',
              border: '1.5px solid #C5A059',
              color: '#B38B46',
              padding: '8px',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}
            className="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
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
                color: activeSection === link.name ? '#B38B46' : '#1E293B',
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
              <ChevronRight size={14} style={{ color: '#B38B46' }} />
            </button>
          ))}

          {onOpenLeadsVault && (
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenLeadsVault(); }}
              style={{
                backgroundColor: '#FBF8F3',
                border: '1.5px solid #C5A059',
                color: '#B38B46',
                padding: '12px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '1px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Users size={14} />
              <span>BUYERS VAULT</span>
            </button>
          )}

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenBrochure(); }}
            style={{
              backgroundColor: '#FBF8F3',
              border: '1.5px solid #C5A059',
              color: '#B38B46',
              padding: '12px',
              fontSize: '12px',
              fontWeight: '800',
              letterSpacing: '1px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Download size={14} />
            <span>DOWNLOAD PRICE LIST</span>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSiteVisit(); }}
              style={{
                backgroundColor: 'transparent',
                border: '1.5px solid #C5A059',
                color: '#B38B46',
                padding: '12px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: '8px'
              }}
            >
              SCHEDULE SITE VISIT
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenConcierge(); }}
              style={{
                backgroundColor: '#B38B46',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(179, 139, 70, 0.3)'
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
          .desktop-actions-dropdown {
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
