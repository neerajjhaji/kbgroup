import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_kb_west_walk_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette - Light Luxury Theme (#FAF7F2 Ivory background, Gold accents, Crisp White cards)
    LIGHT_BG = RGBColor(250, 247, 242)      # #FAF7F2 - Ivory / Warm Pearl
    CARD_BG = RGBColor(255, 255, 255)       # #FFFFFF - Crisp White
    GOLD = RGBColor(166, 129, 66)           # #A68142 - Champagne Gold Accent
    TEXT_DARK = RGBColor(15, 23, 42)        # #0F172A - Deep Slate
    TEXT_MUTED = RGBColor(71, 85, 105)      # #475569 - Muted Slate
    BORDER_GOLD = RGBColor(197, 160, 89)    # #C5A059 - Soft Gold Line

    blank_layout = prs.slide_layouts[6]
    img_dir = "/Users/neeraj.jha/Documents/kbwestwalk/public/screenshots"
    company_logo_path = "/Users/neeraj.jha/Documents/kbwestwalk/public/shree_kb_logo.png"
    project_logo_path = "/Users/neeraj.jha/Documents/kbwestwalk/public/kbww_logo.png"
    output_ppt = "/Users/neeraj.jha/Documents/kbwestwalk/KB_West_Walk_Executive_Master_Presentation.pptx"

    def add_bg(slide, color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, tag_text, title_text):
        # Company Logo in top right
        if os.path.exists(company_logo_path):
            slide.shapes.add_picture(company_logo_path, Inches(10.8), Inches(0.25), height=Inches(0.65))

        # Category Tag
        tb_tag = slide.shapes.add_textbox(Inches(0.8), Inches(0.25), Inches(9.8), Inches(0.35))
        tf_tag = tb_tag.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = GOLD
        p_tag.font.name = "Arial"

        # Main Slide Title
        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.58), Inches(9.8), Inches(0.65))
        tf_title = tb_title.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(21)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_DARK
        p_title.font.name = "Georgia"

    def add_footer(slide):
        # Footer Line Separator
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.8), Inches(11.733), Inches(0.02))
        line.fill.solid()
        line.fill.fore_color.rgb = BORDER_GOLD
        line.line.fill.background()

        # Project Logo in Footer (Bottom Left)
        if os.path.exists(project_logo_path):
            slide.shapes.add_picture(project_logo_path, Inches(0.8), Inches(6.88), height=Inches(0.48))

        # Project Address & RERA Details in Footer (Bottom Right)
        tb_footer = slide.shapes.add_textbox(Inches(2.5), Inches(6.88), Inches(10.033), Inches(0.5))
        tf_footer = tb_footer.text_frame
        tf_footer.word_wrap = True
        p = tf_footer.paragraphs[0]
        p.alignment = PP_ALIGN.RIGHT
        p.text = "Plot No. C-3, Ecotech-12, Greater Noida West, UP 201318  |  RERA No: UPRERAPRJ422027/01/2026  |  Shree Kunj Bihariji Realty Pvt. Ltd."
        p.font.size = Pt(9.5)
        p.font.color.rgb = TEXT_MUTED
        p.font.name = "Arial"

    def add_card(slide, left, top, width, height, bg_color, border_color=None):
        shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        if border_color:
            shape.line.color.rgb = border_color
            shape.line.width = Pt(1.2)
        else:
            shape.line.fill.background()
        return shape

    def add_slide_with_screenshot(tag, title, img_filename, bullet_points):
        slide = prs.slides.add_slide(blank_layout)
        add_bg(slide, LIGHT_BG)
        add_header(slide, tag, title)

        # Left Column: Screenshot Frame
        add_card(slide, Inches(0.8), Inches(1.35), Inches(6.8), Inches(5.35), CARD_BG, BORDER_GOLD)

        img_path = os.path.join(img_dir, img_filename)
        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, Inches(0.9), Inches(1.45), width=Inches(6.6))
        else:
            tb = slide.shapes.add_textbox(Inches(1.0), Inches(3.0), Inches(6.4), Inches(2.0))
            tf = tb.text_frame
            p = tf.paragraphs[0]
            p.text = f"[ Screenshot: {img_filename} ]"
            p.font.color.rgb = GOLD

        # Right Column: Detailed Breakdown Card
        add_card(slide, Inches(7.8), Inches(1.35), Inches(4.733), Inches(5.35), CARD_BG, BORDER_GOLD)
        tb_details = slide.shapes.add_textbox(Inches(8.0), Inches(1.5), Inches(4.333), Inches(5.0))
        tf_det = tb_details.text_frame
        tf_det.word_wrap = True

        p_header = tf_det.paragraphs[0]
        p_header.text = "SECTION DETAILS & FEATURE BREAKDOWN"
        p_header.font.size = Pt(11.5)
        p_header.font.bold = True
        p_header.font.color.rgb = GOLD
        p_header.font.name = "Arial"

        for bp in bullet_points:
            p = tf_det.add_paragraph()
            p.text = bp
            p.font.size = Pt(10.5)
            p.font.color.rgb = TEXT_DARK
            p.space_after = Pt(5)

        add_footer(slide)
        return slide

    # =========================================================================
    # SLIDE 1: Executive Title Slide
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1, LIGHT_BG)
    add_card(s1, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3), CARD_BG, BORDER_GOLD)

    # Top Company Logo on Title Slide
    if os.path.exists(company_logo_path):
        s1.shapes.add_picture(company_logo_path, Inches(1.0), Inches(1.0), height=Inches(0.9))

    # Project Logo on Title Slide
    if os.path.exists(project_logo_path):
        s1.shapes.add_picture(project_logo_path, Inches(9.2), Inches(0.95), height=Inches(1.1))

    tb = s1.shapes.add_textbox(Inches(1.0), Inches(2.1), Inches(11.333), Inches(0.5))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "SHREE KUNJ BIHARIJI REALTY PVT. LTD. • RERA APPROVED"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = GOLD

    tb = s1.shapes.add_textbox(Inches(1.0), Inches(2.6), Inches(11.333), Inches(1.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "KB WEST WALK"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = TEXT_DARK
    p.font.name = "Georgia"

    p2 = tf.add_paragraph()
    p2.text = "Commercial High-Street Master Portal & Visual Section Presentation"
    p2.font.size = Pt(19)
    p2.font.color.rgb = GOLD

    tb_details = s1.shapes.add_textbox(Inches(1.0), Inches(4.5), Inches(11.333), Inches(2.1))
    tf_det = tb_details.text_frame
    tf_det.word_wrap = True

    items = [
        "📍 Address: Plot No. C-3, Ecotech-12, Greater Noida West, Uttar Pradesh 201318",
        "📜 RERA Registration No: UPRERAPRJ422027/01/2026 | Promoter ID: UPRERAPRM414706",
        "🏬 Building Scale: 18-Level Mixed-Use Commercial High-Street & Studio Suites Landmark",
        "📸 Visual Presentation: Complete 18-Section Screenshot Walkthrough & Features Breakdown",
        "📞 Commercial Helpline: +91 828 7777 333 | Official WhatsApp: +91 828 7777 333"
    ]
    for item in items:
        p = tf_det.add_paragraph()
        p.text = item
        p.font.size = Pt(12.5)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(4)

    add_footer(s1)

    # =========================================================================
    # SLIDE 2: Hero Canvas & Navigation Header
    # =========================================================================
    add_slide_with_screenshot(
        "01. HERO CANVAS & NAVIGATION HEADER",
        "Top Header Branding, Live Video Background & Primary Pitch",
        "01_hero_navigation.png",
        [
            "• Live Announcement Ticker: Top utility bar displaying real-time buyer interest & site visit alerts.",
            "• Builder Company Logo: Official Shree Kunj Bihariji Group Crest (/shree_kb_logo.png) anchored in top navigation badge.",
            "• Project Brand Logo: KB West Walk Logo (/kbww_logo.png) prominently rendered at top of hero fold.",
            "• Background Video Playback: High-contrast high-street footage with quick audio control button.",
            "• Key Tagline: 'Every Step A Story • 5 Levels of AC Ventilated Shopping High-Street'.",
            "• Direct CTAs: Book VIP Site Visit, Download Cost Sheet (PDF), and View Floor Plans."
        ]
    )

    # =========================================================================
    # SLIDE 3: Legacy Metrics Counter
    # =========================================================================
    add_slide_with_screenshot(
        "02. LEGACY METRICS & DEVELOPER SCALE",
        "20+ Years Legacy Stats, RERA Approvals & Building Specs",
        "02_legacy_metrics.png",
        [
            "• Developer Track Record: 20+ Years delivering urban commercial landmarks across NCR since 2005.",
            "• Commercial Scale: 18-level mixed-use development with 5 levels of AC retail high-street.",
            "• Verified RERA Approval: Registered under UPRERAPRJ422027/01/2026 with promoter ID UPRERAPRM414706.",
            "• Ecotech-12 Hub: Directly located at Plot C-3 adjacent to proposed metro station.",
            "• Captive Audience: Surrounded by 1,00,000+ occupied residential apartments."
        ]
    )

    # =========================================================================
    # SLIDE 4: Commercial Typologies & Spaces
    # =========================================================================
    add_slide_with_screenshot(
        "03. COMMERCIAL TYPOLOGIES & SPACES",
        "Boulevard Retail, Food Court, Cinema & Serviced Studio Suites",
        "03_developments_typologies.png",
        [
            "• Ground Boulevard Shops: Premier frontage stores at ₹ 37,900 / Sq. Ft. for luxury & coffee brands.",
            "• Lower Ground Hypermarket: High-density shopper destination at ₹ 25,900 / Sq. Ft. for anchor stores.",
            "• First Floor Lifestyle Arcades: Curated brand showrooms at ₹ 24,900 / Sq. Ft. with atrium views.",
            "• Multiplex & Food Court: 5th floor multi-screen cinema & 3rd/4th floor rooftop gourmet dining.",
            "• Studio Suites (6th-18th): High rental yield executive serviced studio suites (Price On Request)."
        ]
    )

    # =========================================================================
    # SLIDE 5: Floor-Wise Pricing Schedules
    # =========================================================================
    add_slide_with_screenshot(
        "04. FLOOR-WISE PRICING SCHEDULES",
        "Transparent BSP Rate Cards & Flexible Payment Plans",
        "04_pricing_schedules.png",
        [
            "• Ground Floor Boulevard: ₹ 37,900 / Sq. Ft. — Double-height frontage retail.",
            "• Lower Ground Floor: ₹ 25,900 / Sq. Ft. — Ideal for hypermarket, pharmacy & electronics.",
            "• First Floor Retail: ₹ 24,900 / Sq. Ft. — High-value entry rate for fashion & beauty arcades.",
            "• Down Payment Plan: Includes rent assistance benefits during civil construction.",
            "• Milestone Plans: Special 40:25:25, Special 30:20:20:20, and RERA Construction-Linked Plan (CLP)."
        ]
    )

    # =========================================================================
    # SLIDE 6: Amenities & Infrastructure Pillars
    # =========================================================================
    add_slide_with_screenshot(
        "05. AMENITIES & INFRASTRUCTURE PILLARS",
        "5-Level AC Arcade, Central Glass Atrium & Basement Parking",
        "05_amenities_pillars.png",
        [
            "• Climate Managed Shopping: 5 levels of air-conditioned high-street with wide glass walkways.",
            "• Glass Atrium Architecture: Double-height central glass atrium ensuring natural lighting.",
            "• Gourmet Dining & Nightlife: Multi-cuisine food courts and open-air rooftop specialty restaurants.",
            "• Visitor & Executive Parking: Multi-level basement parking with automated guidance & 24/7 CCTV.",
            "• 100% Power Backup: High-speed passenger & service elevators with uninterrupted power."
        ]
    )

    # =========================================================================
    # SLIDE 7: Developer Philosophy & CREDAI Trust
    # =========================================================================
    add_slide_with_screenshot(
        "06. DEVELOPER PHILOSOPHY & CREDAI TRUST",
        "Shree Kunj Bihariji Legacy & Deliveries Across NCR",
        "06_brand_philosophy.png",
        [
            "• 20+ Years Excellence: Shree Kunj Bihariji Group shaping commercial destinations since 2005.",
            "• CREDAI Member Badge: Official member of CREDAI (Real Estate Developers Association of India).",
            "• Delivered Commercial Portfolio: KB Mart (Knowledge Park III) & KB Complex (Alpha II, Greater Noida).",
            "• Hybrid High-Street Format: Blends open high-street energy with AC mall atrium comfort.",
            "• Strategic Location Choice: Positioned in Ecotech-12 high-density growth corridor."
        ]
    )

    # =========================================================================
    # SLIDE 8: Property Finder & EMI Calculator
    # =========================================================================
    add_slide_with_screenshot(
        "07. INTERACTIVE PROPERTY FINDER & EMI CALCULATOR",
        "Dynamic Price Filtering & Custom Loan Repayment Slider",
        "07_property_finder_emi.png",
        [
            "• Filterable Property Finder: Search by floor (LGF, GF, 1st, Studio) and budget range.",
            "• Real-Time EMI Calculator: Adjust property price, down payment %, loan tenure, and interest rate.",
            "• Instant Calculation: Computes monthly loan EMI, total interest payable, and total outlay.",
            "• Direct Inquiry CTA: Instant callback booking based on selected property filter.",
            "• Transparent Pricing: Shows exact basic sale price (BSP) with clear breakdown."
        ]
    )

    # =========================================================================
    # SLIDE 9: Location Connectivity & Proximity
    # =========================================================================
    add_slide_with_screenshot(
        "08. LOCATION CONNECTIVITY & PROXIMITY",
        "Strategic Ecotech-12 Transit Hub & Metro Distance",
        "08_location_connectivity.png",
        [
            "• Proposed Metro Station: Walking distance (100 meters) from proposed Ecotech-12 Metro.",
            "• Gaur Chowk / Char Murti: 5 minutes drive (2.5 Km) from major Greater Noida West traffic hub.",
            "• NH-24 / Delhi-Meerut Expressway: 10 minutes drive (6.0 Km) for swift Delhi NCR connectivity.",
            "• Medical Facilities: 10 minutes (7.5 Km) to Fortis & Max Super Speciality Hospitals.",
            "• Jewar International Airport: 45 minutes (48.0 Km) via Yamuna Expressway."
        ]
    )

    # =========================================================================
    # SLIDE 10: Investment Growth & ROI Estimator
    # =========================================================================
    add_slide_with_screenshot(
        "09. INVESTMENT GROWTH & ROI ESTIMATOR",
        "Projected Rental Yields & Capital Appreciation",
        "09_investment_roi.png",
        [
            "• High Rental Yield: Projected 7.5% – 9.2% annual commercial rental yield in Ecotech-12.",
            "• Capital Appreciation: Estimated 38% – 48% cumulative capital gain upon metro launch.",
            "• Cross-Platform Benchmarks: Data cross-referenced with 99acres, Housing.com & Magicbricks.",
            "• Catchment Advantage: 1,00,000+ nearby residential flats driving daily footfalls.",
            "• High Demand Commercial Corridor: Ranked among top 3 commercial retail hubs in Delhi NCR."
        ]
    )

    # =========================================================================
    # SLIDE 11: Professional Facility Management
    # =========================================================================
    add_slide_with_screenshot(
        "10. PROFESSIONAL FACILITY MANAGEMENT",
        "24/7 Retail Concierge, Security & Property Services",
        "10_mall_management.png",
        [
            "• Dedicated Retail Concierge: 24/7 helpdesk for store owners, corporate tenants, and shoppers.",
            "• Professional Mall Operations: Daily hygiene, HVAC upkeep, escalators, and building maintenance.",
            "• Valet & Executive Parking: Multi-level basement parking with valet arrival service.",
            "• Brand Leasing Support: Dedicated support for international brand tie-ups and retail leasing."
        ]
    )

    # =========================================================================
    # SLIDE 12: Press Accolades & Industry Recognition
    # =========================================================================
    add_slide_with_screenshot(
        "11. PRESS ACCOLADES & INDUSTRY RECOGNITION",
        "Awards & Industry Recognition for KB West Walk",
        "11_press_accolades.png",
        [
            "• Best Mixed-Use High-Street 2026: Greater Noida Real Estate Leadership Excellence Award.",
            "• Excellence in Commercial Real Estate: Commended by NCR Urban Infrastructure Forum.",
            "• Iconic Retail & Entertainment Destination: Awarded by Retail Developers Association India.",
            "• Developer Track Record: Celebrating 20+ years of successful commercial deliveries."
        ]
    )

    # =========================================================================
    # SLIDE 13: 4-Step Buyer Journey Onboarding
    # =========================================================================
    add_slide_with_screenshot(
        "12. 4-STEP BUYER JOURNEY ONBOARDING",
        "Transparent Consultation to RERA Booking",
        "12_buyer_journey.png",
        [
            "• Step 01 - Price Sheet Consultation: Review unit availability and BSP cost sheets with Relationship Director.",
            "• Step 02 - VIP On-Site Walkthrough: Guided 3D model and layout experience at Plot C-3 site office.",
            "• Step 03 - Payment Plan Selection: Customize between Down Payment, Special 40:25:25, or CLP.",
            "• Step 04 - RERA Collection Booking: 10% booking amount paid to official Axis Bank collection account."
        ]
    )

    # =========================================================================
    # SLIDE 14: Footer & RERA Collection Account
    # =========================================================================
    add_slide_with_screenshot(
        "13. FOOTER & OFFICIAL RERA BANK DETAILS",
        "RERA Registration, Collection Account & Disclaimers",
        "13_footer.png",
        [
            "• Official Bank Account: Shree Kunj Bihariji Realty Pvt. Ltd. Collection Account for KB West Walk.",
            "• Axis Bank Ltd Details: A/C No: 925020035796321 | IFSC: UTIB0005181 (Alpha II Branch).",
            "• Site Office: Plot No. C-3, Ecotech-12, Greater Noida West - 201318.",
            "• Corporate Office: FF-39, First Floor, KB Complex, Plot LS-1, Alpha-2, Greater Noida.",
            "• RERA Compliance: Reg No UPRERAPRJ422027/01/2026 | Promoter UPRERAPRM414706."
        ]
    )

    # =========================================================================
    # SLIDE 15: Modal Showcase - VIP Site Visit Booking
    # =========================================================================
    add_slide_with_screenshot(
        "14. MODAL SHOWCASE: VIP SITE VISIT BOOKING",
        "Interactive On-Site Guided Visit Scheduling Modal",
        "modal_vip_site_visit.png",
        [
            "• Instant Date & Time Picker: Schedule on-site guided tour at Plot C-3, Ecotech-12.",
            "• Transport Option: Option for complimentary VIP cab pickup/drop service.",
            "• Automated Math CAPTCHA: Security check preventing automated spam entries.",
            "• Real-Time Lead Dispatch: Webhook integration sending lead instantly to CRM vault & sales team."
        ]
    )

    # =========================================================================
    # SLIDE 16: Modal Showcase - Architectural Floor Plans
    # =========================================================================
    add_slide_with_screenshot(
        "15. MODAL SHOWCASE: ARCHITECTURAL FLOOR PLANS",
        "Detailed Layout Schematics for Retail Shops & Studio Suites",
        "modal_floor_plans.png",
        [
            "• High-Resolution Blueprint Viewer: Floor plan schematics for Lower Ground, Ground, 1st Floor & Studio Suites.",
            "• Key Specs Display: Super Area, Carpet Area, ceiling heights, and atrium facing alignment.",
            "• Direct Download CTA: Download complete digital brochure (PDF) with full floor specs.",
            "• Responsive Tab Navigation: Switch between retail floor maps easily."
        ]
    )

    # =========================================================================
    # SLIDE 17: Modal Showcase - KB Concierge AI Assistant
    # =========================================================================
    add_slide_with_screenshot(
        "16. MODAL SHOWCASE: KB CONCIERGE AI ASSISTANT",
        "Conversational AI Chatbot with Google Search Grounding",
        "modal_ai_concierge_bot.png",
        [
            "• Powered by Gemini API: Utilizes Google Gemini Flash with Live Search Grounding.",
            "• Real-Time Market Data: Fetches live commercial real estate benchmarks from 99acres & Magicbricks.",
            "• Clean Output Rules: Strict formatting without asterisks for clear presentation.",
            "• Interactive Matchmaker: Guided 4-step decision tree for investment advisory and callback booking."
        ]
    )

    # =========================================================================
    # SLIDE 18: Modal Showcase - Buyer Leads Vault & CRM
    # =========================================================================
    add_slide_with_screenshot(
        "17. MODAL SHOWCASE: BUYER LEADS & CRM VAULT",
        "Local Storage Lead Vault & CRM Export Capabilities",
        "modal_buyer_leads_vault.png",
        [
            "• Secured Director Access: Access via Ctrl+Shift+L shortcut for real-time lead monitoring.",
            "• Lead Details Capture: Full Name, Phone, Email, Selected Unit, and Intent Scoring.",
            "• Multi-CRM Export: Download captured buyer inquiries directly to CSV or JSON formats.",
            "• Failover Multi-Dispatch: Dual API routing via Web3Forms and FormSubmit."
        ]
    )

    prs.save(output_ppt)
    print(f"Master presentation updated successfully with top company logo, bottom project logo & full address footer at: {output_ppt}")

if __name__ == "__main__":
    create_kb_west_walk_presentation()
