import React, { useState } from 'react';
import { RETAIL_PRICE_SHEET, PAYMENT_PLANS, FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';
import { Download, CheckCircle2, ShieldCheck, FileText, CreditCard, Sparkles, Building, ChevronRight } from 'lucide-react';

export default function PriceListSection({ onOpenConcierge, onOpenSiteVisit }) {
  const [activePlan, setActivePlan] = useState(PAYMENT_PLANS[0].id);

  const selectedPlanObj = PAYMENT_PLANS.find(p => p.id === activePlan) || PAYMENT_PLANS[0];

  return (
    <section id="pricing" style={{
      backgroundColor: '#FAF7F2',
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
            OFFICIAL COST SHEET & PAYMENT SCHEDULE
          </span>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: '800',
            lineHeight: '1.15',
            color: '#0F172A'
          }}>
            Price List & <span style={{ color: '#A68142', fontStyle: 'italic' }}>Flexible Payment Plans</span>
          </h2>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '15px',
            color: '#94A3B8',
            marginTop: '12px',
            maxWidth: '750px',
            margin: '12px auto 0'
          }}>
            w.e.f. 12th July 2026* • Transparent RERA Structured Pricing for Retail & Studio Investments
          </p>
          <div style={{
            width: '60px',
            height: '2px',
            backgroundColor: '#D4AF37',
            margin: '20px auto 0'
          }} />
        </div>

        {/* BSP Price Sheet Table */}
        <div style={{
          backgroundColor: 'rgba(15, 20, 29, 0.95)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '8px',
          padding: '30px',
          marginBottom: '50px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.5)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
            paddingBottom: '16px'
          }}>
            <div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                Cost of Retail Units (BSP Schedule)
              </h3>
              <span style={{ color: '#94A3B8', fontSize: '13px' }}>Base Selling Price per Sq. Ft.</span>
            </div>

            <a
              href={FAB_LUXE_PROJECT_DETAILS.priceListUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #AA820A 100%)',
                color: '#0B0E14',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)'
              }}
            >
              <Download size={14} />
              <span>DOWNLOAD OFFICIAL PRICE PDF</span>
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {RETAIL_PRICE_SHEET.map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: 'rgba(11, 14, 20, 0.8)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '6px',
                padding: '22px',
                position: 'relative'
              }}>
                <span style={{
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid #D4AF37',
                  color: '#D4AF37',
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '10px'
                }}>
                  {item.tag}
                </span>

                <h4 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 6px', fontFamily: "'Outfit', sans-serif" }}>
                  {item.floor}
                </h4>

                <div style={{ fontSize: '26px', fontWeight: '800', color: '#D4AF37', margin: '8px 0', fontFamily: "'Outfit', sans-serif" }}>
                  {item.bsp}
                </div>

                <p style={{ color: '#E2E8F0', fontSize: '13px', margin: '0 0 6px', lineHeight: '1.5' }}>
                  {item.features}
                </p>

                <div style={{ color: '#94A3B8', fontSize: '12px', fontStyle: 'italic' }}>
                  Ideal for: {item.popularFor}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Payment Plan Selector */}
        <div style={{
          backgroundColor: 'rgba(15, 20, 29, 0.95)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '8px',
          padding: '30px',
          marginBottom: '50px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '24px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 8px' }}>
              Select Payment Plan Structure
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
              Tailored investment milestones designed for maximum capital safety & yield.
            </p>
          </div>

          {/* Plan Selector Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '32px'
          }}>
            {PAYMENT_PLANS.map((plan) => {
              const isSelected = plan.id === activePlan;
              return (
                <button
                  key={plan.id}
                  onClick={() => setActivePlan(plan.id)}
                  style={{
                    backgroundColor: isSelected ? '#D4AF37' : 'rgba(11, 14, 20, 0.8)',
                    color: isSelected ? '#0B0E14' : '#E2E8F0',
                    border: isSelected ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '12px 20px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: isSelected ? '800' : '600',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isSelected ? '0 4px 18px rgba(212, 175, 55, 0.35)' : 'none'
                  }}
                >
                  {plan.title.split('.')[1] || plan.title}
                </button>
              );
            })}
          </div>

          {/* Active Plan Breakdown Card */}
          <div style={{
            backgroundColor: 'rgba(11, 14, 20, 0.9)',
            border: '1px solid #D4AF37',
            borderRadius: '8px',
            padding: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              <div>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '22px', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                  {selectedPlanObj.title}
                </h4>
                <p style={{ color: '#94A3B8', fontSize: '13px', margin: '4px 0 0' }}>
                  {selectedPlanObj.note}
                </p>
              </div>
              <span style={{
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid #D4AF37',
                color: '#D4AF37',
                fontSize: '11px',
                fontWeight: '800',
                padding: '6px 14px',
                borderRadius: '20px',
                textTransform: 'uppercase'
              }}>
                {selectedPlanObj.badge}
              </span>
            </div>

            {/* Milestones Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: '20px'
            }}>
              {selectedPlanObj.breakdown.map((m, i) => (
                <div key={i} style={{
                  backgroundColor: 'rgba(15, 20, 29, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '6px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ fontSize: '13px', color: '#E2E8F0', fontWeight: '600' }}>
                    {m.milestone}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#D4AF37', fontFamily: "'Outfit', sans-serif" }}>
                    {m.percent}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                onClick={onOpenConcierge}
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #AA820A 100%)',
                  color: '#0B0E14',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '800',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                REQUEST CUSTOM CALCULATION
              </button>
            </div>
          </div>
        </div>

        {/* Official RERA Collection Account Banner */}
        <div style={{
          backgroundColor: 'rgba(11, 14, 20, 0.95)',
          border: '1px dashed rgba(212, 175, 55, 0.4)',
          borderRadius: '8px',
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4AF37', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px' }}>
              <ShieldCheck size={16} />
              <span>OFFICIAL RERA COLLECTION ACCOUNT</span>
            </div>
            <h4 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 6px', fontFamily: "'Outfit', sans-serif" }}>
              {FAB_LUXE_PROJECT_DETAILS.bankAccount.name}
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
              Bank: <strong>{FAB_LUXE_PROJECT_DETAILS.bankAccount.bank}</strong> | A/c No: <strong>{FAB_LUXE_PROJECT_DETAILS.bankAccount.accountNo}</strong> | IFSC Code: <strong>{FAB_LUXE_PROJECT_DETAILS.bankAccount.ifsc}</strong> | Branch: <strong>{FAB_LUXE_PROJECT_DETAILS.bankAccount.branch}</strong>
            </p>
          </div>

          <button
            onClick={onOpenSiteVisit}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #D4AF37',
              color: '#D4AF37',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            VERIFY RERA DETAILS
          </button>
        </div>

      </div>
    </section>
  );
}
