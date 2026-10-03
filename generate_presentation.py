import os
import base64
import io
from PIL import Image

img_dir = '/tmp/screenshots_clean'
images = {}

for filename in sorted(os.listdir(img_dir)):
    if filename.endswith('.png'):
        path = os.path.join(img_dir, filename)
        with Image.open(path) as img:
            img = img.convert('RGB')
            if img.width > 1200:
                h = int((1200 / img.width) * img.height)
                img = img.resize((1200, h), Image.Resampling.LANCZOS)

            buffer = io.BytesIO()
            img.save(buffer, format='JPEG', quality=82)
            b64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
            key = os.path.splitext(filename)[0]
            images[key] = f'data:image/jpeg;base64,{b64}'

def img_get(key):
    return images.get(key, '')

head = """<title>Forbes Fab Luxe — Complete Website Review Presentation</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg-dark: #12100E;
    --bg-card: #1A1815;
    --bg-cream: #FAF8F5;
    --card-light: #FFFFFF;
    --gold: #C8A464;
    --gold-light: #E8D4A8;
    --gold-dark: #9A7B3E;
    --text-primary: #1A1815;
    --text-muted: #666058;
    --text-light: #F3EFEA;
    --accent-green: #2D7A4D;
    --border-gold: rgba(200, 164, 100, 0.3);
    --shadow-luxury: 0 20px 40px rgba(0, 0, 0, 0.12);
    --font-heading: 'Cinzel', serif;
    --font-body: 'Plus Jakarta Sans', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font-body); background-color: var(--bg-dark); color: var(--text-light); line-height: 1.6; overflow-x: hidden; }

  .top-bar { position: sticky; top: 0; z-index: 1000; background: rgba(18, 16, 14, 0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border-gold); padding: 14px 28px; display: flex; justify-content: space-between; align-items: center; }
  .brand-logo { display: flex; align-items: center; gap: 12px; }
  .brand-mark { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, var(--gold-light), var(--gold-dark)); display: flex; align-items: center; justify-content: center; color: var(--bg-dark); font-family: var(--font-heading); font-weight: 800; font-size: 18px; }
  .brand-text h1 { font-family: var(--font-heading); font-size: 16px; letter-spacing: 2px; color: var(--gold-light); text-transform: uppercase; }
  .brand-text p { font-size: 11px; color: #A0988E; letter-spacing: 0.5px; }

  .controls { display: flex; align-items: center; gap: 16px; }
  .btn { background: transparent; border: 1px solid var(--border-gold); color: var(--gold-light); padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px; }
  .btn:hover { background: var(--gold); color: var(--bg-dark); border-color: var(--gold); }
  .btn-primary { background: var(--gold); color: var(--bg-dark); border: none; }
  .btn-primary:hover { background: var(--gold-light); }

  .deck-container { max-width: 1440px; margin: 20px auto 60px; padding: 0 24px; }
  .slide-tabs { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 24px; scrollbar-width: thin; scrollbar-color: var(--gold) transparent; }
  .slide-tab { background: var(--bg-card); border: 1px solid rgba(255, 255, 255, 0.08); color: #B0A89E; padding: 10px 18px; border-radius: 8px; font-size: 12px; font-weight: 600; white-space: nowrap; cursor: pointer; transition: all 0.2s ease; }
  .slide-tab:hover { border-color: var(--border-gold); color: var(--gold-light); }
  .slide-tab.active { background: linear-gradient(135deg, rgba(200, 164, 100, 0.2), rgba(154, 123, 62, 0.2)); border-color: var(--gold); color: var(--gold-light); box-shadow: 0 4px 12px rgba(200, 164, 100, 0.15); }

  .slide-card { display: none; background: var(--bg-cream); color: var(--text-primary); border-radius: 16px; padding: 36px; box-shadow: var(--shadow-luxury); animation: fadeIn 0.4s ease; }
  .slide-card.active { display: block; }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  .slide-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #EAE4D9; }
  .slide-title-group h2 { font-family: var(--font-heading); font-size: 26px; color: #1A1815; margin-bottom: 6px; }
  .slide-title-group p { font-size: 14px; color: var(--text-muted); }
  .slide-badge { background: #1A1815; color: var(--gold); padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }

  .slide-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 32px; align-items: start; }
  @media (max-width: 1024px) { .slide-grid { grid-template-columns: 1fr; } }

  .browser-frame { background: #FFFFFF; border-radius: 12px; border: 1px solid #E2DCD0; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08); overflow: hidden; }
  .browser-top { background: #F2ECE1; padding: 10px 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #E2DCD0; }
  .browser-dots { display: flex; gap: 6px; }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-red { background: #FF5F56; } .dot-yellow { background: #FFBD2E; } .dot-green { background: #27C93F; }
  .browser-address { flex: 1; background: #FFFFFF; border-radius: 4px; padding: 4px 12px; font-size: 11px; color: #70685E; border: 1px solid #E2DCD0; }

  .screenshot-container { max-height: 520px; overflow-y: auto; background: #FAF8F5; }
  .screenshot-container img { width: 100%; display: block; height: auto; }

  .analysis-section { display: flex; flex-direction: column; gap: 20px; }
  .info-box { background: #FFFFFF; border-radius: 12px; padding: 22px; border: 1px solid #EAE4D9; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03); }
  .info-box-title { font-size: 14px; font-weight: 700; color: #1A1815; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .info-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .info-list li { font-size: 13px; color: #4A443C; display: flex; align-items: flex-start; gap: 8px; line-height: 1.5; }
  .info-list li::before { content: "•"; color: var(--gold-dark); font-weight: bold; }

  .modification-box { background: #1A1815; color: #FFFFFF; border-radius: 12px; padding: 22px; border: 1px solid var(--gold); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); }
  .mod-title { font-size: 14px; font-weight: 700; color: var(--gold); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .mod-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .mod-list li { font-size: 13px; color: #E2DDD5; display: flex; align-items: flex-start; gap: 8px; line-height: 1.5; }
  .mod-list li::before { content: "➔"; color: var(--gold); }

  .matrix-table { width: 100%; border-collapse: collapse; margin-top: 16px; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
  .matrix-table th { background: #1A1815; color: var(--gold); text-align: left; padding: 14px 18px; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; }
  .matrix-table td { padding: 14px 18px; border-bottom: 1px solid #EAE4D9; font-size: 13px; color: #2A241C; }
  .matrix-table tr:nth-child(even) { background: #FAF8F5; }
  .impact-badge { background: rgba(45, 122, 77, 0.12); color: var(--accent-green); padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; }

  .slide-footer-controls { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #EAE4D9; }
  .counter { font-size: 13px; font-weight: 600; color: var(--text-muted); }
  .nav-btns { display: flex; gap: 12px; }
</style>

<div class="top-bar">
  <div class="brand-logo">
    <div class="brand-mark">F</div>
    <div class="brand-text">
      <h1>Forbes Fab Luxe</h1>
      <p>Website Showcase & Review Presentation</p>
    </div>
  </div>
  <div class="controls">
    <span style="font-size: 12px; color: #A0988E;">Keyboard: ← → Arrow keys</span>
    <button class="btn" onclick="toggleFullscreen()">Fullscreen</button>
  </div>
</div>

<div class="deck-container">
  <div class="slide-tabs" id="slideTabs">
    <button class="slide-tab active" onclick="goToSlide(0)">01. Overview</button>
    <button class="slide-tab" onclick="goToSlide(1)">02. Hero & Header</button>
    <button class="slide-tab" onclick="goToSlide(2)">03. Legacy Metrics</button>
    <button class="slide-tab" onclick="goToSlide(3)">04. Developments</button>
    <button class="slide-tab" onclick="goToSlide(4)">05. Amenities & Club</button>
    <button class="slide-tab" onclick="goToSlide(5)">06. Collections</button>
    <button class="slide-tab" onclick="goToSlide(6)">07. Philosophy</button>
    <button class="slide-tab" onclick="goToSlide(7)">08. Property Finder</button>
    <button class="slide-tab" onclick="goToSlide(8)">09. Connectivity Map</button>
    <button class="slide-tab" onclick="goToSlide(9)">10. ROI Calculator</button>
    <button class="slide-tab" onclick="goToSlide(10)">11. High-Converting Modals</button>
    <button class="slide-tab" onclick="goToSlide(11)">12. Forbes AI Assistant</button>
    <button class="slide-tab" onclick="goToSlide(12)">13. Client Modifications Matrix</button>
  </div>
"""

