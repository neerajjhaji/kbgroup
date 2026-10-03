import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

export default function SearchModal({ isOpen, onClose, onOpenSiteVisit, onOpenFloorPlan, onOpenBrochure }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchableItems = [
    { type: 'Typology', title: 'Double Height AC Retail Shops (120 - 1,200 Sq.Ft.)', desc: 'Starting ₹ 24,900 / Sq.Ft. Onwards', action: onOpenFloorPlan },
    { type: 'Typology', title: 'Food Court & Rooftop Fine Dine', desc: 'Starting ₹ 28,500 / Sq.Ft. Onwards', action: onOpenFloorPlan },
    { type: 'Typology', title: 'Lockable Commercial Studio Suites (480 - 850 Sq.Ft.)', desc: 'Starting ₹ 11,500 / Sq.Ft. Onwards', action: onOpenFloorPlan },
    { type: 'Amenity', title: '5-Screen PVR / INOX Multiplex Cinema', desc: 'Level 4 Entertainment & Gaming Zone', action: onOpenSiteVisit },
    { type: 'Amenity', title: '5-Level Air-Conditioned High-Street Retail', desc: 'Central Glass Atrium with Escalators', action: onOpenSiteVisit },
    { type: 'Location', title: 'Plot No. C-3, Ecotech-12, Greater Noida West', desc: 'Opposite Sector 1 / Near Kisan Chowk', action: onOpenSiteVisit },
    { type: 'Service', title: 'Dedicated Mall Management & Retail Concierge', desc: 'Leasing support & 24/7 security marshals', action: onOpenSiteVisit },
    { type: 'Document', title: 'Official KB West Walk Brochure & Price Sheet', desc: 'Full project masterplan and investment specs', action: onOpenBrochure }
  ];

  const results = searchableItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search KB West Walk"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '60px 20px 20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #A68142',
        borderRadius: '6px',
        maxWidth: '680px',
        width: '100%',
        color: '#1A1815',
        padding: '28px',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(166, 129, 66, 0.25)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#A68142',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        {/* Input */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <input
            type="text"
            autoFocus
            placeholder="Search Retail Shops, Food Court, Multiplex, Location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#FAF7F2',
              color: '#1A1815',
              border: '1px solid #A68142',
              padding: '16px 20px 16px 48px',
              borderRadius: '4px',
              fontSize: '16px',
              outline: 'none',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
          <Search size={20} style={{ position: 'absolute', left: '16px', top: '16px', color: '#A68142' }} />
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', display: 'grid', gap: '10px' }}>
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => { onClose(); if (item.action) item.action(); }}
                style={{
                  backgroundColor: '#FAF7F2',
                  border: '1px solid rgba(166, 129, 66, 0.2)',
                  borderRadius: '4px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#A68142'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(166, 129, 66, 0.2)'}
              >
                <div>
                  <span style={{ fontSize: '10px', color: '#A68142', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {item.type}
                  </span>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#1A1815' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#5E574F', marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </div>

                <ArrowRight size={18} style={{ color: '#A68142' }} />
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#5E574F' }}>
              No exact matches found for "{query}". Try searching for <strong>Retail Shops</strong>, <strong>Food Court</strong>, or <strong>Location</strong>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
