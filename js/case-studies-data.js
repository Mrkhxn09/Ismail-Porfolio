/**
 * Ismail Khan Portfolio — Tailored Case Studies Dataset (70% Visual / 30% Text)
 * 
 * Sourced directly from authentic Framer portfolio work (https://ismailkhan.framer.website/):
 * - Portfolio Website (Personal UI/UX Portfolio built in Figma + Framer)
 * - Pearl's Eye Photography (UI/UX Case Study)
 * - Job Finder (Mobile App UI Exploration)
 * - Flower Hero Page Design (Landing Page UI)
 * - RedBus (Mobile App UI Redesign)
 * - E-Commerce Headphone (Landing Page UI Redesign)
 * 
 * Clean structure: Each project includes an `images` array for easy future high-res asset replacement.
 */

const CASE_STUDIES_DATA = {
  'portfolio-website': {
    id: 'portfolio-website',
    slug: 'portfolio-website',
    prevSlug: 'ecommerce-headphone',
    nextSlug: 'pearls-eye-photography',
    category: 'UI/UX Design',
    categoryCode: '01 — FEATURED PROJECT',
    status: 'PERSONAL PORTFOLIO',
    title: 'Portfolio Website',
    subtitle: 'A personal UI/UX portfolio designed to communicate my design skills, selected work, and design approach through an interactive digital experience.',
    meta: {
      role: 'UI/UX Designer',
      type: 'Personal Portfolio',
      timeline: 'Concept to Framer',
      discipline: 'UI/UX Design',
      tools: 'Figma, Framer',
      deliverables: 'Personal Brand, Responsive Web Experience, Case Studies'
    },
    heroImage: '/assets/images/framer-portfolio/desktop_hero.webp',
    accentColor: '#E8862E',
    overview: 'The project was designed as a personal UI/UX portfolio to present my design skills, selected work, tools and approach in a clear and visually engaging way.',
    visualShowcase: [
      {
        tag: '01 // HERO & BRAND POSITIONING',
        title: 'Desktop Introduction & Identity',
        desc: 'Bold headline statement, role definition, and direct access to View CV with dark glass aesthetic.',
        layout: 'full',
        images: [
          {
            src: '/assets/images/framer-portfolio/desktop_hero.webp',
            label: '01 — HERO DISPLAY',
            caption: 'Desktop Hero view — Role positioning, headline typography and CTA buttons'
          }
        ]
      },
      {
        tag: '02 // SKILLS & ABOUT PHILOSOPHY',
        title: 'Core Capabilities & Design Approach',
        desc: 'Visual display of design competencies, workflow tools (Figma, Canva, Framer), and user-centered design philosophy.',
        layout: 'duo',
        images: [
          {
            src: '/assets/images/framer-portfolio/desktop_skills_tools.webp',
            label: '02 — SKILLS & TOOLS',
            caption: 'Categorized design competencies & software tools'
          },
          {
            src: '/assets/images/framer-portfolio/desktop_about.webp',
            label: '03 — ABOUT SECTION',
            caption: 'Design philosophy focused on curiosity and empathy'
          }
        ]
      },
      {
        tag: '03 // SELECTED WORK ARCHITECTURE',
        title: 'Project Presentation & Exploration Cards',
        desc: 'Showcase grid highlighting Photography portfolio and UI Visual Exploration design sprints.',
        layout: 'duo',
        images: [
          {
            src: '/assets/images/framer-portfolio/desktop_project_photography.webp',
            label: '04 — PHOTOGRAPHY CASE STUDY',
            caption: 'Featured Photography project card leading to deep case study'
          },
          {
            src: '/assets/images/framer-portfolio/desktop_projects_overview.webp',
            label: '05 — WORK SHOWCASE GRID',
            caption: 'Multi-project layout with interactive hover states'
          }
        ]
      },
      {
        tag: '04 // MOBILE ADAPTATION',
        title: 'Complete Responsive Mobile Experience',
        desc: 'Thumb-friendly navigation, stacked project cards, and legible typography across mobile viewports.',
        layout: 'quad',
        images: [
          {
            src: '/assets/images/framer-portfolio/mobile_hero.webp',
            label: '06 — MOBILE HERO',
            caption: 'Header & positioning'
          },
          {
            src: '/assets/images/framer-portfolio/mobile_skills.webp',
            label: '07 — MOBILE SKILLS',
            caption: 'Capabilities list'
          },
          {
            src: '/assets/images/framer-portfolio/mobile_about.webp',
            label: '08 — MOBILE ABOUT',
            caption: 'Personal story'
          },
          {
            src: '/assets/images/framer-portfolio/mobile_contact.webp',
            label: '09 — MOBILE FOOTER',
            caption: 'Contact & social links'
          }
        ]
      }
    ],
    sections: [
      {
        type: 'goals',
        tag: '05 // DESIGN GOALS',
        title: 'Clear Purpose & Factual Objectives',
        content: `The portfolio was created with six core design objectives visible throughout the interface:`,
        bullets: [
          '<strong>Present Myself as a UI/UX Designer:</strong> Clearly communicate my focus on crafting intuitive and impactful digital experiences.',
          '<strong>Showcase Selected Projects:</strong> Provide dedicated case study breakdowns with structured problem-solving flows.',
          '<strong>Communicate Design Skills:</strong> Explicitly present competencies in User-Centered Design, Visual Design, Wireframing, UI Design, and Prototyping.',
          '<strong>Present Tools and Capabilities:</strong> Highlight day-to-day workflow tools including Figma, Canva, and Framer.'
        ]
      },
      {
        type: 'outcome',
        tag: '06 // OUTCOME',
        title: 'End-to-End Execution',
        content: `The final portfolio created a central place to communicate my UI/UX capabilities, present selected projects and establish a visual personal identity.`,
        stats: [
          { value: 'Figma → Framer', label: 'End-to-End Execution' },
          { value: '2 Case Studies', label: 'Documented Work' },
          { value: '100% Responsive', label: 'Desktop & Mobile' }
        ]
      }
    ]
  },

  'pearls-eye-photography': {
    id: 'pearls-eye-photography',
    slug: 'pearls-eye-photography',
    prevSlug: 'portfolio-website',
    nextSlug: 'job-finder',
    category: 'UI/UX Design',
    categoryCode: '01 — UI/UX CASE STUDY',
    status: 'SELECTED WORK',
    title: "Pearl's Eye Photography",
    subtitle: 'A modern, minimal, and visually engaging website designed for a professional photographer to highlight their work and turn visitors into clients.',
    meta: {
      role: 'UI/UX Designer',
      type: 'Client / Portfolio Design',
      timeline: '7–10 Days',
      discipline: 'UI/UX Design',
      tools: 'Figma, Unsplash, Google Fonts',
      deliverables: 'User Research, Site Structure, Wireframes, Hi-Fi UI, Prototype'
    },
    heroImage: '/assets/images/framer-portfolio/cs1_hero.png',
    accentColor: '#E8862E',
    overview: 'Photographers often lack a centralized, professionally designed space to showcase their work and attract high-value clients. The goal was to build a responsive, modern website with clear CTAs and focused layouts to elevate the photographer\'s brand and improve client engagement.',
    visualShowcase: [
      {
        tag: '01 // HERO BANNER',
        title: 'Visual Identity & Hero Header',
        desc: 'Distraction-free hero layout pairing authentic photography with clean editorial typography.',
        layout: 'full',
        images: [
          {
            src: '/assets/images/framer-portfolio/cs1_hero.png',
            label: '01 — HERO BANNER',
            caption: 'Distraction-free hero layout with clean typography and booking CTA'
          }
        ]
      },
      {
        tag: '02 // UX ROADMAP',
        title: '5-Stage Design Process',
        desc: 'Structured methodology: Understand → Define → Ideate → Design → Test.',
        layout: 'full',
        images: [
          {
            src: '/assets/images/framer-portfolio/cs1_process.png',
            label: '02 — UX METHODOLOGY',
            caption: 'Structured 5-stage design workflow from research to prototype testing'
          }
        ]
      },
      {
        tag: '03 // CORE INTERFACE MODULES',
        title: 'Storytelling About & Visual Gallery',
        desc: 'High-fidelity screens crafted to establish trust and immerse visitors in the visual portfolio.',
        layout: 'duo',
        images: [
          {
            src: '/assets/images/framer-portfolio/cs1_screen_about.png',
            label: '03 — ABOUT STORY',
            caption: 'Personal creative story, photographer portrait & mission statement'
          },
          {
            src: '/assets/images/framer-portfolio/cs1_screen_gallery.png',
            label: '04 — VISUAL GALLERY',
            caption: 'Multi-category photo and video gallery grid with smooth tab toggles'
          }
        ]
      },
      {
        tag: '04 // CONVERSION & PRICING',
        title: 'Transparent Package Pricing Matrix',
        desc: 'Tiered pricing breakdown with transparent deliverables and high-contrast call-to-action buttons.',
        layout: 'full',
        images: [
          {
            src: '/assets/images/framer-portfolio/cs1_screen_pricing.png',
            label: '05 — PRICING PACKAGES',
            caption: 'Package comparison table facilitating easy client booking decisions'
          }
        ]
      }
    ],
    sections: [
      {
        type: 'outcome',
        tag: '05 // PHILOSOPHY & SUMMARY',
        title: 'Design Summary',
        content: `“Designing for photographers means letting the visuals breathe while keeping the experience invisible — just like a perfect shot.” The finished design created an engaging platform tailored to high-value client acquisition.`
      }
    ]
  },

  'job-finder': {
    id: 'job-finder',
    slug: 'job-finder',
    prevSlug: 'pearls-eye-photography',
    nextSlug: 'flower-hero',
    category: 'UI/UX Design',
    categoryCode: '02 — MOBILE APP UI',
    status: 'UI EXPLORATION',
    title: 'Job Finder — Mobile App UI',
    subtitle: 'A seamless and intuitive job search mobile experience that empowers users to find and apply for jobs with ease and confidence.',
    meta: {
      role: 'UI/UX Designer',
      type: 'Mobile App UI Exploration',
      timeline: '1 Week',
      discipline: 'UI/UX Design',
      tools: 'Figma',
      deliverables: 'Mobile Screen Flows, Filter System, Application UX'
    },
    heroImage: '/assets/images/framer-portfolio/job-finder_img_1.png',
    accentColor: '#2FA79B',
    overview: 'Job Finder is a mobile app concept that makes it easier for users to search and apply for jobs. It offers a simple, clean interface with easy navigation, detailed filters, and organized listings.',
    visualShowcase: [
      {
        tag: '01 // MOBILE SCREEN SEQUENCE',
        title: 'Key Application Screens',
        desc: 'Three core screen flows designed to eliminate friction in discovery, filtering, and job application.',
        layout: 'trio',
        images: [
          {
            src: '/assets/images/framer-portfolio/job-finder_img_1.png',
            label: '01 — JOB LISTING & DETAILS',
            caption: 'Primary search feed with company badges and salary indicators'
          },
          {
            src: '/assets/images/framer-portfolio/job-finder_img_2.png',
            label: '02 — FILTER SYSTEM',
            caption: 'Granular filter drawer for location, experience level, and role type'
          },
          {
            src: '/assets/images/framer-portfolio/job-finder_img_3.png',
            label: '03 — APPLICATION CONFIRMATION',
            caption: '1-tap resume submission flow with status tracking'
          }
        ]
      }
    ],
    sections: [
      {
        type: 'outcome',
        tag: '02 // KEY LEARNINGS',
        title: 'Layout Mastery & Guidance',
        content: `“Design is not just how it looks — it’s how clearly it guides.” By working on this project, I refined my skills for creating transparent user-centered flows and enhanced visual continuity while balancing dense data with clean whitespace.`
      }
    ]
  },

  'flower-hero': {
    id: 'flower-hero',
    slug: 'flower-hero',
    prevSlug: 'job-finder',
    nextSlug: 'red-bus',
    category: 'UI/UX Design',
    categoryCode: '03 — LANDING PAGE UI',
    status: 'UI EXPLORATION',
    title: 'Flower Hero Page Design',
    subtitle: 'A visually appealing landing section for a flower shop app, crafted to capture attention instantly through elegance and warm aesthetics.',
    meta: {
      role: 'UI/UX Designer',
      type: 'Landing Page UI',
      timeline: 'Design Sprint',
      discipline: 'UI/UX Design',
      tools: 'Figma',
      deliverables: 'Hero Banner Layout, Typography Hierarchy, CTA Strategy'
    },
    heroImage: '/assets/images/framer-portfolio/flower-hero_img_0.png',
    accentColor: '#E8862E',
    overview: 'The design highlights elegance, seasonal offerings, and easy navigation — giving users a warm and welcoming first impression. The focus was on aesthetics, typography, and hierarchy to ensure the brand’s vibe blooms at first glance.',
    visualShowcase: [
      {
        tag: '01 // HERO DISPLAY',
        title: 'Landing Section Composition',
        desc: 'Centered hero mockup with generous whitespace, soft pink background (#FCECEC), and clear call-to-action.',
        layout: 'full',
        images: [
          {
            src: '/assets/images/framer-portfolio/flower-hero_img_0.png',
            label: '01 — HERO COMPOSITION',
            caption: 'Landing banner with soft shadow styling and Poppins + Playfair Display typography'
          }
        ]
      },
      {
        tag: '02 // PRODUCT SHOWCASE',
        title: 'Curated Floral Offerings',
        desc: 'Individual product showcase cards designed for visual warmth and clean scanning.',
        layout: 'quad',
        images: [
          {
            src: '/assets/images/framer-portfolio/flower-hero_img_1.jpg',
            label: '02 — PRODUCT CARD 1',
            caption: 'Fresh rose bouquet presentation'
          },
          {
            src: '/assets/images/framer-portfolio/flower-hero_img_2.jpg',
            label: '03 — PRODUCT CARD 2',
            caption: 'Mixed seasonal arrangement'
          },
          {
            src: '/assets/images/framer-portfolio/flower-hero_img_3.jpg',
            label: '04 — PRODUCT CARD 3',
            caption: 'Curated gift packaging'
          },
          {
            src: '/assets/images/framer-portfolio/flower-hero_img_4.jpg',
            label: '05 — PRODUCT CARD 4',
            caption: 'Floral accents'
          }
        ]
      },
      {
        tag: '03 // VISUAL SPECIFICATIONS',
        title: 'Typography Pairing & Palette Standards',
        desc: 'Technical visual breakdown including color codes and spacing principles.',
        layout: 'duo',
        images: [
          {
            src: '/assets/images/framer-portfolio/flower-hero_img_5.png',
            label: '06 — VISUAL DETAILS',
            caption: 'Design token specs, colors & fonts'
          },
          {
            src: '/assets/images/framer-portfolio/flower-hero_img_6.png',
            label: '07 — FOOTER INTERACTION',
            caption: 'Secondary footer and social channels'
          }
        ]
      }
    ],
    sections: [
      {
        type: 'outcome',
        tag: '04 // PHILOSOPHY',
        title: 'Quiet Elegance in UI',
        content: `“Like flowers, good design doesn’t need to shout — it quietly makes everything more beautiful.”`
      }
    ]
  },

  'red-bus': {
    id: 'red-bus',
    slug: 'red-bus',
    prevSlug: 'flower-hero',
    nextSlug: 'ecommerce-headphone',
    category: 'UI/UX Design',
    categoryCode: '04 — APP REDESIGN',
    status: 'UI EXERCISE',
    title: 'RedBus — App UI Redesign',
    subtitle: 'A hands-on mobile UI exercise recreating and refining a real-world booking interface with focus on cleaner hierarchy and usability.',
    meta: {
      role: 'UI/UX Designer',
      type: 'Mobile App Redesign',
      timeline: '4–5 Days',
      discipline: 'UI/UX Design',
      tools: 'Figma',
      deliverables: 'Multi-Screen Mobile Flow, Booking Grid, Design System'
    },
    heroImage: '/assets/images/framer-portfolio/red-bus_img_1.png',
    accentColor: '#E8862E',
    overview: 'This RedBus Redesign was a personal UI exercise project wherein I remade the interface to hone my design execution. Attention was paid to enhancing structure, visual hierarchy, and general consistency across multiple interconnected screens.',
    visualShowcase: [
      {
        tag: '01 // DISCOVERY & SEARCH FLOW',
        title: 'Route Search & Operator Listings',
        desc: 'Streamlined date picker, route selector, and bus operator cards with departure filters.',
        layout: 'duo',
        images: [
          {
            src: '/assets/images/framer-portfolio/red-bus_img_1.png',
            label: '01 — ROUTE SEARCH',
            caption: 'Origin, destination, and departure date selection'
          },
          {
            src: '/assets/images/framer-portfolio/red-bus_img_2.png',
            label: '02 — OPERATOR LISTINGS',
            caption: 'Bus operator list with timing, fare and rating tags'
          }
        ]
      },
      {
        tag: '02 // BOOKING & SEAT SELECTION',
        title: 'Seat Grid & Boarding Points',
        desc: 'Ergonomic seat selection layout with clear berth indicators and pickup location mapping.',
        layout: 'duo',
        images: [
          {
            src: '/assets/images/framer-portfolio/red-bus_img_3.png',
            label: '03 — SEAT SELECTION',
            caption: 'Upper / lower deck layout with price tiers'
          },
          {
            src: '/assets/images/framer-portfolio/red-bus_img_4.png',
            label: '04 — BOARDING POINTS',
            caption: 'Pickup and dropping points selection'
          }
        ]
      },
      {
        tag: '03 // PASSENGER DETAILS & CHECKOUT',
        title: 'Passenger Information & Confirmation',
        desc: 'Frictionless passenger form and instant digital ticket confirmation screen.',
        layout: 'duo',
        images: [
          {
            src: '/assets/images/framer-portfolio/red-bus_img_5.png',
            label: '05 — PASSENGER DETAILS',
            caption: 'Contact info, seat allocation, and payment breakdown'
          },
          {
            src: '/assets/images/framer-portfolio/red-bus_img_6.png',
            label: '06 — TICKET CONFIRMATION',
            caption: 'Digital ticket confirmation with QR code pass'
          }
        ]
      }
    ],
    sections: [
      {
        type: 'outcome',
        tag: '04 // KEY LEARNINGS',
        title: 'Execution & Detail Orientation',
        content: `“Every pixel I recreated brought me a step closer to mastering real-world design execution.” By reconstructing this actual-world UI, I honed my detail orientation, refined layout competency, and learned more about preserving hierarchy across multi-screen booking flows.`
      }
    ]
  },

  'ecommerce-headphone': {
    id: 'ecommerce-headphone',
    slug: 'ecommerce-headphone',
    prevSlug: 'red-bus',
    nextSlug: 'portfolio-website',
    category: 'UI/UX Design',
    categoryCode: '05 — E-COMMERCE UI',
    status: 'UI REDESIGN',
    title: 'E-Commerce Headphone Redesign',
    subtitle: 'A design UI remake of an audio product landing page prioritizing bold typography, modern structure, and product showcasing.',
    meta: {
      role: 'UI/UX Designer',
      type: 'E-Commerce Web UI',
      timeline: '1.5 Days',
      discipline: 'UI/UX Design',
      tools: 'Figma',
      deliverables: 'Product Showcase Stage, Feature Breakdown, Purchase CTA'
    },
    heroImage: '/assets/images/framer-portfolio/ecommerce-headphone_img_0.png',
    accentColor: '#E8862E',
    overview: 'The challenge was to improve the shopping experience through clean aesthetics, bold typography, and contemporary layout structures — keeping product showcasing and usability at the forefront.',
    visualShowcase: [
      {
        tag: '01 // PRODUCT HERO PRESENTATION',
        title: 'Landing Page Hero Stage',
        desc: 'High-impact product visual integrated with technical specification highlights and bold purchase trigger.',
        layout: 'full',
        images: [
          {
            src: '/assets/images/framer-portfolio/ecommerce-headphone_img_0.png',
            label: '01 — PRODUCT HERO',
            caption: 'Hero product presentation with bold typography and purchase CTA'
          }
        ]
      },
      {
        tag: '02 // FEATURES & SOUND SPECIFICATIONS',
        title: 'Feature Breakdown & Specifications',
        desc: 'Technical acoustic specs, battery life callouts, and clean e-commerce checkout flow.',
        layout: 'full',
        images: [
          {
            src: '/assets/images/framer-portfolio/ecommerce-headphone_img_1.png',
            label: '02 — FEATURE BREAKDOWN',
            caption: 'Detailed feature showcase with ergonomic acoustic specifications'
          }
        ]
      }
    ],
    sections: [
      {
        type: 'outcome',
        tag: '03 // SUMMARY',
        title: 'Connecting & Converting',
        content: `“Good design isn’t just what it looks like — it’s how it connects, communicates, and converts.” Through the redesign, I explored clean composition of layouts with an emphasis on user engagement and simplicity.`
      }
    ]
  },

  // Alias for backward compatibility
  'framer-portfolio': {
    id: 'framer-portfolio',
    slug: 'portfolio-website',
    prevSlug: 'ecommerce-headphone',
    nextSlug: 'pearls-eye-photography',
    category: 'UI/UX Design',
    categoryCode: '01 — FEATURED PROJECT',
    status: 'PERSONAL PORTFOLIO',
    title: 'Portfolio Website',
    subtitle: 'A personal UI/UX portfolio designed to communicate my design skills, selected work, and design approach through an interactive digital experience.',
    meta: {
      role: 'UI/UX Designer',
      type: 'Personal Portfolio',
      timeline: 'Concept to Framer',
      discipline: 'UI/UX Design',
      tools: 'Figma, Framer',
      deliverables: 'Personal Brand, Responsive Web Experience, Case Studies'
    },
    heroImage: '/assets/images/framer-portfolio/desktop_hero.webp',
    accentColor: '#E8862E',
    overview: 'The project was designed as a personal UI/UX portfolio to present my design skills, selected work, tools and approach in a clear and visually engaging way.',
    visualShowcase: [
      {
        tag: '01 // HERO & BRAND POSITIONING',
        title: 'Desktop Introduction & Identity',
        desc: 'Bold headline statement, role definition, and direct access to View CV with dark glass aesthetic.',
        layout: 'full',
        images: [
          {
            src: '/assets/images/framer-portfolio/desktop_hero.webp',
            label: '01 — HERO DISPLAY',
            caption: 'Desktop Hero view — Role positioning, headline typography and CTA buttons'
          }
        ]
      }
    ],
    sections: []
  }
};

// Expose on window for global access
if (typeof window !== 'undefined') {
  window.CASE_STUDIES_DATA = CASE_STUDIES_DATA;
}
