import React, { useState, useEffect } from 'react';
import LiveBuyerTicker from './components/LiveBuyerTicker';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LegacyMetrics from './components/LegacyMetrics';
import Developments from './components/Developments';
import PriceListSection from './components/PriceListSection';
import AmenitiesSection from './components/AmenitiesSection';
import GallerySection from './components/GallerySection';
import Philosophy from './components/Philosophy';
import SaintAmandSection from './components/SaintAmandSection';
import PressAccolades from './components/PressAccolades';
import BuyerJourneySteps from './components/BuyerJourneySteps';
import PropertyFinder from './components/PropertyFinder';
import ConnectivityMapSection from './components/ConnectivityMapSection';
import InvestmentROICalculator from './components/InvestmentROICalculator';
import Footer from './components/Footer';

// Modals
import SiteVisitModal from './components/SiteVisitModal';
import FloorPlanModal from './components/FloorPlanModal';
import BrochureModal from './components/BrochureModal';
import ConciergeModal from './components/ConciergeModal';
import SearchModal from './components/SearchModal';
import DetailDrawer from './components/DetailDrawer';
import SiteMapModal from './components/SiteMapModal';
import VirtualTourModal from './components/VirtualTourModal';
import BuyerLeadsModal from './components/BuyerLeadsModal';

// SEO & AI Bot
import SEOHead from './components/SEOHead';
import AIBotWidget from './components/AIBotWidget';

