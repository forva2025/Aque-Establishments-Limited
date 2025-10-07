# Aque Establishments Limited Website

A modern, responsive single-page website for a Ugandan construction and civil engineering company. Built with plain HTML, CSS, and vanilla JavaScript — no build step required.

## Project Structure

```
Aque-Establishments-Limited/
├─ index.html     # Markup for all sections (Hero, Services, About, Projects, Testimonials, Contact, Footer)
├─ style.css      # Design system tokens, themes, layout, components, responsive rules
├─ app.js         # Interactivity (navigation, sliders, counters, filters, form, etc.)
├─ LICENSE        # License file
└─ README.md      # This file
```

## How to Run
- Option 1: Double-click `index.html` to open in your browser.
- Option 2: Serve locally (recommended for best behavior):
  - PowerShell: `python -m http.server 5500` then open `http://localhost:5500/Aque-Establishments-Limited/index.html`
  - Node: `npx serve` in the project root and open the served URL

## Features

HTML (`index.html`)
- Sticky header with brand and navigation
- Hero with gradient background and primary CTAs
- Services highlight grid and detailed services section
- Statistics section with animated counters
- About section with values cards
- Projects grid with filter buttons (All, Building, Roads, Renovation)
- Testimonials slider with navigation
- Contact section with form and company info
- Footer with links, services list, social icons, and back-to-top button

CSS (`style.css`)
- Design tokens: color palette, spacing, typography, shadows, radii
- Light/dark support via `prefers-color-scheme` and `[data-color-scheme]`
- Brand variables: `--brand-primary`, `--brand-light-gray`, `--brand-charcoal`, etc.
- Components: buttons, cards, badges/status, forms, grids
- Responsive layout for tablets and mobiles
- Animation utilities (`.fade-in`, keyframes) and hover effects
- Accessibility helpers (`.sr-only`, focus outlines)
- Recent updates: ensured black text on light backgrounds for readability (services, projects, testimonials, about, contact cards)

JavaScript (`app.js`)
- Mobile navigation toggle (with icon swap and outside-click close)
- Smooth scrolling with header offset for in-page links
- Statistics counter animation when section enters viewport
- Testimonials slider with autoplay, manual prev/next, and hover pause
- Projects filtering with animated show/hide
- Contact form: validation (required, email, phone), simulated submit with success/error notifications, inline error messages
- Back-to-top button (show/hide on scroll, smooth scroll to top)
- Scroll-based reveal animations for cards (`.fade-in`)
- Header scroll effect (elevated on scroll, hide on fast scroll down)
- Simple resource preloading hook and passive/throttled listeners

## Customization
- Colors: adjust brand variables in `style.css` under `/* Custom properties for the brand colors */`.
- Typography: change Google Font in `index.html` and corresponding font settings in `style.css`.
- Sections/content: edit copy in `index.html`. Add/remove service or project cards by duplicating existing blocks.
- Behavior: tweak timings and thresholds in `app.js` (e.g., slider interval, IntersectionObserver options).

## Accessibility
- High-contrast text on light backgrounds
- Focus outlines enabled (`:focus-visible` and tokenized focus styles)
- Semantic HTML structure for sections and headings

## Deployment
Since it’s static, you can deploy to any static host (GitHub Pages, Netlify, Vercel, S3, etc.). Just upload the `Aque-Establishments-Limited` directory and set `index.html` as the entry.

## License
See `LICENSE` for details.
