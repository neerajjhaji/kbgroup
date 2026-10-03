export const KB_WEST_WALK_PROJECT_DETAILS = {
  name: 'KB West Walk',
  location: 'Plot No. C-3, Ecotech-12, Greater Noida West',
  developer: 'Shree Kunj Bihariji Realty Pvt. Ltd.',
  brandGroup: 'Shree KB Group',
  reraNo: 'UPRERAPRJ422027/01/2026',
  promoterId: 'UPRERAPRM414706',
  launchDate: '07-01-2026',
  helpline: '+91 828 7777 333',
  whatsappNumber: '918287777333',
  brochureUrl: '/kbww/KB_West_Walk_Digital_Brochure.pdf',
  priceListUrl: '/kbww/KB_West_Walk_Price_List_FINAL_12_july.pdf',
  videoUrl: '/kbww/VIDEO-2026-09-16-11-25-00.mp4',
  logoUrl: '/kbww_logo.png',
  groupLogoUrl: '/shree_kb_logo.png',
  typology: 'High-Street Retail, Food Court, Cinema & Studio Suites',
  priceStarting: '₹ 24,900 / Sq. Ft.*',
  totalLevels: '18 Levels Mixed-Use Development',
  retailLevels: '5 Levels AC Ventilated Shopping High-Street',
  bankAccount: {
    name: 'Shree Kunj Bihariji Realty Pvt. Ltd. Collection Account for KB West Walk',
    bank: 'Axis Bank Ltd.',
    accountNo: '925020035796321',
    ifsc: 'UTIB0005181',
    branch: 'Alpha II, Greater Noida'
  },
  siteOffice: 'Plot No. C-3, Ecotech-12, Greater Noida West - 201318',
  corpOffice: 'FF-39, First Floor, KB Complex, Plot No. LS-1, Alpha-2, Greater Noida, U.P. 201310'
};

export const FAB_LUXE_PROJECT_DETAILS = KB_WEST_WALK_PROJECT_DETAILS;

export const CONNECTIVITY_POINTS = [
  { name: 'Proposed Ecotech-12 Metro Station', time: 'Walking Distance', distance: '100 Meters', icon: 'Subway' },
  { name: 'Char Murti / Gaur Chowk / Ek Murti', time: '5 mins', distance: '2.5 Km', icon: 'Car' },
  { name: 'Crossings Republik Residential Hub', time: '5 mins', distance: '3.0 Km', icon: 'Building2' },
  { name: 'Noida-Greater Noida Expressway & NH-24', time: '10 mins', distance: '6.0 Km', icon: 'Car' },
  { name: 'Fortis & Max Super Speciality Hospital', time: '10 mins', distance: '7.5 Km', icon: 'Activity' },
  { name: 'Noida Sector-52 Metro Station', time: '15 mins', distance: '10.0 Km', icon: 'Train' },
  { name: 'Hindon Airport (Ghaziabad)', time: '25 mins', distance: '25.0 Km', icon: 'Plane' },
  { name: 'Jewar International Airport (Noida Int.)', time: '45 mins', distance: '48.0 Km', icon: 'Plane' }
];

export const KEY_METRICS = [
  { label: 'Ventilated High-Street', value: '5 Levels', sub: 'Air-Conditioned Zones' },
  { label: 'Prime High-Street Retail', value: 'LGF, GF & 1st', sub: 'Starting ₹24,900 / sq.ft.' },
  { label: 'Multiplex & Food Court', value: '3rd, 4th & 5th', sub: 'Cinema & Rooftop Dining' },
  { label: 'State-of-the-Art Studios', value: '6th - 18th Floor', sub: 'Serviced Luxury Suites' }
];

