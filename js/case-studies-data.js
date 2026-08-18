/**
 * Ismail Khan Portfolio — Tailored Case Studies Dataset
 * 
 * Each project structure is specifically adapted to its discipline:
 * - UI/UX: Problem, Goals, Research, User Pain Points, User Flow, Wireframes, UI Design, Design System, Prototype, Final Screens, Outcome
 * - Branding: Brief, Brand Direction, Concept, Logo, Typography, Color System, Identity, Applications, Final Brand
 * - Social Media: Business Goal, Content Direction, Visual System, Post Design, Carousel, Campaign, Ad Creatives, Final Content System
 * - Graphic Design: Brief, Concept, Visual Direction, Design Exploration, Final Design, Applications
 * 
 * Note: Concept & self-initiated projects are explicitly labeled to maintain maximum professional credibility.
 */

const CASE_STUDIES_DATA = {
  fintra: {
    id: 'fintra',
    slug: 'fintra',
    category: 'UI/UX Design',
    categoryCode: '01 — UI/UX & PRODUCT',
    status: 'CONCEPT PROJECT',
    title: 'Fintra — Banking, simplified.',
    subtitle: 'A modern digital banking interface designed to reduce cognitive friction, improve financial transparency, and streamline everyday money transfers.',
    meta: {
      role: 'UI/UX Designer',
      type: 'Product Design Concept',
      timeline: '4 Weeks',
      discipline: 'UI/UX Design & Design Systems',
      tools: 'Figma, FigJam, Prototyping',
      deliverables: 'Web Dashboard, Mobile App UI, Design System'
    },
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#E8862E',
    sections: [
      {
        type: 'problem',
        tag: '01 // THE PROBLEM',
        title: 'Cluttered Interfaces & High Cognitive Load in Banking',
        content: `Traditional banking applications often overwhelm users with excessive menus, hidden balances, and multi-layered transfer flows. Everyday tasks—like checking actual spendable funds or initiating a quick peer-to-peer transfer—require navigating through dense, confusing submenus.`
      },
      {
        type: 'goals',
        tag: '02 // PROJECT GOALS',
        title: 'Clarity, Speed, and Reassurance',
        content: `The primary objective was to rethink digital retail banking by designing an interface that prioritizes speed and mental clarity:`,
        bullets: [
          '<strong>Instant Financial Health:</strong> Display clear spendable liquidity versus pending expenses at first glance.',
          '<strong>Frictionless Money Transfers:</strong> Reduce the core transfer flow to 3 straightforward steps with clear visual confirmation.',
          '<strong>Proactive Card Controls:</strong> Place card locking, limits, and virtual card generation within instant reach.',
          '<strong>Accessible Dark Glass Aesthetic:</strong> Maintain high contrast and clear visual hierarchy across both desktop and mobile viewports.'
        ]
      },
      {
        type: 'research',
        tag: '03 // RESEARCH & USER PAIN POINTS',
        title: 'Identifying Core User Frustrations',
        content: `Through comparative analysis of popular retail banking apps and user journey mapping, several critical UX bottlenecks were highlighted:`,
        bullets: [
          '<strong>Ambiguous Account Balances:</strong> Users struggle to separate posted transactions from authorized holds.',
          '<strong>Fear of Transfer Errors:</strong> Anxiety during recipient selection when account names and numbers lack visual clarity.',
          '<strong>Hidden Account Security:</strong> Inability to quickly freeze a compromised card without digging through settings menus.',
          '<strong>Complex Charts:</strong> Data visualizations that present raw numbers without practical context on monthly spending patterns.'
        ]
      },
      {
        type: 'flow',
        tag: '04 // USER FLOW & INFORMATION ARCHITECTURE',
        title: 'A Flattened 3-Pillar Navigation Structure',
        content: `The application architecture was restructured from a nested 12-page tree into 3 direct primary pillars: Overview, Analytics, and Vaults.`,
        diagram: [
          { step: '01. Overview', desc: 'Real-time liquidity, upcoming recurring bills, and instant card toggles' },
          { step: '02. Analytics', desc: 'Category-based cashflow insights, spend trends, and monthly breakdown' },
          { step: '03. Vaults', desc: 'Dedicated savings pockets, automated round-ups, and financial goals' }
        ]
      },
      {
        type: 'wireframes',
        tag: '05 // WIREFRAMES & LAYOUT EXPLORATION',
        title: 'Iterating Toward Ergonomic Screen Hierarchy',
        content: `Low-fidelity wireframing explored various dashboard layouts to optimize the visual balance between account balances, quick-action shortcuts (Transfer, Request, Exchange, Deposit), and recent activity feeds. Testing prioritized card-based grouping over standard tabular lists for faster visual scanning.`
      },
      {
        type: 'design_system',
        tag: '06 // DESIGN SYSTEM & TOKENS',
        title: 'High-Contrast Editorial Dark Theme System',
        content: `A comprehensive design system was constructed in Figma utilizing atomic tokens for typography, spacing, border radii, and color contrast compliant with WCAG accessibility standards.`,
        palette: [
          { name: 'Obsidian Canvas', hex: '#0D0E10' },
          { name: 'Surface Slate', hex: '#151619' },
          { name: 'Warm Amber Focus', hex: '#E8862E' },
          { name: 'Mint Inflow Accent', hex: '#2FA79B' },
          { name: 'Paper Text Primary', hex: '#EEEAE2' }
        ]
      },
      {
        type: 'final_screens',
        tag: '07 // UI DESIGN & PROTOTYPE',
        title: 'Refined Desktop & Mobile Interface',
        content: `The final high-fidelity design features a unified dark glass aesthetic, custom micro-interactions for transaction pills, an interactive cashflow analytics chart, and a dedicated virtual card manager.`,
        deliverables: [
          'Responsive Web Dashboard (Desktop & Tablet layouts)',
          'Complete Mobile App Design (iOS & Android guidelines)',
          'Interactive Clickable Figma Prototype',
          'Component Token Library & Auto-Layout Specs'
        ]
      },
      {
        type: 'outcome',
        tag: '08 // PROJECT OUTCOME',
        title: 'Design Summary & Key Takeaways',
        content: `Fintra demonstrates how structured UX analysis and restrained visual styling can transform complex financial tools into clear, calming, and intuitive digital experiences.`
      }
    ]
  },

  apex: {
    id: 'apex',
    slug: 'apex',
    category: 'UI/UX Design',
    categoryCode: '02 — UI/UX & TERMINAL',
    status: 'CONCEPT PROJECT',
    title: 'Apex Pro Trading Terminal',
    subtitle: 'A high-density web trading terminal designed for active crypto and multi-asset traders, balancing massive real-time data depth with eye-strain reduction.',
    meta: {
      role: 'UI/UX Designer',
      type: 'Terminal Interface Concept',
      timeline: '3 Weeks',
      discipline: 'High-Density UI/UX & Data Visualization',
      tools: 'Figma, Vector Grid, Auto-Layout',
      deliverables: 'Multi-Panel Desktop Workspace, Order Book UI, Component Library'
    },
    heroImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#E8862E',
    sections: [
      {
        type: 'problem',
        tag: '01 // THE PROBLEM',
        title: 'Information Density vs. Cognitive Fatigue in Financial Terminals',
        content: `Active trading platforms must display hundreds of simultaneous data points—candlestick charts, depth ladders, tick streams, order books, and execution logs. Most platforms either oversimplify the interface or present cluttered, illegible layouts that cause severe visual fatigue during extended sessions.`
      },
      {
        type: 'goals',
        tag: '02 // PROJECT GOALS',
        title: 'Maximum Information Depth with Visual Clarity',
        content: `The goal was to design an ergonomic, modular trading interface that delivers institutional-grade functionality with clean visual hierarchy:`,
        bullets: [
          '<strong>High-Density Layouts:</strong> Fit critical market indicators on a single screen without sacrificing readability.',
          '<strong>Subdued Contrast Palette:</strong> Use ultra-deep charcoal backgrounds with selective amber/teal highlights to mitigate eye strain.',
          '<strong>Keyboard-Friendly Order Entry:</strong> Design one-click and hotkey-driven trade execution panels.',
          '<strong>Modular Panel Docking:</strong> Establish consistent grid rules for resizable chart and order book modules.'
        ]
      },
      {
        type: 'research',
        tag: '03 // TRADER WORKFLOW ANALYSIS',
        title: 'Analyzing High-Speed Decision Making',
        content: `Studying trader workflows highlighted that visual focus shifts rapidly between price action, order book depth, and open position risk. Hierarchy must ensure critical status indicators are recognizable in peripheral vision.`,
        bullets: [
          '<strong>Color Semantics:</strong> Consistent use of green/teal for bids and coral/amber for asks without visual vibration.',
          '<strong>Monospaced Precision:</strong> Tabular numerals across all prices, sizes, and PnL indicators to prevent jumping text.',
          '<strong>Scannable Order Books:</strong> Visual depth bars behind numeric bids and asks for instant liquidity comprehension.'
        ]
      },
      {
        type: 'architecture',
        tag: '04 // WORKSPACE MODULAR GRID',
        title: 'Structured Multi-Column Layout Architecture',
        content: `The terminal layout is organized into 3 primary functional zones designed for quick horizontal eye-tracking:`,
        diagram: [
          { step: 'Left Dock', desc: 'Multi-asset market selector, 24h ticker feed, and watchlist' },
          { step: 'Center Canvas', desc: 'Real-time candlestick chart stage with technical overlay toolbar' },
          { step: 'Right Wing', desc: 'Order book depth ladder, recent trade prints, and one-click order form' }
        ]
      },
      {
        type: 'design_system',
        tag: '05 // DESIGN SYSTEM & ATOMIC TOKENS',
        title: 'Ergonomic Dark UI Architecture',
        content: `Built a strict tokenized design system using dark neutral tones and monospaced typography to support micro-layouts and dense data tables.`,
        palette: [
          { name: 'Deep Terminal Base', hex: '#0A0C0E' },
          { name: 'Panel Surface', hex: '#13161B' },
          { name: 'Bid Teal Green', hex: '#2FA79B' },
          { name: 'Ask Coral Amber', hex: '#E8862E' },
          { name: 'Grid Border Muted', hex: '#22262E' }
        ]
      },
      {
        type: 'final_screens',
        tag: '06 // UI DESIGN & ASSETS',
        title: 'The Apex Terminal Workspace',
        content: `The completed interface includes detailed specs for candlestick chart toolbars, floating order book widgets, position managers, and alert dialogs.`,
        deliverables: [
          'Full-Screen Desktop Trading Interface Mockup',
          'Modular Widget Component Specs',
          'Order Book & Execution State Variants',
          'Figma Interactive Prototype'
        ]
      },
      {
        type: 'outcome',
        tag: '07 // OUTCOME',
        title: 'Project Takeaway',
        content: `Apex Terminal illustrates how disciplined UI/UX systems can handle extreme information density while remaining clean, legible, and effortless to navigate.`
      }
    ]
  },

  solstice: {
    id: 'solstice',
    slug: 'solstice',
    category: 'Branding',
    categoryCode: '03 — BRAND IDENTITY & PACKAGING',
    status: 'CONCEPT PROJECT',
    title: 'Solstice Specialty Coffee',
    subtitle: 'Brand identity system, bespoke packaging architecture, and retail collateral for an artisanal single-origin coffee roastery.',
    meta: {
      role: 'Brand Designer',
      type: 'Brand Identity Concept',
      timeline: '3 Weeks',
      discipline: 'Brand Identity & Packaging Design',
      tools: 'Adobe Illustrator, Photoshop, Figma',
      deliverables: 'Wordmark, Packaging Labels, Brand Guidelines, Retail Collateral'
    },
    heroImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#E8862E',
    sections: [
      {
        type: 'brief',
        tag: '01 // BRAND BRIEF',
        title: 'Artisanal Craftsmanship Meets Modern Editorial Style',
        content: `Solstice is a conceptual specialty roastery focused on transparent single-origin sourcing and precision small-batch roasting. The project required a distinctive visual identity that bridges Scandinavian minimalist restraint with the tactile warmth of coffee culture.`
      },
      {
        type: 'direction',
        tag: '02 // BRAND DIRECTION & POSITIONING',
        title: 'The Warmth of the Solar Solstice',
        content: `The creative direction drew inspiration from the celestial solstice—the solar cycle that nurtures high-altitude coffee plants. This was translated into circular solar geometry, rich warm amber hues, earthy kraft tones, and refined editorial typography.`
      },
      {
        type: 'logo',
        tag: '03 // LOGO & WORDMARK DESIGN',
        title: 'Custom Typography Wordmark & Solar Emblem',
        content: `Designed a custom serif wordmark with balanced letterforms and distinct ligatures, paired with a circular solar seal suitable for wax stamps, cup sleeves, and packaging badges.`,
        bullets: [
          '<strong>Custom Wordmark:</strong> Refined serif letterforms with distinctive balance and high legibility at all scales.',
          '<strong>The Solar Emblem:</strong> A circular secondary mark used across merchandise, bag seals, and digital avatars.',
          '<strong>Grid Alignment:</strong> Precise geometric proportions for versatile application across horizontal and stacked lockups.'
        ]
      },
      {
        type: 'typography_color',
        tag: '04 // TYPOGRAPHY & COLOR SYSTEM',
        title: 'Warm Editorial Palette & Typographic Hierarchy',
        content: `Constructed a cohesive color system that pairs deep volcanic charcoal with radiant amber accents and unbleached cream tones.`,
        palette: [
          { name: 'Solstice Amber', hex: '#E8862E' },
          { name: 'Espresso Black', hex: '#161412' },
          { name: 'Unbleached Cream', hex: '#D9CEBA' },
          { name: 'Forest Roast Green', hex: '#263328' }
        ]
      },
      {
        type: 'packaging',
        tag: '05 // PACKAGING ARCHITECTURE',
        title: 'Modular Coffee Bag Label Grid',
        content: `Designed a modular packaging system that allows rotating seasonal single-origin releases without changing the base bag stock. A standardized matte pouch is customized through color-coded origin labels detailing country, altitude, process, and tasting notes.`
      },
      {
        type: 'applications',
        tag: '06 // RETAIL & BRAND APPLICATIONS',
        title: 'Cafe Collateral & Brand Touchpoints',
        content: `Extended the visual identity across takeaway cups, retail menus, merchandise, packaging tape, and digital social templates.`,
        deliverables: [
          'Primary Wordmark & Secondary Monogram Assets (SVG / EPS)',
          'Modular Coffee Packaging Label Templates',
          'Cafe Menu & Takeaway Cup Collateral',
          'Brand Identity Guidelines Book'
        ]
      },
      {
        type: 'outcome',
        tag: '07 // FINAL BRAND',
        title: 'Brand Identity Summary',
        content: `Solstice Specialty Coffee showcases a complete end-to-end identity system that feels elevated, timeless, and thoughtfully crafted across both digital and physical touchpoints.`
      }
    ]
  },

  pulse: {
    id: 'pulse',
    slug: 'pulse-healthcare',
    category: 'Social Media',
    categoryCode: '04 — SOCIAL MEDIA & GRAPHIC',
    status: 'SELF-INITIATED',
    title: 'Pulse Healthcare Campaign',
    subtitle: 'Educational social media design system, multi-slide carousel frameworks, and visual assets designed to communicate health topics clearly.',
    meta: {
      role: 'Social Media & Graphic Designer',
      type: 'Campaign Design Project',
      timeline: '2 Weeks',
      discipline: 'Social Media Design & Visual Content',
      tools: 'Figma, Adobe Illustrator, Photoshop',
      deliverables: 'Instagram Carousel Decks, Infographics, Story Templates'
    },
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#2FA79B',
    sections: [
      {
        type: 'goal',
        tag: '01 // BUSINESS & CONTENT GOAL',
        title: 'Making Health Information Clear and Approachable',
        content: `Complex health topics are frequently presented in dry, clinical formats or sensationalized clickbait. Pulse was conceived to demonstrate how structured social media design and clear visual hierarchy can make wellness education engaging, credible, and easy to digest.`
      },
      {
        type: 'content_direction',
        tag: '02 // CONTENT DIRECTION & HOOK STRATEGY',
        title: 'Structured Multi-Slide Carousel Architecture',
        content: `Established a consistent 4-part carousel structure to guide readers smoothly from discovery to takeaway:`,
        bullets: [
          '<strong>Slide 1 (The Hook):</strong> High-contrast typography with a clear question or topic statement.',
          '<strong>Slides 2–5 (The Core Framework):</strong> Bite-sized insights, clean vector diagrams, and simplified explanations.',
          '<strong>Slide 6 (Actionable Summary):</strong> Key takeaways formatted for effortless screenshotting and bookmarking.',
          '<strong>Slide 7 (Discussion / Share):</strong> Friendly call-to-action inviting audience questions and saves.'
        ]
      },
      {
        type: 'visual_system',
        tag: '03 // VISUAL SYSTEM & TYPOGRAPHY',
        title: 'Calming Palettes & Editorial Clarity',
        content: `Developed a cohesive visual identity featuring clean sans-serif typography, calming restorative greens, and warm accent tones.`,
        palette: [
          { name: 'Restorative Teal', hex: '#2FA79B' },
          { name: 'Warm Amber Alert', hex: '#E8862E' },
          { name: 'Deep Slate Base', hex: '#0F1216' },
          { name: 'Paper White', hex: '#F4EFEB' }
        ]
      },
      {
        type: 'carousel',
        tag: '04 // CAROUSEL DESIGN & INFOGRAPHICS',
        title: 'Modular Multi-Slide Template Suite',
        content: `Constructed reusable Figma auto-layout templates allowing rapid creation of educational carousels with consistent margins, typographic scale, and icon styling.`
      },
      {
        type: 'ad_creatives',
        tag: '05 // SOCIAL ASSETS & DELIVERABLES',
        title: 'Multi-Format Social Asset Suite',
        content: `Produced an integrated suite of feed posts, story templates, and promotional banner formats for Instagram and LinkedIn.`,
        deliverables: [
          'Modular 10-Slide Carousel Template Kit (1:1 and 4:5 ratios)',
          'High-Contrast Story & Reel Cover Layouts (9:16 ratio)',
          'Custom Vector Health & Wellness Iconography',
          'Figma Social Media Asset Library with Component Variants'
        ]
      },
      {
        type: 'outcome',
        tag: '06 // FINAL CONTENT SYSTEM',
        title: 'Design Summary',
        content: `Pulse Healthcare demonstrates how clean graphic design principles and thoughtful layout hierarchy can elevate social media content into authoritative, shareable visual communication.`
      }
    ]
  },

  veloce: {
    id: 'veloce',
    slug: 'veloce',
    category: 'Social Media',
    categoryCode: '05 — MARKETING & AD CREATIVE',
    status: 'CONCEPT PROJECT',
    title: 'Veloce Performance Ad Kit',
    subtitle: 'Promotional marketing assets and high-impact social ad creatives designed for modern digital campaigns and product drops.',
    meta: {
      role: 'Marketing & Graphic Designer',
      type: 'Ad Creative Concept',
      timeline: '2 Weeks',
      discipline: 'Marketing Ad Design & Social Creatives',
      tools: 'Adobe Photoshop, Illustrator, Figma',
      deliverables: 'Multi-Ratio Social Ads, Story Creatives, Display Banners'
    },
    heroImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#E8862E',
    sections: [
      {
        type: 'goal',
        tag: '01 // CAMPAIGN OBJECTIVE',
        title: 'Creating High-Impact Promotional Visuals',
        content: `Designed a performance-oriented digital advertising kit for an athletic apparel product launch. The goal was to develop striking ad layouts that capture attention in fast-scrolling feeds while maintaining a clean, premium brand aesthetic.`
      },
      {
        type: 'content_direction',
        tag: '02 // VISUAL HIERARCHY & HOOK FORMULA',
        title: '3-Tier Ad Structure for Instant Comprehension',
        content: `Each ad variation was built upon a clear 3-tier visual hierarchy to deliver the core message within 2 seconds of viewing:`,
        bullets: [
          '<strong>Visual Anchor:</strong> Dynamic product imagery positioned with strong diagonal motion lines.',
          '<strong>Bold Value Proposition:</strong> Concise, punchy headline in high-contrast monospaced badge styling.',
          '<strong>Frictionless CTA:</strong> Prominent call-to-action button with clear next-step direction.'
        ]
      },
      {
        type: 'visual_system',
        tag: '03 // COLOR & TYPOGRAPHY SYSTEM',
        title: 'High-Energy Contrast Palette',
        content: `Utilized an energetic amber and charcoal palette with bold athletic typography to communicate speed, technical engineering, and durability.`,
        palette: [
          { name: 'Velocity Amber', hex: '#E8862E' },
          { name: 'Asphalt Black', hex: '#0B0D0F' },
          { name: 'Pure White Text', hex: '#FFFFFF' },
          { name: 'Teal Accent Tag', hex: '#2FA79B' }
        ]
      },
      {
        type: 'ad_creatives',
        tag: '04 // MULTI-RATIO ASSET MATRIX',
        title: 'Comprehensive Asset Deliverables',
        content: `Created coordinated ad sets across all standard social and display aspect ratios for seamless omnichannel deployment.`,
        deliverables: [
          '1:1 Square Feed Ads for Instagram and Facebook',
          '9:16 Full-Screen Vertical Creatives for Stories and TikTok',
          '16:9 Landscape Promo Banners for Web and Desktop',
          'Responsive Component Templates in Figma'
        ]
      },
      {
        type: 'outcome',
        tag: '05 // FINAL CONTENT SYSTEM',
        title: 'Design Summary',
        content: `The Veloce Ad Kit highlights how strategic graphic design, strong typographic structure, and dynamic product framing can drive engagement in digital marketing campaigns.`
      }
    ]
  },

  aether: {
    id: 'aether',
    slug: 'aether',
    category: 'Graphic Design',
    categoryCode: '06 — LOGO & VECTOR CRAFT',
    status: 'DESIGN ANTHOLOGY',
    title: 'Aether Studio Logomarks',
    subtitle: 'A curated collection of minimalist, geometry-driven logomarks and symbols designed with mathematical proportion and optical balance.',
    meta: {
      role: 'Graphic & Logo Designer',
      type: 'Anthology / Collection',
      timeline: 'Ongoing Anthology',
      discipline: 'Logo Design & Vector Geometry',
      tools: 'Adobe Illustrator, Vector Grid, Glyphs',
      deliverables: 'Vector Logomarks, Optical Grid Blueprints, Favicon Specs'
    },
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    accentColor: '#EEEAE2',
    sections: [
      {
        type: 'brief',
        tag: '01 // DESIGN PHILOSOPHY',
        title: 'The Craft of Reduction and Geometric Precision',
        content: `A logomark is the purest distillation of visual identity. It must communicate character, memorability, and balance whether displayed at 16x16 pixels as a browser favicon or scaled to large architectural signage. The Aether collection explores the intersection of mathematical grids, negative space, and semantic meaning.`
      },
      {
        type: 'concept',
        tag: '02 // GRID SYSTEMS & GEOMETRY',
        title: 'Constructive Optical Grids',
        content: `Every symbol in the collection is constructed from fundamental geometric primitives—concentric circles, isometric diagonals, and balanced line weights—tested for optical balance rather than purely algorithmic snapping.`,
        bullets: [
          '<strong>Monoline Consistency:</strong> Unified stroke weights calibrated to remain crisp across all display densities.',
          '<strong>Negative Space Harmony:</strong> Intentional counter-spaces that allow the marks to breathe on both dark and light canvases.',
          '<strong>Contrast Verification:</strong> Every mark is tested in pure monochrome before color exploration.',
          '<strong>Silhouette Recognition:</strong> Instantly identifiable outlines when blurred or viewed from a distance.'
        ]
      },
      {
        type: 'visual_direction',
        tag: '03 // SYMBOL BREAKDOWN & MEANING',
        title: 'Featured Logomarks',
        content: `A detailed overview of four featured marks from the anthology:`,
        diagram: [
          { step: '01. TRIAD', desc: 'An equilateral triangle interlocking with an internal sphere — representing dynamic balance and structural stability.' },
          { step: '02. NEXUS', desc: 'A rounded geometric squircle with a centered nucleus — representing connectivity, network nodes, and core security.' },
          { step: '03. INFINITY', desc: 'A continuous ribbon geometry with a focal orbit — representing iteration, continuous delivery, and momentum.' },
          { step: '04. HEXA', desc: 'An isometric faceted hexagon with perspective axes — representing spatial structure and modular architecture.' }
        ]
      },
      {
        type: 'design_exploration',
        tag: '04 // SCALABILITY & APPLICATION TESTING',
        title: 'Testing Across Digital & Print Media',
        content: `Each mark undergoes scalability checks: 16px sub-pixel favicon rendering, dark/light contrast verification, and vector lockup tests with sans-serif and monospace typography.`,
        deliverables: [
          'Master Vector Construction Blueprints (SVG / EPS)',
          'Responsive Lockups (Horizontal, Stacked, Icon-Only)',
          'Monochrome & Dark Mode Contrast Verification Files',
          'Export Matrix for Web Favicons and App Icons'
        ]
      },
      {
        type: 'outcome',
        tag: '05 // APPLICATIONS & TAKEAWAYS',
        title: 'Design Summary',
        content: `The Aether Logomarks collection showcases a dedicated approach to minimalist symbol design, demonstrating how clean geometric foundations produce versatile, memorable brand marks.`
      }
    ]
  }
};

// Expose on window for global access
if (typeof window !== 'undefined') {
  window.CASE_STUDIES_DATA = CASE_STUDIES_DATA;
}
