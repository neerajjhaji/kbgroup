import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette
    DARK_BG = RGBColor(11, 14, 20)       # #0B0E14 - Primary Deep Dark
    CARD_BG = RGBColor(15, 20, 29)       # #0F141D - Card Dark
    SAND_BG = RGBColor(250, 248, 245)    # #FAF8F5 - Light Warm Sand
    GOLD = RGBColor(212, 175, 55)        # #D4AF37 - Champagne Gold
    BRONZE = RGBColor(166, 129, 66)      # #A68142 - Royal Bronze
    TEXT_LIGHT = RGBColor(255, 255, 255)  # #FFFFFF - White
    TEXT_MUTED = RGBColor(148, 163, 184) # #94A3B8 - Slate Muted
    TEXT_DARK = RGBColor(26, 24, 21)     # #1A1815 - Charcoal Dark
    BORDER_GOLD = RGBColor(212, 175, 55)

    blank_layout = prs.slide_layouts[6]

    def add_bg(slide, color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, tag_text, title_text, dark_theme=True):
        # Tag
        tb_tag = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.4))
        tf_tag = tb_tag.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = GOLD if dark_theme else BRONZE
        p_tag.font.name = "Arial"

        # Title
        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.7), Inches(0.8))
        tf_title = tb_title.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_LIGHT if dark_theme else TEXT_DARK
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

    # -------------------------------------------------------------------------
    # SLIDE 1: Title Slide (Dark Theme)
    # -------------------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    add_bg(slide1, DARK_BG)

    # Decorative Border Frame
    card1 = add_card(slide1, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3), CARD_BG, GOLD)

    tb = slide1.shapes.add_textbox(Inches(1.0), Inches(1.2), Inches(11.333), Inches(1.0))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "SHREE KUNJ BIHARIJI REALTY PVT. LTD."
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = GOLD
    p.font.name = "Arial"

    tb = slide1.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.333), Inches(1.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "KB WEST WALK"
    p.font.size = Pt(48)
    p.font.bold = True
    p.font.color.rgb = TEXT_LIGHT
    p.font.name = "Georgia"

    p2 = tf.add_paragraph()
    p2.text = "Digital Portal Design, Architecture, Content Layout & Buyer CRM Presentation"
    p2.font.size = Pt(20)
    p2.font.color.rgb = GOLD
    p2.font.name = "Georgia"

    # Details Box
    tb_details = slide1.shapes.add_textbox(Inches(1.0), Inches(3.8), Inches(11.333), Inches(2.6))
    tf_det = tb_details.text_frame
    tf_det.word_wrap = True

    items = [
        "📍 Location: Plot No. C-3, Ecotech-12, Greater Noida West, Uttar Pradesh",
        "📜 RERA Registration No: UPRERAPRJ422027/01/2026 | Promoter ID: UPRERAPRM414706",
        "🏬 Building Scale: 18-Level Commercial High-Street & Studio Suites Mixed-Use Landmark",
        "🎯 Core Features: 5-Level AC Retail Arcade, Gourmet Food Court, 5-Screen Cinema, Studio Suites, KB Concierge AI",
        "🚀 Technology Stack: React 19, Vite 8, Google Gemini AI (3.6/3.5 Flash), Web3Forms Multi-CRM, SEO & a11y Vault"
    ]
    for item in items:
        p = tf_det.add_paragraph()
        p.text = item
        p.font.size = Pt(14)
        p.font.color.rgb = TEXT_MUTED
        p.font.name = "Arial"

    # -------------------------------------------------------------------------
    # SLIDE 2: Brand Identity & Design System (Light Sand Theme)
    # -------------------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    add_bg(slide2, SAND_BG)
    add_header(slide2, "DESIGN SYSTEM & BRAND IDENTITY", "Visual Aesthetics, Color Tokens & Typography Architecture", dark_theme=False)

    # Color Palette Cards
    colors = [
        ("Obsidian Dark", "#0B0E14", DARK_BG, TEXT_LIGHT),
        ("Deep Slate", "#0F141D", CARD_BG, TEXT_LIGHT),
        ("Champagne Gold", "#D4AF37", GOLD, TEXT_DARK),
        ("Royal Bronze", "#A68142", BRONZE, TEXT_LIGHT),
        ("Warm Sand", "#FAF8F5", SAND_BG, TEXT_DARK)
    ]
    for i, (c_name, c_hex, c_rgb, t_rgb) in enumerate(colors):
        left = Inches(0.8 + i * 2.35)
        top = Inches(1.7)
        add_card(slide2, left, top, Inches(2.2), Inches(1.8), c_rgb, BRONZE)

        tb = slide2.shapes.add_textbox(left + Inches(0.1), top + Inches(0.2), Inches(2.0), Inches(1.4))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = c_name
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = t_rgb

        p2 = tf.add_paragraph()
        p2.text = c_hex
        p2.font.size = Pt(12)
        p2.font.color.rgb = t_rgb

    # Typography & Grid Guidelines
    add_card(slide2, Inches(0.8), Inches(3.8), Inches(5.6), Inches(3.0), RGBColor(255, 255, 255), BRONZE)
    tb = slide2.shapes.add_textbox(Inches(1.0), Inches(3.9), Inches(5.2), Inches(2.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "TYPOGRAPHY STACK"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = BRONZE

    typo_items = [
        "• Headings: Outfit (Bold 700/800) for commercial punch",
        "• Accent Titles: Cormorant Garamond (Serif 600/700)",
        "• Body Text: Plus Jakarta Sans (Clean, high-legibility)",
        "• Hierarchy: Clamp(32px, 4vw, 52px) responsive scaling",
        "• Contrast: AAA contrast ratio compliance against dark canvas"
    ]
    for item in typo_items:
        p = tf.add_paragraph()
        p.text = item
        p.font.size = Pt(12)
        p.font.color.rgb = TEXT_DARK

    add_card(slide2, Inches(6.8), Inches(3.8), Inches(5.7), Inches(3.0), RGBColor(255, 255, 255), BRONZE)
    tb = slide2.shapes.add_textbox(Inches(7.0), Inches(3.9), Inches(5.3), Inches(2.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "LAYOUT & UI COMPONENT PATTERNS"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = BRONZE

    pattern_items = [
        "• Glassmorphism: Backdrop blur (10px–20px) on navigation & modals",
        "• Responsive Grid: Flexbox & CSS Grid auto-fit minmax(320px, 1fr)",
        "• Floating CTAs: VR Tour & Technical Specs quick actions (bottom-left)",
        "• Ticker Bar: Live real-time buyer signal ticker at top header",
        "• Conversational AI: Floating bot widget at bottom-right viewport"
    ]
    for item in pattern_items:
        p = tf.add_paragraph()
        p.text = item
        p.font.size = Pt(12)
        p.font.color.rgb = TEXT_DARK

    # -------------------------------------------------------------------------
    # SLIDE 3: Page Layout & Section Component Architecture (Dark Theme)
    # -------------------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    add_bg(slide3, DARK_BG)
    add_header(slide3, "PAGE COMPONENT PIPELINE", "Single Page Application (SPA) Section Breakdown", dark_theme=True)

    sections = [
        ("01", "LiveBuyerTicker", "Real-time buyer activity ticker & instant site visit triggers"),
        ("02", "Navigation", "Sticky glass navigation bar with brand logos, section anchors & price PDF CTA"),
        ("03", "Hero", "Background mp4 video overlay with value pitch, key metrics & 3 primary CTAs"),
        ("04", "LegacyMetrics", "Counter stats: 20+ years trust, 18 levels scale & RERA approval badges"),
        ("05", "Developments", "18-level commercial typologies: Retail, Food Court, Cinema & Studio Suites"),
        ("06", "PriceListSection", "BSP Cost Sheet table (LGF, GF, 1st Fl), 4 Payment Plans & Axis Bank RERA account"),
        ("07", "AmenitiesSection", "6 core commercial pillars: 5-level AC retail, multiplex, food court, parking"),
        ("08", "Philosophy", "Shree KB Group brand ethos & hybrid high-street + atrium architectural design"),
        ("09", "PropertyFinder", "Interactive typology search & dynamic real-time bank loan EMI slider calculator"),
        ("10", "ConnectivityMap", "Location vantage map & distance benchmarks from Ecotech-12 metro & airports"),
        ("11", "InvestmentROI", "Capital growth calculator projecting 7.5%-9.2% rental yield & 21.2% YoY appreciation"),
        ("12", "SaintAmandSection", "Dedicated commercial mall management, retail concierge & facility upkeep"),
        ("13", "BuyerJourneySteps", "4-step buyer onboarding process from consultation to official RERA booking"),
        ("14", "Footer", "Comprehensive sitemap, official RERA disclaimer, top scroll & Buyer Vault button")
    ]

    for i, (num, name, desc) in enumerate(sections):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.6 + row * 0.76)

        add_card(slide3, left, top, Inches(5.75), Inches(0.68), CARD_BG, GOLD)

        tb = slide3.shapes.add_textbox(left + Inches(0.1), top + Inches(0.05), Inches(5.55), Inches(0.58))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f"{num}. {name}"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(10)
        p2.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------------------
    # SLIDE 4: Hero & Headline Value Proposition (Dark Theme)
    # -------------------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    add_bg(slide4, DARK_BG)
    add_header(slide4, "HERO SECTION & HEADLINE VALUE PROPOSITION", "First Impression & Immediate Buyer Conversion Canvas", dark_theme=True)

    # Hero Mock Box
    add_card(slide4, Inches(0.8), Inches(1.7), Inches(7.5), Inches(5.2), CARD_BG, GOLD)
    tb = slide4.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(7.1), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "✦ SHREE KUNJ BIHARIJI REALTY PVT. LTD. • RERA APPROVED"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = GOLD

    p2 = tf.add_paragraph()
    p2.text = "KB WEST WALK"
    p2.font.size = Pt(36)
    p2.font.bold = True
    p2.font.color.rgb = TEXT_LIGHT

    p3 = tf.add_paragraph()
    p3.text = "Every Step A Story • 5 Levels of AC Ventilated Shopping High-Street"
    p3.font.size = Pt(16)
    p3.font.color.rgb = GOLD

    p4 = tf.add_paragraph()
    p4.text = "Food Court • Retail Arcades • Multiplex Cinema • State-of-the-Art Studio Suites\nPlot C-3, Ecotech-12, Greater Noida West | RERA Reg No: UPRERAPRJ422027/01/2026"
    p4.font.size = Pt(12)
    p4.font.color.rgb = TEXT_MUTED

    p5 = tf.add_paragraph()
    p5.text = "\n[ BUTTON: BOOK VIP SITE VISIT ]   [ BUTTON: DOWNLOAD COST SHEET (PDF) ]   [ BUTTON: VIEW FLOOR PLANS ]"
    p5.font.size = Pt(11)
    p5.font.bold = True
    p5.font.color.rgb = GOLD

    # Metrics Strip
    add_card(slide4, Inches(8.6), Inches(1.7), Inches(3.9), Inches(5.2), CARD_BG, GOLD)
    tb = slide4.shapes.add_textbox(Inches(8.8), Inches(1.9), Inches(3.5), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "HERO METRIC HIGHLIGHTS"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = GOLD

    m_items = [
        ("Retail BSP (1st Floor)", "₹ 24,900 / Sq. Ft.*"),
        ("Ground Floor BSP", "₹ 37,900 / Sq. Ft.*"),
        ("Lower Ground Floor", "₹ 25,900 / Sq. Ft.*"),
        ("Entertainment Zone", "5-Screen Multiplex Cinema"),
        ("Gastronomy Zone", "Gourmet Food Court & Rooftop"),
        ("Workspaces & Suites", "6th to 18th Floor Studios")
    ]
    for label, val in m_items:
        p1 = tf.add_paragraph()
        p1.text = f"• {label}:"
        p1.font.size = Pt(11)
        p1.font.color.rgb = TEXT_MUTED

        p2 = tf.add_paragraph()
        p2.text = f"  {val}"
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------------------
    # SLIDE 5: Commercial Typologies Showcase (Developments)
    # -------------------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    add_bg(slide5, DARK_BG)
    add_header(slide5, "COMMERCIAL TYPOLOGIES & SPATIAL ZONES", "18-Level Mixed-Use High-Street Landmark Breakdown", dark_theme=True)

    typos = [
        ("Ground Floor Retail", "₹ 37,900 / Sq. Ft.", "High-Visibility Frontage Stores", "Premier Boulevard retail shops facing pedestrian promenade. Ideal for flagship international fashion & coffee hubs.", ["Maximum Pedestrian Atrium Frontage", "Double Height Glass Facades", "Dedicated Loading Access"]),
        ("Lower Ground Floor", "₹ 25,900 / Sq. Ft.", "Hypermarket & Anchor Outlets", "High-footfall Lower Ground Floor dedicated to anchor hypermarkets, electronics hubs, and daily utility stores.", ["Direct Escalator Connectivity", "Grocery & Electronics Anchor", "100% Power Backed"]),
        ("First Floor Fashion", "₹ 24,900 / Sq. Ft.", "Fashion & Lifestyle Arcades", "Vibrant First Floor dedicated to fashion wear, footwear, beauty salons, and gadget galleries.", ["Central Atrium Views", "High Visibility Walkways", "Best Value Entry BSP"]),
        ("Studio Suites (6th-18th)", "Price On Request", "Serviced Executive Suites", "State-of-the-art serviced studio apartments and executive workspaces offering high rental yield.", ["High Rental Yield Corridor", "Separate High-Speed Lifts", "Rooftop & Cinema Access"])
    ]

    for i, (t_title, t_price, t_sub, t_desc, t_highlights) in enumerate(typos):
        left = Inches(0.8 + i * 2.95)
        top = Inches(1.7)
        add_card(slide5, left, top, Inches(2.8), Inches(5.2), CARD_BG, GOLD)

        tb = slide5.shapes.add_textbox(left + Inches(0.15), top + Inches(0.2), Inches(2.5), Inches(4.8))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = t_sub.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = t_title
        p2.font.size = Pt(16)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

        p3 = tf.add_paragraph()
        p3.text = t_price
        p3.font.size = Pt(15)
        p3.font.bold = True
        p3.font.color.rgb = GOLD

        p4 = tf.add_paragraph()
        p4.text = f"\n{t_desc}\n"
        p4.font.size = Pt(11)
        p4.font.color.rgb = TEXT_MUTED

        for h in t_highlights:
            p_h = tf.add_paragraph()
            p_h.text = f"✓ {h}"
            p_h.font.size = Pt(10)
            p_h.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------------------
    # SLIDE 6: Price List & Payment Schedules (PriceListSection)
    # -------------------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    add_bg(slide6, DARK_BG)
    add_header(slide6, "OFFICIAL COST SHEET & PAYMENT SCHEDULES", "Transparent RERA Structured Pricing & Bank Collection Account", dark_theme=True)

    # Price Table
    add_card(slide6, Inches(0.8), Inches(1.7), Inches(5.7), Inches(5.2), CARD_BG, GOLD)
    tb = slide6.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "OFFICIAL BSP COST SHEET SCHEDULE"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    p_sub = tf.add_paragraph()
    p_sub.text = "w.e.f. 12th July 2026* • Base Selling Price per Sq. Ft.\n"
    p_sub.font.size = Pt(11)
    p_sub.font.color.rgb = TEXT_MUTED

    bsp_items = [
        ("Lower Ground Floor (LGF)", "₹ 25,900 / Sq. Ft.", "Hypermarket & Daily Utility Anchor"),
        ("Ground Floor (GF Boulevard)", "₹ 37,900 / Sq. Ft.", "Frontage Boulevard Flagship Shops"),
        ("First Floor (1st Floor)", "₹ 24,900 / Sq. Ft.", "Fashion, Beauty & Apparel Arcades")
    ]
    for floor, bsp, note in bsp_items:
        p_f = tf.add_paragraph()
        p_f.text = f"• {floor}"
        p_f.font.size = Pt(13)
        p_f.font.bold = True
        p_f.font.color.rgb = TEXT_LIGHT

        p_b = tf.add_paragraph()
        p_b.text = f"  BSP: {bsp} ({note})\n"
        p_b.font.size = Pt(12)
        p_b.font.color.rgb = GOLD

    p_bank = tf.add_paragraph()
    p_bank.text = "OFFICIAL RERA COLLECTION ACCOUNT:"
    p_bank.font.size = Pt(11)
    p_bank.font.bold = True
    p_bank.font.color.rgb = GOLD

    p_bank_info = tf.add_paragraph()
    p_bank_info.text = "Shree Kunj Bihariji Realty Pvt. Ltd. Collection Account for KB West Walk\nBank: Axis Bank Ltd. | A/c: 925020035796321\nIFSC: UTIB0005181 | Branch: Alpha II, Greater Noida"
    p_bank_info.font.size = Pt(10)
    p_bank_info.font.color.rgb = TEXT_MUTED

    # Payment Plans
    add_card(slide6, Inches(6.8), Inches(1.7), Inches(5.7), Inches(5.2), CARD_BG, GOLD)
    tb = slide6.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "FLEXIBLE PAYMENT PLAN STRUCTURES"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    plans = [
        ("1. Down Payment Plan with Rent Assistance", "10% Booking | 80% in 60 Days | 10% on CC", "Maximum discount & immediate rental yield benefits."),
        ("2. Special Payment Plan 1 (40 : 25 : 25)", "10% Booking | 40% in 60 Days | 25% 6th Fl Slab | 25% CC", "Popular investor choice for balanced liquidity."),
        ("3. Special Payment Plan 2 (30 : 20 : 20 : 20)", "10% Booking | 30% in 60 Days | 20% GF | 20% 6th Fl | 20% CC", "Step payment aligned with civil structure progress."),
        ("4. Construction Linked Plan (CLP)", "10% Booking | 15% 60 Days | Milestones to 18th Fl | 5% CC", "RERA milestone plan for maximum safety.")
    ]
    for title, breakdown, note in plans:
        p_t = tf.add_paragraph()
        p_t.text = f"• {title}"
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_LIGHT

        p_bd = tf.add_paragraph()
        p_bd.text = f"  Breakdown: {breakdown}"
        p_bd.font.size = Pt(11)
        p_bd.font.color.rgb = GOLD

        p_n = tf.add_paragraph()
        p_n.text = f"  Note: {note}\n"
        p_n.font.size = Pt(10)
        p_n.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------------------
    # SLIDE 7: Amenities & Infrastructure (AmenitiesSection)
    # -------------------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_layout)
    add_bg(slide7, DARK_BG)
    add_header(slide7, "COMMERCIAL INFRASTRUCTURE & AMENITIES", "6 Core Pillars of Retail & Lifestyle Infrastructure", dark_theme=True)

    amenities = [
        ("5-Level AC Shopping Arcade", "High-Street Retail", "Hybrid high-street and atrium format with climate control & glass promenades."),
        ("Multi-Screen Cinema", "Entertainment Hub", "State-of-the-art multi-screen cinema on 5th floor with recliner seating."),
        ("Food Court & Rooftop Dining", "Gastronomy & Nightlife", "Expansive 3rd & 4th floor food courts with QSR brands & specialty cafes."),
        ("Serviced Studio Apartments", "Serviced Living", "Premium studio suites on 6th-18th floors crafted for high rental yield."),
        ("Double Height Glass Atrium", "Architecture", "Grand skylight atrium ensuring high natural light & maximum store visibility."),
        ("Multi-Level Basement Parking", "Infrastructure", "Ample visitor parking, 24/7 CCTV surveillance & 100% power backup.")
    ]

    for i, (a_title, a_cat, a_desc) in enumerate(amenities):
        col = i % 3
        row = i // 3
        left = Inches(0.8 + col * 3.95)
        top = Inches(1.8 + row * 2.6)

        add_card(slide7, left, top, Inches(3.75), Inches(2.35), CARD_BG, GOLD)

        tb = slide7.shapes.add_textbox(left + Inches(0.15), top + Inches(0.15), Inches(3.45), Inches(2.05))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = a_cat.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = a_title
        p2.font.size = Pt(16)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

        p3 = tf.add_paragraph()
        p3.text = f"\n{a_desc}"
        p3.font.size = Pt(11)
        p3.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------------------
    # SLIDE 8: Location & Connectivity (ConnectivityMapSection)
    # -------------------------------------------------------------------------
    slide8 = prs.slides.add_slide(blank_layout)
    add_bg(slide8, DARK_BG)
    add_header(slide8, "LOCATION VANTAGE & METRO CONNECTIVITY", "Plot C-3, Ecotech-12, Greater Noida West Location Infrastructure", dark_theme=True)

    add_card(slide8, Inches(0.8), Inches(1.7), Inches(11.733), Inches(5.2), CARD_BG, GOLD)

    tb = slide8.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(11.333), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "STRATEGIC HIGH-FOOTFALL COMMERCIAL CORRIDOR"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = GOLD

    p_sub = tf.add_paragraph()
    p_sub.text = "Surrounded by over 1,00,000+ residential apartments in Sector 1, Sector 4, and Ecotech-12.\n"
    p_sub.font.size = Pt(12)
    p_sub.font.color.rgb = TEXT_LIGHT

    points = [
        ("Proposed Ecotech-12 Metro Station", "Walking Distance (100 Meters)", "Direct high-frequency commuter footfall destination"),
        ("Char Murti / Gaur Chowk / Ek Murti", "5 Mins (2.5 Km)", "Major commercial crossroads of Greater Noida West"),
        ("Crossings Republik Residential Hub", "5 Mins (3.0 Km)", "Established high-density captive consumer base"),
        ("Noida-Gr. Noida Expressway & NH-24", "10 Mins (6.0 Km)", "Seamless connectivity to Delhi, Ghaziabad & Noida"),
        ("Fortis & Max Super Speciality Hospital", "10 Mins (7.5 Km)", "Healthcare hub proximity"),
        ("Jewar International Airport (Noida Int.)", "45 Mins (48.0 Km)", "Upcoming international aviation corridor growth engine")
    ]

    for name, dist, desc in points:
        p_p = tf.add_paragraph()
        p_p.text = f"📍 {name} — {dist}"
        p_p.font.size = Pt(13)
        p_p.font.bold = True
        p_p.font.color.rgb = TEXT_LIGHT

        p_d = tf.add_paragraph()
        p_d.text = f"   {desc}"
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------------------
    # SLIDE 9: Interactive Financial Estimators (PropertyFinder & ROI)
    # -------------------------------------------------------------------------
    slide9 = prs.slides.add_slide(blank_layout)
    add_bg(slide9, DARK_BG)
    add_header(slide9, "INTERACTIVE FINANCIAL ESTIMATORS", "Real-Time Bank Loan EMI Calculator & Capital ROI Projections", dark_theme=True)

    # EMI Calculator Box
    add_card(slide9, Inches(0.8), Inches(1.7), Inches(5.7), Inches(5.2), CARD_BG, GOLD)
    tb = slide9.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "REAL-TIME LOAN EMI & SUBVENTION CALCULATOR"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = GOLD

    calc_features = [
        "• Property Price Range Slider (₹29.6 L to ₹6.00 Cr)",
        "• Down Payment Percentage Selector (10% to 50%)",
        "• Tenure Dropdown (10, 15, 20, 25, 30 Years)",
        "• Interest Rate Input (Customizable e.g. 8.5%)",
        "• Instant Monthly EMI Output Calculation",
        "• Direct CTA: 'Apply for Bank Subvention Plan'"
    ]
    for feat in calc_features:
        p_f = tf.add_paragraph()
        p_f.text = feat
        p_f.font.size = Pt(12)
        p_f.font.color.rgb = TEXT_LIGHT

    p_box = tf.add_paragraph()
    p_box.text = "\n[ CALCULATION PREVIEW ]\nProperty Value: ₹2.96 Cr | Down Payment: ₹59.2 L (20%)\nEstimated EMI: ₹2,06,243 / Month (20 Yrs @ 8.5%)"
    p_box.font.size = Pt(11)
    p_box.font.bold = True
    p_box.font.color.rgb = GOLD

    # ROI Estimator Box
    add_card(slide9, Inches(6.8), Inches(1.7), Inches(5.7), Inches(5.2), CARD_BG, GOLD)
    tb = slide9.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "CAPITAL GROWTH & YIELD BENCHMARKS"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = GOLD

    roi_benchmarks = [
        ("Annual Rental Yield", "7.5% – 9.2% P.A.", "High commercial rental yield corridor"),
        ("YoY Capital Appreciation", "+21.2% YoY", "Ranked among top 3 commercial retail hubs"),
        ("Cumulative Return", "38% – 48%", "Projected upon metro & Jewar airport launch"),
        ("Locality Score", "92 / 100 (4.9/5)", "Verified benchmark by 99acres & Magicbricks")
    ]
    for b_title, b_val, b_desc in roi_benchmarks:
        p_t = tf.add_paragraph()
        p_t.text = f"• {b_title}: {b_val}"
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_LIGHT

        p_d = tf.add_paragraph()
        p_d.text = f"  {b_desc}"
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------------------
    # SLIDE 10: Dedicated Commercial Management (SaintAmandSection)
    # -------------------------------------------------------------------------
    slide10 = prs.slides.add_slide(blank_layout)
    add_bg(slide10, SAND_BG)
    add_header(slide10, "DEDICATED MALL & FACILITY SERVICES", "Commercial Excellence & Professional Mall Management", dark_theme=False)

    services = [
        ("Dedicated Retail Concierge", "24/7 commercial desk assistance for store owners, corporate tenants & visitor management."),
        ("Professional Mall Management", "Comprehensive facility upkeep, central HVAC climate maintenance & security marshals."),
        ("Multi-Level Valet Parking", "Seamless valet arrival, automated parking guidance & reserved executive parking."),
        ("Leasing & Brand Tie-Ups", "Dedicated support for brand tie-ups, retail leasing & rental management.")
    ]

    for i, (s_title, s_desc) in enumerate(services):
        left = Inches(0.8 + (i % 2) * 5.95)
        top = Inches(1.8 + (i // 2) * 2.5)

        add_card(slide10, left, top, Inches(5.75), Inches(2.2), RGBColor(255, 255, 255), BRONZE)

        tb = slide10.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(5.35), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = s_title
        p.font.size = Pt(18)
        p.font.bold = True
        p.font.color.rgb = BRONZE

        p2 = tf.add_paragraph()
        p2.text = f"\n{s_desc}"
        p2.font.size = Pt(13)
        p2.font.color.rgb = TEXT_DARK

    # -------------------------------------------------------------------------
    # SLIDE 11: Interactive Modal Ecosystem (8 Deep-Dive Overlays)
    # -------------------------------------------------------------------------
    slide11 = prs.slides.add_slide(blank_layout)
    add_bg(slide11, DARK_BG)
    add_header(slide11, "INTERACTIVE MODAL ECOSYSTEM", "8 High-Converting Overlay Modals & Drawers", dark_theme=True)

    modals = [
        ("01. SiteVisitModal", "VIP Chauffeur booking, captcha security & VIP Pass Generation"),
        ("02. FloorPlanModal", "Architectural schematic blueprints, super/carpet area specs & tab swapper"),
        ("03. BrochureModal", "E-Brochure & Price List PDF email/WhatsApp dispatch gate"),
        ("04. ConciergeModal", "Private commercial advisory call request & topic selection"),
        ("05. SiteMapModal", "Master site plan layout & campus zone hotspot explorer"),
        ("06. VirtualTourModal", "Immersive 360° virtual walkthrough & Meta Quest VR home demo request"),
        ("07. DetailDrawer", "Technical specifications drawer (RCC frame, elevators, HVAC, power backup)"),
        ("08. SearchModal", "Instant site-wide search across shops, food court, location & documents")
    ]

    for i, (m_name, m_desc) in enumerate(modals):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.6 + row * 1.3)

        add_card(slide11, left, top, Inches(5.75), Inches(1.15), CARD_BG, GOLD)

        tb = slide11.shapes.add_textbox(left + Inches(0.15), top + Inches(0.1), Inches(5.45), Inches(0.95))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = m_name
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = m_desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = TEXT_MUTED

    # -------------------------------------------------------------------------
    # SLIDE 12: KB Concierge AI Assistant (geminiService.js)
    # -------------------------------------------------------------------------
    slide12 = prs.slides.add_slide(blank_layout)
    add_bg(slide12, DARK_BG)
    add_header(slide12, "CONVERSATIONAL AI BOT (KB CONCIERGE)", "Google Gemini Integration with Live Search Grounding", dark_theme=True)

    add_card(slide12, Inches(0.8), Inches(1.7), Inches(5.7), Inches(5.2), CARD_BG, GOLD)
    tb = slide12.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "GEMINI SERVICE ARCHITECTURE"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    ai_arch = [
        "• API Integration: REST API v1beta via askGemini()",
        "• Model Sequential Fallback: gemini-3.6-flash → gemini-3.5-flash → gemini-flash-latest",
        "• Live Google Search Grounding: Enabled via tools: [{ googleSearch: {} }]",
        "• Clean Formatting Engine: Automatic stripping of asterisks (*) for plain clean text output",
        "• Conversation Memory: Retains last 6 conversation turns",
        "• System Identity: KB Concierge, AI Commercial Director"
    ]
    for item in ai_arch:
        p_i = tf.add_paragraph()
        p_i.text = item
        p_i.font.size = Pt(12)
        p_i.font.color.rgb = TEXT_LIGHT

    add_card(slide12, Inches(6.8), Inches(1.7), Inches(5.7), Inches(5.2), CARD_BG, GOLD)
    tb = slide12.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "INTERACTIVE WIDGET CAPABILITIES"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    widget_caps = [
        "• Warm Interactive Greeting with 4 Option Chips",
        "• 🎯 Commercial Property Matchmaker Tool",
        "• 🚗 VIP On-Site Guided Walkthrough Request",
        "• 📊 Market Trends & ROI Yield Estimator",
        "• 📐 Retail Shop & Studio Suite Floor Plan Viewer",
        "• Text-to-Speech (TTS) Voice Synthesis for Bot Messages",
        "• Direct Callback Request & Lead Dispatch"
    ]
    for item in widget_caps:
        p_w = tf.add_paragraph()
        p_w.text = item
        p_w.font.size = Pt(12)
        p_w.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------------------
    # SLIDE 13: Buyer Lead Vault & Multi-CRM Pipeline (BuyerLeadsModal)
    # -------------------------------------------------------------------------
    slide13 = prs.slides.add_slide(blank_layout)
    add_bg(slide13, DARK_BG)
    add_header(slide13, "BUYER LEAD VAULT & MULTI-CRM PIPELINE", "Lead Scoring, Vault Storage & Instant CSV Export System", dark_theme=True)

    add_card(slide13, Inches(0.8), Inches(1.7), Inches(5.7), Inches(5.2), CARD_BG, GOLD)
    tb = slide13.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "LEAD DISPATCH & SCORING UTILITY"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    lead_arch = [
        "• Storage Engine: Local Vault in localStorage (kb_west_walk_leads_vault)",
        "• 100-Point Scoring System (calculateBuyerScore):",
        "  - Deducts 50 pts for temp emails or dummy phone numbers",
        "  - Adds 10-15 pts for chauffeur requests & ready capital",
        "• Buyer Tiers: VIP Commercial Investor (90+), High Intent (70+), Standard",
        "• Multi-CRM Endpoints: Dual async submit via Web3Forms & FormSubmit API"
    ]
    for item in lead_arch:
        p_l = tf.add_paragraph()
        p_l.text = item
        p_l.font.size = Pt(12)
        p_l.font.color.rgb = TEXT_LIGHT

    add_card(slide13, Inches(6.8), Inches(1.7), Inches(5.7), Inches(5.2), CARD_BG, GOLD)
    tb = slide13.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "BUYER LEADS VAULT MODAL (Ctrl+Shift+L)"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    vault_caps = [
        "• Global Shortcut Trigger: Ctrl + Shift + L or Cmd + Shift + L",
        "• Real-Time Metrics Strip: Total Leads, VIP Count, High Intent Count, Avg Score",
        "• Search & Tier Filter: Instant filter by buyer name, phone, email, or source",
        "• One-Click CSV Export: exportLeadsToCSV() downloads formatted CSV file",
        "• Copy-to-Clipboard Phone: Quick click to copy buyer contact number"
    ]
    for item in vault_caps:
        p_v = tf.add_paragraph()
        p_v.text = item
        p_v.font.size = Pt(12)
        p_v.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------------------
    # SLIDE 14: Dynamic SEO, Performance & Accessibility (a11y)
    # -------------------------------------------------------------------------
    slide14 = prs.slides.add_slide(blank_layout)
    add_bg(slide14, DARK_BG)
    add_header(slide14, "DYNAMIC SEO, PERFORMANCE & ACCESSIBILITY", "Production Engineering, Search Engine Optimization & WCAG Compliance", dark_theme=True)

    seo_items = [
        ("Dynamic SEO Head (SEOHead.jsx)", "Updates document title, meta description, OpenGraph tags dynamically based on modal states."),
        ("Rich JSON-LD Schema (index.html)", "Schema.org graph with RealEstateListing, CommercialRealEstate, Organization, Place, Offer & FAQPage."),
        ("Skip to Main Content Link", "Accessibility link (#main-content) for keyboard & screen-reader users."),
        ("Modal ARIA Standards", "role='dialog', aria-modal='true', aria-label & global Escape key listener across all 8 modals."),
        ("Production Vite 8 Build", "1.08s build time, 1879 modules transformed, optimized gzip bundle size.")
    ]

    for i, (title, desc) in enumerate(seo_items):
        top = Inches(1.7 + i * 1.05)
        add_card(slide14, Inches(0.8), top, Inches(11.733), Inches(0.9), CARD_BG, GOLD)

        tb = slide14.shapes.add_textbox(Inches(1.0), top + Inches(0.1), Inches(11.333), Inches(0.7))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = f"✓ {title}"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = f"   {desc}"
        p2.font.size = Pt(11)
        p2.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------------------
    # SLIDE 15: Conclusion & Portal Readiness
    # -------------------------------------------------------------------------
    slide15 = prs.slides.add_slide(blank_layout)
    add_bg(slide15, DARK_BG)
    add_card(slide15, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3), CARD_BG, GOLD)

    tb = slide15.shapes.add_textbox(Inches(1.0), Inches(1.2), Inches(11.333), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "PORTAL TRANSFORMATION & OPERATIONAL READINESS"
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = GOLD

    summary_bullets = [
        "✔ 100% Commercial Focus: KB West Walk high-street retail, food court, multiplex cinema & studio suites.",
        "✔ Official Cost Sheet & Payment Plans: BSP schedule, 4 payment plans & Axis Bank RERA account details integrated.",
        "✔ Google Gemini AI Conversational Assistant: Live search grounding, asterisks-free formatting & voice synthesis.",
        "✔ Successful Buyer Leads Vault: Multi-CRM dispatch, 100-pt lead scoring, Ctrl+Shift+L shortcut & CSV export.",
        "✔ Production Ready: Live on http://localhost:3000/ with Vite 8, responsive breakpoints & WCAG accessibility.",
        "\nProject RERA: UPRERAPRJ422027/01/2026 | Developer: Shree Kunj Bihariji Realty Pvt. Ltd."
    ]
    for bullet in summary_bullets:
        p_b = tf.add_paragraph()
        p_b.text = bullet
        p_b.font.size = Pt(14)
        p_b.font.color.rgb = TEXT_LIGHT

    output_path = "/Users/neeraj.jha/forbes-fab-luxe/KB_West_Walk_Website_Design_Layout_Presentation.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_deck()