export const RETAIL_PRICE_SHEET = [
  {
    floor: 'Lower Ground Floor (LGF)',
    bsp: '₹ 25,900 / Sq. Ft.',
    features: 'High Footfall Hypermarket & Daily Convenience Anchor Stores',
    popularFor: 'Supermarket, Pharmacy, Electronics, Utility Stores',
    tag: 'High ROI Retail'
  },
  {
    floor: 'Ground Floor (GF)',
    bsp: '₹ 37,900 / Sq. Ft.',
    features: 'Frontage Boulevard Flagship High-Street Retail Shops',
    popularFor: 'International Fashion, Luxury Jewelry, Flagship Cafes',
    tag: 'Premium Flagship'
  },
  {
    floor: 'First Floor (1st Floor)',
    bsp: '₹ 24,900 / Sq. Ft.',
    features: 'Lifestyle, Fashion Apparel & Consumer Experience Arcades',
    popularFor: 'Apparel Brands, Beauty Salons, Accessories, Footwear',
    tag: 'Best Value Entry'
  }
];

export const PAYMENT_PLANS = [
  {
    id: 'plan_down_payment',
    title: '1. Down Payment Plan with Rent Assistance',
    badge: 'Maximum Discount & Assured Returns',
    breakdown: [
      { milestone: 'Booking Amount', percent: '10%' },
      { milestone: 'Within 60 Days of Booking', percent: '80%' },
      { milestone: 'On CC Applied', percent: '10%' }
    ],
    note: 'Generates immediate rental yield benefits during construction.'
  },
  {
    id: 'plan_special_1',
    title: '2. Special Payment Plan 1 (40 : 25 : 25)',
    badge: 'Popular Investor Choice',
    breakdown: [
      { milestone: 'Booking Amount', percent: '10%' },
      { milestone: 'Within 60 Days of Booking', percent: '40%' },
      { milestone: 'On 6th Floor Slab', percent: '25%' },
      { milestone: 'On CC Applied', percent: '25%' }
    ],
    note: 'Balanced liquidity management with milestone commitments.'
  },
  {
    id: 'plan_special_2',
    title: '3. Special Payment Plan 2 (30 : 20 : 20 : 20)',
    badge: 'Flexible Step Payment',
    breakdown: [
      { milestone: 'Booking Amount', percent: '10%' },
      { milestone: 'Within 60 Days of Booking', percent: '30%' },
      { milestone: 'On Ground Floor Slab', percent: '20%' },
      { milestone: 'On 6th Floor Slab', percent: '20%' },
      { milestone: 'On CC Applied', percent: '20%' }
    ],
    note: 'Ideal for progressive investment aligned with civil structure progress.'
  },
  {
    id: 'plan_clp',
    title: '4. Construction Linked Plan (CLP)',
    badge: 'RERA Standard Milestone',
    breakdown: [
      { milestone: 'Booking Amount', percent: '10%' },
      { milestone: 'Within 60 Days', percent: '15%' },
      { milestone: 'On Foundation / Plinth', percent: '15%' },
      { milestone: 'On LGF Slab', percent: '15%' },
      { milestone: 'On 5th Floor Slab', percent: '10%' },
      { milestone: 'On 10th Floor Slab', percent: '10%' },
      { milestone: 'On 15th Floor Slab', percent: '10%' },
      { milestone: 'On 18th Floor Slab', percent: '10%' },
      { milestone: 'On CC Applied', percent: '5%' }
    ],
    note: 'Maximum security linked strictly to construction milestones.'
  }
];

