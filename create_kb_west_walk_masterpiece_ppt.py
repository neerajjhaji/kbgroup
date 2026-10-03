import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from PIL import Image

def create_masterpiece_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Architectural Premium Color Palette - Light Luxury Theme
    LIGHT_BG = RGBColor(250, 247, 242)        # #FAF7F2 - Ivory / Pearl
    CARD_BG = RGBColor(255, 255, 255)         # #FFFFFF - Pure White
    DARK_CARD = RGBColor(15, 23, 42)          # #0F172A - Deep Midnight Slate
    GOLD = RGBColor(166, 129, 66)             # #A68142 - Rich Gold
    GOLD_LIGHT = RGBColor(245, 238, 225)      # #F5EEE1 - Soft Gold Fill
    TEXT_DARK = RGBColor(15, 23, 42)          # #0F172A - Primary Dark
    TEXT_MUTED = RGBColor(71, 85, 105)        # #475569 - Secondary Slate
    TEXT_LIGHT = RGBColor(241, 245, 249)      # #F1F5F9 - Light Text
    BORDER_GOLD = RGBColor(197, 160, 89)      # #C5A059 - Soft Gold Border
    BORDER_SUBTLE = RGBColor(226, 232, 240)    # #E2E8F0 - Light Gray Border

    blank_layout = prs.slide_layouts[6]
    img_dir = "/Users/neeraj.jha/Documents/kbwestwalk/public/screenshots"
    company_logo_path = "/Users/neeraj.jha/Documents/kbwestwalk/public/shree_kb_logo.png"
    project_logo_path = "/Users/neeraj.jha/Documents/kbwestwalk/public/kbww_logo.png"
    output_ppt = "/Users/neeraj.jha/Documents/kbwestwalk/KB_West_Walk_Executive_Master_Presentation.pptx"

    def add_bg(slide, color=LIGHT_BG):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, category_tag, slide_title):
        # Top Company Logo (Top Right)
        if os.path.exists(company_logo_path):
            slide.shapes.add_picture(company_logo_path, Inches(11.2), Inches(0.3), height=Inches(0.65))

        # Category Tag Badge
        tb_tag = slide.shapes.add_textbox(Inches(0.8), Inches(0.28), Inches(10.0), Inches(0.3))
        tf_tag = tb_tag.text_frame
        tf_tag.word_wrap = True
        tf_tag.margin_left = tf_tag.margin_top = tf_tag.margin_right = tf_tag.margin_bottom = 0
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = category_tag.upper()
        p_tag.font.size = Pt(10)
        p_tag.font.bold = True
        p_tag.font.color.rgb = GOLD
        p_tag.font.name = "Arial"

        # Main Title Text
        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.55), Inches(10.0), Inches(0.55))
        tf_title = tb_title.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = slide_title
        p_title.font.size = Pt(21)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_DARK
        p_title.font.name = "Georgia"

    def add_footer(slide):
        # Footer Top Rule
        rule = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(6.85), Inches(11.733), Inches(0.015))
        rule.fill.solid()
        rule.fill.fore_color.rgb = BORDER_GOLD
        rule.line.fill.background()

        # Project Logo (Bottom Left)
        if os.path.exists(project_logo_path):
            slide.shapes.add_picture(project_logo_path, Inches(0.8), Inches(6.92), height=Inches(0.45))

        # Footer Text (Bottom Right Alignment)
        tb_footer = slide.shapes.add_textbox(Inches(2.5), Inches(6.92), Inches(10.033), Inches(0.45))
        tf_footer = tb_footer.text_frame
        tf_footer.word_wrap = True
        tf_footer.margin_left = tf_footer.margin_top = tf_footer.margin_right = tf_footer.margin_bottom = 0
        p = tf_footer.paragraphs[0]
        p.alignment = PP_ALIGN.RIGHT
        p.text = "Plot No. C-3, Ecotech-12, Greater Noida West, UP 201318  |  RERA No: UPRERAPRJ422027/01/2026  |  Shree Kunj Bihariji Realty Pvt. Ltd."
        p.font.size = Pt(9)
        p.font.color.rgb = TEXT_MUTED
        p.font.name = "Arial"

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=BORDER_GOLD, border_width=1.2):
        shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
        if border_color:
            shape.line.color.rgb = border_color
            shape.line.width = Pt(border_width)
        else:
            shape.line.fill.background()
        return shape

    def get_image_aspect(path):
        if os.path.exists(path):
            with Image.open(path) as img:
                return img.size[0] / img.size[1]
        return 1.6

    def place_image_contained(slide, img_filename, container_left, container_top, container_width, container_height):
        img_path = os.path.join(img_dir, img_filename)
        if not os.path.exists(img_path):
            tb = slide.shapes.add_textbox(container_left, container_top + Inches(1.5), container_width, Inches(1.0))
            tf = tb.text_frame
            p = tf.paragraphs[0]
            p.text = f"[ Screenshot: {img_filename} ]"
            p.alignment = PP_ALIGN.CENTER
            p.font.color.rgb = GOLD
            return

        aspect = get_image_aspect(img_path)
        container_aspect = container_width / container_height

        if aspect > container_aspect:
            # Image is wider -> fit to width
            img_w = container_width - Inches(0.2)
            img_h = img_w / aspect
        else:
            # Image is taller -> fit to height
            img_h = container_height - Inches(0.2)
            img_w = img_h * aspect

        # Center inside container
        img_left = container_left + (container_width - img_w) / 2
        img_top = container_top + (container_height - img_h) / 2

        slide.shapes.add_picture(img_path, img_left, img_top, width=img_w, height=img_h)

    # =========================================================================
    # SLIDE 1: Executive Master Title Slide
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1, LIGHT_BG)

    # Outer Decorative Frame
    add_card(s1, Inches(0.6), Inches(0.5), Inches(12.133), Inches(6.5), CARD_BG, BORDER_GOLD, 1.8)

    # Inner Gold Accent Bar
    add_card(s1, Inches(0.8), Inches(0.7), Inches(11.733), Inches(0.08), GOLD, None)

    # Company Logo Top Left & Project Logo Top Right
    if os.path.exists(company_logo_path):
        s1.shapes.add_picture(company_logo_path, Inches(1.0), Inches(1.05), height=Inches(0.95))
    if os.path.exists(project_logo_path):
        s1.shapes.add_picture(project_logo_path, Inches(9.2), Inches(1.0), height=Inches(1.1))

    # Badge Text
    tb = s1.shapes.add_textbox(Inches(1.0), Inches(2.25), Inches(11.333), Inches(0.4))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "OFFICIAL COMMERCIAL REAL ESTATE MASTER PRESENTATION"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = GOLD
    p.font.name = "Arial"

    # Main Project Title
    tb = s1.shapes.add_textbox(Inches(1.0), Inches(2.65), Inches(11.333), Inches(1.6))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "KB WEST WALK"
    p.font.size = Pt(46)
    p.font.bold = True
    p.font.color.rgb = TEXT_DARK
    p.font.name = "Georgia"

    p2 = tf.add_paragraph()
    p2.text = "18-Level Mixed-Use Commercial High-Street & Studio Suites Landmark"
    p2.font.size = Pt(18)
    p2.font.color.rgb = GOLD
    p2.font.name = "Arial"

    # Divider Line
    add_card(s1, Inches(1.0), Inches(4.35), Inches(11.333), Inches(0.015), BORDER_GOLD, None)

    # Key Highlights Grid (3 Columns)
    col_w = Inches(3.644)
    col_gap = Inches(0.2)

    c1_left = Inches(1.0)
    c2_left = c1_left + col_w + col_gap
    c3_left = c2_left + col_w + col_gap

    # Card 1: RERA & Developer
    add_card(s1, c1_left, Inches(4.55), col_w, Inches(1.8), GOLD_LIGHT, BORDER_GOLD)
    tb1 = s1.shapes.add_textbox(c1_left + Inches(0.15), Inches(4.65), col_w - Inches(0.3), Inches(1.6))
    tf1 = tb1.text_frame
    tf1.word_wrap = True
    p = tf1.paragraphs[0]
    p.text = "📜 RERA APPROVAL"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = GOLD
    p_b1 = tf1.add_paragraph()
    p_b1.text = "Reg: UPRERAPRJ422027/01/2026\nPromoter ID: UPRERAPRM414706\nDeveloper: Shree KB Group"
    p_b1.font.size = Pt(10)
    p_b1.font.color.rgb = TEXT_DARK

    # Card 2: Location & Proximity
    add_card(s1, c2_left, Inches(4.55), col_w, Inches(1.8), GOLD_LIGHT, BORDER_GOLD)
    tb2 = s1.shapes.add_textbox(c2_left + Inches(0.15), Inches(4.65), col_w - Inches(0.3), Inches(1.6))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    p = tf2.paragraphs[0]
    p.text = "📍 LOCATION HUB"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = GOLD
    p_b2 = tf2.add_paragraph()
    p_b2.text = "Plot C-3, Ecotech-12, Gr. Noida West\n100m Proposed Metro Station\n5 Mins Gaur Chowk / NH-24"
    p_b2.font.size = Pt(10)
    p_b2.font.color.rgb = TEXT_DARK

    # Card 3: Key Offerings & Rates
    add_card(s1, c3_left, Inches(4.55), col_w, Inches(1.8), GOLD_LIGHT, BORDER_GOLD)
    tb3 = s1.shapes.add_textbox(c3_left + Inches(0.15), Inches(4.65), col_w - Inches(0.3), Inches(1.6))
    tf3 = tb3.text_frame
    tf3.word_wrap = True
    p = tf3.paragraphs[0]
    p.text = "🏬 RETAIL & STUDIOS"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = GOLD
    p_b3 = tf3.add_paragraph()
    p_b3.text = "Ground Boulevard: ₹37,900/sq.ft.\n1st Floor Retail: ₹24,900/sq.ft.\n5 Levels AC High-Street + Cinema"
    p_b3.font.size = Pt(10)
    p_b3.font.color.rgb = TEXT_DARK

    add_footer(s1)

    # =========================================================================
    # LAYOUT TYPE A: Left Tall Screenshot (Aspect ~0.8 to 1.1) / Right Info Cards
    # =========================================================================
    def build_layout_vertical_split(tag, title, img_filename, card_items):
        slide = prs.slides.add_slide(blank_layout)
        add_bg(slide)
        add_header(slide, tag, title)

        # Left Column Frame
        left_box_l, left_box_t, left_box_w, left_box_h = Inches(0.8), Inches(1.25), Inches(5.6), Inches(5.4)
        add_card(slide, left_box_l, left_box_t, left_box_w, left_box_h, CARD_BG, BORDER_GOLD)
        place_image_contained(slide, img_filename, left_box_l, left_box_t, left_box_w, left_box_h)

        # Right Column: 3 Aligned Feature Cards
        right_box_l, right_box_w = Inches(6.6), Inches(5.933)
        num_cards = len(card_items)
        card_h = (Inches(5.4) - (Inches(0.15) * (num_cards - 1))) / num_cards

        for i, item in enumerate(card_items):
            c_top = Inches(1.25) + i * (card_h + Inches(0.15))
            add_card(slide, right_box_l, c_top, right_box_w, card_h, CARD_BG, BORDER_GOLD)

            tb = slide.shapes.add_textbox(right_box_l + Inches(0.2), c_top + Inches(0.12), right_box_w - Inches(0.4), card_h - Inches(0.24))
            tf = tb.text_frame
            tf.word_wrap = True
            tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

            p_h = tf.paragraphs[0]
            p_h.text = item['header'].upper()
            p_h.font.size = Pt(11)
            p_h.font.bold = True
            p_h.font.color.rgb = GOLD
            p_h.font.name = "Arial"

            p_desc = tf.add_paragraph()
            p_desc.text = item['desc']
            p_desc.font.size = Pt(10)
            p_desc.font.color.rgb = TEXT_DARK
            p_desc.space_before = Pt(3)

        add_footer(slide)
        return slide

    # =========================================================================
    # LAYOUT TYPE B: Top Landscape Screenshot (Aspect > 1.4) / Bottom KPI Grid
    # =========================================================================
    def build_layout_horizontal_split(tag, title, img_filename, kpi_cards):
        slide = prs.slides.add_slide(blank_layout)
        add_bg(slide)
        add_header(slide, tag, title)

        # Top Screenshot Container
        top_l, top_t, top_w, top_h = Inches(0.8), Inches(1.25), Inches(11.733), Inches(3.55)
        add_card(slide, top_l, top_t, top_w, top_h, CARD_BG, BORDER_GOLD)
        place_image_contained(slide, img_filename, top_l, top_t, top_w, top_h)

        # Bottom 3 KPI Cards
        num_kpis = len(kpi_cards)
        kpi_w = (Inches(11.733) - (Inches(0.2) * (num_kpis - 1))) / num_kpis
        kpi_t, kpi_h = Inches(4.95), Inches(1.7)

        for i, kpi in enumerate(kpi_cards):
            k_left = Inches(0.8) + i * (kpi_w + Inches(0.2))
            add_card(slide, k_left, kpi_t, kpi_w, kpi_h, CARD_BG, BORDER_GOLD)

            tb = slide.shapes.add_textbox(k_left + Inches(0.15), kpi_t + Inches(0.15), kpi_w - Inches(0.3), kpi_h - Inches(0.3))
            tf = tb.text_frame
            tf.word_wrap = True
            tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

            p_tag = tf.paragraphs[0]
            p_tag.text = kpi['title'].upper()
            p_tag.font.size = Pt(10)
            p_tag.font.bold = True
            p_tag.font.color.rgb = GOLD

            p_val = tf.add_paragraph()
            p_val.text = kpi['value']
            p_val.font.size = Pt(16)
            p_val.font.bold = True
            p_val.font.color.rgb = TEXT_DARK
            p_val.space_before = Pt(2)

            p_sub = tf.add_paragraph()
            p_sub.text = kpi['detail']
            p_sub.font.size = Pt(9.5)
            p_sub.font.color.rgb = TEXT_MUTED
            p_sub.space_before = Pt(2)

        add_footer(slide)
        return slide

    # =========================================================================
    # SLIDES GENERATION
    # =========================================================================

    # SLIDE 2: Hero Canvas & Navigation Header
    build_layout_horizontal_split(
        "01. HERO CANVAS & NAVIGATION HEADER",
        "Top Header Branding, Live Video Background & Primary Pitch",
        "01_hero_navigation.png",
        [
            { "title": "Brand Navigation", "value": "Shree KB Group Crest", "detail": "Official company crest badge (/shree_kb_logo.png) anchored in top bar." },
            { "title": "Interactive Pitch", "value": "5 Levels AC High-Street", "detail": "Tagline: 'Every Step A Story • 5 Levels of AC Ventilated Shopping High-Street'." },
            { "title": "Direct Call To Actions", "value": "VIP Visit & Cost Sheet", "detail": "Instant modals for Site Visit booking, Price PDF request, and Floor Plans." }
        ]
    )

    # SLIDE 3: Legacy Metrics Counter
    build_layout_horizontal_split(
        "02. LEGACY METRICS & DEVELOPER SCALE",
        "20+ Years Legacy Stats, RERA Approvals & Building Specs",
        "02_legacy_metrics.png",
        [
            { "title": "Developer Track Record", "value": "20+ Years Legacy", "detail": "Delivering premier urban commercial landmarks across Delhi NCR since 2005." },
            { "title": "RERA Verification", "value": "100% Approved", "detail": "Reg: UPRERAPRJ422027/01/2026 | Promoter ID: UPRERAPRM414706." },
            { "title": "Captive Audience", "value": "1,00,000+ Families", "detail": "Surrounded by densely occupied residential sectors ensuring high footfall." }
        ]
    )

    # SLIDE 4: Commercial Typologies & Spaces
    build_layout_vertical_split(
        "03. COMMERCIAL TYPOLOGIES & SPACES",
        "Boulevard Retail, Food Court, Cinema & Serviced Studio Suites",
        "03_developments_typologies.png",
        [
            { "header": "Ground Boulevard Shops (₹37,900/sq.ft.)", "desc": "Double-height glass frontage stores facing the central atrium promenade. Ideal for luxury apparel, jewelry, and flagship cafes." },
            { "header": "Lower Ground & 1st Floor Arcades (₹24,900 - ₹25,900/sq.ft.)", "desc": "High-footfall Lower Ground hypermarket anchor stores and First Floor lifestyle brand arcades with seamless escalator connectivity." },
            { "header": "Food Court, Cinema & Studio Suites (Floors 3-18)", "desc": "3rd/4th floor gourmet dining & open rooftop restaurants, 5th floor multi-screen cinema, and 6th-18th floor executive studio suites." }
        ]
    )

    # SLIDE 5: Floor-Wise Pricing Schedules
    build_layout_vertical_split(
        "04. FLOOR-WISE PRICING SCHEDULES",
        "Transparent BSP Rate Cards & Flexible Payment Plans",
        "04_pricing_schedules.png",
        [
            { "header": "Transparent BSP Pricing Sheet", "desc": "Ground Floor Boulevard at ₹37,900/sq.ft. • LGF Hypermarket at ₹25,900/sq.ft. • First Floor Fashion at ₹24,900/sq.ft." },
            { "header": "Down Payment Plan with Rent Assistance", "desc": "Special plan providing immediate rental yield benefits during structure civil construction." },
            { "header": "RERA Milestone Payment Options", "desc": "Special 40:25:25, Special 30:20:20:20, and RERA Construction-Linked Plan (CLP) for maximum liquidity safety." }
        ]
    )

    # SLIDE 6: Amenities & Infrastructure Pillars
    build_layout_vertical_split(
        "05. AMENITIES & INFRASTRUCTURE PILLARS",
        "5-Level AC Arcade, Central Glass Atrium & Basement Parking",
        "05_amenities_pillars.png",
        [
            { "header": "5-Level AC Ventilated Shopping Arcade", "desc": "Climate-managed shopping experience combining open high-street energy with atrium mall comfort." },
            { "header": "Double-Height Glass Atrium Architecture", "desc": "Grand central glass atrium providing natural sunlight, open ventilation, and store visibility." },
            { "header": "Multi-Level Basement Parking & Security", "desc": "Ample parking with automated guidance, 24/7 CCTV surveillance, 100% power backup, and high-speed lifts." }
        ]
    )

    # SLIDE 7: Developer Philosophy & CREDAI Trust
    build_layout_vertical_split(
        "06. DEVELOPER PHILOSOPHY & CREDAI TRUST",
        "Shree Kunj Bihariji Legacy & Deliveries Across NCR",
        "06_brand_philosophy.png",
        [
            { "header": "Shree Kunj Bihariji Group Legacy", "desc": "Over two decades of excellence shaping high-yield commercial landmarks across Greater Noida since 2005." },
            { "header": "CREDAI Member Certification", "desc": "Official member of CREDAI (Real Estate Developers Association of India) ensuring ethical standards." },
            { "header": "Delivered Commercial Portfolio", "desc": "Proven track record with successful deliveries: KB Mart (Knowledge Park III) and KB Complex (Alpha II)." }
        ]
    )

    # SLIDE 8: Property Finder & EMI Calculator
    build_layout_vertical_split(
        "07. INTERACTIVE PROPERTY FINDER & EMI CALCULATOR",
        "Dynamic Price Filtering & Custom Loan Repayment Slider",
        "07_property_finder_emi.png",
        [
            { "header": "Filterable Unit Search Engine", "desc": "Search retail shops or studio suites by floor preference (LGF, GF, 1st, Studio) and investment budget." },
            { "header": "Real-Time Loan EMI Estimator", "desc": "Adjust property cost, down payment percentage, interest rate, and loan tenure to calculate monthly outlay." },
            { "header": "Direct Lead Inquiry Sync", "desc": "Instant callback request synced directly with commercial relationship managers based on unit preference." }
        ]
    )

    # SLIDE 9: Location Connectivity & Proximity
    build_layout_vertical_split(
        "08. LOCATION CONNECTIVITY & PROXIMITY",
        "Strategic Ecotech-12 Transit Hub & Metro Distance",
        "08_location_connectivity.png",
        [
            { "header": "100m Proposed Metro Station", "desc": "Walking distance (100 meters) from proposed Ecotech-12 Metro Station." },
            { "header": "5 Mins Gaur Chowk / Char Murti", "desc": "5 minutes drive (2.5 Km) from major Greater Noida West traffic junction." },
            { "header": "NH-24 & Jewar Int. Airport", "desc": "10 mins to NH-24 / Delhi-Meerut Expressway; 45 mins to Jewar Int. Airport." }
        ]
    )

    # SLIDE 10: Investment Growth & ROI Estimator
    build_layout_horizontal_split(
        "09. INVESTMENT GROWTH & ROI ESTIMATOR",
        "Projected Rental Yields & Capital Appreciation",
        "09_investment_roi.png",
        [
            { "title": "Projected Rental Yield", "value": "7.5% – 9.2% P.A.", "detail": "High-yield commercial rental return backed by 1,00,000+ local residential catchment." },
            { "title": "Capital Appreciation", "value": "38% – 48% Gain", "detail": "Cumulative capital gain projected upon metro launch & Jewar Airport operational date." },
            { "title": "Market Benchmark", "value": "Top 3 Corridor", "detail": "Cross-referenced data with 99acres, Housing.com & Magicbricks commercial indices." }
        ]
    )

    # SLIDE 11: Professional Facility Management
    build_layout_horizontal_split(
        "10. PROFESSIONAL FACILITY MANAGEMENT",
        "24/7 Retail Concierge, Security & Property Services",
        "10_mall_management.png",
        [
            { "title": "24/7 Retail Concierge", "value": "Dedicated Helpdesk", "detail": "24/7 desk support for store owners, corporate tenants, and visitor management." },
            { "title": "Professional Operations", "value": "100% Upkeep & HVAC", "detail": "Comprehensive mall upkeep, daily hygiene, escalator maintenance, and security." },
            { "title": "Brand Leasing Support", "value": "Tenant Assistance", "detail": "Dedicated support for brand tie-ups, retail leasing, and rental management." }
        ]
    )

    # SLIDE 12: Press Accolades & Industry Recognition
    build_layout_horizontal_split(
        "11. PRESS ACCOLADES & INDUSTRY RECOGNITION",
        "Awards & Industry Recognition for KB West Walk",
        "11_press_accolades.png",
        [
            { "title": "Best Mixed-Use 2026", "value": "Leadership Excellence", "detail": "Recognized for 5-level AC high-street architecture and Ecotech-12 vantage location." },
            { "title": "Excellence in Commercial", "value": "NCR Urban Forum", "detail": "Commended for 20+ years of developer trust and successful commercial deliveries." },
            { "title": "Iconic Retail Hub", "value": "Retail Dev Association", "detail": "Awarded for integrating retail, food, cinema, and studio suites in a high-growth corridor." }
        ]
    )

    # SLIDE 13: 4-Step Buyer Journey Onboarding
    build_layout_horizontal_split(
        "12. 4-STEP BUYER JOURNEY ONBOARDING",
        "Transparent Consultation to RERA Booking",
        "12_buyer_journey.png",
        [
            { "title": "Step 01 & 02", "value": "Consultation & Visit", "detail": "Review BSP cost sheets and experience guided 3D walkthrough at Plot C-3 site office." },
            { "title": "Step 03", "value": "Plan Customization", "detail": "Select between Down Payment with Rent Assistance, Special 40:25:25, or CLP." },
            { "title": "Step 04", "value": "RERA Axis Bank Booking", "detail": "Secure booking with 10% amount paid directly to official RERA Collection Account." }
        ]
    )

    # SLIDE 14: Footer & RERA Collection Account
    build_layout_horizontal_split(
        "13. FOOTER & OFFICIAL RERA BANK DETAILS",
        "RERA Registration, Collection Account & Disclaimers",
        "13_footer.png",
        [
            { "title": "RERA Collection Account", "value": "Axis Bank Ltd.", "detail": "Shree Kunj Bihariji Realty Pvt. Ltd. Collection Account for KB West Walk." },
            { "title": "Account & IFSC Code", "value": "A/C: 925020035796321", "detail": "IFSC: UTIB0005181 | Alpha II Branch, Greater Noida, Uttar Pradesh." },
            { "title": "RERA Registration", "value": "UPRERAPRJ422027/01/2026", "detail": "Promoter ID: UPRERAPRM414706 | Site Office: Plot C-3, Ecotech-12, Gr. Noida West." }
        ]
    )

    # SLIDE 15: Modal Showcase - VIP Site Visit Booking
    build_layout_horizontal_split(
        "14. MODAL SHOWCASE: VIP SITE VISIT BOOKING",
        "Interactive On-Site Guided Visit Scheduling Modal",
        "modal_vip_site_visit.png",
        [
            { "title": "Guided On-Site Tour", "value": "Instant Date/Time Picker", "detail": "Schedule guided walkthrough at Plot C-3 site office with senior relationship managers." },
            { "title": "VIP Transport Service", "value": "Complimentary Cab", "detail": "Option for door-step cab pickup & drop for site visit experience." },
            { "title": "Security & CRM Dispatch", "value": "Math CAPTCHA Protected", "detail": "Automated security check preventing spam with instant CRM lead dispatch." }
        ]
    )

    # SLIDE 16: Modal Showcase - Architectural Floor Plans
    build_layout_horizontal_split(
        "15. MODAL SHOWCASE: ARCHITECTURAL FLOOR PLANS",
        "Detailed Layout Schematics for Retail Shops & Studio Suites",
        "modal_floor_plans.png",
        [
            { "title": "High-Res Floor Blueprint", "value": "LGF, GF, 1st & Studios", "detail": "Full layout schematics for retail shops and serviced executive studio suites." },
            { "title": "Dimensions & Specs", "value": "Super & Carpet Area", "detail": "Displays exact unit dimensions, ceiling heights, and central atrium facing alignment." },
            { "title": "Digital E-Brochure", "value": "PDF Download Access", "detail": "Direct access to download full architectural brochure after customer lead submission." }
        ]
    )

    # SLIDE 17: Modal Showcase - KB Concierge AI Assistant
    build_layout_horizontal_split(
        "16. MODAL SHOWCASE: KB CONCIERGE AI ASSISTANT",
        "Conversational AI Chatbot with Google Search Grounding",
        "modal_ai_concierge_bot.png",
        [
            { "title": "Google Gemini API", "value": "Gemini Flash AI", "detail": "Powered by Gemini API with Live Search Grounding for real-time market data." },
            { "title": "Real-Time Grounding", "value": "99acres & Magicbricks", "detail": "Fetches live commercial real estate benchmarks and rental yield data across NCR." },
            { "title": "Interactive Matchmaker", "value": "4-Step Decision Tree", "detail": "Guides investors to the ideal shop or studio typology based on budget & goals." }
        ]
    )

    # SLIDE 18: Modal Showcase - Buyer Leads Vault & CRM
    build_layout_horizontal_split(
        "17. MODAL SHOWCASE: BUYER LEADS & CRM VAULT",
        "Local Storage Lead Vault & CRM Export Capabilities",
        "modal_buyer_leads_vault.png",
        [
            { "title": "Director Access Shortcut", "value": "Ctrl+Shift+L Access", "detail": "Secured shortcut for directors & marketing heads to view real-time captured leads." },
            { "title": "Multi-Format Export", "value": "CSV & JSON Download", "detail": "Export leads with Name, Phone, Email, Unit Interest, and Intent Score directly." },
            { "title": "Multi-Channel Dispatch", "value": "Dual Webhook Failover", "detail": "Dual API routing via Web3Forms and FormSubmit for guaranteed lead delivery." }
        ]
    )

    prs.save(output_ppt)
    print(f"Masterpiece presentation created successfully with 100% pixel-perfect alignment at: {output_ppt}")

if __name__ == "__main__":
    create_masterpiece_presentation()
