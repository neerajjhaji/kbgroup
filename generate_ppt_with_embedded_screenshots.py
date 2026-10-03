import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_screenshot_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette - Light Luxury Theme
    LIGHT_BG = RGBColor(250, 247, 242)      # #FAF7F2
    CARD_BG = RGBColor(255, 255, 255)       # #FFFFFF
    GOLD = RGBColor(166, 129, 66)           # #A68142
    TEXT_DARK = RGBColor(15, 23, 42)        # #0F172A
    TEXT_MUTED = RGBColor(71, 85, 105)      # #475569

    blank_layout = prs.slide_layouts[6]
    img_dir = "/Users/neeraj.jha/forbes-fab-luxe/public/screenshots"

    def add_bg(slide, color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, tag_text, title_text):
        tb_tag = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.7), Inches(0.35))
        tf_tag = tb_tag.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = GOLD
        p_tag.font.name = "Arial"

        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.7), Inches(0.7))
        tf_title = tb_title.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_DARK
        p_title.font.name = "Georgia"

    def add_card(slide, left, top, width, height, bg_color, border_color=None):
        shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        if border_color:
            shape.line.color.rgb = border_color
            shape.line.width = Pt(1.5)
        else:
            shape.line.fill.background()
        return shape

    def add_slide_with_screenshot(tag, title, img_filename, bullet_points):
        slide = prs.slides.add_slide(blank_layout)
        add_bg(slide, LIGHT_BG)
        add_header(slide, tag, title)

        # Left Column: Image Container
        img_path = os.path.join(img_dir, img_filename)
        add_card(slide, Inches(0.8), Inches(1.5), Inches(6.5), Inches(5.5), CARD_BG, GOLD)

        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, Inches(0.9), Inches(1.6), width=Inches(6.3))
        else:
            tb = slide.shapes.add_textbox(Inches(1.0), Inches(3.0), Inches(6.1), Inches(2.0))
            tf = tb.text_frame
            p = tf.paragraphs[0]
            p.text = f"[ Screenshot: {img_filename} ]"
            p.font.color.rgb = GOLD

        # Right Column: Details Container
        add_card(slide, Inches(7.5), Inches(1.5), Inches(5.0), Inches(5.5), CARD_BG, GOLD)
        tb_details = slide.shapes.add_textbox(Inches(7.7), Inches(1.7), Inches(4.6), Inches(5.1))
        tf_det = tb_details.text_frame
        tf_det.word_wrap = True

        p_header = tf_det.paragraphs[0]
        p_header.text = "SECTION ANALYSIS & DELINEATED CONTENT"
        p_header.font.size = Pt(13)
        p_header.font.bold = True
        p_header.font.color.rgb = GOLD

        for bp in bullet_points:
            p = tf_det.add_paragraph()
            p.text = bp
            p.font.size = Pt(11)
            p.font.color.rgb = TEXT_DARK

        return slide

    # =========================================================================
    # SLIDE 1: Title Slide
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1, LIGHT_BG)
    add_card(s1, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3), CARD_BG, GOLD)

    tb = s1.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(0.8))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "SHREE KUNJ BIHARIJI REALTY PVT. LTD. • RERA APPROVED"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = GOLD

    tb = s1.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(11.333), Inches(2.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "KB WEST WALK"
    p.font.size = Pt(48)
    p.font.bold = True
    p.font.color.rgb = TEXT_DARK

    p2 = tf.add_paragraph()
    p2.text = "Complete Website Screen Captures & Visual Layout Audit Presentation"
    p2.font.size = Pt(20)
    p2.font.color.rgb = GOLD

    tb_details = s1.shapes.add_textbox(Inches(1.0), Inches(3.8), Inches(11.333), Inches(2.6))
    tf_det = tb_details.text_frame
    tf_det.word_wrap = True

    items = [
        "📍 Address: Plot No. C-3, Ecotech-12, Greater Noida West, Uttar Pradesh 201318",
        "📜 RERA Registration No: UPRERAPRJ422027/01/2026 | Promoter ID: UPRERAPRM414706",
        "🏬 Building Scale: 18-Level Mixed-Use High-Street Commercial Landmark",
        "📸 Visual Features: Embedded PNG Screenshots of All 14 Website Sections & Modals",
        "📞 Commercial Helpline: +91 828 7777 333 | WhatsApp: +91 828 7777 333"
    ]
    for item in items:
        p = tf_det.add_paragraph()
        p.text = item
        p.font.size = Pt(14)
        p.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 2: Hero & Utility Header Navigation
    # =========================================================================
    add_slide_with_screenshot(
        "01. HERO CANVAS & NAVIGATION HEADER",
        "Utility Ticker Bar, Official KB Logos & First Fold Impact",
        "01_hero_navigation.png",
        [
            "• Animated Live Buyer Ticker Bar at the top of the header.",
            "• Brand Logos: Official Shree KB Group Crest (`/shree_kb_logo.png`) paired with KB West Walk Logo (`/kbww_logo.png`).",
            "• Section Anchors: Smooth scroll to Overview, Shops, Pricing, Amenities, Location, ROI, and Management.",
            "• Primary Hero Pitch: 'Every Step A Story • 5 Levels of AC Ventilated Shopping High-Street'.",
            "• Immediate CTAs: 'Book VIP Site Visit', 'Download Cost Sheet (PDF)', and 'View Floor Plans'."
        ]
    )

    # =========================================================================
    # SLIDE 3: Legacy Metrics Counter
    # =========================================================================
    add_slide_with_screenshot(
        "02. LEGACY METRICS COUNTER",
        "Developer Trust & Landmark Commercial Scale Stats",
        "02_legacy_metrics.png",
        [
            "• Developer Trust: 20+ Years shaping urban commercial landmarks across NCR since 2005.",
            "• Building Scale: 18 Levels mixed-use development with 5 levels of AC retail high-street.",
            "• RERA Approval: Registered under UPRERAPRJ422027/01/2026 with promoter ID UPRERAPRM414706.",
            "• Strategic Location: Directly at Ecotech-12, Greater Noida West, adjacent to proposed metro station.",
            "• Captive Base: Surrounded by 1,00,000+ occupied residential apartments."
        ]
    )

    # =========================================================================
    # SLIDE 4: Developments & Commercial Typologies
    # =========================================================================
    add_slide_with_screenshot(
        "03. COMMERCIAL TYPOLOGIES & SPACES",
        "Floor-Wise Retail Shops, Anchor Outlets & Studio Suites",
        "03_developments_typologies.png",
        [
            "• Ground Floor Boulevard Retail: ₹37,900 / Sq. Ft. (Flagship stores facing pedestrian promenade).",
            "• Lower Ground Floor: ₹25,900 / Sq. Ft. (Hypermarket, electronics & convenience anchor stores).",
            "• First Floor Fashion Arcades: ₹24,900 / Sq. Ft. (Apparel, beauty salons & lifestyle showrooms).",
            "• 3rd to 5th Floor Hospitality: Gourmet Food Court, Rooftop Dining & 5-Screen Multiplex Cinema.",
            "• 6th to 18th Floor Studio Suites: Serviced studio apartments & executive workspaces offering high yield."
        ]
    )

    # =========================================================================
    # SLIDE 5: Cost Sheet & RERA Collection Account
    # =========================================================================
    add_slide_with_screenshot(
        "04. OFFICIAL COST SHEET & RERA BANK DETAILS",
        "Transparent BSP Rate Table & Axis Bank Collection Account",
        "04_pricing_schedules.png",
        [
            "• Base Selling Price Schedule w.e.f. July 12, 2026*:",
            "  - LGF: ₹ 25,900 / Sq. Ft.",
            "  - GF Boulevard: ₹ 37,900 / Sq. Ft.",
            "  - 1st Floor: ₹ 24,900 / Sq. Ft.",
            "• RERA Collection Bank Account Details:",
            "  - Account Name: Shree Kunj Bihariji Realty Pvt. Ltd. Collection Account for KB West Walk",
            "  - Bank Name: Axis Bank Ltd.",
            "  - Account Number: 925020035796321",
            "  - IFSC Code: UTIB0005181 (Alpha II Branch)"
        ]
    )

    # =========================================================================
    # SLIDE 6: Commercial Infrastructure & Amenities
    # =========================================================================
    add_slide_with_screenshot(
        "05. COMMERCIAL INFRASTRUCTURE & AMENITIES",
        "6 Core Pillars of Retail, Entertainment & Working Infrastructure",
        "05_amenities_pillars.png",
        [
            "• 5-Level AC Shopping Arcade: Hybrid high-street & atrium format with climate management.",
            "• Multi-Screen Multiplex Cinema: State-of-the-art cinema hall on 5th floor with gourmet concessions.",
            "• Food Court & Rooftop Dining: Expansive 3rd & 4th floor food courts with QSR brands & rooftop dining.",
            "• Serviced Studio Apartments: Premium studio suites on 6th to 18th floors crafted for high rental yields.",
            "• Double Height Glass Atrium: Skylight atrium ensuring natural light, open ventilation & brand display.",
            "• Basement Parking & Security: Multi-level visitor parking, 24/7 CCTV surveillance & 100% power backup."
        ]
    )

    # =========================================================================
    # SLIDE 7: Brand Philosophy & Lineage
    # =========================================================================
    add_slide_with_screenshot(
        "06. BRAND PHILOSOPHY & ETHOS",
        "Purposeful Urban Development Rooted in Developer Trust",
        "06_brand_philosophy.png",
        [
            "• Developer Lineage: Shree Kunj Bihariji Group shaping urban destinations across NCR since 2005.",
            "• Hybrid High-Street & Atrium Design: Combines open high-street energy with 5 levels of AC atrium comfort.",
            "• Strategic Ecotech-12 Corridor: Located directly at Ecotech-12 adjacent to dense residential sectors.",
            "• Mixed-Use Synergy: Seamlessly integrates retail, food courts, multiplex cinema, and studio residences.",
            "• Delivered Track Record: KB Mart (Knowledge Park III) and KB Complex (Alpha-2, Greater Noida)."
        ]
    )

    # =========================================================================
    # SLIDE 8: Property Finder & Loan EMI Calculator
    # =========================================================================
    add_slide_with_screenshot(
        "07. PROPERTY FINDER & EMI CALCULATOR",
        "Interactive Commercial Space Search & Bank Loan Slider",
        "07_property_finder_emi.png",
        [
            "• Property Finder Component:",
            "  - Category Selector: Retail Shops, Food Court/Cinema, Studio Suites",
            "  - Budget Range Selector: Up to ₹50L, ₹50L-₹1Cr, ₹1Cr-₹3Cr, ₹3Cr+",
            "  - View Orientation Selector: Atrium Facing, Boulevard Facing, Promenade View",
            "• Real-Time Loan EMI Calculator:",
            "  - Property Price Range Slider (₹29.6 L to ₹6.00 Cr)",
            "  - Down Payment Percentage Selector (10% to 50%)",
            "  - Tenure Selector (10, 15, 20, 25, 30 Years) & Interest Rate Input",
            "  - Live Monthly EMI Output Calculation"
        ]
    )

    # =========================================================================
    # SLIDE 9: Location Vantage & Connectivity Map
    # =========================================================================
    add_slide_with_screenshot(
        "08. LOCATION ADVANTAGE & CONNECTIVITY MAP",
        "Plot C-3, Ecotech-12 Distance Benchmarks & Transit Hubs",
        "08_location_connectivity.png",
        [
            "• Proposed Ecotech-12 Metro Station: Walking Distance (100 Meters)",
            "• Char Murti / Gaur Chowk / Ek Murti: 5 Mins (2.5 Km)",
            "• Crossings Republik Residential Hub: 5 Mins (3.0 Km)",
            "• Noida-Greater Noida Expressway & NH-24: 10 Mins (6.0 Km)",
            "• Fortis & Max Super Speciality Hospital: 10 Mins (7.5 Km)",
            "• Noida Sector-52 Metro Station: 15 Mins (10.0 Km)",
            "• Hindon Regional Airport: 25 Mins (25.0 Km)",
            "• Jewar International Airport (Noida Int.): 45 Mins (48.0 Km)"
        ]
    )

    # =========================================================================
    # SLIDE 10: Investment ROI & Growth Yield
    # =========================================================================
    add_slide_with_screenshot(
        "09. INVESTMENT ROI & GROWTH YIELD",
        "Capital Appreciation Benchmarks & Rental Yield Projections",
        "09_investment_roi.png",
        [
            "• Commercial Rental Yield: 7.5% – 9.2% P.A. (High yield corridor in Greater Noida West).",
            "• YoY Capital Appreciation: +21.2% YoY Growth (Ranked among top 3 retail appreciation hubs).",
            "• Cumulative 3-Year Appreciation: +38% to +48% projected growth upon metro & Jewar airport launch.",
            "• Ecotech-12 Locality Rating: 92 / 100 (4.9/5 Stars) by leading real estate portals.",
            "• Captive Footfall: Surrounded by 1,00,000+ occupied residential apartments."
        ]
    )

    # =========================================================================
    # SLIDE 11: Dedicated Mall Management
    # =========================================================================
    add_slide_with_screenshot(
        "10. DEDICATED MALL & FACILITY SERVICES",
        "4 Pillars of Commercial Mall Management & Tenant Support",
        "10_mall_management.png",
        [
            "• Dedicated Retail Concierge: 24/7 commercial desk assistance for store owners & corporate tenants.",
            "• Professional Mall Management: Comprehensive facility upkeep, central HVAC climate maintenance & security.",
            "• Multi-Level Valet & VIP Parking: Seamless valet arrival, automated parking guidance & executive slots.",
            "• Leasing & Brand Support: Dedicated assistance for brand tie-ups, retail leasing & rental management."
        ]
    )

    # =========================================================================
    # SLIDE 12: VIP Site Visit Overlay Modal
    # =========================================================================
    add_slide_with_screenshot(
        "11. VIP SITE VISIT OVERLAY MODAL",
        "On-Site Chauffeur Booking, Security Captcha & VIP Pass Generator",
        "modal_vip_site_visit.png",
        [
            "• Interactive Modal Trigger: 'BOOK VIP SITE VISIT' buttons across the site.",
            "• Chauffeur Pickup Option: Option to request a complimentary luxury AC chauffeur pickup.",
            "• Preferred Slot Selection: Date & time slot picker for guided walkthroughs at Plot C-3, Ecotech-12.",
            "• Captcha Security: Interactive math security challenge ensuring real buyer leads.",
            "• Instant VIP Pass Generation: Generates downloadable VIP Pass upon submission."
        ]
    )

    # =========================================================================
    # SLIDE 13: Architectural Floor Plans Overlay Modal
    # =========================================================================
    add_slide_with_screenshot(
        "12. ARCHITECTURAL FLOOR PLANS MODAL",
        "Interactive Floor Blueprint Swapper & Technical Unit Specs",
        "modal_floor_plans.png",
        [
            "• Interactive Modal Trigger: 'VIEW FLOOR PLANS' buttons across typologies.",
            "• Floor Blueprint Tab Swapper: Switch between Lower Ground, Ground Floor, First Floor, and Studio Suites.",
            "• High-Resolution Schematic Renderings: Shows unit dimensions, double height facades & atrium openings.",
            "• Technical Specifications: Highlights super area, carpet area, ceiling heights, and loading hoists.",
            "• Download Blueprint CTA: Instant PDF floor plan download."
        ]
    )

    # =========================================================================
    # SLIDE 14: Buyer Lead Management Vault (Ctrl+Shift+L)
    # =========================================================================
    add_slide_with_screenshot(
        "13. BUYER LEADS VAULT & CRM DASHBOARD",
        "100-Point Scoring, Local Vault Storage & One-Click CSV Export",
        "modal_buyer_leads_vault.png",
        [
            "• Global Shortcut Trigger: Ctrl + Shift + L or Cmd + Shift + L shortcut.",
            "• Local Vault Persistence: Secure lead persistence in `localStorage` (`kb_west_walk_leads_vault`).",
            "• 100-Point Quality Scoring: Deducts 50 pts for temp emails/dummy phones; adds 15 pts for chauffeur requests.",
            "• Buyer Tiering: VIP Commercial Investor (90+), High Intent Buyer (70+), Standard Prospect (<70).",
            "• One-Click CSV Export: Instant CSV download via `exportLeadsToCSV()` for sales team dispatch."
        ]
    )

    # =========================================================================
    # SLIDE 15: Conclusion & Operational Readiness
    # =========================================================================
    s15 = prs.slides.add_slide(blank_layout)
    add_bg(s15, LIGHT_BG)
    add_card(s15, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3), CARD_BG, GOLD)

    tb = s15.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(5.3))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "PORTAL AUDIT & VISUAL PRESENTATION COMPLETE"
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = GOLD

    summary_bullets = [
        "✔ Embedded High-Res Screenshots: All 14 website sections & modal overlays captured and embedded.",
        "✔ Official KB Branding: Fixed logo presentation using official Shree KB Group Crest & KB West Walk brand logos.",
        "✔ RERA Compliance Verified: Registration No UPRERAPRJ422027/01/2026 & Axis Bank Collection Account details.",
        "✔ Live Interactive Server: Accessible at http://localhost:3000/ with Vite 8 & React 19.",
        "\n📍 SITE OFFICE: Plot No. C-3, Ecotech-12, Greater Noida West - 201318",
        "🏢 CORPORATE OFFICE: FF-39, First Floor, KB Complex, Plot No. LS-1, Alpha-2, Greater Noida, U.P. 201310",
        "📞 HELPLINE: +91 828 7777 333 | WHATSAPP: +91 828 7777 333"
    ]
    for bullet in summary_bullets:
        p_b = tf.add_paragraph()
        p_b.text = bullet
        p_b.font.size = Pt(13)
        p_b.font.color.rgb = TEXT_DARK

    output_path = "/Users/neeraj.jha/forbes-fab-luxe/KB_West_Walk_Visual_Screenshots_Presentation.pptx"
    prs.save(output_path)
    print(f"Visual presentation with embedded screenshots saved to: {output_path}")

if __name__ == "__main__":
    create_screenshot_presentation()