slides = [
    f"""<div class="slide-card active" id="slide-0">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>Forbes Fab Luxe Residences</h2>
        <p>Complete Site Look & Feel Presentation • Sector 4 Greater Noida West</p>
      </div>
      <span class="slide-badge">EXECUTIVE SUMMARY</span>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
      <div class="info-box" style="background: #1A1815; color: #FFF; border-color: var(--gold);">
        <div class="info-box-title" style="color: var(--gold);">👑 Brand Positioning & Aesthetic Strategy</div>
        <ul class="mod-list">
          <li><strong>Ultra-Luxury Resort Living:</strong> Tailored for HNI buyers seeking 13-acre low-density luxury in Sector 4.</li>
          <li><strong>Color Palette & Atmosphere:</strong> Deep Charcoal (#1A1815), Warm Cream (#FAF8F5), and Forbes Gold accents.</li>
          <li><strong>Key Value Proposition:</strong> 3+1 & 4+1 BHK Serviced Residences starting ₹ 2.96 Cr* with 75,000 Sq. Ft. Private Club.</li>
          <li><strong>Saint Amand Hospitality:</strong> Integrated 6-star residential concierge and hospitality management.</li>
        </ul>
      </div>
      <div class="info-box">
        <div class="info-box-title">🎯 Review Response & Strategic Recommendations</div>
        <ul class="info-list">
          <li><strong>Lead Funnel Optimization:</strong> Streamline booking forms to 3 core inputs for +25% conversion increase.</li>
          <li><strong>Interactive Engagement:</strong> Add bank partner rate calculators, unit filters, and interactive 3D floor plans.</li>
          <li><strong>Trust Indicators:</strong> Highlight live construction updates, RERA certificate verification modal, and partner logos.</li>
          <li><strong>WhatsApp Integration:</strong> One-tap instant brochure & floor plan delivery via direct WhatsApp automation.</li>
        </ul>
      </div>
    </div>
    <div class="browser-frame" style="margin-top: 20px;">
      <div class="browser-top">
        <div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div>
        <div class="browser-address">https://forbes-fab-luxe.com</div>
      </div>
      <div class="screenshot-container" style="max-height: 380px;">
        <img src="{img_get('01_hero_header')}" alt="Forbes Fab Luxe Hero" />
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 1 of 13</span>
      <div class="nav-btns"><button class="btn btn-primary" onclick="goToSlide(1)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-1">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>01. Hero Banner & Navigation Experience</h2>
        <p>Top Live Ticker, Hero Slideshow & VIP Action Calls</p>
      </div>
      <span class="slide-badge">HERO & NAV</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#hero</div></div>
        <div class="screenshot-container"><img src="{img_get('01_hero_header')}" alt="Hero Banner" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>Dark luxury aesthetic with gold badge typography and ambient background images.</li>
            <li>Live Real-Time Buyer Signal Ticker at top bar encouraging buyer action.</li>
            <li>Dynamic Tag: "13-ACRE RESORT LANDMARK" with 3 rotating luxury slides.</li>
            <li>Sticky header with direct phone link, Schedule Site Visit CTA & Master Layout link.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Incorporate optional ambient video background for drone walkthrough of the 13-acre resort.</li>
            <li>Add persistent floating WhatsApp quick chat button alongside the main CTA.</li>
            <li>Make starting price tag ("₹ 2.96 Cr*") higher contrast with a "Flexible Payment Plan" pill.</li>
            <li>Mobile optimization: Streamline top ticker height for better viewport visibility.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 2 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(0)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(2)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-2">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>02. Legacy Metrics & Trust Statistics</h2>
        <p>Project Highlights, Land parcel & RERA Compliance</p>
      </div>
      <span class="slide-badge">TRUST & METRICS</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#metrics</div></div>
        <div class="screenshot-container"><img src="{img_get('02_legacy_metrics')}" alt="Legacy Metrics" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>High-impact statistical cards: 13 Acres, 75,000 Sq.Ft. Clubhouse, 11 Towers (G+35).</li>
            <li>RERA Registration details clearly displayed for institutional credibility.</li>
            <li>High contrast gold-bordered typography emphasizing land density and green canopy.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Add smooth numerical counting animation when user scrolls to this section.</li>
            <li>Include a clickable "Verify RERA Certificate" popup modal for quick compliance check.</li>
            <li>Add visual icons for "Construction Status" and "Target Possession Timeline".</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 3 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(1)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(3)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-3">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>03. Flagship Developments & Tower Showcase</h2>
        <p>High-Rise Towers, Tribeca Suites & Exterior Renderings</p>
      </div>
      <span class="slide-badge">DEVELOPMENTS</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#developments</div></div>
        <div class="screenshot-container"><img src="{img_get('03_developments')}" alt="Developments" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>Detailed card showcase of 3+1 BHK & 4+1 BHK Serviced Sky Residences.</li>
            <li>Actionable CTAs: VIP Site Visit, Explore Floor Plans & Download Brochure.</li>
            <li>Architectural tags highlighting G+35 height, private elevator lobbies & sundecks.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Introduce filter tabs (All Towers / 3 BHK / 4 BHK / Penthouse Suites).</li>
            <li>Display "Starting Price per Sq. Ft." and "Available Units" badge on each card.</li>
            <li>Add 360-degree exterior tower viewer directly upon card hover.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 4 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(2)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(4)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-4">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>04. 75,000 Sq.Ft. World-Class Amenities & Club</h2>
        <p>6-Star Resident Country Club & Saint Amand Hospitality</p>
      </div>
      <span class="slide-badge">AMENITIES</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#amenities</div></div>
        <div class="screenshot-container"><img src="{img_get('04_amenities')}" alt="Amenities" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>Showcases 75,000 sq.ft. private club, all-weather lagoon pool & Technogym.</li>
            <li>Structured icon grid covering Wellness, Sports, Fine Dining & Children's Play.</li>
            <li>Saint Amand 6-Star hospitality partnership highlight badge.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Group amenities under clickable tabs (Sports & Fitness, Club & Dining, AQI Gardens).</li>
            <li>Open high-res lightbox image gallery when an amenity item is clicked.</li>
            <li>Highlight AQI Monitored Oxygen Gardens with a live air quality indicator badge.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 5 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(3)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(5)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-5">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>05. Architectural Collections & Floor Layouts</h2>
        <p>3+1 BHK & 4+1 BHK Luxury Unit Configurations</p>
      </div>
      <span class="slide-badge">COLLECTIONS</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#collections</div></div>
        <div class="screenshot-container"><img src="{img_get('05_collections')}" alt="Collections" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>Presents 3+1 BHK (2,250 - 2,650 Sq.Ft.) & 4+1 BHK (3,150 - 3,850 Sq.Ft.) layouts.</li>
            <li>Emphasizes 8 ft deep wrap-around sundecks, double-height volumes & VRV AC.</li>
            <li>Direct CTAs to trigger floor plan viewer and download PDF brochures.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Add interactive 2D vs 3D Floor Plan view toggle switch with zoom controls.</li>
            <li>Provide a direct "Request Customized Interior Layout" enquiry CTA.</li>
            <li>Display explicit Carpet Area vs Super Built-up Area comparison for transparency.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 6 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(4)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(6)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-6">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>06. Brand Philosophy & Design Ethos</h2>
        <p>Low-Density Philosophy, Architectural Distinction & Legacy</p>
      </div>
      <span class="slide-badge">PHILOSOPHY</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#philosophy</div></div>
        <div class="screenshot-container"><img src="{img_get('06_philosophy')}" alt="Philosophy" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>Refined dark card layout expressing low-density resort living philosophy.</li>
            <li>Articulates architectural principles, green canopy design, and privacy focus.</li>
            <li>Creates strong brand affinity with high-net-worth real estate buyers.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Include lead architect quote & design consultant accreditation seal.</li>
            <li>Add a downloadable "Design & Sustainability Vision Note" PDF link.</li>
            <li>Slightly expand body text font size for effortless mobile readability.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 7 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(5)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(7)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-7">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>07. Interactive Property Finder & Loan Estimator</h2>
        <p>Unit Configuration Filter & Real-Time EMI Calculator</p>
      </div>
      <span class="slide-badge">PROPERTY FINDER</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#property-finder</div></div>
        <div class="screenshot-container"><img src="{img_get('07_property_finder')}" alt="Property Finder" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>Interactive unit search tool with sliders for budget, configuration & floor.</li>
            <li>Integrated home loan EMI estimator calculating monthly payments dynamically.</li>
            <li>Instant breakdown of principal, interest, and downpayment requirements.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Display preferred bank partner logos (HDFC, SBI, ICICI) with current interest rates.</li>
            <li>Add a "Send Configured Plan to WhatsApp" one-click action button.</li>
            <li>Improve slider touch responsiveness for mobile devices.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 8 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(6)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(8)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-8">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>08. Sector 4 Location & Connectivity Map</h2>
        <p>Proximity to Jewar Airport, Expressways & Key Landmarks</p>
      </div>
      <span class="slide-badge">LOCATION & MAP</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#location</div></div>
        <div class="screenshot-container"><img src="{img_get('08_connectivity_map')}" alt="Connectivity Map" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>Interactive location section highlighting Sector 4 Greater Noida West advantages.</li>
            <li>Exact driving times to Jewar International Airport, Metro & DND Flyway.</li>
            <li>Categorized landmark lists covering Education, Healthcare & Retail Hubs.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Embed interactive Google Maps frame with "Get Driving Directions" link.</li>
            <li>Add distance filter tabs (Schools, Hospitals, Shopping Malls, Transit).</li>
            <li>Include future infrastructure catalysts (Proposed Metro Extension & Jewar Airport timeline).</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 9 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(7)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(9)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-9">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>09. Capital ROI & Investment Calculator</h2>
        <p>Projected Capital Growth & Rental Yield Analysis</p>
      </div>
      <span class="slide-badge">ROI CALCULATOR</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#investment-calculator</div></div>
        <div class="screenshot-container"><img src="{img_get('09_investment_calc')}" alt="ROI Calculator" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>Visual financial growth calculator modeling 5-year capital appreciation.</li>
            <li>Detailed rental yield projections tailored for NRI and luxury investors.</li>
            <li>Clean inputs for holding period, initial investment & growth rates.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Add a dedicated "NRI Investment Concierge" consultation booking CTA.</li>
            <li>Include tax benefit calculation summary under Section 24 & 80C.</li>
            <li>Offer a downloadable "Sector 4 Micro-Market Real Estate Growth Report" PDF.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 10 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(8)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(10)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-10">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>10. High-Converting Modals & Lead Capture Funnel</h2>
        <p>Site Visit, Floor Plan, Brochure & Concierge Overlays</p>
      </div>
      <span class="slide-badge">LEAD MODALS</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#modals</div></div>
        <div class="screenshot-container"><img src="{img_get('15_modal_floor_plan')}" alt="Floor Plan Modal" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>VIP Site Visit modal with integrated date picker & luxury cab booking option.</li>
            <li>Interactive Floor Plan modal featuring high-resolution zoom controls.</li>
            <li>Private Concierge and Digital Brochure request overlays with dark luxury styling.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Implement instant phone OTP verification to ensure 100% genuine lead quality.</li>
            <li>Reduce required fields to 3 (Name, Phone, Unit Choice) for +25% conversion lift.</li>
            <li>Show success screen with direct link to download PDF brochure immediately.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 11 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(9)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(11)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-11">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>11. Forbes AI Luxury Assistant & Real-Time Engagement</h2>
        <p>Conversational AI Assistant Widget & Live Buyer Signals</p>
      </div>
      <span class="slide-badge">AI & SOCIAL PROOF</span>
    </div>
    <div class="slide-grid">
      <div class="browser-frame">
        <div class="browser-top"><div class="browser-dots"><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></div><div class="browser-address">forbes-fab-luxe.com/#ai-assistant</div></div>
        <div class="screenshot-container"><img src="{img_get('17_modal_concierge')}" alt="AI Assistant" /></div>
      </div>
      <div class="analysis-section">
        <div class="info-box">
          <div class="info-box-title">✨ Current Look & Feel Highlights</div>
          <ul class="info-list">
            <li>Floating 24/7 Forbes AI Chatbot providing instant property & pricing answers.</li>
            <li>Real-time Live Buyer Ticker creating urgency and social validation.</li>
            <li>Instant answers to pricing, floor plan specs, amenities & location queries.</li>
          </ul>
        </div>
        <div class="modification-box">
          <div class="mod-title">🛠️ Recommended Modifications (Client Review)</div>
          <ul class="mod-list">
            <li>Add quick clickable question chips ("What is starting price?", "Show Floor Plans", "Book Visit").</li>
            <li>Allow the AI bot to capture buyer phone numbers naturally during the chat flow.</li>
            <li>Sync buyer ticker with live CRM activity feed for authentic urgency.</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="slide-footer-controls">
      <span class="counter">Slide 12 of 13</span>
      <div class="nav-btns"><button class="btn" onclick="goToSlide(10)">← Previous</button><button class="btn btn-primary" onclick="goToSlide(12)">Next Slide →</button></div>
    </div>
  </div>""",

    f"""<div class="slide-card" id="slide-12">
    <div class="slide-header">
      <div class="slide-title-group">
        <h2>12. Recommended Modifications Strategy Matrix</h2>
        <p>Categorized Action Plan based on Client Review Response</p>
      </div>
      <span class="slide-badge">ACTION PLAN</span>
    </div>

    <table class="matrix-table">
      <thead>
        <tr>
          <th>Website Section</th>
          <th>Current Feature</th>
          <th>Recommended Modification (Client Review)</th>
          <th>Expected Impact</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Hero & Navigation</strong></td>
          <td>Static luxury image carousel & top bar ticker</td>
          <td>Add drone video background option + floating WhatsApp quick chat button</td>
          <td><span class="impact-badge">+30% Engagement</span></td>
        </tr>
        <tr>
          <td><strong>Property Finder & EMI</strong></td>
          <td>Dynamic price sliders & basic loan math</td>
          <td>Integrate Bank Partner logos (HDFC/SBI) + "Send Configured Plan to WhatsApp" CTA</td>
          <td><span class="impact-badge">+40% Lead Quality</span></td>
        </tr>
        <tr>
          <td><strong>Modals & Lead Funnel</strong></td>
          <td>Standard lead overlays</td>
          <td>Reduce fields to 3, add OTP phone verification & instant brochure download link</td>
          <td><span class="impact-badge">+25% Conversion</span></td>
        </tr>
        <tr>
          <td><strong>Connectivity & Location</strong></td>
          <td>Static map graphics & driving times</td>
          <td>Embed interactive Google Map with distance filter tabs (Airport/Schools/Malls)</td>
          <td><span class="impact-badge">Enhanced Clarity</span></td>
        </tr>
        <tr>
          <td><strong>Forbes AI Assistant</strong></td>
          <td>Floating chat widget</td>
          <td>Pre-loaded prompt chips ("Pricing", "Floor Plans") & conversational lead capture</td>
          <td><span class="impact-badge">24/7 Auto Leads</span></td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 24px; background: #1A1815; padding: 20px; border-radius: 12px; border: 1px solid var(--gold);">
      <div style="color: var(--gold); font-size: 14px; font-weight: 700; margin-bottom: 8px;">🚀 Next Steps & Implementation Roadmap</div>
      <p style="color: #E2DDD5; font-size: 13px; line-height: 1.6;">
        Upon client sign-off on this presentation, the engineering team can implement these enhancements directly into the React codebase within 2-3 business days, ensuring seamless performance, zero downtime, and immediate conversion optimization.
      </p>
    </div>

    <div class="slide-footer-controls">
      <span class="counter">Slide 13 of 13</span>
      <div class="nav-btns">
        <button class="btn" onclick="goToSlide(11)">← Previous</button>
        <button class="btn btn-primary" onclick="goToSlide(0)">Restart Presentation ↺</button>
      </div>
    </div>
  </div>"""
]

foot = """</div>
<script>
  let currentSlide = 0;
  const totalSlides = 13;

  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    for (let i = 0; i < totalSlides; i++) {
      const card = document.getElementById('slide-' + i);
      if (card) card.classList.remove('active');
    }
    const tabs = document.querySelectorAll('.slide-tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    currentSlide = index;
    const activeCard = document.getElementById('slide-' + currentSlide);
    if (activeCard) activeCard.classList.add('active');
    if (tabs[currentSlide]) {
      tabs[currentSlide].classList.add('active');
      tabs[currentSlide].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      goToSlide((currentSlide + 1) % totalSlides);
    } else if (e.key === 'ArrowLeft') {
      goToSlide((currentSlide - 1 + totalSlides));
    }
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {});
    } else {
      if (document.exitFullscreen) { document.exitFullscreen(); }
    }
  }
</script>"""

out_path = '/Users/neeraj.jha/forbes-fab-luxe/forbes_fab_luxe_presentation.html'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(head)
    for s in slides:
        f.write(s)
    f.write(foot)

print('Successfully written presentation HTML file!')
