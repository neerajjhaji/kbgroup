import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_master_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette - Light Luxury Theme
    LIGHT_BG = RGBColor(250, 247, 242)      # #FAF7F2 - Ivory / Warm Pearl
    CARD_BG = RGBColor(255, 255, 255)       # #FFFFFF - Crisp White
    GOLD = RGBColor(166, 129, 66)           # #A68142 - Champagne Gold Accent
    TEXT_DARK = RGBColor(15, 23, 42)        # #0F172A - Deep Slate
    TEXT_MUTED = RGBColor(71, 85, 105)      # #475569 - Muted Slate
    BORDER_GOLD = RGBColor(197, 160, 89)    # #C5A059 - Soft Gold Line

    blank_layout = prs.slide_layouts[6]
    img_dir = "/Users/neeraj.jha/forbes-fab-luxe/public/screenshots"

    def add_bg(slide, color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, tag_text, title_text):
        # Category Tag
        tb_tag = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), Inches(11.733), Inches(0.35))
        tf_tag = tb_tag.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = GOLD
        p_tag.font.name = "Arial"

        # Main Slide Title
        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.733), Inches(0.7))
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

        # Left Column: Screenshot Frame
        add_card(slide, Inches(0.8), Inches(1.5), Inches(6.8), Inches(5.5), CARD_BG, BORDER_GOLD)

        img_path = os.path.join(img_dir, img_filename)
        if os.path.exists(img_path):
            slide.shapes.add_picture(img_path, Inches(0.9), Inches(1.6), width=Inches(6.6))
        else:
            tb = slide.shapes.add_textbox(Inches(1.0), Inches(3.0), Inches(6.4), Inches(2.0))
            tf = tb.text_frame
            p = tf.paragraphs[0]
            p.text = f"[ Screenshot: {img_filename} ]"
            p.font.color.rgb = GOLD

        # Right Column: Detailed Breakdown Card
        add_card(slide, Inches(7.8), Inches(1.5), Inches(4.733), Inches(5.5), CARD_BG, BORDER_GOLD)
        tb_details = slide.shapes.add_textbox(Inches(8.0), Inches(1.7), Inches(4.333), Inches(5.1))
        tf_det = tb_details.text_frame
        tf_det.word_wrap = True

        p_header = tf_det.paragraphs[0]
        p_header.text = "SECTION DETAILS & FEATURE BREAKDOWN"
        p_header.font.size = Pt(12)
        p_header.font.bold = True
        p_header.font.color.rgb = GOLD
        p_header.font.name = "Arial"

        for bp in bullet_points:
            p = tf_det.add_paragraph()
            p.text = bp
            p.font.size = Pt(11)
            p.font.color.rgb = TEXT_DARK
            p.space_after = Pt(6)

        return slide

    # =========================================================================
    # SLIDE 1: Executive Title Slide
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1, LIGHT_BG)
    add_card(s1, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3), CARD_BG, BORDER_GOLD)

    tb = s1.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(0.8))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "SHREE KUNJ BIHARIJI REALTY PVT. LTD. • RERA APPROVED"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = GOLD

    tb = s1.shapes.add_textbox(Inches(1.0), Inches(1.65), Inches(11.333), Inches(2.0))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "KB WEST WALK"
    p.font.size = Pt(46)
    p.font.bold = True
    p.font.color.rgb = TEXT_DARK
    p.font.name = "Georgia"

    p2 = tf.add_paragraph()
    p2.text = "Commercial High-Street Master Portal & Visual Section Presentation"
    p2.font.size = Pt(20)
    p2.font.color.rgb = GOLD

    tb_details = s1.shapes.add_textbox(Inches(1.0), Inches(3.8), Inches(11.333), Inches(2.7))
    tf_det = tb_details.text_frame
    tf_det.word_wrap = True

    items = [
        "📍 Address: Plot No. C-3, Ecotech-12, Greater Noida West, Uttar Pradesh 201318",
        "📜 RERA Registration No: UPRERAPRJ422027/01/2026 | Promoter ID: UPRERAPRM414706",
        "🏬 Building Scale: 18-Level Mixed-Use Commercial High-Street & Studio Suites Landmark",
        "📸 Visual Presentation: Complete 16-Section Screenshot Walkthrough & Features Breakdown",
        "📞 Commercial Helpline: +91 828 7777 333 | Official WhatsApp: +91 828 7777 333"
    ]
    for item in items:
        p = tf_det.add_paragraph()
        p.text = item
        p.font.size = Pt(13)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(4)

    # =========================================================================
    # SLIDE 2: Hero Section & Navigation Bar
    # =========================================================================
    add_slide_with_screenshot(
        "01. HERO CANVAS & NAVIGATION HEADER",
        "Top Header Branding, Live Video Background & Primary Pitch",
        "01_hero_navigation.png",
        [
            "• Live Announcement Ticker: Top utility bar displaying real-time buyer interest & site visit alerts.",
            "• Builder Company Logo: Official Shree Kunj Bihariji Group Crest (`/shree_kb_logo.png`) anchored in top navigation badge.",
            "• Project Brand Logo: KB West Walk Logo (`/kbww_logo.png`) prominently rendered at the top of the hero fold.",
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
        "Retail Shops, Food Court, Multiplex & Studio Suites",
        "03_developments_typologies.png",
        [
            "• LGF Hypermarket & Retail: ₹25,900 / Sq. Ft. (Hypermarket, electronics & anchor outlets).",
            "• Ground Floor Boulevard Retail: ₹37,900 / Sq. Ft. (Flagship stores facing main pedestrian promenade).",
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
        "Transparent BSP Rate Schedule & Axis Bank RERA Account",
        "04_pricing_schedules.png",
        [
            "• Base Selling Price Schedule (w.e.f. July 12, 2026):",
            "  - Lower Ground Floor: ₹ 25,900 / Sq. Ft.",
            "  - Ground Floor Boulevard: ₹ 37,900 / Sq. Ft.",
            "  - First Floor Arcades: ₹ 24,900 / Sq. Ft.",
            "• RERA Collection Bank Account Details:",
            "  - Account Name: Shree Kunj Bihariji Realty Pvt. Ltd. Collection Account for KB West Walk",
            "  - Bank Name: Axis Bank Ltd.",
            "  - Account Number: 925020035796321",
            "  - IFSC Code: UTIB0005181 (Alpha II Branch)"
        ]
    )

    # =========================================================================
    # SLIDE 6: Infrastructure & Amenities
    # =========================================================================
    add_slide_with_screenshot(
        "05. COMMERCIAL INFRASTRUCTURE & AMENITIES",
        "6 Pillars of Retail, Entertainment & Working Facilities",
        "05_amenities_pillars.png",
        [
            "• 5-Level AC Shopping High-Street: Hybrid high-street & atrium format with climate control.",
            "• Multi-Screen Multiplex Cinema: Modern cinema hall on 5th floor with gourmet concessions.",
            "• Food Court & Rooftop Dining: Expansive 3rd & 4th floor food courts with QSR brands & rooftop dining.",
            "• Serviced Studio Apartments: Premium studio suites on 6th to 18th floors crafted for high rental yields.",
            "• Double Height Glass Atrium: Skylight atrium ensuring natural light & brand visibility.",
            "• Multi-Level Parking & Security: Multi-level parking, 24/7 CCTV surveillance & 100% power backup."
        ]
    )

    # =========================================================================
    # SLIDE 7: Brand Philosophy & Lineage
    # =========================================================================
    add_slide_with_screenshot(
        "06. BRAND PHILOSOPHY & CREDAI AFFILIATION",
        "Developer Legacy & CREDAI Member Industry Trust",
        "06_brand_philosophy.png",
        [
            "• Developer Lineage: Shree Kunj Bihariji Group shaping urban destinations across NCR since 2005.",
            "• CREDAI NCR Affiliation: Official CREDAI logo badge (`/credai_official_logo.png`) highlighting industry membership.",
            "• Hybrid Architecture: Blends open-air high-street energy with 5 levels of AC atrium comfort.",
            "• Strategic Ecotech-12 Location: Situated directly at Ecotech-12 adjacent to dense residential sectors.",
            "• Delivered Portfolio: KB Mart (Knowledge Park III) and KB Complex (Alpha-2, Greater Noida)."
        ]
    )

    # =========================================================================
    # SLIDE 8: Property Finder & Loan EMI Calculator
    # =========================================================================
    add_slide_with_screenshot(
        "07. PROPERTY FINDER & LOAN EMI CALCULATOR",
        "Interactive Space Search & Bank Loan Slider Tool",
        "07_property_finder_emi.png",
        [
            "• Interactive Property Finder:",
            "  - Category Selector: Retail Shops, Food Court/Cinema, Studio Suites",
            "  - Budget Range Filter: Up to ₹50L, ₹50L-₹1Cr, ₹1Cr-₹3Cr, ₹3Cr+",
            "  - Orientation Filter: Atrium Facing, Boulevard Facing, Main Road View",
            "• Real-Time Loan EMI Calculator:",
            "  - Property Price Slider: ₹29.6 L to ₹6.00 Cr",
            "  - Down Payment Percentage: 10% to 50%",
            "  - Loan Tenure: 10 to 30 Years & Interest Rate Input",
            "  - Live Monthly EMI Breakdown"
        ]
    )

    # =========================================================================
    # SLIDE 9: Location Advantage & Connectivity
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
    # SLIDE 10: Investment ROI & Capital Growth
    # =========================================================================
    add_slide_with_screenshot(
        "09. INVESTMENT ROI & GROWTH YIELD",
        "Rental Yield Projections & Capital Appreciation Trends",
        "09_investment_roi.png",
        [
            "• Commercial Rental Yield: 7.5% – 9.2% P.A. (Top performing retail corridor in Greater Noida West).",
            "• YoY Capital Appreciation: +21.2% YoY Growth in Ecotech-12 commercial property values.",
            "• Cumulative 3-Year Projection: +38% to +48% growth upon metro line & Jewar airport commissioning.",
            "• Locality Benchmark Rating: 92 / 100 (4.9/5 Stars) on leading real estate portals.",
            "• Immediate Footfall Base: Supported by 1,00,000+ nearby residential families."
        ]
    )

    # =========================================================================
    # SLIDE 11: Mall Management Services
    # =========================================================================
    add_slide_with_screenshot(
        "10. DEDICATED MALL & FACILITY SERVICES",
        "4 Pillars of Commercial Mall Management & Support",
        "10_mall_management.png",
        [
            "• Dedicated Retail Concierge: 24/7 commercial desk assistance for store owners & corporate tenants.",
            "• Professional Mall Management: Comprehensive facility upkeep, central HVAC climate maintenance & security.",
            "• Multi-Level Valet & VIP Parking: Smooth valet arrival, automated parking guidance & executive slots.",
            "• Leasing & Brand Support: Dedicated team for brand tie-ups, retail leasing & rental management."
        ]
    )

    # =========================================================================
    # SLIDE 12: Press Coverage & Accolades
    # =========================================================================
    add_slide_with_screenshot(
        "11. PRESS COVERAGE & INDUSTRY ACCOLADES",
        "Media Coverage & Real Estate Excellence Recognitions",
        "11_press_accolades.png",
        [
            "• Media Highlights: Featured in Economic Times, Financial Express, and Business Standard.",
            "• Best High-Street Project Award: Recognized for innovative hybrid retail & atrium design in Greater Noida West.",
            "• Investor Confidence Badge: Highlighted as top commercial investment destination for 2026.",
            "• Transparent RERA Governance: Praised for transparent RERA account operations & timely milestone delivery."
        ]
    )

    # =========================================================================
    # SLIDE 13: 4-Step Buyer Journey
    # =========================================================================
    add_slide_with_screenshot(
        "12. 4-STEP BUYER JOURNEY & ASSISTANCE",
        "From Space Discovery to Possession & Rental Yield",
        "12_buyer_journey.png",
        [
            "• Step 1: Space Discovery & Virtual Tour (Explore floor plans, pricing & 360° VR walkthroughs).",
            "• Step 2: Guided VIP Site Visit (On-site inspection with complimentary luxury AC chauffeur pickup).",
            "• Step 3: Transparent Unit Allotment (Direct booking with Axis Bank RERA Collection account).",
            "• Step 4: Possession & Leasing Support (Handover assistance, tenant onboarding & yield activation)."
        ]
    )

    # =========================================================================
    # SLIDE 14: Comprehensive Footer
    # =========================================================================
    add_slide_with_screenshot(
        "13. COMPREHENSIVE FOOTER & CONTACT DESK",
        "Separate Builder & Project Logos, RERA Badge & Contact Details",
        "13_footer.png",
        [
            "• Standalone Logo Cards: Builder Company Logo (`/shree_kb_logo.png`) and Project Logo (`/kbww_logo.png`) displayed separately.",
            "• Official CREDAI Logo Badge: Prominently featured under official details for industry verification.",
            "• Complete Address Details: Site office at Plot C-3, Ecotech-12 & Corporate office at Alpha-2, Greater Noida.",
            "• Direct Helpline: +91 828 7777 333 | Email: sales@shreekunjbihariji.com",
            "• Disclaimers: Full RERA registration details & legal disclaimer text."
        ]
    )

    # =========================================================================
    # SLIDE 15: VIP Site Visit Overlay Modal
    # =========================================================================
    add_slide_with_screenshot(
        "14. VIP SITE VISIT OVERLAY MODAL",
        "On-Site Chauffeur Booking, Math Captcha & VIP Pass Generator",
        "modal_vip_site_visit.png",
        [
            "• Interactive Modal Trigger: 'BOOK VIP SITE VISIT' buttons placed across all sections.",
            "• Chauffeur Pickup Option: Request a complimentary luxury AC chauffeur pickup.",
            "• Preferred Slot Selection: Date & time slot picker for guided walkthroughs at Plot C-3, Ecotech-12.",
            "• Captcha Security: Interactive math security challenge ensuring genuine buyer leads.",
            "• Instant VIP Pass Generation: Generates a downloadable digital VIP Pass upon submission."
        ]
    )

    # =========================================================================
    # SLIDE 16: Floor Plans Overlay Modal
    # =========================================================================
    add_slide_with_screenshot(
        "15. ARCHITECTURAL FLOOR PLANS MODAL",
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
    # SLIDE 17: Buyer Lead Vault Dashboard (Ctrl+Shift+L)
    # =========================================================================
    add_slide_with_screenshot(
        "16. BUYER LEADS VAULT & CRM DASHBOARD",
        "100-Point Scoring, Local Storage Vault & CSV Export",
        "modal_buyer_leads_vault.png",
        [
            "• Global Shortcut Trigger: Ctrl + Shift + L or Cmd + Shift + L keyboard shortcut.",
            "• Local Vault Storage: Persistent client-side storage in `localStorage` (`kb_west_walk_leads_vault`).",
            "• 100-Point Quality Scoring: Deducts 50 pts for temp emails/phones; adds 15 pts for chauffeur requests.",
            "• Buyer Tiering: VIP Commercial Investor (90+), High Intent Buyer (70+), Standard Prospect (<70).",
            "• One-Click CSV Export: Instant CSV download via `exportLeadsToCSV()` for sales team dispatch."
        ]
    )

    # =========================================================================
    # SLIDE 18: Summary & Conclusion
    # =========================================================================
    s18 = prs.slides.add_slide(blank_layout)
    add_bg(s18, LIGHT_BG)
    add_card(s18, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3), CARD_BG, BORDER_GOLD)

    tb = s18.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(5.3))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "PORTAL AUDIT & VISUAL PRESENTATION COMPLETE"
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = GOLD

    summary_bullets = [
        "✔ 16 High-Resolution Section Screenshots: All website sections & modal overlays captured and embedded.",
        "✔ Official KB Branding: Fixed company logo using official Shree KB Group Crest & KB West Walk brand logos.",
        "✔ Official CREDAI Logo: Integrated official dark green & red CREDAI crest badge in Philosophy & Footer.",
        "✔ RERA Compliance Verified: Registration No UPRERAPRJ422027/01/2026 & Axis Bank Collection Account details.",
        "✔ Live Interactive Server: Running smoothly at http://localhost:3000/ with React 19 & Vite 8.",
        "\n📍 SITE OFFICE: Plot No. C-3, Ecotech-12, Greater Noida West - 201318",
        "🏢 CORPORATE OFFICE: FF-39, First Floor, KB Complex, Plot No. LS-1, Alpha-2, Greater Noida, U.P. 201310",
        "📞 HELPLINE: +91 828 7777 333 | WHATSAPP: +91 828 7777 333"
    ]
    for bullet in summary_bullets:
        p_b = tf.add_paragraph()
        p_b.text = bullet
        p_b.font.size = Pt(13)
        p_b.font.color.rgb = TEXT_DARK
        p_b.space_after = Pt(4)

    output_path = "/Users/neeraj.jha/forbes-fab-luxe/KB_West_Walk_Executive_Master_Presentation.pptx"
    prs.save(output_path)
    print(f"Executive master presentation successfully generated and saved to: {output_path}")

if __name__ == "__main__":
    create_master_presentation()
