/**
 * Real Estate Platform Market Data & Benchmarks
 * Aggregated market insights from 99acres, Housing.com, and Magicbricks
 * for KB West Walk, Ecotech-12, Greater Noida West commercial corridor.
 */

export const PLATFORM_MARKET_BENCHMARKS = {
  ecotech12: {
    name: 'Ecotech-12, Greater Noida West',
    avgPricePerSqFt: '₹ 24,900 – ₹ 37,900 / Sq.Ft.',
    yoyAppreciation: '+21.2% YoY Commercial Growth',
    demandScore: '9.6 / 10 (High Search Volume on 99acres & Housing.com)',
    rentalYield: '7.5% – 9.2% P.A. Assured Returns',
    safetyRating: '4.9 / 5.0 (Housing.com Commercial Hub Index)',
    connectivityRating: '4.8 / 5.0 (Proposed Metro Station 100M)',
    keyDrivers: [
      'Proposed Ecotech-12 Metro Station (100M Walking Distance)',
      'Char Murti / Gaur Chowk / Ek Murti Hub (5 mins away)',
      'Delhi-Meerut Expressway NH-9 & NH-24 (10 mins away)',
      'Jewar International Airport Corridor',
      'Surrounded by 1,00,000+ High-Density Residential Apartments'
    ]
  },
  noidaExtensionCommercial: {
    name: 'Greater Noida West Commercial Corridor',
    avgPricePerSqFt: '₹ 26,000 – ₹ 42,000 / Sq.Ft.',
    yoyAppreciation: '+15.1% YoY Growth',
    entryPrice: '₹ 35 Lakhs – ₹ 2.5 Cr+',
    rentalYield: '6.5% – 7.8% P.A.'
  },
  centralNoidaCommercial: {
    name: 'Central Noida Commercial (Sector 18 / 62)',
    avgPricePerSqFt: '₹ 45,000 – ₹ 75,000 / Sq.Ft.',
    yoyAppreciation: '+8.5% YoY Growth',
    entryPrice: '₹ 1.2 Cr – ₹ 10.0 Cr'
  },
  platforms: {
    ninetyNineAcres: {
      platform: '99acres',
      localityRating: '4.8 / 5.0',
      priceTrendSummary: 'Ecotech-12 Greater Noida West is ranked among top 3 highest appreciating commercial retail & multiplex corridors in Delhi NCR.',
      topSearchKeywords: ['KB West Walk Price List', 'Commercial Shops Ecotech 12', 'Food Court Shops Greater Noida West', 'KB West Walk Greater Noida West']
    },
    housingCom: {
      platform: 'Housing.com',
      localityScore: '92 / 100 (Top Tier Commercial Destination)',
      livabilityIndex: 'Premier 18-level high-street retail, food court, multiplex cinema, and studio suites with 5 levels of AC shopping.',
      priceComparison: 'KB West Walk offers exceptional BSP starting at ₹ 24,900/sq.ft. with prime frontage and 18-level mixed-use footprint.'
    },
    magicBricks: {
      platform: 'Magicbricks',
      investorIndex: 'High Investment Grade (A+ Commercial Rating)',
      projected3YrAppreciation: '38% – 48% cumulative return projected upon metro line expansion and Jewar Airport operational launch.'
    }
  }
};
