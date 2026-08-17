/**
 * Project-Specific Case Studies Dataset
 * Each project has a tailored structure matching its exact discipline.
 * 
 * Disciplines:
 * - UI/UX: Problem, User Research & Pain Points, User Flow, Wireframes, UI Design, Design System Tokens, Prototype, Usability Testing, Outcome.
 * - Social Media: Client Goal, Content Strategy, Visual Direction, Social Design System, Carousel Decks, Ad Creatives, Metrics, Outcome.
 * - Brand Identity & Packaging: Brand Brief, Positioning, Concept, Wordmark & Monogram, Typography & Palette, Packaging Grid, Retail Applications, Outcome.
 * - Logo Design: Design Philosophy, Optical Grid Construction, Symbol Rationale, Scalability Verification, Application Mockups, Outcome.
 * - Marketing Ads: Campaign Objective, Hook & Urgency Strategy, Multi-Aspect Ad Kit, A/B Testing Matrix, Conversion Results, Outcome.
 * - Video Editing & Motion: Creative Brief, 3-Act Pacing & Storyboard, Kinetic Typography, Film Color Grading, Foley Sound Design, Final Cut & Reach.
 */

const CASE_STUDIES_DATA = {
  fintra: {
    id: 'fintra',
    category: 'UI/UX Design',
    categoryCode: '01 — UI/UX & PRODUCT',
    title: 'Fintra — Banking, simplified.',
    subtitle: 'Rethinking everyday retail banking through human-centered interface design, cognitive load reduction, and instant financial clarity.',
    meta: {
      role: 'Lead UI/UX Designer',
      timeline: '12 Weeks',
      discipline: 'UI/UX Design & Fintech Product',
      tools: 'Figma, FigJam, Protopie, UserTesting',
      client: 'Fintra Financial Technologies'
    },
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#E8862E',
    sections: [
      {
        type: 'overview',
        tag: '01 // EXECUTIVE CHALLENGE',
        title: 'The Friction in Everyday Banking',
        content: `Traditional banking applications suffer from extreme interface clutter, fragmented account views, and opaque transaction states. Users frequently report feeling anxious when managing personal finances because essential actions—like checking true available balance or sending money—are buried behind multi-step confirmation hurdles.`,
        stats: [
          { value: '64%', label: 'Users overwhelmed by banking UI clutter' },
          { value: '4.2 min', label: 'Average time to complete money transfers' },
          { value: '41%', label: 'Drop-off rate during multi-step checkout' }
        ]
      },
      {
        type: 'research',
        tag: '02 // USER RESEARCH & PAIN POINTS',
        title: 'Qualitative Discovery & Empathy Mapping',
        content: `We conducted 18 in-depth user interviews across diverse demographics (students, freelancers, young professionals) and analyzed 1,200+ customer support tickets from legacy banking competitors.`,
        bullets: [
          '<strong>Lack of "True Available" Balance:</strong> Users struggled to distinguish pending charges from actual spendable funds.',
          '<strong>Transfer Anxiety:</strong> Fear of sending funds to the wrong recipient due to ambiguous review screens.',
          '<strong>Buried Card Controls:</strong> Freezing a lost card took an average of 7 clicks in standard banking apps.',
          '<strong>Cluttered Analytics:</strong> Complex pie charts that provided data without actionable financial advice.'
        ]
      },
      {
        type: 'architecture',
        tag: '03 // INFORMATION ARCHITECTURE & FLOW',
        title: 'Streamlining Navigation to 3 Core Pillars',
        content: `We flattened a 14-level menu hierarchy into 3 primary destinations accessible from anywhere in the app: Overview, Activity, and Vaults. High-frequency actions (Transfer, Request, Card Lock) were placed directly into the ergonomic primary thumb zone.`,
        diagram: [
          { step: '01. Overview', desc: 'Real-time liquidity, upcoming recurring bills, and instant card toggles' },
          { step: '02. Activity', desc: 'Predictive search, categorized auto-tagging, and one-tap receipts' },
          { step: '03. Vaults', desc: 'Automated micro-savings, investment pockets, and financial goals' }
        ]
      },
      {
        type: 'wireframes',
        tag: '04 // WIREFRAMING & RAPID ITERATIONS',
        title: 'Low-Fidelity Exploration & Layout Stress-Testing',
        content: `Before applying visual aesthetics, we tested 4 distinct wireframe layouts with 24 users on UserTesting.com to measure speed-to-action and cognitive confidence.`,
        notes: 'Result: Card-based modular feeds scored 48% higher on instant comprehension than traditional tabular account lists.'
      },
      {
        type: 'design_system',
        tag: '05 // DESIGN SYSTEM & ATOMIC TOKENS',
        title: 'High-Contrast Dark Glass UI Architecture',
        content: `Built a comprehensive Figma design system featuring 40+ atomic components, WCAG AAA-compliant typography hierarchy, and a restrained color palette designed to eliminate financial anxiety.`,
        palette: [
          { name: 'Obsidian Canvas', hex: '#0D0E10' },
          { name: 'Warm Amber Focus', hex: '#E8862E' },
          { name: 'Mint Positive Cashflow', hex: '#2FA79B' },
          { name: 'Off-White Paper Text', hex: '#EEEAE2' }
        ]
      },
      {
        type: 'final_screens',
        tag: '06 // HIGH-FIDELITY PRODUCT UI',
        title: 'The Completed Fintra Experience',
        content: `The final design delivers real-time account balances, interactive expenditure forecast charts, instant contact pay pills, and zero-friction virtual card management.`,
        deliverables: [
          'Web Dashboard & Tablet Responsive Viewports',
          'iOS & Android High-Fidelity Mobile App Specifications',
          'Interactive Micro-Interactions & Lottie Animation Tokens',
          'Complete Component Documentation for Engineering Handoff'
        ]
      },
      {
        type: 'outcome',
        tag: '07 // BUSINESS IMPACT & OUTCOME',
        title: 'Measurable Usability & Growth Results',
        content: `Following the private beta rollout across 8,500 users, Fintra achieved industry-leading engagement benchmarks and eliminated support friction.`,
        metrics: [
          { num: '+38%', desc: 'Increase in Daily Active Engagement' },
          { num: '88/100', desc: 'System Usability Scale (SUS Score)' },
          { num: '-42%', desc: 'Reduction in Transfer Drop-off Rate' },
          { num: '1.4s', desc: 'Average Time to Complete Payments' }
        ]
      }
    ]
  },

  apex: {
    id: 'apex',
    category: 'UI/UX Design',
    categoryCode: '02 — UI/UX & TERMINAL',
    title: 'Apex Pro Trading Terminal',
    subtitle: 'Institutional-grade multi-asset cryptocurrency trading terminal designed for high-frequency order execution, real-time depth analytics, and dark glass ergonomics.',
    meta: {
      role: 'Senior Product Designer',
      timeline: '8 Weeks',
      discipline: 'High-Density UI/UX & Data Vis',
      tools: 'Figma, React Specs, TradingView API, Canvas',
      client: 'Apex Capital Markets'
    },
    heroImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#E8862E',
    sections: [
      {
        type: 'overview',
        tag: '01 // EXECUTIVE CHALLENGE',
        title: 'High-Density Information Without Cognitive Fatigue',
        content: `Professional traders execute multi-million dollar positions in sub-second timeframes. Most commercial exchange interfaces are either overly simplified retail toys or chaotic, lagging desktop software built a decade ago. Apex needed a modern, web-based terminal that combined institutional power with zero-latency visual ergonomics.`,
        stats: [
          { value: '<50ms', label: 'Required UI interaction latency' },
          { value: '14+ data points', label: 'Visible per square inch without crowding' },
          { value: '12 hours', label: 'Average daily continuous screen time per trader' }
        ]
      },
      {
        type: 'research',
        tag: '02 // TRADER ARCHETYPES & WORKFLOWS',
        title: 'Quantitative Workflow & Heatmap Analysis',
        content: `We shadowed 12 proprietary trading desks to map exact eye-tracking patterns and keyboard shortcut usage during high-volatility market open events.`,
        bullets: [
          '<strong>Zero Visual Clutter:</strong> Every non-essential border and gradient was stripped to protect contrast.',
          '<strong>Keyboard-First Execution:</strong> Traders prioritize hotkeys (Buy at Ask, Sell at Bid, Cancel All) over mouse clicks.',
          '<strong>Modular Docking System:</strong> Users require custom multi-monitor workspaces arranged by trade style.',
          '<strong>Depth Heatmaps:</strong> Visualizing order book liquidity walls with color intensity gradients.'
        ]
      },
      {
        type: 'architecture',
        tag: '03 // COMPONENT ARCHITECTURE & LAYOUT',
        title: 'High-Performance Modular Workspace',
        content: `Engineered a custom grid system supporting dockable, resizable panels (Order Book, Depth Chart, Time & Sales, Execution Ladder, Position Risk Monitor) with unified state synchronization.`,
        diagram: [
          { step: 'Left Dock', desc: 'Real-time multi-asset market selector and live tick feed' },
          { step: 'Center Stage', desc: 'Hardware-accelerated candlestick canvas with 100+ technical overlays' },
          { step: 'Right Wing', desc: 'Sub-millisecond DOM order book and one-click execution ladder' }
        ]
      },
      {
        type: 'design_system',
        tag: '04 // ERGONOMIC VISUAL TOKENS',
        title: 'Eye-Strain Mitigation & Visual Hierarchy',
        content: `Utilized an ultra-deep charcoal slate canvas (` + '`#0A0C0E`' + `) with subdued neutral typography and high-saturation amber/teal indicators to ensure clear identification of market trends without visual fatigue.`,
        palette: [
          { name: 'Dark Slate Core', hex: '#0A0C0E' },
          { name: 'Bid Teal Green', hex: '#2FA79B' },
          { name: 'Ask Coral Amber', hex: '#E8862E' },
          { name: 'Data Grid Dim', hex: '#22262E' }
        ]
      },
      {
        type: 'outcome',
        tag: '05 // BENCHMARK RESULTS & IMPACT',
        title: 'Speed, Retention and Volume Growth',
        content: `Apex Pro Terminal was deployed across 4,200 institutional beta traders, processing over $850M in daily transaction volume with zero critical execution errors.`,
        metrics: [
          { num: '2.4x', desc: 'Increase in Trader Daily Retention' },
          { num: '0 ms', desc: 'Perceived Interface Input Lag' },
          { num: '+65%', desc: 'Faster Order Modification Speed' },
          { num: '$850M+', desc: 'Daily Volume Processed Post-Launch' }
        ]
      }
    ]
  },

  pulse: {
    id: 'pulse',
    category: 'Social Media',
    categoryCode: '03 — SOCIAL & GRAPHIC',
    title: 'Pulse Healthcare Campaign',
    subtitle: 'Educational social media design system, multi-slide carousel frameworks, and performance paid ad creatives designed to communicate mental wellness with empathy and visual authority.',
    meta: {
      role: 'Creative Lead & Social Strategist',
      timeline: '4 Weeks',
      discipline: 'Social Media & Graphic Design',
      tools: 'Figma, Illustrator, Photoshop',
      client: 'Pulse Healthcare & Wellbeing'
    },
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#2FA79B',
    sections: [
      {
        type: 'overview',
        tag: '01 // CAMPAIGN BRIEF & OBJECTIVE',
        title: 'Transforming Medical Jargon into Shareable Education',
        content: `Pulse Healthcare needed a complete overhaul of their organic social channels and paid acquisition creative. Their existing content was overly clinical, visually dry, and suffered from low save rates. The goal was to establish Pulse as the most trusted, aesthetically refined wellness brand on Instagram and LinkedIn.`,
        stats: [
          { value: '3 Seconds', label: 'Average window to stop user scroll on social feeds' },
          { value: '12 Slides', label: 'Structured micro-learning carousel framework' },
          { value: '18–35', label: 'Core demographic seeking actionable mental clarity' }
        ]
      },
      {
        type: 'strategy',
        tag: '02 // CONTENT STRATEGY & HOOK FORMULA',
        title: 'The Psychology of "Saveable" Social Design',
        content: `We structured every carousel post using a proven 4-stage narrative formula: Hook Slide → Problem Validation → Actionable 3-Step Framework → Save/Share CTA.`,
        bullets: [
          '<strong>Slide 1 (The Hook):</strong> High-contrast typography with bold provocative statements (e.g. "5 Signs of Digital Fatigue").',
          '<strong>Slides 2–5 (The Framework):</strong> Bite-sized infographics, digestible statistics, and zero medical jargon.',
          '<strong>Slide 6 (The Takeaway):</strong> Summary checklist designed specifically to be bookmarked and shared to Stories.',
          '<strong>Story Ad Retargeting:</strong> Kinetic 9:16 vertical motion snippets driving webinar registrations.'
        ]
      },
      {
        type: 'design_system',
        tag: '03 // SOCIAL VISUAL DESIGN SYSTEM',
        title: 'Calming Palettes & Editorial Typography',
        content: `Created a comprehensive social asset library with 24 customizable templates, custom organic vector line art, and typography pairings that feel authoritative yet warm.`,
        palette: [
          { name: 'Restorative Teal', hex: '#2FA79B' },
          { name: 'Warm Amber Alert', hex: '#E8862E' },
          { name: 'Deep Midnight', hex: '#0F1216' },
          { name: 'Oatmeal Paper', hex: '#F4EFEB' }
        ]
      },
      {
        type: 'deliverables',
        tag: '04 // MULTI-PLATFORM ASSET SUITE',
        title: 'Omnichannel Campaign Deliverables',
        content: `Delivered a turnkey social production kit that enabled the Pulse internal marketing team to publish 5 high-performing pieces of content per week with consistent brand recognition.`,
        deliverables: [
          '10 Educational 10-Slide Carousel Decks',
          '15 High-CTR Paid Meta Ad Banners (1:1 and 9:16)',
          'Custom Iconography & Health Illustration Kit',
          'Figma Social Component Library with Auto-Layout'
        ]
      },
      {
        type: 'outcome',
        tag: '05 // ENGAGEMENT METRICS & GROWTH',
        title: 'Campaign Performance & Audience Growth',
        content: `Within 60 days of deploying the new design system, Pulse experienced exponential audience growth and record-high bookmarking rates.`,
        metrics: [
          { num: '+340%', desc: 'Increase in Post Saves & Bookmarks' },
          { num: '4.8%', desc: 'Average Engagement Rate (Benchmark: 1.2%)' },
          { num: '+28K', desc: 'Net New Organic Followers in 60 Days' },
          { num: '-38%', desc: 'Reduction in Cost Per Acquisition (CPA)' }
        ]
      }
    ]
  },

  solstice: {
    id: 'solstice',
    category: 'Brand Identity',
    categoryCode: '04 — BRANDING & PACKAGING',
    title: 'Solstice Specialty Coffee',
    subtitle: 'Holistic brand identity, custom typography wordmark, bespoke coffee packaging architecture, and retail collateral for an artisanal single-origin roaster.',
    meta: {
      role: 'Brand Identity & Packaging Designer',
      timeline: '6 Weeks',
      discipline: 'Brand Identity & Physical Packaging',
      tools: 'Adobe Illustrator, Photoshop, InDesign',
      client: 'Solstice Roasters Ltd.'
    },
    heroImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#E8862E',
    sections: [
      {
        type: 'overview',
        tag: '01 // BRAND BRIEF & POSITIONING',
        title: 'Artisanal Heritage Meets Modern Minimalism',
        content: `Solstice is a high-altitude specialty roastery dedicated to transparent single-origin sourcing and precision small-batch roasting. They needed a distinct visual identity that bridged Scandinavian minimalist restraint with the tactile warmth of artisanal coffee craftsmanship.`,
        stats: [
          { value: '100%', label: 'Compostable packaging materials' },
          { value: '4 Continents', label: 'Single-origin coffee varieties showcased' },
          { value: 'B2B & D2C', label: 'Wholesale retail and e-commerce distribution' }
        ]
      },
      {
        type: 'concept',
        tag: '02 // THE BRAND CONCEPT',
        title: '"The Sun at Its Peak" — Terrestrial Geometry',
        content: `The brand concept centers on the celestial solstice—the exact moment solar energy nurtures high-altitude coffee cherries. We expressed this through circular solar geometries, warm radiant amber tones, and structured grid taxonomy.`,
        bullets: [
          '<strong>Custom Wordmark:</strong> High-contrast editorial serif letterforms with custom ligatures connecting the "S-T" for distinctive recognition.',
          '<strong>The Solar Stamp:</strong> A circular secondary emblem used on wax seals, barista pins, and bag zip seals.',
          '<strong>Tasting Taxonomy Grid:</strong> A structured label hierarchy highlighting Origin, Altitude, Process, and Tasting Notes.',
          '<strong>Terrestrial Tactility:</strong> Matte unbleached kraft textures paired with radiant metallic foil accents.'
        ]
      },
      {
        type: 'packaging',
        tag: '03 // PACKAGING ARCHITECTURE & LABEL SYSTEM',
        title: 'Modular 250g & 1kg Coffee Packaging Grid',
        content: `Designed a modular packaging system that accommodates rotating seasonal single-origin releases without requiring full bag reprints. A standardized dark matte bag is customized via color-coded origin labels.`,
        palette: [
          { name: 'Solstice Amber Foil', hex: '#E8862E' },
          { name: 'Volcanic Espresso Black', hex: '#161412' },
          { name: 'Unbleached Kraft Cream', hex: '#D9CEBA' },
          { name: 'Alpine Forest Roast', hex: '#263328' }
        ]
      },
      {
        type: 'retail',
        tag: '04 // RETAIL APPLICATIONS & COLLATERAL',
        title: 'The Cafe & Wholesale Experience',
        content: `Extended the brand identity across takeaway cups, barista aprons, cafe menus, wholesale distributor presentation decks, and e-commerce unboxing tape.`,
        deliverables: [
          'Primary Wordmark & Monogram Asset Suite (SVG / EPS)',
          'Custom Coffee Bag Label Grid & Die-Cut Templates',
          'Takeaway Cup Sleeves & Menu Board Typography System',
          '48-Page Comprehensive Brand Guidelines Book'
        ]
      },
      {
        type: 'outcome',
        tag: '05 // MARKET IMPACT & OUTCOME',
        title: 'Wholesale Expansion & Retail Recognition',
        content: `Solstice launched in 45 specialty cafes across the country and achieved sell-out status on their initial e-commerce drop within 72 hours.`,
        metrics: [
          { num: '+65%', desc: 'Wholesale Distributor Sign-ups in Q1' },
          { num: '72h', desc: 'Initial E-Commerce Single-Origin Sellout' },
          { num: '100%', desc: 'Plastic-Free Eco Packaging Compliance' },
          { num: 'Top 5', desc: 'Specialty Coffee Packaging Design Award' }
        ]
      }
    ]
  },

  aether: {
    id: 'aether',
    category: 'Logo Design',
    categoryCode: '05 — LOGO & VECTOR CRAFT',
    title: 'Aether Studio Logomarks',
    subtitle: 'A curated anthology of minimalist, geometry-driven logomarks and symbols designed for venture-backed tech startups, spatial computing labs, and modern studios.',
    meta: {
      role: 'Identity & Symbol Designer',
      timeline: 'Ongoing Anthology',
      discipline: 'Logo Design & Vector Geometry',
      tools: 'Adobe Illustrator, Glyphs, Astute Graphics',
      client: 'Independent Tech Startups & Founders'
    },
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#EEEAE2',
    sections: [
      {
        type: 'overview',
        tag: '01 // DESIGN PHILOSOPHY',
        title: 'The Art of Radical Reduction',
        content: `A logomark is the highest-density artifact in design. It must communicate identity, memorability, and institutional trust at 16x16 pixels on a smartwatch screen just as effectively as on a 50-foot building exterior. The Aether Anthology represents a rigorous pursuit of mathematical proportion, optical balance, and semantic clarity.`,
        stats: [
          { value: '48px', label: 'Base optical grid construction' },
          { value: '1.618', label: 'Golden ratio curvature harmonization' },
          { value: '16px', label: 'Tested favicon scalability limit' }
        ]
      },
      {
        type: 'construction',
        tag: '02 // GRID SYSTEMS & GEOMETRY',
        title: 'Constructive Mathematical Precision',
        content: `Every mark in the collection is built from rigorous geometric primitives: concentric circles, isometric triangles, and golden angle curves, verified for optical balance rather than purely programmatic snap.`,
        bullets: [
          '<strong>Monoline Consistency:</strong> Fixed stroke weights calculated to remain crisp across all display densities.',
          '<strong>Negative Space Harmony:</strong> Deliberate voids that allow the mark to breathe on dark and light canvases.',
          '<strong>Contrast Robustness:</strong> Every mark is validated first in pure black-and-white before any color is applied.',
          '<strong>Silhouette Recognition:</strong> Instantly identifiable silhouette when blurred or viewed from peripheral distance.'
        ]
      },
      {
        type: 'marks_breakdown',
        tag: '03 // SYMBOL BREAKDOWN & RATIONALE',
        title: 'Four Core Symbols & Semantic Meaning',
        content: `A detailed breakdown of four featured marks within the collection:`,
        diagram: [
          { step: '01. TRIAD', desc: 'An equilateral triangle interlocking with an internal sphere — representing dynamic equilibrium, stability, and venture scalability.' },
          { step: '02. NEXUS', desc: 'A rounded squircle with a centered nucleus — representing cloud infrastructure, distributed nodes, and central security.' },
          { step: '03. INFINITY', desc: 'A continuous topological ribbon with focal orbit — representing perpetual machine learning, iteration, and continuous delivery.' },
          { step: '04. HEXA', desc: 'An isometric faceted hexagon with perspective axis — representing spatial computing, robotics, and modular hardware.' }
        ]
      },
      {
        type: 'testing',
        tag: '04 // SCALABILITY & APPLICATION TESTING',
        title: 'Stress-Testing Across Media',
        content: `Each mark undergoes rigorous scalability verification: 16px favicon rendering, laser engraving on matte anodized aluminum, embroidery on fabric, and 3D extruded metallic signage.`,
        deliverables: [
          'Master Vector Grid Construction Blueprints',
          'Responsive Logo Lockups (Horizontal, Stacked, Icon-Only)',
          'Dark & Light Mode Contrast Verification Files',
          'App Icon Export Matrix (iOS, Android, macOS, Web Favicon)'
        ]
      },
      {
        type: 'outcome',
        tag: '05 // FINAL OUTCOME',
        title: 'Delivered Identity Assets',
        content: `The marks within this collection have been adopted by cutting-edge startups across AI, decentralized protocols, and spatial media platforms.`,
        metrics: [
          { num: '4', desc: 'Startups Successfully Funded Post-Rebrand' },
          { num: '100%', desc: 'Vector Mathematical Precision' },
          { num: '16px', desc: 'Crisp Sub-Pixel Favicon Rendering' },
          { num: '0', desc: 'Superfluous Geometric Artifacts' }
        ]
      }
    ]
  },

  veloce: {
    id: 'veloce',
    category: 'Ad Creative',
    categoryCode: '06 — MARKETING & PAID ADS',
    title: 'Veloce Performance Ad Kit',
    subtitle: 'High-converting promotional advertising system and dynamic paid social creative kit designed for high click-through rates across Meta, TikTok, and Google Display.',
    meta: {
      role: 'Performance Creative Lead',
      timeline: '3 Weeks',
      discipline: 'Marketing Ad Design & Creative Strategy',
      tools: 'Photoshop, Illustrator, Figma, After Effects',
      client: 'Veloce Athletic Apparel'
    },
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#E8862E',
    sections: [
      {
        type: 'overview',
        tag: '01 // CAMPAIGN OBJECTIVE',
        title: 'Scaling Paid Acquisition During a 48-Hour Drop',
        content: `Veloce was preparing to launch a limited-run aerodynamic running shoe collection. They needed a performance advertising creative suite capable of cutting through social ad fatigue, maximizing click-through rates (CTR), and delivering a 3x+ Return on Ad Spend (ROAS) in a crowded DTC market.`,
        stats: [
          { value: '48 Hours', label: 'Total flash drop campaign duration' },
          { value: '4.8% CTR', label: 'Average click-through rate achieved' },
          { value: '3.2x ROAS', label: 'Return on ad spend across Meta/TikTok' }
        ]
      },
      {
        type: 'strategy',
        tag: '02 // THE HOOK & CREATIVE STRATEGY',
        title: 'Visual Hierarchy for High-Conversion Media',
        content: `Performance creative requires balancing aggressive promotional urgency with high-end brand aesthetics. We implemented a 3-tier visual hierarchy: Kinetic Motion Anchor → High-Contrast Discount Pill → Clear Frictionless CTA.`,
        bullets: [
          '<strong>Kinetic Motion Framing:</strong> Highlighting dynamic shoe angles with motion blur streaks to convey speed.',
          '<strong>Bold Urgency Copy:</strong> "LIMITED DROP • 48H ONLY" typography in high-contrast monospaced badge.',
          '<strong>Offer Prominence:</strong> Highlighting the 30% OFF promotion without looking like a discount bargain bin.',
          '<strong>Platform-Native Framing:</strong> Designing specifically with safe-zones for TikTok captions and Meta UI overlays.'
        ]
      },
      {
        type: 'ad_suite',
        tag: '03 // MULTI-ASPECT ASSET MATRIX',
        title: 'Complete Multi-Format Performance Suite',
        content: `Produced over 30 bespoke creative variations across 4 standard ad ratios to enable rapid multivariate A/B testing during the first 6 hours of the campaign.`,
        deliverables: [
          '1:1 Square Feed Ads for Meta & Instagram Feed',
          '9:16 Full-Screen Vertical Creatives for TikTok & IG Stories',
          '16:9 YouTube Bumper Cards & Desktop Banners',
          '300x250 & 728x90 Google Display Retargeting Units'
        ]
      },
      {
        type: 'testing',
        tag: '04 // A/B TESTING & ITERATION MATRIX',
        title: 'Creative Multivariate Optimization',
        content: `We tested 3 primary hooks: Feature-First ("Carbon Plate Tech"), Urgency-First ("Only 500 Pairs"), and Social Proof ("Rated 4.9/5 by Marathoners"). Urgency-First combined with dynamic product floating angles delivered the lowest cost per purchase.`,
        palette: [
          { name: 'Velocity Amber', hex: '#E8862E' },
          { name: 'Asphalt Black', hex: '#0B0D0F' },
          { name: 'Pure White Text', hex: '#FFFFFF' },
          { name: 'Neon Accent Tag', hex: '#2FA79B' }
        ]
      },
      {
        type: 'outcome',
        tag: '05 // REVENUE & PERFORMANCE RESULTS',
        title: 'Record-Breaking Flash Drop Results',
        content: `The campaign shattered all internal sales records for Veloce, selling out the entire inventory within 36 hours.`,
        metrics: [
          { num: '4.8%', desc: 'Click-Through Rate (Vertical Benchmark: 1.6%)' },
          { num: '3.2x', desc: 'Blended Return On Ad Spend (ROAS)' },
          { num: '$180K', desc: 'Total Gross Merchandise Value (GMV) in 36h' },
          { num: '-44%', desc: 'Reduction in Cost Per Click (CPC)' }
        ]
      }
    ]
  },

  kinetics: {
    id: 'kinetics',
    category: 'Video Editing',
    categoryCode: '07 — VIDEO & MOTION',
    title: 'Kinetics Brand Anthem Reel',
    subtitle: 'High-octane commercial video edit, rhythm-synced cuts, kinetic typography choreography, and atmospheric color grade for an athletic apparel anthem.',
    meta: {
      role: 'Lead Video Editor & Motion Designer',
      timeline: '3 Weeks',
      discipline: 'Commercial Video Editing & Motion',
      tools: 'DaVinci Resolve, Premiere Pro, After Effects',
      client: 'Kinetics Movement Lab'
    },
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#E8862E',
    sections: [
      {
        type: 'overview',
        tag: '01 // CREATIVE BRIEF & VISION',
        title: 'Capturing Raw Athletic Discipline and Kinetic Momentum',
        content: `Kinetics Movement Lab needed a flagship brand anthem video to anchor their global rebrand. The piece needed to reject generic gym commercial tropes and instead communicate the raw, meditative discipline of movement through aggressive pacing, layered audio soundscapes, and typographic motion.`,
        stats: [
          { value: '60 Sec', label: 'Master Anthem duration' },
          { value: '138 BPM', label: 'Underlying musical rhythm cut mapping' },
          { value: '4K 60FPS', label: 'Master delivery resolution' }
        ]
      },
      {
        type: 'storyboard',
        tag: '02 // 3-ACT PACING & STORYBOARD',
        title: 'Rhythmic Structure & Tension Curve',
        content: `We constructed a 3-act narrative structure that mirrors an athlete's mental journey:`,
        diagram: [
          { step: 'Act 1: Focus (0:00 - 0:18)', desc: 'Intimate close-ups, slow-motion breathing, quiet ambient rumble, building psychological focus.' },
          { step: 'Act 2: Velocity (0:18 - 0:45)', desc: 'Rapid 138 BPM rhythm-synced cuts, kinetic typography track-mattes, whip pans, and explosive electronic bass drops.' },
          { step: 'Act 3: Release (0:45 - 1:00)', desc: 'Wide atmospheric drone framing, sunset golden hour glow, seamless logo lockup dissolve.' }
        ]
      },
      {
        type: 'motion_design',
        tag: '03 // KINETIC TYPOGRAPHY & TRANSITIONS',
        title: 'Custom Motion Graphic Choreography',
        content: `Engineered custom track-matte transitions where typography interacts directly with athlete movement—words slicing across screen boundaries in tandem with whip-pan camera movements.`,
        bullets: [
          '<strong>3D Camera Tracking:</strong> Floating typographic statements anchored directly to physical gym environments.',
          '<strong>Frame-Rate Manipulation:</strong> Seamless blending of 24fps film narrative with 60fps slow-motion impact shots.',
          '<strong>Optical Match Cuts:</strong> Cutting between dissimilar athlete actions sharing identical vector movement trajectories.'
        ]
      },
      {
        type: 'color_grading',
        tag: '04 // KODAK FILM COLOR GRADING & SOUND DESIGN',
        title: 'Atmospheric Film Grade & Foley Sound Mix',
        content: `Color graded in DaVinci Resolve using a custom film emulation pipeline: deep crushed blacks, warm skin tones, and rich shadow tinting. Layered multi-track Foley sound effects (heavy breathing, sneaker squeaks, chalk dust impact, bass drops) beneath the custom synth soundtrack.`,
        palette: [
          { name: 'Kodak Amber Glow', hex: '#E8862E' },
          { name: 'Deep Shadow Slate', hex: '#0B0D10' },
          { name: 'Highlight Cream', hex: '#EEEAE2' },
          { name: 'Cool Teal Mist', hex: '#2FA79B' }
        ]
      },
      {
        type: 'outcome',
        tag: '05 // CAMPAIGN REACH & OUTCOME',
        title: 'Viral Anthem Performance',
        content: `The finished video anthem became the highest-performing organic asset in Kinetics history, generating widespread industry acclaim and driving substantial brand affinity.`,
        metrics: [
          { num: '1.2M+', desc: 'Organic Video Views Across Platforms' },
          { num: '92%', desc: 'Average View Duration Rate' },
          { num: '+52K', desc: 'Direct Brand Mentions & Shares' },
          { num: 'Vimeo', desc: 'Selected for Staff Pick Feature' }
        ]
      }
    ]
  }
};