export const TYPOLOGIES = [
  {
    id: 'ground_retail',
    title: 'Ground Floor Boulevard High-Street Retail',
    superArea: '150 – 1200 Sq. Ft.',
    carpetArea: 'Optimal Double-Height Ceiling Layouts',
    price: '₹ 37,900 / Sq. Ft.*',
    description: 'Premier Ground Floor retail shops facing the expansive pedestrian promenade and atrium. Designed for maximum footfall and grand visual display.',
    image: '/images/kbwestwalks/kb-retail.jpeg',
    floorPlanImg: '/images/kbwestwalks/kf1.jpg',
    highlights: [
      'Maximum Pedestrian Atrium & Street Frontage',
      'AC Zone Shopping Experience',
      'Ideal for Luxury Brands, Apparel & Coffee Hubs',
      'Double Height Glass Facades',
      'Dedicated Loading & Unloading Access'
    ]
  },
  {
    id: 'lgf_retail',
    title: 'Lower Ground Floor Hypermarket & Anchor Retail',
    superArea: '150 – 1200 Sq. Ft.',
    carpetArea: 'Spacious Commercial Footprint',
    price: '₹ 25,900 / Sq. Ft.*',
    description: 'High-footfall Lower Ground Floor dedicated to anchor hypermarkets, electronics hubs, and daily convenience outlets with escalators & elevators.',
    image: '/images/kbwestwalks/kb-retail.jpeg',
    floorPlanImg: '/images/kbwestwalks/kf2.jpg',
    highlights: [
      'Direct Escalator Connectivity from Boulevard',
      'Designed for Grocery, Electronics & Home Decor',
      'High Volume Footfall Anchor Placement',
      '100% Power Backed & Climate Managed'
    ]
  },
  {
    id: 'first_retail',
    title: 'First Floor Fashion & Lifestyle Arcades',
    superArea: '150 – 1200 Sq. Ft.',
    carpetArea: 'Seamless Atrium Facing Shops',
    price: '₹ 24,900 / Sq. Ft.*',
    description: 'Vibrant First Floor dedicated to fashion wear, footwear, beauty salons, and gadget galleries overlooking the central glass atrium.',
    image: '/images/kbwestwalks/kb-food.jpeg',
    floorPlanImg: '/images/kbwestwalks/kf3.jpg',
    highlights: [
      'Central Glass Atrium Views',
      'High Visibility Pedestrian Walkways',
      'High Value Investment Entry Rate',
      'Continuous Escalator & Lift Hoists'
    ]
  },
  {
    id: 'studio_apartments',
    title: 'State-of-the-Art Studio Suites & Executive Workspaces',
    superArea: 'Floors 6th to 20th',
    carpetArea: 'Fully Air-Conditioned Serviced Studios',
    price: 'Price On Request (VIP Launch Rate)',
    description: 'Modern, fully loaded studio apartments and executive workspaces offering high rental yield, boutique amenities, and panoramic city views.',
    image: '/images/kbwestwalks/kb-studio.jpeg',
    floorPlanImg: '/images/kbwestwalks/kf5.jpg',
    highlights: [
      'High Rental Demand Location at Ecotech-12',
      'Boutique Hospitality & Workspace Interiors',
      'Separate High-Speed Passenger & Service Lifts',
      'Access to Rooftop Restaurants & Cinema'
    ]
  }
];

export const AMENITIES_LIST = [
  {
    title: '5-Level Air-Conditioned Shopping Arcade',
    category: 'High-Street Retail',
    desc: 'Hybrid high-street and atrium-facing shopping mall format with double height shops, climate control, and wide glass promenades.',
    icon: 'ShoppingBag',
    image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.26.jpeg'
  },
  {
    title: 'Multi-Screen Multiplex Cinema',
    category: 'Entertainment Hub',
    desc: 'State-of-the-art multi-screen cinema hall on 5th floor with gourmet concession stands and recliner seating.',
    icon: 'Film',
    image: '/kbww/page_7.png'
  },
  {
    title: 'Multi-Cuisine Food Court & Rooftop Dining',
    category: 'Gastronomy & Nightlife',
    desc: 'Expansive 3rd & 4th floor food courts featuring international QSR brands, specialty cafes, and open-air rooftop restaurants.',
    icon: 'Utensils',
    image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.30.jpeg'
  },
  {
    title: 'State-of-the-Art Studio Apartments',
    category: 'Serviced Living',
    desc: 'Premium studio suites on 6th to 18th floors crafted for modern working professionals, business travelers, and high rental yield.',
    icon: 'Building2',
    image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.34.jpeg'
  },
  {
    title: 'Double Height Central Glass Atrium',
    category: 'Architecture',
    desc: 'Grand glass atrium ensuring high natural light, open ventilation, and maximum brand visibility for every store owner.',
    icon: 'Sun',
    image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.29.jpeg'
  },
  {
    title: 'Multi-Level Basement Parking & Security',
    category: 'Infrastructure',
    desc: 'Ample visitor & owner parking, 24/7 CCTV surveillance, 100% power backup, and high-speed passenger elevators.',
    icon: 'ShieldCheck',
    image: '/kbww/WhatsApp_Image_2026-10-01_at_21.33.31.jpeg'
  }
];