export default function App() {
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [floorPlanOpen, setFloorPlanOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [siteMapOpen, setSiteMapOpen] = useState(false);
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [leadsVaultOpen, setLeadsVaultOpen] = useState(false);

  // Global Keyboard Shortcuts (Escape to close modals, Ctrl+Shift+L for Buyer Vault)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        setLeadsVaultOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSiteVisitOpen(false);
        setFloorPlanOpen(false);
        setBrochureOpen(false);
        setConciergeOpen(false);
        setSearchOpen(false);
        setDetailDrawerOpen(false);
        setSiteMapOpen(false);
        setVirtualTourOpen(false);
        setLeadsVaultOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute active modal for dynamic SEO
  const activeModal = siteVisitOpen ? 'siteVisit'
    : floorPlanOpen ? 'floorPlan'
    : brochureOpen ? 'brochure'
    : conciergeOpen ? 'concierge'
    : leadsVaultOpen ? 'leadsVault'
    : null;

  return (
    <div style={{ backgroundColor: '#FAF8F5', color: '#1A1815', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Dynamic SEO Meta Head Manager */}
      <SEOHead activeModal={activeModal} />

      {/* Accessibility Skip to Main Content Link */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-60px',
          left: '20px',
          backgroundColor: '#D4AF37',
          color: '#0B0E14',
          padding: '12px 20px',
          fontWeight: '800',
          fontSize: '12px',
          zIndex: 9999,
          borderRadius: '4px',
          textDecoration: 'none',
          transition: 'top 0.2s'
        }}
        onFocus={(e) => e.currentTarget.style.top = '10px'}
        onBlur={(e) => e.currentTarget.style.top = '-60px'}
      >
        Skip to Main Content
      </a>

      {/* Live Real-Time Buyer Signal Bar */}
      <LiveBuyerTicker
        onOpenSiteVisit={() => setSiteVisitOpen(true)}
        onOpenConcierge={() => setConciergeOpen(true)}
      />

      {/* Main Navigation */}
      <Navigation
        onOpenSiteVisit={() => setSiteVisitOpen(true)}
        onOpenConcierge={() => setConciergeOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenFloorPlan={() => setFloorPlanOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
        onOpenSiteMap={() => setSiteMapOpen(true)}
        onOpenLeadsVault={() => setLeadsVaultOpen(true)}
      />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onOpenSiteVisit={() => setSiteVisitOpen(true)}
          onOpenBrochure={() => setBrochureOpen(true)}
          onOpenFloorPlan={() => setFloorPlanOpen(true)}
        />

        {/* Legacy & Counter Metrics */}
        <LegacyMetrics />

        {/* Flagship Developments Showcase */}
        <Developments
          onOpenSiteVisit={() => setSiteVisitOpen(true)}
          onOpenBrochure={() => setBrochureOpen(true)}
          onOpenFloorPlan={() => setFloorPlanOpen(true)}
        />

        {/* Official BSP Price List & Payment Schedule Section */}
        <PriceListSection
          onOpenConcierge={() => setConciergeOpen(true)}
          onOpenSiteVisit={() => setSiteVisitOpen(true)}
          onOpenBrochure={() => setBrochureOpen(true)}
        />

        {/* 5-Level AC Retail & World-Class Amenities Section */}
        <AmenitiesSection
          onOpenSiteVisit={() => setSiteVisitOpen(true)}
          onOpenConcierge={() => setConciergeOpen(true)}
        />

        {/* Official Photo & Architecture Gallery Section */}
        <GallerySection
          onOpenSiteVisit={() => setSiteVisitOpen(true)}
          onOpenBrochure={() => setBrochureOpen(true)}
          onOpenFloorPlan={() => setFloorPlanOpen(true)}
        />

        {/* Brand Philosophy */}
        <Philosophy />

        {/* Interactive Property Finder & Loan Estimator */}
        <PropertyFinder
          onOpenSiteVisit={() => setSiteVisitOpen(true)}
          onOpenFloorPlan={() => setFloorPlanOpen(true)}
        />

        {/* Location & Interactive Connectivity Map Section */}
        <ConnectivityMapSection
          onOpenSiteVisit={() => setSiteVisitOpen(true)}
          onOpenConcierge={() => setConciergeOpen(true)}
        />

        {/* Capital Growth & ROI Investment Estimator */}
        <InvestmentROICalculator onOpenConcierge={() => setConciergeOpen(true)} />

        {/* Dedicated Commercial Mall Management Section */}
        <SaintAmandSection onOpenConcierge={() => setConciergeOpen(true)} />

        {/* Press & Accolades */}
        <PressAccolades />

        {/* 4-Step Buyer Journey */}
        <BuyerJourneySteps
          onOpenSiteVisit={() => setSiteVisitOpen(true)}
          onOpenConcierge={() => setConciergeOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenSiteVisit={() => setSiteVisitOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
        onOpenFloorPlan={() => setFloorPlanOpen(true)}
        onOpenConcierge={() => setConciergeOpen(true)}
        onOpenSiteMap={() => setSiteMapOpen(true)}
        onOpenLeadsVault={() => setLeadsVaultOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <button
          onClick={() => setVirtualTourOpen(true)}
          aria-label="Open 360 VR Tour Modal"
          style={{
            backgroundColor: '#A68142',
            color: '#FFFFFF',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '30px',
            fontSize: '11px',
            fontWeight: '800',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(166, 129, 66, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>🕶️ 360° VR Tour</span>
        </button>

        <button
          onClick={() => setDetailDrawerOpen(true)}
          aria-label="Open Technical Specs Drawer"
          style={{
            backgroundColor: '#FAF7F2',
            border: '1px solid #A68142',
            color: '#1A1815',
            padding: '10px 18px',
            borderRadius: '30px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(26, 24, 21, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>📐 Technical Specs</span>
        </button>
      </div>

      {/* MODALS */}
      <SiteVisitModal isOpen={siteVisitOpen} onClose={() => setSiteVisitOpen(false)} />
      <FloorPlanModal
        isOpen={floorPlanOpen}
        onClose={() => setFloorPlanOpen(false)}
        onOpenSiteVisit={() => setSiteVisitOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
      />
      <BrochureModal isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />
      <ConciergeModal isOpen={conciergeOpen} onClose={() => setConciergeOpen(false)} />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenSiteVisit={() => setSiteVisitOpen(true)}
        onOpenFloorPlan={() => setFloorPlanOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
      />
      <DetailDrawer
        isOpen={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        onOpenSiteVisit={() => setSiteVisitOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
      />
      <SiteMapModal
        isOpen={siteMapOpen}
        onClose={() => setSiteMapOpen(false)}
        onOpenSiteVisit={() => setSiteVisitOpen(true)}
        onOpenBrochure={() => setBrochureOpen(true)}
      />
      <VirtualTourModal
        isOpen={virtualTourOpen}
        onClose={() => setVirtualTourOpen(false)}
        onOpenSiteVisit={() => setSiteVisitOpen(true)}
      />
      <BuyerLeadsModal
        isOpen={leadsVaultOpen}
        onClose={() => setLeadsVaultOpen(false)}
      />

      {/* FLOATING CONVERSATIONAL AI BOT */}
      <AIBotWidget
        onOpenSiteVisit={() => setSiteVisitOpen(true)}
        onOpenFloorPlan={() => setFloorPlanOpen(true)}
      />
    </div>
  );
}
