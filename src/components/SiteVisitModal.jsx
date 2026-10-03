import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Phone, Sparkles } from 'lucide-react';
import { dispatchBuyerLead } from '../data/dispatchUtils';

export default function SiteVisitModal({ isOpen, onClose }) {
  const [num1] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [num2] = useState(() => Math.floor(Math.random() * 8) + 1);
  const correctAnswer = num1 + num2;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitDate: '',
    typology: 'Ground Floor Boulevard Retail Shop',
    financialStatus: 'Self-Funded / Immediate Buyer',
    chauffeurPickup: 'Yes, Request Luxury Chauffeur Pickup',
    captchaAnswer: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successPass, setSuccessPass] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Input Validation Rules
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const cleanPhone = formData.phone.replace(/\D/g, '');

    if (trimmedName.length < 3) {
      setErrorMessage('Please enter your complete full name (minimum 3 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid official email address (e.g. name@company.com).');
      return;
    }

    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for VIP authorization SMS/WhatsApp.');
      return;
    }

    if (parseInt(formData.captchaAnswer, 10) !== correctAnswer) {
      setErrorMessage(`Incorrect security code verification (${num1} + ${num2} = ${correctAnswer}). Please try again.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await dispatchBuyerLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: 'VIP Site Visit Booking Form',
        extraData: {
          visit_date: formData.visitDate,
          preferred_typology: formData.typology,
          financial_status: formData.financialStatus,
          chauffeur_pickup: formData.chauffeurPickup
        }
      });

      if (!result.success) {
        setErrorMessage(result.message || 'Please check your contact details and try again.');
        setIsSubmitting(false);
        return;
      }

      setSuccessPass({
        passId: 'FL-VIP-PASS-' + Math.floor(100000 + Math.random() * 900000),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        visitDate: formData.visitDate || 'To Be Confirmed by Executive',
        typology: formData.typology,
        chauffeur: formData.chauffeurPickup
      });
    } catch {
      setErrorMessage('Network timeout. Please retry or contact helpline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="VIP Private Site Visit Booking"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #A68142',
        borderRadius: '6px',
        maxWidth: '560px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        color: '#1A1815',
        padding: '36px 32px',
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

        {!successPass ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A68142', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
              <Sparkles size={16} />
              VIP PRIVATE SITE VISIT
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#1A1815', fontWeight: '600', marginBottom: '8px' }}>
              Book Your Chauffeur-Driven Campus Visit
            </h2>

            <p style={{ fontSize: '13px', color: '#5E574F', marginBottom: '24px' }}>
              Plot C-3, Ecotech-12, Greater Noida West • Tour the 18-level high-street commercial site, model display, and retail arcades.
            </p>

            {errorMessage && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#DC2626',
                padding: '12px 16px',
                borderRadius: '4px',
                fontSize: '13px',
                marginBottom: '20px'
              }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#FAF7F2',
                      color: '#1A1815',
                      border: '1px solid rgba(166, 129, 66, 0.3)',
                      padding: '12px 14px 12px 40px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#A68142' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: '#FAF7F2',
                        color: '#1A1815',
                        border: '1px solid rgba(166, 129, 66, 0.3)',
                        padding: '12px 14px 12px 40px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <Mail size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#A68142' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    WhatsApp Mobile Number *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        backgroundColor: '#FAF7F2',
                        color: '#1A1815',
                        border: '1px solid rgba(166, 129, 66, 0.3)',
                        padding: '12px 14px 12px 40px',
                        borderRadius: '4px',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <Phone size={16} style={{ position: 'absolute', left: '14px', top: '13px', color: '#A68142' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#FAF7F2',
                      color: '#1A1815',
                      border: '1px solid rgba(166, 129, 66, 0.3)',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Typology Interest
                  </label>
                  <select
                    value={formData.typology}
                    onChange={(e) => setFormData({ ...formData, typology: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#FAF7F2',
                      color: '#1A1815',
                      border: '1px solid rgba(166, 129, 66, 0.3)',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Ground Floor Boulevard Retail Shop">Ground Floor Boulevard Retail Shop</option>
                    <option value="Lower Ground Floor Hypermarket / Anchor Outlet">Lower Ground Floor Hypermarket Outlet</option>
                    <option value="First Floor Fashion & Brand Arcade">First Floor Fashion & Brand Arcade</option>
                    <option value="Food Court & Rooftop Dining Space">Food Court & Rooftop Dining Space</option>
                    <option value="Serviced Studio Suite (Floors 6-18)">Serviced Studio Suite (Floors 6-18)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Chauffeur Pickup Service
                  </label>
                  <select
                    value={formData.chauffeurPickup}
                    onChange={(e) => setFormData({ ...formData, chauffeurPickup: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#FAF7F2',
                      color: '#1A1815',
                      border: '1px solid rgba(166, 129, 66, 0.3)',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Yes, Request Luxury Chauffeur Pickup">Yes, Complimentary Pickup</option>
                    <option value="No, I Will Self Drive">No, Self Drive / Own Car</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Financial Readiness
                  </label>
                  <select
                    value={formData.financialStatus}
                    onChange={(e) => setFormData({ ...formData, financialStatus: e.target.value })}
                    style={{
                      width: '100%',
                      backgroundColor: '#FAF7F2',
                      color: '#1A1815',
                      border: '1px solid rgba(166, 129, 66, 0.3)',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Self-Funded / Immediate Buyer">Self-Funded / Ready Capital</option>
                    <option value="Pre-approved Bank Loan">Pre-approved Home Loan</option>
                    <option value="Exploring Options">Planning within 3 Months</option>
                  </select>
                </div>
              </div>

              {/* Math CAPTCHA Security Verification */}
              <div style={{
                backgroundColor: '#FAF7F2',
                border: '1px dashed #A68142',
                padding: '14px',
                borderRadius: '4px',
                marginTop: '4px'
              }}>
                <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
                  Security Verification: What is {num1} + {num2} ? *
                </label>
                <input
                  type="number"
                  required
                  placeholder="Enter math sum answer"
                  value={formData.captchaAnswer}
                  onChange={(e) => setFormData({ ...formData, captchaAnswer: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#FFFFFF',
                    color: '#1A1815',
                    border: '1px solid rgba(166, 129, 66, 0.3)',
                    padding: '10px 12px',
                    borderRadius: '4px',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  marginTop: '10px',
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#A68142',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '1.2px',
                  borderRadius: '3px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 8px 20px rgba(166, 129, 66, 0.3)'
                }}
              >
                {isSubmitting ? 'Issuing VIP Site Pass...' : 'Generate VIP Site Visit Pass'}
              </button>
            </form>
          </div>
        ) : (
          /* VIP PASS CARD OUTPUT */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(166, 129, 66, 0.15)',
              border: '2px solid #A68142',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#A68142'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <div style={{ fontSize: '12px', color: '#A68142', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>
              VIP ACCESS AUTHORIZED
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#1A1815', marginBottom: '16px' }}>
              KB West Walk Site Pass Issued
            </h2>

            {/* Pass Box */}
            <div style={{
              backgroundColor: '#FAF7F2',
              border: '2px solid #A68142',
              borderRadius: '6px',
              padding: '24px',
              textAlign: 'left',
              marginBottom: '24px',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(166, 129, 66, 0.3)', paddingBottom: '12px', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#5E574F', textTransform: 'uppercase' }}>PASS REFERENCE ID</div>
                  <div style={{ fontSize: '16px', color: '#A68142', fontWeight: '700', letterSpacing: '1px' }}>{successPass.passId}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10px', color: '#5E574F', textTransform: 'uppercase' }}>STATUS</div>
                  <div style={{ fontSize: '12px', color: '#2E7D32', fontWeight: '700' }}>✓ DISPATCHED TO EMAIL & WA</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                <div>
                  <span style={{ color: '#5E574F' }}>Guest Name:</span>
                  <div style={{ color: '#1A1815', fontWeight: '600' }}>{successPass.name}</div>
                </div>

                <div>
                  <span style={{ color: '#5E574F' }}>Typology:</span>
                  <div style={{ color: '#1A1815', fontWeight: '600' }}>{successPass.typology}</div>
                </div>

                <div>
                  <span style={{ color: '#5E574F' }}>Visit Date:</span>
                  <div style={{ color: '#1A1815', fontWeight: '600' }}>{successPass.visitDate}</div>
                </div>

                <div>
                  <span style={{ color: '#5E574F' }}>Chauffeur Pickup:</span>
                  <div style={{ color: '#1A1815', fontWeight: '600' }}>{successPass.chauffeur}</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: '#5E574F', marginBottom: '24px' }}>
              A confirmation email and WhatsApp alert have been sent to <strong>{successPass.email}</strong> and <strong>{successPass.phone}</strong>. Our senior relationship desk will contact you within 15 minutes.
            </p>

            <button
              onClick={onClose}
              style={{
                padding: '12px 28px',
                backgroundColor: '#A68142',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: '700',
                fontSize: '12px',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
