import React, { useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';

export default function InvestmentROICalculator({ onOpenConcierge }) {
  const [initialInvest, setInitialInvest] = useState(2500000); // ₹ 25 Lakhs
  const [appreciationRate, setAppreciationRate] = useState(15); // 15% p.a.
  const [rentalYield, setRentalYield] = useState(8.0); // 8.0% p.a. commercial yield
  const [holdingYears, setHoldingYears] = useState(5); // 5 Years

  // Compound Interest Calculation
  const futureValue = initialInvest * Math.pow(1 + appreciationRate / 100, holdingYears);
  const totalRentalIncome = initialInvest * (rentalYield / 100) * holdingYears;
  const totalReturn = futureValue + totalRentalIncome;
  const netProfit = totalReturn - initialInvest;

  return (
    <section style={{
      width: '100%',
      backgroundColor: '#FAF8F5',
      padding: '90px 4vw',
      color: '#1A1815',
      borderTop: '1px solid rgba(166, 129, 66, 0.25)',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
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
            <TrendingUp size={16} />
            INVESTMENT & CAPITAL APPRECIATION ESTIMATOR
          </div>
          <h2 style={{
            fontFamily: "'Outfit', 'Cormorant Garamond', sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#1A1815'
          }}>
            Forecast Your 5-Year Capital Growth & Rental Yield
          </h2>
          <p style={{ fontSize: '15px', color: '#5E574F', maxWidth: '750px', margin: '12px auto 0', lineHeight: '1.6' }}>
            KB West Walk at Plot C-3, Ecotech-12, Greater Noida West is projected for accelerated commercial growth fueled by Jewar Airport, Metro expansion, & 1,00,000+ surrounding residential footfall.
          </p>
        </div>

        {/* Dynamic Calculator Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #A68142',
          borderRadius: '8px',
          padding: '36px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'center' }}>
            {/* Sliders Column */}
            <div style={{ display: 'grid', gap: '22px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1A1815', marginBottom: '8px' }}>
                  <span>Initial Property Investment:</span>
                  <strong style={{ color: '#A68142' }}>₹ {initialInvest >= 10000000 ? `${(initialInvest / 10000000).toFixed(2)} Cr` : `${(initialInvest / 100000).toFixed(2)} Lakhs`}</strong>
                </div>
                <input
                  type="range"
                  min="1500000"
                  max="30000000"
                  step="500000"
                  value={initialInvest}
                  onChange={(e) => setInitialInvest(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#A68142', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1A1815', marginBottom: '8px' }}>
                  <span>Projected Annual Appreciation (%):</span>
                  <strong style={{ color: '#A68142' }}>{appreciationRate}% P.A.</strong>
                </div>
                <input
                  type="range"
                  min="8"
                  max="20"
                  step="0.5"
                  value={appreciationRate}
                  onChange={(e) => setAppreciationRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#A68142', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#5E574F', marginBottom: '6px' }}>Rental Yield (% P.A.):</div>
                  <input
                    type="number"
                    step="0.1"
                    value={rentalYield}
                    onChange={(e) => setRentalYield(Number(e.target.value))}
                    style={{ width: '100%', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', padding: '10px', borderRadius: '4px', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: '#5E574F', marginBottom: '6px' }}>Holding Horizon:</div>
                  <select
                    value={holdingYears}
                    onChange={(e) => setHoldingYears(Number(e.target.value))}
                    style={{ width: '100%', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', padding: '10px', borderRadius: '4px', fontSize: '13px' }}
                  >
                    <option value={3}>3 Years</option>
                    <option value={5}>5 Years</option>
                    <option value={7}>7 Years</option>
                    <option value={10}>10 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Display Box */}
            <div style={{
              backgroundColor: '#FAF7F2',
              border: '1px solid #A68142',
              borderRadius: '6px',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: '#5E574F', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
                PROJECTED PORTFOLIO VALUE ({holdingYears} YEARS)
              </div>

              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '38px', fontWeight: '800', color: '#A68142', marginBottom: '8px' }}>
                ₹ {totalReturn >= 10000000 ? `${(totalReturn / 10000000).toFixed(2)} Cr` : `${(totalReturn / 100000).toFixed(2)} Lakhs`}
              </div>

              <div style={{ fontSize: '13px', color: '#2E7D32', fontWeight: '700', marginBottom: '18px' }}>
                + ₹ {netProfit >= 10000000 ? `${(netProfit / 10000000).toFixed(2)} Cr` : `${(netProfit / 100000).toFixed(2)} Lakhs`} Estimated Total Profit ({((netProfit / initialInvest) * 100).toFixed(1)}% ROI)
              </div>

              <div style={{ fontSize: '12px', color: '#5E574F', marginBottom: '22px', borderTop: '1px solid rgba(166,129,66,0.15)', paddingTop: '12px' }}>
                Valuation Growth: ₹ {futureValue >= 10000000 ? `${(futureValue / 10000000).toFixed(2)} Cr` : `${(futureValue / 100000).toFixed(2)} Lakhs`} • Cumulative Rent: ₹ {totalRentalIncome >= 10000000 ? `${(totalRentalIncome / 10000000).toFixed(2)} Cr` : `${(totalRentalIncome / 100000).toFixed(2)} Lakhs`}
              </div>

              <button
                onClick={onOpenConcierge}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#A68142',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(166, 129, 66, 0.3)'
                }}
              >
                <span>REQUEST WEALTH & ROI CONSULTATION</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
