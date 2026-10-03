import React, { useEffect } from 'react';
import { FAB_LUXE_PROJECT_DETAILS } from '../data/projectsData';

export default function SEOHead({ activeModal = null }) {
  useEffect(() => {
    let title = `${FAB_LUXE_PROJECT_DETAILS.name} | Retail Shops, Food Court & Studio Suites Ecotech-12`;
    let metaDescription = `KB West Walk by Shree Kunj Bihariji Realty - Premier 18-level commercial landmark in Ecotech-12 Greater Noida West. RERA Approved UPRERAPRJ422027/01/2026.`;

    if (activeModal === 'siteVisit') {
      title = `Schedule VIP On-Site Visit | ${FAB_LUXE_PROJECT_DETAILS.name}`;
      metaDescription = `Book a guided walkthrough at Plot C-3, Ecotech-12, Greater Noida West. Explore floor plans, 3D model & location advantage.`;
    } else if (activeModal === 'floorPlan') {
      title = `Architectural Floor Plans & Layouts | ${FAB_LUXE_PROJECT_DETAILS.name}`;
      metaDescription = `Review double-height ground floor retail, Lower Ground hypermarket, fashion arcade, food court & studio suite floor plans.`;
    } else if (activeModal === 'brochure') {
      title = `Official Digital Brochure & Cost Sheet | ${FAB_LUXE_PROJECT_DETAILS.name}`;
      metaDescription = `Download the complete KB West Walk brochure, price list, RERA certificate & payment schedules.`;
    } else if (activeModal === 'concierge') {
      title = `KB Concierge Commercial Advisory | ${FAB_LUXE_PROJECT_DETAILS.name}`;
      metaDescription = `Connect with dedicated KB Commercial Director for shop allotment, rental yield calculations & payment plans.`;
    } else if (activeModal === 'leadsVault') {
      title = `Buyer Leads Vault & CRM Dashboard | ${FAB_LUXE_PROJECT_DETAILS.name}`;
      metaDescription = `Secure lead management system for KB West Walk sales & commercial advisory team.`;
    }

    document.title = title;

    // Update meta description
    const metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
      metaDescTag.setAttribute('content', metaDescription);
    }

    // Update OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metaDescription);

  }, [activeModal]);

  return null;
}
