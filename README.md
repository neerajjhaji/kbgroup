# 🏙️ KB West Walk — Commercial High-Street & Studio Suites

> **18-Level Mixed-Use Commercial Landmark in Ecotech-12, Greater Noida West**  
> *Developer: Shree Kunj Bihariji Realty Pvt. Ltd. (Shree KB Group)*  
> **RERA Registered:** `UPRERAPRJ422027/01/2026` | **Promoter ID:** `UPRERAPRM414706`

---

## 🌟 Overview

**KB West Walk** is an iconic 18-level mixed-use commercial destination at Plot No. C-3, Ecotech-12, Greater Noida West. Designed to combine prime retail, dining, entertainment, and serviced studio suites, the project features a 5-level air-conditioned shopping high-street, multi-screen multiplex cinema, gourmet food court, and high-yield studio suites.

The platform provides a digital showcase with AI-powered concierge advisory, interactive property matchmakers, investment ROI estimators, spatial floor plans, and lead capture systems.

---

## ✨ Key Highlights & Project Specifications

| Feature | Specification Details |
| :--- | :--- |
| **📍 Location** | Plot No. C-3, Ecotech-12, Greater Noida West (Near proposed Metro Station) |
| **🏢 Scale & Height** | 18-Level Commercial & Studio Suites Mixed-Use Landmark |
| **🛍️ Retail Zone** | 5 Levels AC Ventilated Shopping High-Street (LGF, GF, 1st, 2nd & 3rd Floors) |
| **🎬 Entertainment** | Multi-Screen Multiplex Cinema (5th Floor) & Gourmet Food Court (3rd & 4th Floors) |
| **🏢 Studio Suites** | Serviced Studio Suites & Workspaces (6th to 18th Floors) |
| **📜 Regulatory Status** | **100% RERA Approved:** `UPRERAPRJ422027/01/2026` |
| **💰 Starting Pricing** | Ground Boulevard ₹37,900/sq.ft. \| LGF ₹25,900/sq.ft. \| 1st Floor ₹24,900/sq.ft. |
| **🏦 Pre-Approved Banks** | Axis Bank Ltd (RERA Collection Account), HDFC, ICICI, SBI |

---

## 🎯 Platform Features & Technical Capabilities

### 1. 🤖 Conversational AI Concierge (`src/components/AIBotWidget.jsx` & `src/services/geminiService.js`)
- **KB Concierge AI Assistant:** Powered by Google Gemini Flash API with Google Search Grounding to fetch live commercial market benchmarks (99acres, Housing.com, Magicbricks).
- **Interactive Matchmaker:** 4-step decision tree guiding buyers based on investment goals, shop typologies, and floor preferences.
- **Lead Capture & Advisory Scheduler:** Direct callback booking with commercial relationship managers.

### 2. 📊 Investment & Financial Calculators (`InvestmentROICalculator.jsx` & `PropertyFinder.jsx`)
- **Real-Time EMI & Payment Plan Estimator:** Interactive pricing calculator with Down Payment, Special 40:25:25, Special 30:20:20:20, and CLP plan options.
- **Capital Growth & Rental Yield Estimator:** Projects 3-year and 5-year capital appreciation aligned with nearby metro and Jewar Airport infrastructure milestones.

### 3. 📐 Spatial Floor Plans & Virtual Walkthroughs (`FloorPlanModal.jsx` & `VirtualTourModal.jsx`)
- **Architectural Blueprints:** Detailed layouts for Boulevard Retail Shops, Anchor Stores, Food Court, and Serviced Studio Suites.
- **Virtual Tour & Site Map:** Interactive project layout, zoning diagrams, and location maps.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19 (`react`, `react-dom`)
- **Build Tooling:** Vite 8 (`vite`, `@vitejs/plugin-react`)
- **AI Integration:** Google Gemini API (`@google/generative-ai` / REST integration with Search Grounding)
- **Iconography:** Lucide React (`lucide-react`)
- **Code Quality & Linting:** Oxlint (`oxlint`)
- **Styling:** CSS3 with Light Luxury Theme (`#FAF7F2` Ivory background, Gold accent borders)

---

## 🚀 Getting Started

### Prerequisites
Ensure you have **Node.js (v18+)** and **npm** installed on your machine.

### Installation & Local Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/neerajjhaji/kbwestwalk.git
   cd kbwestwalk
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   VITE_GEMINI_MODEL=gemini-2.0-flash
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   The application will start at `http://localhost:3000/`.

5. **Build for Production:**
   ```bash
   npm run build
   ```
   The compiled production assets will be generated in `dist/`.

6. **Lint Codebase:**
   ```bash
   npm run lint
   ```

---

## 🗺️ Project Structure

```
kbwestwalk/
├── index.html                  # Main HTML entry file with SEO meta tags
├── package.json                # Dependencies and npm scripts
├── vite.config.js              # Vite server & port configuration
├── public/                     # Logos, floor plan images, and PDF brochures
└── src/
    ├── App.jsx                 # Main layout and modal state coordinator
    ├── main.jsx                # React root mount entry point
    ├── App.css                 # Main app CSS styles
    ├── index.css               # Global typography and base styles
    ├── services/
    │   └── geminiService.js    # Gemini AI API integration with search grounding
    ├── data/
    │   ├── projectsData.js     # Single source of truth for pricing, specs & payment plans
    │   └── marketPlatformsData.js # Real estate market benchmarks & platform metrics
    └── components/
        ├── Navigation.jsx      # Sticky header navigation bar with brand logos
        ├── Hero.jsx            # Project hero banner with key highlights
        ├── TopUtilityBar.jsx   # Top announcement & RERA helpline bar
        ├── LiveBuyerTicker.jsx # Real-time update ticker
        ├── AIBotWidget.jsx     # AI Concierge Chatbot & Matchmaker drawer
        ├── Developments.jsx    # Commercial floor and typology showcase
        ├── PriceListSection.jsx # Floor-wise BSP price breakdown table
        ├── AmenitiesSection.jsx # Key project amenities grid
        ├── PropertyFinder.jsx  # Unit filter & financial calculator
        ├── ConnectivityMapSection.jsx # Distance and location connectivity matrix
        ├── InvestmentROICalculator.jsx # Rental yield & capital appreciation calculator
        ├── Philosophy.jsx      # Developer legacy & CREDAI verification section
        ├── PressAccolades.jsx  # Industry awards & media highlights
        ├── BuyerJourneySteps.jsx # 4-step buyer onboarding guide
        ├── Footer.jsx          # Footer with official RERA bank details & disclaimers
        └── Modals/             # SiteVisitModal, BrochureModal, ConciergeModal,
                                # FloorPlanModal, VirtualTourModal, SearchModal, etc.
```

---

## 📄 Regulatory Disclaimer

*Disclaimer: This website is for informational showcase purposes. All project details, RERA numbers (`UPRERAPRJ422027/01/2026`), promoter credentials (`UPRERAPRM414706`), pricing, and layout specifications strictly reflect official developer disclosures for KB West Walk, Ecotech-12, Greater Noida West.*
