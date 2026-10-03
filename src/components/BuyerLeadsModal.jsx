import React, { useState, useEffect } from 'react';
import { X, Download, Search, Users, ShieldAlert, Award, FileSpreadsheet, Trash2, RefreshCw, CheckCircle2, Building, PhoneCall, Mail } from 'lucide-react';
import { getStoredLeads, exportLeadsToCSV } from '../data/dispatchUtils';

export default function BuyerLeadsModal({ isOpen, onClose }) {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('ALL');
  const [copiedMsg, setCopiedMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      refreshLeads();
    }
  }, [isOpen]);

  const refreshLeads = () => {
    const data = getStoredLeads();
    setLeads(data);
  };

  const handleClearVault = () => {
    if (window.confirm('Are you sure you want to clear the stored leads vault on this browser?')) {
      localStorage.removeItem('kb_west_walk_leads_vault');
      refreshLeads();
    }
  };

  const handleExportCSV = () => {
    const success = exportLeadsToCSV();
    if (!success) {
      alert('No leads available to export.');
    }
  };

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedMsg(`Copied ${phone}`);
    setTimeout(() => setCopiedMsg(''), 2000);
  };

  if (!isOpen) return null;

  // Filter leads by query and tier
  const filteredLeads = leads.filter(l => {
    const query = searchQuery.toLowerCase().trim();
    const nameMatch = (l.name || '').toLowerCase().includes(query);
    const phoneMatch = (l.phone || '').includes(query);
    const emailMatch = (l.email || '').toLowerCase().includes(query);
    const sourceMatch = (l.source || '').toLowerCase().includes(query);

    const matchesSearch = !query || nameMatch || phoneMatch || emailMatch || sourceMatch;

    if (selectedTier === 'ALL') return matchesSearch;
    if (selectedTier === 'VIP') return matchesSearch && (l._buyer_tier || '').includes('VIP');
    if (selectedTier === 'HIGH') return matchesSearch && (l._buyer_tier || '').includes('High Intent');
    if (selectedTier === 'STANDARD') return matchesSearch && (l._buyer_tier || '').includes('Standard');

    return matchesSearch;
  });

  const vipCount = leads.filter(l => (l._buyer_tier || '').includes('VIP')).length;
  const highIntentCount = leads.filter(l => (l._buyer_tier || '').includes('High Intent')).length;
  const avgScore = leads.length
    ? Math.round(leads.reduce((acc, curr) => acc + (curr._buyer_score || 100), 0) / leads.length)
    : 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Buyer Leads Vault & CRM"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(11, 14, 20, 0.88)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{
        backgroundColor: '#0F141D',
        border: '1px solid #D4AF37',
        borderRadius: '12px',
        maxWidth: '1200px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
        color: '#FFFFFF',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 30px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(11, 14, 20, 0.95)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4AF37', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>
              <Award size={16} />
              <span>KB WEST WALK • COMMERCIAL CRM</span>
            </div>
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '26px', fontWeight: '800', color: '#FFFFFF', margin: '4px 0 0' }}>
              Successful Buyer & Investor Leads ({leads.length})
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleExportCSV}
              style={{
                backgroundColor: '#D4AF37',
                color: '#0B0E14',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
              }}
            >
              <FileSpreadsheet size={16} />
              <span>EXPORT CSV</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close Buyer Vault Modal"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#FFFFFF',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Metrics Summary Strip */}
        <div style={{
          padding: '16px 30px',
          backgroundColor: 'rgba(11, 14, 20, 0.6)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ backgroundColor: 'rgba(15, 20, 29, 0.9)', padding: '12px 18px', borderRadius: '6px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>TOTAL CAPTURED LEADS</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#FFFFFF', fontFamily: "'Outfit', sans-serif" }}>{leads.length}</div>
          </div>

          <div style={{ backgroundColor: 'rgba(15, 20, 29, 0.9)', padding: '12px 18px', borderRadius: '6px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div style={{ fontSize: '11px', color: '#D4AF37', fontWeight: '600' }}>VIP COMMERCIAL INVESTORS</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#D4AF37', fontFamily: "'Outfit', sans-serif" }}>{vipCount}</div>
          </div>

          <div style={{ backgroundColor: 'rgba(15, 20, 29, 0.9)', padding: '12px 18px', borderRadius: '6px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div style={{ fontSize: '11px', color: '#38BDF8', fontWeight: '600' }}>HIGH INTENT BUYERS</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#38BDF8', fontFamily: "'Outfit', sans-serif" }}>{highIntentCount}</div>
          </div>

          <div style={{ backgroundColor: 'rgba(15, 20, 29, 0.9)', padding: '12px 18px', borderRadius: '6px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
            <div style={{ fontSize: '11px', color: '#4ADE80', fontWeight: '600' }}>AVG BUYER QUALITY SCORE</div>
            <div style={{ fontSize: '22px', fontWeight: '800', color: '#4ADE80', fontFamily: "'Outfit', sans-serif" }}>{avgScore}/100</div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div style={{
          padding: '16px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          backgroundColor: 'rgba(15, 20, 29, 0.95)'
        }}>
          {/* Search Box */}
          <div style={{
            position: 'relative',
            flexGrow: 1,
            maxWidth: '450px'
          }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search by buyer name, phone, email, or source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'rgba(11, 14, 20, 0.8)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '6px',
                padding: '10px 14px 10px 40px',
                color: '#FFFFFF',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          {/* Tier Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['ALL', 'VIP', 'HIGH', 'STANDARD'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                style={{
                  backgroundColor: selectedTier === tier ? '#D4AF37' : 'rgba(11, 14, 20, 0.8)',
                  color: selectedTier === tier ? '#0B0E14' : '#94A3B8',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '8px 14px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: selectedTier === tier ? '800' : '600',
                  cursor: 'pointer'
                }}
              >
                {tier}
              </button>
            ))}

            <button
              onClick={refreshLeads}
              title="Refresh Vault"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#E2E8F0',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {copiedMsg && (
          <div style={{ backgroundColor: '#22C55E', color: '#000', padding: '6px 20px', fontSize: '12px', fontWeight: '700', textAlign: 'center' }}>
            {copiedMsg}
          </div>
        )}

        {/* Leads Table Container */}
        <div style={{ padding: '20px 30px', overflowY: 'auto', flexGrow: 1 }}>
          {filteredLeads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
              <Users size={48} style={{ color: '#D4AF37', marginBottom: '16px', opacity: 0.5 }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 8px' }}>
                No Buyer Leads Found
              </h3>
              <p style={{ fontSize: '13px', margin: 0 }}>
                {searchQuery || selectedTier !== 'ALL'
                  ? 'Try clearing search filters.'
                  : 'Submit a test site visit or brochure download request to see leads populate here.'}
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(212, 175, 55, 0.3)', color: '#D4AF37', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <th style={{ padding: '12px' }}>Buyer Name & Ref</th>
                  <th style={{ padding: '12px' }}>Contact Info</th>
                  <th style={{ padding: '12px' }}>Source / Touchpoint</th>
                  <th style={{ padding: '12px' }}>Buyer Tier</th>
                  <th style={{ padding: '12px' }}>Score</th>
                  <th style={{ padding: '12px' }}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead, idx) => {
                  const isVip = (lead._buyer_tier || '').includes('VIP');
                  const isHigh = (lead._buyer_tier || '').includes('High Intent');

                  return (
                    <tr
                      key={lead.reference_id || idx}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        backgroundColor: idx % 2 === 0 ? 'rgba(15, 20, 29, 0.4)' : 'transparent'
                      }}
                    >
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: '700', color: '#FFFFFF', fontSize: '14px' }}>
                          {lead.name}
                        </div>
                        <div style={{ fontSize: '10px', color: '#D4AF37', fontFamily: 'monospace', marginTop: '2px' }}>
                          {lead.reference_id || 'KBWW-VIP'}
                        </div>
                      </td>

                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E2E8F0', fontWeight: '600' }}>
                          <PhoneCall size={12} style={{ color: '#D4AF37' }} />
                          <button
                            onClick={() => handleCopyPhone(lead.phone)}
                            style={{ background: 'none', border: 'none', color: '#E2E8F0', cursor: 'pointer', padding: 0, fontSize: '13px', textDecoration: 'underline' }}
                          >
                            {lead.phone}
                          </button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '12px', marginTop: '3px' }}>
                          <Mail size={12} />
                          <span>{lead.email}</span>
                        </div>
                      </td>

                      <td style={{ padding: '14px 12px' }}>
                        <span style={{
                          backgroundColor: 'rgba(212, 175, 55, 0.1)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          color: '#E2E8F0',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}>
                          {lead.source || 'KB West Walk Portal'}
                        </span>
                      </td>

                      <td style={{ padding: '14px 12px' }}>
                        <span style={{
                          backgroundColor: isVip ? 'rgba(212, 175, 55, 0.2)' : isHigh ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          border: `1px solid ${isVip ? '#D4AF37' : isHigh ? '#38BDF8' : 'rgba(255, 255, 255, 0.2)'}`,
                          color: isVip ? '#D4AF37' : isHigh ? '#38BDF8' : '#E2E8F0',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: '800',
                          textTransform: 'uppercase'
                        }}>
                          {lead._buyer_tier || 'Standard Commercial Enquiry'}
                        </span>
                      </td>

                      <td style={{ padding: '14px 12px', fontWeight: '800', color: (lead._buyer_score || 100) >= 90 ? '#4ADE80' : '#D4AF37' }}>
                        {lead._buyer_score || 100} / 100
                      </td>

                      <td style={{ padding: '14px 12px', color: '#94A3B8', fontSize: '11px' }}>
                        {lead.created_at ? new Date(lead.created_at).toLocaleString('en-IN') : 'Recent'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer actions */}
        <div style={{
          padding: '16px 30px',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(11, 14, 20, 0.95)'
        }}>
          <button
            onClick={handleClearVault}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #EF4444',
              color: '#EF4444',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Trash2 size={13} />
            <span>CLEAR VAULT DATA</span>
          </button>

          <div style={{ color: '#94A3B8', fontSize: '12px' }}>
            Leads automatically sync with Web3Forms & FormSubmit multi-CRM endpoints.
          </div>
        </div>
      </div>
    </div>
  );
}
