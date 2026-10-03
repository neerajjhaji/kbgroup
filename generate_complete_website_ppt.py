import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_complete_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette - Luxury Commercial Theme
    DARK_BG = RGBColor(250, 248, 245)       # Light Luxury Sand Background
    CARD_BG = RGBColor(255, 255, 255)       # White Card
    SAND_BG = RGBColor(250, 248, 245)    # #FAF8F5 - Light Warm Sand
    GOLD = RGBColor(166, 129, 66)        # #A68142 - Champagne Gold
    BRONZE = RGBColor(166, 129, 66)      # #A68142 - Royal Bronze
    TEXT_LIGHT = RGBColor(15, 23, 42)  # Dark Charcoal Text for Light Theme
    TEXT_MUTED = RGBColor(71, 85, 105) # Slate Muted
    TEXT_DARK = RGBColor(15, 23, 42)     # #0F172A - Charcoal Dark
    WHITE_CARD = RGBColor(255, 255, 255)

    blank_layout = prs.slide_layouts[6]

    def add_bg(slide, color):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = color

    def add_header(slide, tag_text, title_text, dark_theme=True):
        # Tag
        tb_tag = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.35))
        tf_tag = tb_tag.text_frame
        tf_tag.word_wrap = True
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag_text.upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = GOLD if dark_theme else BRONZE
        p_tag.font.name = "Arial"

        # Title
        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.7), Inches(0.75))
        tf_title = tb_title.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
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

    # =========================================================================
    # SLIDE 1: Title & Cover Slide
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1, DARK_BG)
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
    p.font.size = Pt(50)
    p.font.bold = True
    p.font.color.rgb = TEXT_LIGHT

    p2 = tf.add_paragraph()
    p2.text = "Complete Digital Website Architecture, Content Layout & Commercial Sales Deck"
    p2.font.size = Pt(20)
    p2.font.color.rgb = GOLD

    tb_details = s1.shapes.add_textbox(Inches(1.0), Inches(3.8), Inches(11.333), Inches(2.6))
    tf_det = tb_details.text_frame
    tf_det.word_wrap = True

    items = [
        "📍 Address: Plot No. C-3, Ecotech-12, Greater Noida West, Uttar Pradesh 201318",
        "📜 RERA Reg No: UPRERAPRJ422027/01/2026 | RERA Promoter ID: UPRERAPRM414706",
        "🏬 Development: 18-Level Mixed-Use Commercial Landmark (5 Levels AC High-Street + Studio Suites)",
        "📞 Commercial Helpline: +91 828 7777 333 | WhatsApp: +91 828 7777 333",
        "🌐 Website Presentation: Full Interactive UI/UX, Pricing Sheet, AI Concierge & CRM Vault"
    ]
    for item in items:
        p = tf_det.add_paragraph()
        p.text = item
        p.font.size = Pt(14)
        p.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 2: Executive Overview & Project Snapshot
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_bg(s2, DARK_BG)
    add_header(s2, "EXECUTIVE OVERVIEW & PROJECT SNAPSHOT", "Commercial Identity & Landmark Scale", dark_theme=True)

    # 4 Cards Layout
    cards_data = [
        ("PROJECT IDENTITY", "KB West Walk", "Shree Kunj Bihariji Realty Pvt. Ltd. (Shree KB Group)\nOfficial RERA Reg: UPRERAPRJ422027/01/2026\nLaunch Date: January 07, 2026"),
        ("LOCATION VANTAGE", "Ecotech-12 Hub", "Plot No. C-3, Ecotech-12, Greater Noida West\nDirectly at Proposed Ecotech-12 Metro Station (100M)\nSurrounded by 1,00,000+ Residential Apartments"),
        ("BUILDING SCALE", "18-Level Mixed-Use", "5 Levels AC Ventilated High-Street Shopping Arcade\n3rd, 4th & 5th Floors: Food Court & 5-Screen Cinema\n6th to 18th Floors: Serviced Studio Suites"),
        ("FINANCIAL PRICING", "Starting ₹24,900/sqft", "Lower Ground Floor: ₹25,900 / Sq. Ft.\nGround Floor Boulevard: ₹37,900 / Sq. Ft.\nFirst Floor Fashion: ₹24,900 / Sq. Ft.")
    ]
    for i, (tag, title, desc) in enumerate(cards_data):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.6 + row * 2.6)

        add_card(s2, left, top, Inches(5.75), Inches(2.4), CARD_BG, GOLD)
        tb = s2.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(5.35), Inches(2.0))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = tag
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = title
        p2.font.size = Pt(20)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

        p3 = tf.add_paragraph()
        p3.text = f"\n{desc}"
        p3.font.size = Pt(12)
        p3.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 3: Developer Brand Legacy & Delivered Landmarks
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_bg(s3, SAND_BG)
    add_header(s3, "DEVELOPER LEGACY & DELIVERED LANDMARKS", "20+ Years of Urban Excellence Across NCR (Shree KB Group)", dark_theme=False)

    legacy_projects = [
        ("KB West Walk", "Ecotech-12, Gr. Noida West", "Flagship Ongoing Development", "18-Level High-Street Retail, Food Court, Cinema & Serviced Studio Suites. RERA Reg No: UPRERAPRJ422027/01/2026."),
        ("KB Mart", "Knowledge Park III, Gr. Noida", "Delivered Commercial Landmark", "Premier commercial & retail hub serving Knowledge Park institutional corridor with high rental yield."),
        ("KB Complex", "Alpha-2, Greater Noida", "Thriving Operational Centre", "Established corporate & commercial plaza at Alpha-2 commercial sector, housing corporate site office.")
    ]
    for i, (p_title, p_loc, p_status, p_desc) in enumerate(legacy_projects):
        left = Inches(0.8 + i * 3.95)
        top = Inches(1.7)

        add_card(s3, left, top, Inches(3.75), Inches(5.2), WHITE_CARD, BRONZE)
        tb = s3.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(3.35), Inches(4.8))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = p_status.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = BRONZE

        p2 = tf.add_paragraph()
        p2.text = p_title
        p2.font.size = Pt(20)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_DARK

        p3 = tf.add_paragraph()
        p3.text = p_loc
        p3.font.size = Pt(12)
        p3.font.color.rgb = BRONZE

        p4 = tf.add_paragraph()
        p4.text = f"\n{p_desc}"
        p4.font.size = Pt(12)
        p4.font.color.rgb = TEXT_DARK

    # =========================================================================
    # SLIDE 4: Website Design System & Visual Architecture
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_bg(s4, DARK_BG)
    add_header(s4, "WEBSITE DESIGN SYSTEM & VISUAL ARCHITECTURE", "Color Palette Tokens, Typography & Glassmorphic UI Principles", dark_theme=True)

    # Color Swatches
    swatches = [
        ("Obsidian Dark", "#0B0E14", DARK_BG, TEXT_LIGHT),
        ("Deep Slate", "#0F141D", CARD_BG, TEXT_LIGHT),
        ("Champagne Gold", "#D4AF37", GOLD, TEXT_DARK),
        ("Royal Bronze", "#A68142", BRONZE, TEXT_LIGHT),
        ("Warm Sand", "#FAF8F5", SAND_BG, TEXT_DARK)
    ]
    for i, (c_name, c_hex, c_rgb, t_rgb) in enumerate(swatches):
        left = Inches(0.8 + i * 2.35)
        top = Inches(1.6)
        add_card(s4, left, top, Inches(2.2), Inches(1.5), c_rgb, GOLD)
        tb = s4.shapes.add_textbox(left + Inches(0.1), top + Inches(0.15), Inches(2.0), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = c_name
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = t_rgb
        p2 = tf.add_paragraph()
        p2.text = c_hex
        p2.font.size = Pt(11)
        p2.font.color.rgb = t_rgb

    # Typography & Glassmorphism Cards
    add_card(s4, Inches(0.8), Inches(3.4), Inches(5.7), Inches(3.5), CARD_BG, GOLD)
    tb = s4.shapes.add_textbox(Inches(1.0), Inches(3.5), Inches(5.3), Inches(3.3))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "TYPOGRAPHY & HIERARCHY STACK"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    t_rules = [
        "• Primary Display Font: Outfit (Bold 700/800) for commercial impact",
        "• Accent Serif Font: Cormorant Garamond for luxury titles",
        "• Body Font: Plus Jakarta Sans for high contrast readability",
        "• Dynamic Fluid Scaling: clamp(32px, 4vw, 52px)",
        "• Contrast Standard: AAA compliant white/gold text on obsidian dark"
    ]
    for r in t_rules:
        p_r = tf.add_paragraph()
        p_r.text = r
        p_r.font.size = Pt(12)
        p_r.font.color.rgb = TEXT_LIGHT

    add_card(s4, Inches(6.8), Inches(3.4), Inches(5.7), Inches(3.5), CARD_BG, GOLD)
    tb = s4.shapes.add_textbox(Inches(7.0), Inches(3.5), Inches(5.3), Inches(3.3))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "UI/UX COMPONENT PATTERNS"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    p_rules = [
        "• Glassmorphism: Backdrop blur (10px - 20px) on navigation & modals",
        "• Live Activity Ticker: Top ticker showing real-time buyer signals",
        "• Responsive Grid: Flexbox + CSS Grid auto-fit minmax(320px, 1fr)",
        "• Micro-Interactions: Hover gold glows, smooth scroll & scale transitions",
        "• Conversational AI: Floating bot widget anchored at bottom-right"
    ]
    for r in p_rules:
        p_r = tf.add_paragraph()
        p_r.text = r
        p_r.font.size = Pt(12)
        p_r.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 5: Website Navigation & Utility Header
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_bg(s5, DARK_BG)
    add_header(s5, "WEBSITE NAVIGATION & UTILITY HEADER", "Header Elements, Ticker Bar & Fast Conversion Actions", dark_theme=True)

    add_card(s5, Inches(0.8), Inches(1.6), Inches(11.733), Inches(5.3), CARD_BG, GOLD)
    tb = s5.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.333), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "1. LIVE BUYER ACTIVITY TICKER BAR (Top Banner)"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = GOLD

    p_desc1 = tf.add_paragraph()
    p_desc1.text = "   • Real-time animated ticker displaying live buyer activity (e.g. 'Rahul M. booked VIP Site Visit 4m ago').\n   • Instant CTA button triggering VIP Site Visit Booking Modal."
    p_desc1.font.size = Pt(12)
    p_desc1.font.color.rgb = TEXT_LIGHT

    p2 = tf.add_paragraph()
    p2.text = "\n2. STICKY GLASSMORPHIC NAVIGATION BAR"
    p2.font.size = Pt(14)
    p2.font.bold = True
    p2.font.color.rgb = GOLD

    nav_items = [
        "   • Brand Identity Badges: Dual logos for KB West Walk and Shree KB Group with RERA badge.",
        "   • Section Anchor Links: Smooth scrolling to Overview, Commercial Shops, Pricing, Amenities, Location, ROI & Mall Management.",
        "   • Quick Action Buttons: 'DOWNLOAD PRICE LIST (PDF)', 'SEARCH', and 'BUYERS VAULT' (CRM shortcut).",
        "   • Keyboard Accessibility: Skip to main content link (#main-content) for keyboard and screen-reader users."
    ]
    for n_item in nav_items:
        p_n = tf.add_paragraph()
        p_n.text = n_item
        p_n.font.size = Pt(12)
        p_n.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 6: Hero Canvas & Value Proposition
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_bg(s6, DARK_BG)
    add_header(s6, "HERO CANVAS & VALUE PROPOSITION", "Hero Section UI/UX Layout & Immediate Buyer Conversion", dark_theme=True)

    add_card(s6, Inches(0.8), Inches(1.6), Inches(7.5), Inches(5.3), CARD_BG, GOLD)
    tb = s6.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(7.1), Inches(4.9))
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
    p3.font.size = Pt(15)
    p3.font.color.rgb = GOLD

    p4 = tf.add_paragraph()
    p4.text = "High-Street Retail • Gourmet Food Court • Multiplex Cinema • Studio Suites\nPlot C-3, Ecotech-12, Greater Noida West | RERA Reg No: UPRERAPRJ422027/01/2026"
    p4.font.size = Pt(12)
    p4.font.color.rgb = TEXT_MUTED

    p5 = tf.add_paragraph()
    p5.text = "\n[ PRIMARY CTA: BOOK VIP SITE VISIT ]\n[ SECONDARY CTA: DOWNLOAD COST SHEET (PDF) ]\n[ TERTIARY CTA: VIEW FLOOR PLANS ]"
    p5.font.size = Pt(12)
    p5.font.bold = True
    p5.font.color.rgb = GOLD

    # Side Metric Card
    add_card(s6, Inches(8.6), Inches(1.6), Inches(3.9), Inches(5.3), CARD_BG, GOLD)
    tb = s6.shapes.add_textbox(Inches(8.8), Inches(1.8), Inches(3.5), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "HERO KEY METRICS"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    hero_m = [
        ("Ventilated High-Street", "5 Levels", "Air-Conditioned Zones"),
        ("Prime High-Street Retail", "LGF, GF & 1st", "Starting ₹24,900 / sq.ft."),
        ("Multiplex & Food Court", "3rd, 4th & 5th", "Cinema & Rooftop Dining"),
        ("Serviced Studio Suites", "6th - 18th Floor", "State-of-the-Art Suites")
    ]
    for label, val, sub in hero_m:
        p1 = tf.add_paragraph()
        p1.text = f"• {label}:"
        p1.font.size = Pt(11)
        p1.font.color.rgb = TEXT_MUTED

        p2 = tf.add_paragraph()
        p2.text = f"  {val} ({sub})"
        p2.font.size = Pt(13)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 7: Floor-by-Floor Commercial Architecture
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    add_bg(s7, DARK_BG)
    add_header(s7, "FLOOR-BY-FLOOR COMMERCIAL ARCHITECTURE", "18-Level Vertical Mixed-Use Zoning Strategy", dark_theme=True)

    floors_data = [
        ("Lower Ground Floor (LGF)", "₹ 25,900 / Sq. Ft.", "Hypermarket, Supermarket & Electronics Anchor Outlets", "High-footfall anchor floor connected via direct escalators and high-speed elevators."),
        ("Ground Floor (GF Boulevard)", "₹ 37,900 / Sq. Ft.", "Boulevard Frontage Flagship High-Street Retail Shops", "Double-height glass facade shops facing pedestrian promenade & central atrium."),
        ("First Floor (1st Floor)", "₹ 24,900 / Sq. Ft.", "Lifestyle, Fashion Apparel & Consumer Arcades", "Overlooking the skylight glass atrium with continuous shopper walkways."),
        ("3rd, 4th & 5th Floors", "Hospitality Zone", "Gourmet Food Court, Rooftop Cafes & 5-Screen Cinema", "Multi-screen multiplex cinema with gourmet food court and open-air dining."),
        ("6th to 18th Floors", "Price On Request", "Serviced Studio Suites & Executive Workspaces", "Luxury studio suites offering high rental yields and views of Greater Noida West.")
    ]

    for i, (f_title, f_price, f_sub, f_desc) in enumerate(floors_data):
        top = Inches(1.6 + i * 1.05)
        add_card(s7, Inches(0.8), top, Inches(11.733), Inches(0.92), CARD_BG, GOLD)
        tb = s7.shapes.add_textbox(Inches(1.0), top + Inches(0.08), Inches(11.333), Inches(0.76))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = f"{f_title} — BSP: {f_price}"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = f"{f_sub} | {f_desc}"
        p2.font.size = Pt(11)
        p2.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 8: Detailed Commercial Typologies Showcase
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    add_bg(s8, DARK_BG)
    add_header(s8, "COMMERCIAL TYPOLOGIES SHOWCASE", "Detailed Floor-Wise Retail & Studio Unit Profiles", dark_theme=True)

    typos = [
        ("Ground Floor Boulevard", "₹ 37,900 / Sq. Ft.", "High-Visibility Frontage Stores", "Premier Ground Floor retail shops facing pedestrian promenade and atrium. Maximum footfall.", ["Atrium & Street Frontage", "Double Height Facades", "AC Zone High-Street"]),
        ("Lower Ground Floor", "₹ 25,900 / Sq. Ft.", "Hypermarket Anchor Outlets", "Dedicated to anchor hypermarkets, electronics hubs, and daily utility convenience outlets.", ["Direct Escalator Access", "Designed for Anchor Stores", "100% Power Backed"]),
        ("First Floor Fashion Arcades", "₹ 24,900 / Sq. Ft.", "Lifestyle & Brand Arcades", "Vibrant floor dedicated to apparel, footwear, beauty salons, and gadget galleries.", ["Central Atrium Views", "High Shopper Walkways", "Best Value Entry Rate"]),
        ("Studio Suites (6th-18th)", "Price On Request", "Serviced Studio Apartments", "Modern studio apartments offering high rental yield, boutique amenities, and views.", ["High Rental Yield Corridor", "Separate Lifts Hoist", "Access to Cinema & Dining"])
    ]

    for i, (t_title, t_price, t_sub, t_desc, t_highlights) in enumerate(typos):
        left = Inches(0.8 + i * 2.95)
        top = Inches(1.6)
        add_card(s8, left, top, Inches(2.8), Inches(5.3), CARD_BG, GOLD)

        tb = s8.shapes.add_textbox(left + Inches(0.15), top + Inches(0.15), Inches(2.5), Inches(4.9))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = t_sub.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = t_title
        p2.font.size = Pt(15)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

        p3 = tf.add_paragraph()
        p3.text = t_price
        p3.font.size = Pt(14)
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

    # =========================================================================
    # SLIDE 9: Official Cost Sheet & Price List Table
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    add_bg(s9, DARK_BG)
    add_header(s9, "OFFICIAL COST SHEET & PRICE LIST TABLE", "Transparent RERA Pricing Schedule & Bank Collection Account", dark_theme=True)

    add_card(s9, Inches(0.8), Inches(1.6), Inches(11.733), Inches(5.3), CARD_BG, GOLD)

    tb = s9.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.333), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "OFFICIAL RETAIL BASE SELLING PRICE (BSP) SCHEDULE (w.e.f. July 12, 2026*)"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    rows_data = [
        ("Lower Ground Floor (LGF)", "₹ 25,900 / Sq. Ft.", "High Footfall Hypermarket & Daily Convenience Anchor Stores", "High ROI Retail"),
        ("Ground Floor (GF)", "₹ 37,900 / Sq. Ft.", "Frontage Boulevard Flagship High-Street Retail Shops", "Premium Flagship"),
        ("First Floor (1st Floor)", "₹ 24,900 / Sq. Ft.", "Lifestyle, Fashion Apparel & Consumer Experience Arcades", "Best Value Entry")
    ]
    for floor, bsp, features, tag in rows_data:
        p_row = tf.add_paragraph()
        p_row.text = f"• [{tag.upper()}] {floor} — BSP: {bsp}"
        p_row.font.size = Pt(13)
        p_row.font.bold = True
        p_row.font.color.rgb = TEXT_LIGHT

        p_feat = tf.add_paragraph()
        p_feat.text = f"   Highlights: {features}\n"
        p_feat.font.size = Pt(11)
        p_feat.font.color.rgb = TEXT_MUTED

    p_bank_title = tf.add_paragraph()
    p_bank_title.text = "OFFICIAL RERA COLLECTION BANK ACCOUNT DETAILS:"
    p_bank_title.font.size = Pt(13)
    p_bank_title.font.bold = True
    p_bank_title.font.color.rgb = GOLD

    p_bank_body = tf.add_paragraph()
    p_bank_body.text = "Account Name: Shree Kunj Bihariji Realty Pvt. Ltd. Collection Account for KB West Walk\nBank: Axis Bank Ltd. | Account Number: 925020035796321\nIFSC Code: UTIB0005181 | Branch: Alpha II, Greater Noida"
    p_bank_body.font.size = Pt(12)
    p_bank_body.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 10: Complete Payment Schedules & Plans
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    add_bg(s10, DARK_BG)
    add_header(s10, "COMPLETE PAYMENT SCHEDULES & PLANS", "4 RERA Compliant Payment Options for Buyers & Investors", dark_theme=True)

    plans_data = [
        ("1. Down Payment Plan with Rent Assistance", "Maximum Discount & Assured Returns", "• Booking: 10%\n• Within 60 Days: 80%\n• On CC Applied: 10%\nNote: Immediate rental yield benefits during construction."),
        ("2. Special Payment Plan 1 (40 : 25 : 25)", "Popular Investor Choice", "• Booking: 10%\n• Within 60 Days: 40%\n• On 6th Fl Slab: 25%\n• On CC Applied: 25%\nNote: Balanced liquidity management."),
        ("3. Special Payment Plan 2 (30 : 20 : 20 : 20)", "Flexible Step Payment", "• Booking: 10%\n• Within 60 Days: 30%\n• Ground Fl Slab: 20%\n• 6th Fl Slab: 20% | CC: 20%\nNote: Aligned with structure progress."),
        ("4. Construction Linked Plan (CLP)", "RERA Milestone Standard", "• Booking: 10% | 60 Days: 15%\n• Plinth: 15% | LGF Slab: 15%\n• 5th Fl: 10% | 10th Fl: 10%\n• 15th Fl: 10% | 18th Fl: 10% | CC: 5%\nNote: Maximum safety linked to civil progress.")
    ]

    for i, (p_title, p_badge, p_body) in enumerate(plans_data):
        left = Inches(0.8 + (i % 2) * 5.95)
        top = Inches(1.6 + (i // 2) * 2.6)

        add_card(s10, left, top, Inches(5.75), Inches(2.4), CARD_BG, GOLD)
        tb = s10.shapes.add_textbox(left + Inches(0.15), top + Inches(0.15), Inches(5.45), Inches(2.1))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = p_badge.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = p_title
        p2.font.size = Pt(14)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

        p3 = tf.add_paragraph()
        p3.text = p_body
        p3.font.size = Pt(11)
        p3.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 11: Commercial Infrastructure & Amenities
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    add_bg(s11, DARK_BG)
    add_header(s11, "COMMERCIAL INFRASTRUCTURE & AMENITIES", "6 Core Pillars of Retail, Entertainment & Working Infrastructure", dark_theme=True)

    amenities = [
        ("5-Level AC Shopping Arcade", "High-Street Retail", "Hybrid high-street & atrium format with double height shops & climate control."),
        ("Multi-Screen Multiplex Cinema", "Entertainment Hub", "State-of-the-art multi-screen cinema on 5th floor with gourmet stands."),
        ("Food Court & Rooftop Dining", "Gastronomy & Nightlife", "Expansive 3rd & 4th floor food courts with QSR brands & open-air rooftop dining."),
        ("State-of-the-Art Studio Suites", "Serviced Living", "Premium studio suites on 6th to 18th floors crafted for high rental yields."),
        ("Double Height Glass Atrium", "Architecture", "Skylight atrium ensuring natural light, open ventilation & brand visibility."),
        ("Basement Parking & Security", "Infrastructure", "Ample visitor parking, 24/7 CCTV surveillance & 100% power backup.")
    ]

    for i, (a_title, a_cat, a_desc) in enumerate(amenities):
        col = i % 3
        row = i // 3
        left = Inches(0.8 + col * 3.95)
        top = Inches(1.6 + row * 2.6)

        add_card(s11, left, top, Inches(3.75), Inches(2.4), CARD_BG, GOLD)
        tb = s11.shapes.add_textbox(left + Inches(0.15), top + Inches(0.15), Inches(3.45), Inches(2.1))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = a_cat.upper()
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = GOLD

        p2 = tf.add_paragraph()
        p2.text = a_title
        p2.font.size = Pt(15)
        p2.font.bold = True
        p2.font.color.rgb = TEXT_LIGHT

        p3 = tf.add_paragraph()
        p3.text = f"\n{a_desc}"
        p3.font.size = Pt(11)
        p3.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 12: Location Advantage & Connectivity Map
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    add_bg(s12, DARK_BG)
    add_header(s12, "LOCATION ADVANTAGE & CONNECTIVITY MAP", "Plot C-3, Ecotech-12 Location Benchmarks & Infrastructure", dark_theme=True)

    add_card(s12, Inches(0.8), Inches(1.6), Inches(11.733), Inches(5.3), CARD_BG, GOLD)
    tb = s12.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.333), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "STRATEGIC HIGH-FOOTFALL COMMERCIAL HUB (ECOTECH-12, GREATER NOIDA WEST)"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    conn_points = [
        ("Proposed Ecotech-12 Metro Station", "Walking Distance (100 Meters)", "Direct high-frequency commuter footfall destination"),
        ("Char Murti / Gaur Chowk / Ek Murti", "5 mins (2.5 Km)", "Major commercial crossroads of Greater Noida West"),
        ("Crossings Republik Residential Hub", "5 mins (3.0 Km)", "Dense captive residential shopper base"),
        ("Noida-Gr. Noida Expressway & NH-24", "10 mins (6.0 Km)", "Seamless regional expressway connectivity"),
        ("Fortis & Max Super Speciality Hospital", "10 mins (7.5 Km)", "Healthcare hub proximity"),
        ("Hindon Airport (Ghaziabad)", "25 mins (25.0 Km)", "Regional airport connectivity"),
        ("Jewar International Airport (Noida Int.)", "45 mins (48.0 Km)", "Upcoming international aviation growth corridor")
    ]
    for name, dist, desc in conn_points:
        p_c = tf.add_paragraph()
        p_c.text = f"📍 {name} — {dist} ({desc})"
        p_c.font.size = Pt(12)
        p_c.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 13: Interactive Property Finder & EMI Calculator
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    add_bg(s13, DARK_BG)
    add_header(s13, "INTERACTIVE PROPERTY FINDER & EMI CALCULATOR", "Website Commercial Space Finder & Real-Time Loan Estimator", dark_theme=True)

    add_card(s13, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.3), CARD_BG, GOLD)
    tb = s13.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "PROPERTY FINDER COMPONENT"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    pf_features = [
        "• Interactive Category Selector: Retail Shops, Food Court/Cinema, Studio Suites",
        "• Budget Range Filter: Up to ₹50L, ₹50L-₹1Cr, ₹1Cr-₹3Cr, ₹3Cr+",
        "• View Orientation Filter: Atrium Facing, Boulevard Facing, Promenade View",
        "• Instant Dynamic Filtering with zero page reload",
        "• Direct CTAs: 'Request Unit Floor Plan' & 'Schedule Site Visit'"
    ]
    for feat in pf_features:
        p_f = tf.add_paragraph()
        p_f.text = feat
        p_f.font.size = Pt(12)
        p_f.font.color.rgb = TEXT_LIGHT

    add_card(s13, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.3), CARD_BG, GOLD)
    tb = s13.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "REAL-TIME LOAN EMI CALCULATOR"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    emi_features = [
        "• Property Price Range Slider: ₹29.6 L to ₹6.00 Cr",
        "• Down Payment Percentage Selector: 10% to 50%",
        "• Loan Tenure Selector: 10, 15, 20, 25, 30 Years",
        "• Interest Rate Input: Customizable e.g. 8.5% p.a.",
        "• Live Monthly EMI Output Calculation",
        "• Direct CTA: 'Apply for Bank Subvention Plan'"
    ]
    for feat in emi_features:
        p_e = tf.add_paragraph()
        p_e.text = feat
        p_e.font.size = Pt(12)
        p_e.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 14: Capital ROI & Growth Projections
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    add_bg(s14, DARK_BG)
    add_header(s14, "CAPITAL ROI & GROWTH PROJECTIONS", "Commercial Investment Yield Benchmarks & Growth Corridor", dark_theme=True)

    add_card(s14, Inches(0.8), Inches(1.6), Inches(11.733), Inches(5.3), CARD_BG, GOLD)
    tb = s14.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.333), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "INVESTMENT ROI BENCHMARKS & MARKET PROJECTIONS"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    roi_items = [
        ("Commercial Rental Yield", "7.5% – 9.2% P.A.", "High commercial rental yield corridor in Greater Noida West."),
        ("YoY Capital Appreciation", "+21.2% YoY Growth", "Ranked among top 3 commercial retail appreciation hubs in NCR."),
        ("Cumulative 3-Year Appreciation", "+38% to +48%", "Projected growth upon completion of Ecotech-12 metro & Jewar airport."),
        ("Ecotech-12 Locality Rating", "92 / 100 (4.9/5 Stars)", "Verified benchmark by leading real estate analytics platforms."),
        ("Captive Consumer Footfall", "1,00,000+ Apartments", "Surrounded by high-density occupied residential sectors.")
    ]
    for r_title, r_val, r_desc in roi_items:
        p_r = tf.add_paragraph()
        p_r.text = f"• {r_title}: {r_val}"
        p_r.font.size = Pt(13)
        p_r.font.bold = True
        p_r.font.color.rgb = TEXT_LIGHT

        p_d = tf.add_paragraph()
        p_d.text = f"   {r_desc}\n"
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 15: Dedicated Mall Management Services
    # =========================================================================
    s15 = prs.slides.add_slide(blank_layout)
    add_bg(s15, SAND_BG)
    add_header(s15, "DEDICATED MALL & FACILITY SERVICES", "Commercial Excellence & Professional Facility Upkeep", dark_theme=False)

    services_data = [
        ("Dedicated Retail Concierge", "24/7 commercial desk assistance for store owners, corporate tenants & visitor management."),
        ("Professional Mall Management", "Comprehensive facility upkeep, central HVAC climate maintenance & security marshals."),
        ("Multi-Level Valet & VIP Parking", "Seamless valet arrival, automated parking guidance & reserved executive parking."),
        ("Leasing & Tenant Brand Support", "Dedicated support for brand tie-ups, retail leasing & rental management.")
    ]

    for i, (s_title, s_desc) in enumerate(services_data):
        left = Inches(0.8 + (i % 2) * 5.95)
        top = Inches(1.6 + (i // 2) * 2.6)

        add_card(s15, left, top, Inches(5.75), Inches(2.4), WHITE_CARD, BRONZE)
        tb = s15.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(5.35), Inches(2.0))
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

    # =========================================================================
    # SLIDE 16: Interactive Modal Ecosystem (8 Overlays)
    # =========================================================================
    s16 = prs.slides.add_slide(blank_layout)
    add_bg(s16, DARK_BG)
    add_header(s16, "INTERACTIVE MODAL ECOSYSTEM", "8 High-Converting Website Overlay Modals & Drawers", dark_theme=True)

    modals_list = [
        ("01. SiteVisitModal", "VIP Chauffeur booking, captcha verification & instant VIP Pass Generation"),
        ("02. FloorPlanModal", "Architectural schematic blueprints, area specs & floor plan tab swapper"),
        ("03. BrochureModal", "E-Brochure & Price List PDF email/WhatsApp instant download gate"),
        ("04. ConciergeModal", "Private commercial advisory call request & topic selection menu"),
        ("05. SiteMapModal", "Master site plan layout & campus zone hotspot explorer"),
        ("06. VirtualTourModal", "Immersive 360° virtual walkthrough & Meta Quest VR home demo request"),
        ("07. DetailDrawer", "Technical specifications drawer (RCC frame, lifts, HVAC, power backup)"),
        ("08. SearchModal", "Instant site-wide search across shops, food court, location & documents")
    ]

    for i, (m_name, m_desc) in enumerate(modals_list):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.5 + row * 1.35)

        add_card(s16, left, top, Inches(5.75), Inches(1.2), CARD_BG, GOLD)
        tb = s16.shapes.add_textbox(left + Inches(0.15), top + Inches(0.1), Inches(5.45), Inches(1.0))
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

    # =========================================================================
    # SLIDE 17: KB Concierge AI Assistant (geminiService.js)
    # =========================================================================
    s17 = prs.slides.add_slide(blank_layout)
    add_bg(s17, DARK_BG)
    add_header(s17, "CONVERSATIONAL AI BOT (KB CONCIERGE)", "Google Gemini Integration with Live Search Grounding", dark_theme=True)

    add_card(s17, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.3), CARD_BG, GOLD)
    tb = s17.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "GEMINI SERVICE ARCHITECTURE"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    ai_arch = [
        "• API Integration: REST API v1beta via askGemini()",
        "• Sequential Model Fallback:",
        "  1. gemini-3.6-flash",
        "  2. gemini-3.5-flash",
        "  3. gemini-flash-latest",
        "• Live Google Search Grounding: Enabled via tools: [{ googleSearch: {} }]",
        "• Asterisks-Free Formatting: Automatic regex stripping of * symbols for clean text output",
        "• Conversation Memory: Retains last 6 conversation turns"
    ]
    for item in ai_arch:
        p_i = tf.add_paragraph()
        p_i.text = item
        p_i.font.size = Pt(11)
        p_i.font.color.rgb = TEXT_LIGHT

    add_card(s17, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.3), CARD_BG, GOLD)
    tb = s17.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "FLOATING BOT WIDGET CAPABILITIES"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    bot_caps = [
        "• Warm Interactive Greeting with 4 Option Chips",
        "• 🎯 Commercial Property Matchmaker Tool",
        "• 🚗 VIP On-Site Guided Walkthrough Request",
        "• 📊 Market Trends & Rental Yield Estimator",
        "• 📐 Retail Shop & Studio Suite Layout Viewer",
        "• Text-to-Speech (TTS) Voice Synthesis",
        "• Direct Callback Request & Lead Dispatch"
    ]
    for item in bot_caps:
        p_b = tf.add_paragraph()
        p_b.text = item
        p_b.font.size = Pt(12)
        p_b.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 18: Buyer Lead Management Vault & CRM Dashboard
    # =========================================================================
    s18 = prs.slides.add_slide(blank_layout)
    add_bg(s18, DARK_BG)
    add_header(s18, "BUYER LEAD VAULT & CRM DASHBOARD", "100-Point Scoring, Vault Storage & Instant CSV Export", dark_theme=True)

    add_card(s18, Inches(0.8), Inches(1.6), Inches(5.7), Inches(5.3), CARD_BG, GOLD)
    tb = s18.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.3), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "LEAD DISPATCH & SCORING UTILITY"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    lead_vault = [
        "• Vault Storage: localStorage ('kb_west_walk_leads_vault')",
        "• 100-Point Quality Scoring (calculateBuyerScore):",
        "  - Deducts 50 pts for temp emails or dummy phone numbers",
        "  - Adds 10-15 pts for chauffeur requests & ready capital",
        "• Buyer Tiers:",
        "  - VIP Commercial Investor (90+ score)",
        "  - High Intent Buyer (70+ score)",
        "  - Standard Prospect (<70 score)",
        "• Multi-CRM Endpoints: Web3Forms & FormSubmit API"
    ]
    for item in lead_vault:
        p_l = tf.add_paragraph()
        p_l.text = item
        p_l.font.size = Pt(11)
        p_l.font.color.rgb = TEXT_LIGHT

    add_card(s18, Inches(6.8), Inches(1.6), Inches(5.7), Inches(5.3), CARD_BG, GOLD)
    tb = s18.shapes.add_textbox(Inches(7.0), Inches(1.8), Inches(5.3), Inches(4.9))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "BUYER LEADS VAULT MODAL (Ctrl+Shift+L)"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GOLD

    vault_features = [
        "• Global Shortcut: Ctrl + Shift + L or Cmd + Shift + L",
        "• Real-Time Metrics Strip: Total Leads, VIP Count, High Intent Count, Avg Score",
        "• Search & Tier Filter: Instant filter by buyer name, phone, email, or source",
        "• One-Click CSV Export: exportLeadsToCSV() downloads formatted CSV file",
        "• Copy-to-Clipboard Phone: Quick click to copy buyer contact number"
    ]
    for feat in vault_features:
        p_v = tf.add_paragraph()
        p_v.text = feat
        p_v.font.size = Pt(12)
        p_v.font.color.rgb = TEXT_LIGHT

    # =========================================================================
    # SLIDE 19: Dynamic SEO, Performance & Accessibility (a11y) Blueprint
    # =========================================================================
    s19 = prs.slides.add_slide(blank_layout)
    add_bg(s19, DARK_BG)
    add_header(s19, "SEO, PERFORMANCE & ACCESSIBILITY BLUEPRINT", "Production React 19 + Vite 8 Technical Optimizations", dark_theme=True)

    tech_items = [
        ("Dynamic SEO Head (SEOHead.jsx)", "Dynamically manipulates document title, meta description, and OpenGraph tags based on active modal view states."),
        ("Rich JSON-LD Schema (index.html)", "Schema.org graph embedding RealEstateListing, CommercialRealEstate, Organization, Place, Offer & FAQPage."),
        ("Accessibility (WCAG Compliant)", "Skip link (#main-content), role='dialog', aria-modal='true', aria-label & global Escape key closer across all 8 modals."),
        ("Production Vite 8 Build", "Ultra-fast 1.08s build time, 1879 modules transformed, clean bundle chunks with zero bloat."),
        ("Cross-Browser & Mobile Optimized", "Tested across desktop, tablet, and mobile breakpoints with touch-friendly controls.")
    ]

    for i, (title, desc) in enumerate(tech_items):
        top = Inches(1.6 + i * 1.05)
        add_card(s19, Inches(0.8), top, Inches(11.733), Inches(0.92), CARD_BG, GOLD)
        tb = s19.shapes.add_textbox(Inches(1.0), top + Inches(0.08), Inches(11.333), Inches(0.76))
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

    # =========================================================================
    # SLIDE 20: Step-by-Step Buyer Journey & Site Office Contact
    # =========================================================================
    s20 = prs.slides.add_slide(blank_layout)
    add_bg(s20, DARK_BG)
    add_card(s20, Inches(0.6), Inches(0.6), Inches(12.133), Inches(6.3), CARD_BG, GOLD)

    tb = s20.shapes.add_textbox(Inches(1.0), Inches(1.1), Inches(11.333), Inches(5.3))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "BUYER ONBOARDING JOURNEY & CONTACT INFORMATION"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = GOLD

    steps_text = [
        "Step 01: Project & Price Sheet Consultation — Review BSP rates, unit availability & floor plan placement.",
        "Step 02: VIP On-Site Walkthrough — Visit site office at Plot C-3, Ecotech-12 for guided walkthrough & 3D model demo.",
        "Step 03: Payment Plan Customization — Select between Down Payment with Rent Assistance, Special 40:25:25, or CLP.",
        "Step 04: Official RERA Booking — Secure shop or studio unit with 10% booking amount paid to Axis Bank Collection Account.",
        "\n📍 SITE OFFICE: Plot No. C-3, Ecotech-12, Greater Noida West - 201318",
        "🏢 CORPORATE OFFICE: FF-39, First Floor, KB Complex, Plot No. LS-1, Alpha-2, Greater Noida, U.P. 201310",
        "📞 HELPLINE: +91 828 7777 333 | WHATSAPP: +91 828 7777 333"
    ]
    for step in steps_text:
        p_s = tf.add_paragraph()
        p_s.text = step
        p_s.font.size = Pt(13)
        p_s.font.color.rgb = TEXT_LIGHT

    output_path = "/Users/neeraj.jha/forbes-fab-luxe/KB_West_Walk_Complete_Website_Presentation.pptx"
    prs.save(output_path)
    print(f"Complete website presentation saved successfully to: {output_path}")

if __name__ == "__main__":
    create_complete_deck()
