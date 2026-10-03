// Helper utility for buyer scoring, multi-CRM dispatch, and lead management
import { FAB_LUXE_PROJECT_DETAILS } from './projectsData';

const LEAD_VAULT_STORAGE_KEY = 'kb_west_walk_leads_vault';

export function getStoredLeads() {
  try {
    const raw = localStorage.getItem(LEAD_VAULT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLeadToVault(leadData) {
  try {
    const existing = getStoredLeads();
    const updated = [leadData, ...existing];
    localStorage.setItem(LEAD_VAULT_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function exportLeadsToCSV() {
  const leads = getStoredLeads();
  if (!leads.length) return false;

  const headers = ['Ref ID', 'Date', 'Name', 'Email', 'Phone', 'Source', 'Tier', 'Score', 'Extra Data'];
  const rows = leads.map(l => [
    l.reference_id || '',
    l.created_at || new Date().toISOString(),
    `"${(l.name || '').replace(/"/g, '""')}"`,
    l.email || '',
    l.phone || '',
    `"${(l.source || '').replace(/"/g, '""')}"`,
    l._buyer_tier || '',
    l._buyer_score || '',
    `"${JSON.stringify(l.extraData || {}).replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `kb_west_walk_leads_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
}

export function calculateBuyerScore(email = '', phone = '', extraData = {}) {
  let score = 100;
  const lowerEmail = email.trim().toLowerCase();
  const cleanPhone = phone.replace(/\D/g, '');

  const tempEmailDomains = [
    'tempmail', 'mailinator', '10minutemail', 'fake', 'test',
    'qwerty', 'example', 'trashmail', 'dispostable', 'yopmail',
    'guerrillamail', 'getnada', 'throwaway'
  ];

  const isTempEmail = tempEmailDomains.some(d => lowerEmail.includes(d));
  if (isTempEmail) {
    score -= 50;
  }

  const dummyPhones = [
    '1234567890', '0000000000', '9999999999', '8888888888',
    '7777777777', '1111111111', '123456789', '9876543210'
  ];

  if (cleanPhone.length < 10 || dummyPhones.includes(cleanPhone)) {
    score -= 50;
  }

  if (extraData.chauffeur_pickup && extraData.chauffeur_pickup.includes('Yes')) score += 10;
  if (extraData.financial_status && (extraData.financial_status.includes('Ready') || extraData.financial_status?.includes('Immediate'))) score += 15;
  if (extraData.preferred_typology) score += 5;

  let tier = 'Standard Commercial Inquiry';
  if (score >= 90) {
    tier = 'VIP Commercial Investor';
  } else if (score >= 70) {
    tier = 'High Intent Prospective Investor';
  } else if (score < 50) {
    tier = 'Low Intent / Flagged Entry';
  }

  return {
    score,
    tier,
    isValid: score >= 50
  };
}

export async function dispatchBuyerLead({ name, email, phone, source = 'KB West Walk Portal', extraData = {} }) {
  const scoreResult = calculateBuyerScore(email, phone, extraData);

  if (!scoreResult.isValid) {
    return {
      success: false,
      scoreResult,
      message: 'Please provide a valid email address and 10-digit mobile number for price list and brochure access.'
    };
  }

  const refId = 'KBWW-' + Math.floor(100000 + Math.random() * 900000);
  const createdAt = new Date().toISOString();

  const payload = {
    access_key: '3fa7c7bb-4e96-4a41-86d7-21a4f00db12d',
    subject: `[KB West Walk Lead] ${FAB_LUXE_PROJECT_DETAILS.name} - ${name}`,
    from_name: 'KB West Walk Commercial Team',
    name,
    email,
    phone,
    source,
    reference_id: refId,
    created_at: createdAt,
    project_name: FAB_LUXE_PROJECT_DETAILS.name,
    project_location: FAB_LUXE_PROJECT_DETAILS.location,
    brochure_url: FAB_LUXE_PROJECT_DETAILS.brochureUrl,
    price_list_url: FAB_LUXE_PROJECT_DETAILS.priceListUrl,
    helpline: FAB_LUXE_PROJECT_DETAILS.helpline,
    _buyer_score: scoreResult.score,
    _buyer_tier: scoreResult.tier,
    extraData
  };

  saveLeadToVault(payload);

  const dispatchPromises = [];

  dispatchPromises.push(
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(err => console.warn('Web3Forms dispatch warn:', err))
  );

  dispatchPromises.push(
    fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        subject: `KB West Walk Price List & Brochure Access [Ref: ${refId}]`,
        message: `Dear ${name},\n\nThank you for expressing interest in KB West Walk, Ecotech-12, Greater Noida West.\n\nDigital Brochure: ${FAB_LUXE_PROJECT_DETAILS.brochureUrl}\nPrice List & Cost Sheet: ${FAB_LUXE_PROJECT_DETAILS.priceListUrl}\nDirect Helpline: ${FAB_LUXE_PROJECT_DETAILS.helpline}\nRERA No.: ${FAB_LUXE_PROJECT_DETAILS.reraNo}\n\nOur Commercial Advisory team will connect with you shortly.\n\nBest Regards,\nShree Kunj Bihariji Realty Pvt. Ltd. | KB West Walk`
      })
    }).catch(err => console.warn('FormSubmit dispatch warn:', err))
  );

  await Promise.allSettled(dispatchPromises);

  return {
    success: true,
    refId,
    scoreResult,
    sentToEmail: email,
    sentToPhone: phone
  };
}
