import React, { useState } from 'react';
import { X, Crown, CheckCircle2 } from 'lucide-react';
import { dispatchBuyerLead } from '../data/dispatchUtils';

export default function ConciergeModal({ isOpen, onClose }) {
  const [num1] = useState(() => Math.floor(Math.random() * 6) + 4);
  const [num2] = useState(() => Math.floor(Math.random() * 5) + 1);
  const correctAnswer = num1 + num2;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: 'Immediate Callback (Next 15 Mins)',
    queryType: 'Pricing & Customized Payment Plan',
    captchaAnswer: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Input Validation Rules
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const cleanPhone = formData.phone.replace(/\D/g, '');

    if (trimmedName.length < 3) {
      setErrorMessage('Please enter your complete full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid official email address.');
      return;
    }

    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for callback confirmation.');
      return;
    }

    if (parseInt(formData.captchaAnswer, 10) !== correctAnswer) {
      setErrorMessage(`Incorrect verification code (${num1} + ${num2} = ${correctAnswer}). Please try again.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await dispatchBuyerLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: 'KB West Walk Consultation Form',
        extraData: {
          callback_window: formData.preferredTime,
          consultation_topic: formData.queryType
        }
      });

      if (!result.success) {
        setErrorMessage(result.message || 'Validation failed.');
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
    } catch {
      setErrorMessage('Network issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request Private Commercial Consultation"
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #A68142',
        borderRadius: '6px',
        maxWidth: '520px',
        width: '100%',
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

        {!isSuccess ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A68142', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
              <Crown size={16} />
              KB WEST WALK PRIVATE DESK
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#1A1815', fontWeight: '600', marginBottom: '8px' }}>
              Request Private Commercial Consultation
            </h2>

            <p style={{ fontSize: '13px', color: '#5E574F', marginBottom: '24px' }}>
              Ecotech-12, Greater Noida West • Connect with our Senior Commercial Director for confidential project consultation.
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
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Mehra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    Email *
                  </label>
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
                    Phone *
                  </label>
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
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Consultation Topic
                </label>
                <select
                  value={formData.queryType}
                  onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
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
                  <option value="Pricing & Customized Payment Plan">Pricing & Flexible Payment Schedule</option>
                  <option value="Floor Plan & Inventory Selection">Floor Plan & Unit Inventory Lock</option>
                  <option value="KB West Walk Commercial Management">Commercial Management & Facilities Scope</option>
                  <option value="Site Visit Chauffeur Arrangement">Private Chauffeur Site Tour</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Preferred Callback Window
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
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
                  <option value="Immediate Callback (Next 15 Mins)">Immediate Callback (Next 15 Mins)</option>
                  <option value="Today Evening (5 PM - 8 PM)">Today Evening (5 PM - 8 PM)</option>
                  <option value="Tomorrow Morning (10 AM - 1 PM)">Tomorrow Morning (10 AM - 1 PM)</option>
                </select>
              </div>

              {/* Math CAPTCHA */}
              <div style={{
                backgroundColor: '#FAF7F2',
                border: '1px dashed #A68142',
                padding: '12px',
                borderRadius: '4px'
              }}>
                <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
                  Security Verification: What is {num1} + {num2} ? *
                </label>
                <input
                  type="number"
                  required
                  placeholder="Enter math sum"
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
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Scheduling Desk Call...' : 'Request Private Callback'}
              </button>
            </form>
          </div>
        ) : (
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

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#1A1815', marginBottom: '12px' }}>
              Callback Request Confirmed
            </h2>

            <p style={{ fontSize: '14px', color: '#5E574F', marginBottom: '24px', lineHeight: '1.6' }}>
              Thank you, {formData.name}. Our Senior Portfolio Director will reach out to you at <strong>{formData.phone}</strong> during your requested window.
            </p>

            <button
              onClick={onClose}
              style={{
                padding: '12px 28px',
                backgroundColor: '#A68142',
                color: '#0D0B09',
                border: 'none',
                fontWeight: '700',
                fontSize: '12px',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