export const PHILOSOPHY_POINTS = [
  {
    title: 'Purposeful Development Rooted in Trust',
    desc: 'Shree Kunj Bihariji Group has been shaping contemporary urban destinations that elevate businesses and lifestyles across NCR since 2005.',
    number: '01'
  },
  {
    title: 'Hybrid High-Street & Atrium Design',
    desc: 'Combines open high-street energy with 5 levels of air-conditioned atrium comfort, maximizing shopper footfall and retail exposure.',
    number: '02'
  },
  {
    title: 'Strategic Ecotech-12 Hub',
    desc: 'Located directly at Ecotech-12, Greater Noida West, adjacent to dense residential sectors, industrial parks, and the proposed metro station.',
    number: '03'
  },
  {
    title: 'Comprehensive Mixed-Use Synergy',
    desc: 'Seamlessly integrates retail, food courts, multiplex cinema, and studio residences into a single high-yield ecosystem.',
    number: '04'
  }
];

export const GROUP_LEGACY_PROJECTS = [
  {
    title: 'KB West Walk',
    location: 'Ecotech-12, Greater Noida West',
    type: 'Commercial High-Street & Studio Suites',
    year: '2026 Launch',
    status: 'Flagship Ongoing Development (RERA Approved)'
  },
  {
    title: 'KB Mart',
    location: 'Knowledge Park III, Greater Noida',
    type: 'Commercial & Retail Hub',
    year: '2025',
    status: 'Delivered Commercial Landmark'
  },
  {
    title: 'KB Complex',
    location: 'Alpha II, Greater Noida',
    type: 'Commercial & Corporate Plaza',
    year: '2019',
    status: 'Thriving Operational Centre'
  }
];

export const PRESS_ACCOLADES = [
  {
    award: 'Best Mixed-Use Commercial High-Street Project 2026',
    by: 'Greater Noida Real Estate Leadership Excellence',
    year: '2026',
    quote: 'Recognized for innovative 5-level AC high-street architecture and strategic location at Ecotech-12.'
  },
  {
    award: 'Excellence in Commercial Real Estate Development',
    by: 'NCR Urban Infrastructure Forum',
    year: '2025',
    quote: 'Commended for 20+ years of developer trust and successful commercial deliveries across Greater Noida.'
  },
  {
    award: 'Iconic Retail & Entertainment Destination Award',
    by: 'Retail Developers Association India',
    year: '2025',
    quote: 'Bringing together food, retail, cinema, and studio suites in a high-growth corridor.'
  }
];

export const BUYER_JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Project & Price Sheet Consultation',
    desc: 'Connect with a senior KB West Walk Commercial Advisor to review unit availability, BSP cost sheets, and floor plan visibility.'
  },
  {
    step: '02',
    title: 'VIP On-Site Experience & Layout Walkthrough',
    desc: 'Visit our site office at Plot C-3, Ecotech-12, Greater Noida West for a guided walk through the 3D model, floor layouts, and location vantage points.'
  },
  {
    step: '03',
    title: 'Payment Plan Customization & Shop Selection',
    desc: 'Choose between Down Payment with Rent Assistance, Special 40:25:25, or CLP plans aligned with your ROI goals.'
  },
  {
    step: '04',
    title: 'Official RERA Booking & Collection Allocation',
    desc: 'Secure your shop or studio suite with 10% booking amount paid directly to official RERA Collection Account (Axis Bank Ltd).'
  }
];

