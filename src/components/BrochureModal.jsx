import React, { useState } from 'react';
import { X, Download, Mail, Phone, User, CheckCircle2, FileText, ExternalLink } from 'lucide-react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';
import { dispatchBuyerLead } from '../data/dispatchUtils';

export default function BrochureModal({ isOpen, onClose }) {
  const [num1] = useState(() => Math.floor(Math.random() * 7) + 3);
  const [num2] = useState(() => Math.floor(Math.random() * 6) + 2);
  const correctAnswer = num1 + num2;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    captchaAnswer: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');

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
      setErrorMessage('Please enter a valid 10-digit mobile number for PDF brochure delivery.');
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
        source: 'Brochure Email Gate Modal'
      });

      if (!result.success) {
        setErrorMessage(result.message || 'Please provide valid official contact details.');
        setIsSubmitting(false);
        return;
      }

      setRefId(result.refId);
      setIsSuccess(true);
    } catch {
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Official Digital Brochure Modal"
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
              <Download size={16} />
              OFFICIAL BROCHURE & PRICE LIST
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#1A1815', fontWeight: '600', marginBottom: '8px' }}>
              Request Official Price List & Brochure
            </h2>

            <p style={{ fontSize: '13px', color: '#5E574F', marginBottom: '24px' }}>
              Ecotech-12, Greater Noida West • Enter your details below to instantly unlock & download the official Price List PDF & E-Brochure.
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
                    placeholder="e.g. Ananya Roy"
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

              <div>
                <label style={{ fontSize: '12px', color: '#A68142', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Official Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
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
                  WhatsApp Number *
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

              {/* Math CAPTCHA */}
              <div style={{
                backgroundColor: '#FAF7F2',
                border: '1px dashed #A68142',
                padding: '14px',
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
                {isSubmitting ? 'Dispatching Brochure...' : 'Dispatch PDF Brochure'}
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS STATE */
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
              DISPATCH COMPLETE
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: '#1A1815', marginBottom: '16px' }}>
              Brochure Dispatched
            </h2>

            <p style={{ fontSize: '14px', color: '#5E574F', marginBottom: '24px', lineHeight: '1.6' }}>
              The official project brochure and pricing sheet have been dispatched to:
              <br />
              <strong>{formData.email}</strong> & <strong>{formData.phone}</strong>
              <br />
              <span style={{ fontSize: '12px', color: '#A68142' }}>[Reference ID: {refId}]</span>
            </p>

            <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <a
                href={FAB_LUXE_PROJECT_DETAILS.priceListUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '14px',
                  backgroundColor: '#A68142',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FileText size={16} />
                <span>Open Official Price List PDF</span>
                <ExternalLink size={14} />
              </a>

              <a
                href={FAB_LUXE_PROJECT_DETAILS.brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '14px',
                  backgroundColor: '#FAF7F2',
                  border: '1px solid #A68142',
                  color: '#1A1815',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Download size={16} />
                <span>Open Digital E-Brochure PDF</span>
                <ExternalLink size={14} />
              </a>

              <button
                onClick={onClose}
                style={{
                  padding: '12px',
                  background: 'transparent',
                  border: '1px solid rgba(166, 129, 66, 0.4)',
                  color: '#A68142',
                  fontWeight: '600',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
