# H.R. 1 SNAP Work Requirements Visual Explainer

An interactive visual explainer showing how SNAP work requirements changed under H.R. 1 (One Big Beautiful Bill Act) signed July 4, 2025.

## Overview

This project helps SNAP recipients understand:
- **What changed** - Three major changes to work requirements
- **Who's affected** - Interactive tools to check if you're impacted
- **What to do** - Next steps and resources for help

## Features

- **Card-based design** - Three expandable cards for each major change
- **Interactive visualizations** - D3.js charts showing age ranges, parent exemptions, and timelines
- **Age and family calculators** - Check your age or your children's ages instantly (embedded in cards)
- **Mobile-first responsive** - Works on all devices
- **Accessible** - WCAG AA compliant, keyboard navigation, screen reader support

## Technology Stack

- **Vanilla JavaScript** - No build tools required
- **D3.js v7** - Data visualizations
- **CSS Grid** - Responsive layout
- **GitHub Pages** - Deployment

## Project Structure

```
hr1-snap-work-requirements/
├── index.html                 # Main HTML structure
├── css/
│   └── styles.css            # Mobile-first responsive styles
├── js/
│   ├── data.js               # Data loader
│   ├── visualizations.js     # D3 visualizations (age bars, timeline, etc.)
│   ├── cards.js              # Card expand/collapse + calculators
│   └── quiz.js               # (archived - not currently used)
├── data/
│   └── requirements.json     # All policy data with sources
├── PROJECT_NOTES.md          # Running documentation and decisions
└── README.md                 # This file
```

## Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/joelmcclurg-personal/hr1-snap-work-requirements.git
   cd hr1-snap-work-requirements
   ```

2. **Start a local server:**
   ```bash
   # Using Python 3
   python3 -m http.server 8000

   # OR using Node.js
   npx http-server -p 8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

## Data Sources

All policy details are verified against official sources:

### Primary Sources
- [H.R. 1 Legislative Text](https://www.congress.gov/bill/119th-congress/house-bill/1/text)
- [USDA FNS OBBB Implementation Guidance](https://www.fns.usda.gov/snap/obbb-implementation)
- [Propel SNAP Work Requirements Guide](https://www.propel.app/snap/snap-work-requirements-full-guide/)

### Population Data
- [USDA FNS SNAP Participation Data](https://www.fns.usda.gov/pd/supplemental-nutrition-assistance-program-snap)
- [HUD Point-in-Time Count](https://www.hudexchange.info/programs/hdx/pit-hic/)
- [HHS Foster Care Statistics](https://www.acf.hhs.gov/cb)

See `data/requirements.json` for detailed source citations and methodology notes.

## Design Principles

1. **Information design over narrative** - Quick reference tool, not a story
2. **Mobile-first** - People on SNAP often use phones with limited data
3. **Non-partisan** - Facts-only presentation without emotional framing
4. **Actionable** - Clear next steps and resources
5. **Accessible** - Works for everyone regardless of ability

## The Three Major Changes

### 1. Age Requirements Expanded
- **Before:** 18-54 years old
- **After:** 18-64 years old
- **Impact:** ~2.5 million people ages 55-64 newly affected

### 2. Parent Exemption Narrowed
- **Before:** Child under 18
- **After:** Child under 14
- **Impact:** ~500,000 parents with teenagers (14-17) lost exemption

### 3. Exemptions Removed
- Veterans (previously exempt)
- Homeless individuals (previously exempt)
- Foster youth ages 18-24 (previously exempt)

## Published Writing

- **Substack**: [SNAP Visualizations Case Study](https://joelmcclurg.substack.com/) *(paste final URL)*
- **LinkedIn**: [SNAP Visualizations Post](https://linkedin.com/) *(paste final URL)*

Both posts cover this project alongside the companion SNAP Restriction Waivers Map as a paired case study.

## Companion Project

- **SNAP Restriction Waivers Map**: [https://joelmcclurg.github.io/snap-restriction-waivers-visualization/](https://joelmcclurg.github.io/snap-restriction-waivers-visualization/)

An interactive scrollytelling visualization showing how 18 states are implementing new restrictions on SNAP purchases through approved waivers. The Substack post covers both projects together as a case study in data visualization for public policy.

## Testing

### Manual Testing Checklist
- [ ] All cards expand/collapse correctly
- [ ] Age calculator works (test ages: 17, 25, 57, 65)
- [ ] Children's age calculator works (test ages: 10, 15, 19)
- [ ] Visualizations render correctly
- [ ] Responsive on mobile (320px width)
- [ ] Responsive on tablet (768px width)
- [ ] Responsive on desktop (1920px width)
- [ ] Keyboard navigation works
- [ ] Screen reader labels present
- [ ] Links open in new tabs
- [ ] Page loads fast (< 3 seconds)

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] iOS Safari
- [ ] Chrome Mobile

## Deployment

This project is deployed to GitHub Pages:

**Live URL:** [https://joelmcclurg-personal.github.io/hr1-snap-work-requirements/](https://joelmcclurg-personal.github.io/hr1-snap-work-requirements/)

### Deploy Steps
1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Select source: Deploy from `main` branch, root directory
4. Wait 1-2 minutes for deployment
5. Visit live URL

## Contributing

This is an independent information resource. To suggest corrections or improvements:
1. Open an issue with details
2. Include source citations for any factual claims
3. Be specific about what needs to change and why

## License

This project is provided as a public service. Feel free to fork, adapt, and share.

## Contact

Created to help people understand SNAP work requirement changes. This is not affiliated with USDA or any government agency.

For questions about your SNAP benefits, contact your state SNAP office:
- [USDA State Directory](https://www.fns.usda.gov/snap/state-directory)
- Call 211 for local assistance
- [LawHelp.org](https://www.lawhelp.org/) for free legal aid

---

*Last updated: February 6, 2026*