export const COLLECTIONS_DATA = [
  {
    id: 'retail_shops',
    title: 'Boulevard High-Street Retail Shops',
    subtitle: 'Lower Ground, Ground & First Floor',
    price: 'Pre-Leased @ ₹ 32 LAKH ONLY* (Lease @ ₹ 95/sq.ft.)',
    area: '150 – 1200 Sq. Ft. Unit Sizes',
    tag: "Noida Extension's First Fully AC Mall",
    image: '/images/kbwestwalks/kb-retail.jpeg',
    features: ['Pre-Leased @ ₹95/sq.ft.', 'Double Height Ceiling', 'Central Atrium Facing', 'High Footfall Hub']
  },
  {
    id: 'food_cinema',
    title: 'Food Court, Cafes & Multiplex Cinema',
    subtitle: '3rd, 4th & 5th Floors',
    price: 'High Yield Investment',
    area: '160 – 600 Sq. Ft. Food Outlets',
    tag: 'Dining & Entertainment Hub',
    image: '/images/kbwestwalks/kb-food.jpeg',
    features: ['Rooftop Open Dining', 'Multi-Screen Multiplex', 'Gourmet Food Court', 'High Footfall Anchor']
  },
  {
    id: 'studio_suites',
    title: 'State-of-the-Art Studio Suites',
    subtitle: '6th to 18th Floors',
    price: 'Fully Furnished @ ₹ 60 LAKH ONLY*',
    area: 'Fully Loaded Boutique Studios',
    tag: 'Move-In Ready Serviced Suites',
    image: '/images/kbwestwalks/kb-studio.jpeg',
    features: ['Luxury Appliances Included', 'Chic Interiors & Designer Furniture', 'Dedicated Elevators', 'High Rental Demand']
  }
];

export const SYNCED_FLYERS = [
  { id: 'f0', title: 'Official Promotional Flyer — Studio @ ₹60 Lakhs & Retail @ ₹32 Lakhs', category: 'Special Offer Flyer', image: '/images/kb_advertisement_flyer.png' },
  { id: 'f1', title: 'Ground Floor & LGF Retail Layout', category: 'Retail High-Street', image: '/images/kbwestwalks/kf1.jpg' },
  { id: 'f2', title: 'First & Second Floor Fashion Arcades', category: 'Brand Showrooms', image: '/images/kbwestwalks/kf2.jpg' },
  { id: 'f3', title: 'Gourmet Food Court & Rooftop Dining', category: 'Food & Dining', image: '/images/kbwestwalks/kf3.jpg' },
  { id: 'f4', title: 'Multiplex Cinema & Entertainment Zone', category: 'Entertainment', image: '/images/kbwestwalks/kf4.jpg' },
  { id: 'f5', title: 'Serviced Luxury Studio Apartments', category: 'Studio Suites', image: '/images/kbwestwalks/kf5.jpg' },
  { id: 'f6', title: 'Ecotech-12 Location Master Plan', category: 'Location Connectivity', image: '/images/kbwestwalks/kf6.jpg' },
  { id: 'f7', title: 'Project Frontage Elevation View', category: 'Exterior Architecture', image: '/images/kbwestwalks/k1.jpg' },
  { id: 'f8', title: 'Shopping Atrium & Glass Frontage', category: 'High-Street Promenade', image: '/images/kbwestwalks/k2.jpg' },
  { id: 'f9', title: 'Gourmet Food Court Seating Concept', category: 'Dining Hub', image: '/images/kbwestwalks/k3.jpg' },
  { id: 'f10', title: 'Studio Suite Executive Interior', category: 'Serviced Suites', image: '/images/kbwestwalks/k4.jpg' },
  { id: 'f11', title: 'Basement Parking & Infrastructure', category: 'Facilities', image: '/images/kbwestwalks/k5.jpg' },
  { id: 'f12', title: 'Night View & Illumination', category: 'Landmark Architecture', image: '/images/kbwestwalks/k6.jpg' }
];

export const KB_SERVICES_LIST = [
  {
    title: 'Dedicated Retail Concierge',
    desc: '24/7 commercial desk assistance for store owners, corporate tenants, and visitor management.'
  },
  {
    title: 'Professional Mall Management',
    desc: 'Comprehensive facility upkeep, HVAC maintenance, security marshals, and daily hygiene.'
  },
  {
    title: 'Multi-Level Valet & VIP Parking',
    desc: 'Seamless valet arrival, automated parking guidance, and reserved executive parking.'
  },
  {
    title: 'Leasing & Tenant Assistance',
    desc: 'Dedicated support for brand tie-ups, retail leasing, and rental management.'
  }
];

export const FORBES_SERVICES_LIST = KB_SERVICES_LIST;
