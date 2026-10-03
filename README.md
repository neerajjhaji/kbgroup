# 🏆 Forbes Fab Luxe Residences — Sector 4, Greater Noida West

> **Ultra-Luxury 3+1 & 4+1 BHK Resort Residences | RERA Registered: UPRERAPRJ995490**
> *Curated with 3 Years Complimentary Forbes Global Properties Managed Services*

---

## 🌟 Overview

**Forbes Fab Luxe Residences** is an iconic 13-acre low-density residential landmark in Sector 4, Greater Noida West. Designed for ultra-high-net-worth individuals and luxury home buyers, the platform offers an immersive, interactive digital experience complete with AI-powered concierge advisory, real-time financial calculators, interactive property matchmakers, and paperless lead-dispatch systems.

---

## ✨ Key Highlights & Project Specifications

| Feature | Specification Details |
| :--- | :--- |
| **📍 Location** | Sector 4, Greater Noida West, UP (5 Mins from Delhi-Meerut Expressway) |
| **🏛️ Campus Scale** | 13-Acre Resort Layout with **70% Open Green Microclimates** |
| **🏰 Iconic Towers** | 11 Sky Towers (G+35 Architectural Marvel) |
| **👑 Grand Clubhouse** | **75,000 Sq. Ft.** 6-Star Resident Country Club & Spa |
| **🔑 Concierge Privileges** | 3 Years Complimentary Forbes Global Properties Managed Services |
| **📜 Regulatory Compliance** | **100% RERA Approved:** `UPRERAPRJ995490` |
| **💰 Starting Pricing** | ₹ 2.96 Cr* Onwards with Flexible Bank Subvention Plans (20:80) |

---

## 🎯 Platform Features & Technical Capabilities

### 1. 🤖 Conversational AI Concierge (`AIBotWidget.jsx`)
- **Interactive Property Matchmaker:** 3-step decision tree guiding buyers based on purpose (End-user vs Investment), typology preferences, and key priorities.
- **1-on-1 Advisory Scheduler:** Direct callback booking with Senior Relationship Directors.
- **Local Lead Vault & CRM Sync:** Local storage backup with instant export capabilities to CSV and multi-CRM webhook integration (Salesforce & HubSpot formats).

### 2. 🧮 Interactive Financial Calculators (`PropertyFinder.jsx` & `InvestmentROICalculator.jsx`)
- **Real-Time Loan EMI & Subvention Slider:** Dynamic property price value, down payment percentage, tenure, and interest rate adjustment.
- **Capital Growth & Yield Projection Estimator:** Calculates projected 3-year and 5-year capital appreciation based on Jewar Airport and RRTS infrastructure milestones.

### 3. 🛡️ Robust Security & Form Validation (`dispatchUtils.js`)
- **Mathematical CAPTCHA Verification:** Prevents automated spam submissions across all inquiry modals.
- **Multi-Field Validation:** Regex email verification, 10-digit phone validation, full name validation, and intent scoring algorithm.
- **Multi-Endpoint Dispatch System:** Dual API failover via Web3Forms, FormSubmit AJAX, custom CRM Webhooks, and CallMeBot WhatsApp automated confirmation notifications.

### 4. 🖼️ Spatial Master Plans & VR Walkthrough (`FloorPlanModal.jsx` & `VirtualTourModal.jsx`)
- **Architectural Blueprints:** Full schematic breakdowns for 3+1 BHK Resort Suites (2,250 – 2,650 Sq.Ft.) and 4+1 BHK Grand Presidential Suites (3,150 – 3,850 Sq.Ft.).
- **360° VR Tour Modal:** Interactive virtual walkthrough with panoramic room controls.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 (`react`, `react-dom`)
- **Build Tooling:** Vite 8 (`vite`, `@vitejs/plugin-react`)
- **Iconography:** Lucide React (`lucide-react`)
- **Linting & Code Quality:** Oxlint (`oxlint`)
- **Styling & Fonts:** Pure Inline CSS with Glassmorphic Design Token Palette + Google Fonts (`Plus Jakarta Sans`, `Outfit`, `Cormorant Garamond`)

---

## 🚀 Getting Started

### Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### Installation & Local Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/neerajjhaji/fab-luxe.git
   cd fab-luxe
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000/`.

4. **Build for Production:**
   ```bash
   npm run build
   ```
   The compiled static files will be placed in the `dist/` folder.

5. **Linting Check:**
   ```bash
   npm run lint
   ```

---

## 🗺️ Project Structure

```
forbes-fab-luxe/
├── index.html                  # Main entry file with SEO OpenGraph & JSON-LD Schemas
├── package.json                # Dependency definitions & scripts
├── vite.config.js              # Vite server & port configuration
├── public/                     # Static assets & SVG icons
└── src/
    ├── App.jsx                 # Master application layout & modal state handlers
    ├── main.jsx                # React root mount entry
    ├── index.css               # Global reset & keyframe animation styles
    ├── data/
    │   ├── projectsData.js     # Single source of truth for typologies, pricing & specs
    │   └── dispatchUtils.js    # Buyer scoring, CRM payload adapters & lead dispatch logic
    └── components/
        ├── Navigation.jsx      # Sticky glassmorphic navbar with active section observer
        ├── Hero.jsx            # Cinematic auto-play slideshow hero banner
        ├── LiveBuyerTicker.jsx # Real-time RERA update ticker & helpline bar
        ├── AIBotWidget.jsx     # Conversational AI Concierge, Matchmaker & CRM Vault
        ├── Developments.jsx    # Flagship suite showcase grid
        ├── AmenitiesSection.jsx# 75,000 Sq.Ft. clubhouse & resort amenity highlights
        ├── Collections.jsx     # Architectural suite collection cards
        ├── PropertyFinder.jsx  # Filterable suite finder & real-time EMI calculator
        ├── ConnectivityMapSection.jsx # Location distance & connectivity matrix
        ├── InvestmentROICalculator.jsx # Capital appreciation & rental yield projections
        ├── SaintAmandSection.jsx       # Forbes 6-star hospitality privileges section
        ├── PressAccolades.jsx          # Industry awards & media quotes
        ├── BuyerJourneySteps.jsx       # 4-step buyer onboarding process
        ├── Footer.jsx                  # Comprehensive footer with RERA disclaimer
        └── Modals/                     # SiteVisitModal, BrochureModal, ConciergeModal,
                                        # FloorPlanModal, SearchModal, DetailDrawer, etc.
```

---

## 📄 License & Regulatory Disclaimer

*Disclaimer: This website is for informational and portfolio showcase purposes. All project details, RERA specifications (`UPRERAPRJ995490`), and architectural layouts conform to official developer disclosures for Sector 4, Greater Noida West.*
