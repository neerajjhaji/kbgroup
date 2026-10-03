import React, { useState } from 'react';
import { TYPOLOGIES } from '../data/projectsData';
import { Calculator } from 'lucide-react';

export default function PropertyFinder({ onOpenSiteVisit, onOpenFloorPlan }) {
  const [selectedTypology, setSelectedTypology] = useState('all');
  const [selectedView, setSelectedView] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  // Dynamic Interactive EMI Calculator State
  const [propertyVal, setPropertyVal] = useState(29600000); // 2.96 Cr
  const [downPayPercent, setDownPayPercent] = useState(20); // 20%
  const [loanTenureYears, setLoanTenureYears] = useState(20); // 20 Years
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%

  const loanAmount = propertyVal * ((100 - downPayPercent) / 100);
  const downPaymentVal = propertyVal * (downPayPercent / 100);

  const calculateEMI = () => {
    const r = interestRate / (12 * 100);
    const n = loanTenureYears * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const monthlyEMI = calculateEMI();

  const filteredItems = TYPOLOGIES.filter(item => {
    if (selectedTypology !== 'all' && item.id !== selectedTypology) return false;
    return true;
  });

  return (
    <section style={{
      width: '100%',
      backgroundColor: '#FAF7F2',
      padding: '90px 4vw',
      color: '#1A1815',
      borderTop: '1px solid rgba(166, 129, 66, 0.2)',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontSize: '12px',
            color: '#A68142',
            textTransform: 'uppercase',
            letterSpacing: '2.5px',
            fontWeight: '700',
            marginBottom: '10px'
          }}>
            INTERACTIVE COMMERCIAL FINDER & FINANCIAL ESTIMATOR
          </div>
          <h2 style={{
            fontFamily: "'Outfit', 'Cormorant Garamond', sans-serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#1A1815'
          }}>
            Discover Retail Shops & Customize Payment Schedule
          </h2>
          <p style={{ fontSize: '15px', color: '#5E574F', maxWidth: '650px', margin: '8px auto 0' }}>
            Filter KB West Walk commercial spaces by typology and test instant real-time bank subvention & loan payment estimates.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #A68142',
          borderRadius: '6px',
          padding: '24px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
        }}>
          {/* Typology Dropdown */}
          <div>
            <label style={{ fontSize: '11px', color: '#A68142', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
              Select Typology
            </label>
            <select
              value={selectedTypology}
              onChange={(e) => setSelectedTypology(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#FAF7F2',
                color: '#1A1815',
                border: '1px solid rgba(166, 129, 66, 0.3)',
                padding: '12px 14px',
                borderRadius: '4px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            >
              <option value="all">All Commercial Spaces</option>
              <option value="retail">AC Retail Shops (120 - 1,200 Sq.Ft.)</option>
              <option value="foodcourt">Food Court & Rooftop Fine Dine</option>
              <option value="studios">Lockable Studio Suites (480 - 850 Sq.Ft.)</option>
            </select>
          </div>

          {/* View Dropdown */}
          <div>
            <label style={{ fontSize: '11px', color: '#A68142', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
              Preferred Orientation / View
            </label>
            <select
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#FAF7F2',
                color: '#1A1815',
                border: '1px solid rgba(166, 129, 66, 0.3)',
                padding: '12px 14px',
                borderRadius: '4px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            >
              <option value="all">All Views & Orientation</option>
              <option value="atrium">Ecotech-12 Boulevard & Atrium Facing</option>
              <option value="promenade">Plaza & Pedestrian Promenade Facing</option>
              <option value="skyline">270° Panoramic City Skyline View</option>
            </select>
          </div>

          {/* Budget Filter */}
          <div>
            <label style={{ fontSize: '11px', color: '#A68142', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
              Price Range
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#FAF7F2',
                color: '#1A1815',
                border: '1px solid rgba(166, 129, 66, 0.3)',
                padding: '12px 14px',
                borderRadius: '4px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            >
              <option value="all">All Price Brackets</option>
              <option value="sub50">₹ 20 Lakhs - ₹ 50 Lakhs (Entry Retail / Studio)</option>
              <option value="sub150">₹ 50 Lakhs - ₹ 1.50 Cr (Prime High-Street)</option>
              <option value="above150">₹ 1.50 Cr+ (Anchor Retail / Cinema Zone)</option>
            </select>
          </div>

          {/* Reset Action */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
            <button
              onClick={() => { setSelectedTypology('all'); setSelectedView('all'); setSelectedBudget('all'); }}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#A68142',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                fontWeight: '700',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Showcase Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          {filteredItems.map(item => (
            <div key={item.id} style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(166,129,66,0.3)',
              borderRadius: '6px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: '#A68142', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                  {item.superArea} • Ecotech-12
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', color: '#1A1815', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '22px', color: '#A68142', fontWeight: '700', fontFamily: "'Cormorant Garamond', serif", marginBottom: '14px' }}>
                  {item.price}
                </div>
                <p style={{ fontSize: '13px', color: '#5E574F', lineHeight: '1.5', marginBottom: '16px' }}>
                  {item.description}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={onOpenSiteVisit}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#A68142',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(166, 129, 66, 0.25)'
                  }}
                >
                  Book Private Visit
                </button>
                <button
                  onClick={onOpenFloorPlan}
                  style={{
                    padding: '12px 18px',
                    backgroundColor: '#FAF7F2',
                    border: '1px solid #A68142',
                    color: '#A68142',
                    fontWeight: '600',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    borderRadius: '2px',
                    cursor: 'pointer'
                  }}
                >
                  Floor Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DYNAMIC REAL-TIME EMI CALCULATOR CARD */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #A68142',
          borderRadius: '8px',
          padding: '36px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#A68142', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
            <Calculator size={18} />
            DYNAMIC PAYMENT & EMI SLIDER CALCULATOR
          </div>

          <h3 style={{ fontFamily: "'Outfit', 'Cormorant Garamond', sans-serif", fontSize: '28px', color: '#1A1815', fontWeight: '700', marginBottom: '24px' }}>
            Test Instant Loan EMI & Custom Down Payment
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
            {/* Sliders Column */}
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1A1815', marginBottom: '8px' }}>
                  <span>Property Price Value:</span>
                  <strong style={{ color: '#A68142' }}>₹ {(propertyVal / 10000000).toFixed(2)} Cr</strong>
                </div>
                <input
                  type="range"
                  min="29600000"
                  max="60000000"
                  step="1000000"
                  value={propertyVal}
                  onChange={(e) => setPropertyVal(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#A68142', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1A1815', marginBottom: '8px' }}>
                  <span>Down Payment ({downPayPercent}%):</span>
                  <strong style={{ color: '#A68142' }}>₹ {(downPaymentVal / 100000).toFixed(2)} Lakhs</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPayPercent}
                  onChange={(e) => setDownPayPercent(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#A68142', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#5E574F', marginBottom: '6px' }}>Loan Tenure:</div>
                  <select
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    style={{ width: '100%', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', padding: '10px', borderRadius: '4px', fontSize: '13px' }}
                  >
                    <option value={10}>10 Years</option>
                    <option value={15}>15 Years</option>
                    <option value={20}>20 Years</option>
                    <option value={25}>25 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: '#5E574F', marginBottom: '6px' }}>Interest Rate (%):</div>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    style={{ width: '100%', backgroundColor: '#FAF7F2', border: '1px solid rgba(166,129,66,0.3)', color: '#1A1815', padding: '10px', borderRadius: '4px', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            {/* Calculated Monthly EMI Result Box */}
            <div style={{
              backgroundColor: '#FAF7F2',
              border: '1px solid #A68142',
              borderRadius: '6px',
              padding: '28px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: '#5E574F', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
                ESTIMATED MONTHLY INSTALLMENT
              </div>

              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '36px', fontWeight: '800', color: '#A68142', marginBottom: '8px' }}>
                ₹ {monthlyEMI.toLocaleString('en-IN')} <span style={{ fontSize: '14px', color: '#1A1815' }}>/ Month</span>
              </div>

              <div style={{ fontSize: '12px', color: '#5E574F', marginBottom: '20px' }}>
                Loan Amount: ₹ {(loanAmount / 10000000).toFixed(2)} Cr • Down Payment: ₹ {(downPaymentVal / 100000).toFixed(2)} L
              </div>

              <button
                onClick={onOpenSiteVisit}
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
                  boxShadow: '0 4px 12px rgba(166, 129, 66, 0.3)'
                }}
              >
                Apply for Bank Subvention Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
