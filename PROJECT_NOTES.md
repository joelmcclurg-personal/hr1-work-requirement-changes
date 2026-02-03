# HR1 (OBBBA) SNAP Work Requirements Visual Explainer - Project Notes

> **For future sub-agents:** This document captures the complete context, research, design decisions, and implementation plan for this visual explainer project. Use this as your primary reference.

---

## Project Overview

### What This Is
A visual explainer/infographic showing SNAP work requirement changes before and after HR1 (OBBBA - One Big Beautiful Bill Act).

### Inspiration Project
Based on the approach used for the **SNAP Restriction Waivers** scrollytelling visualization:
- Interactive D3.js visualization with scroll-triggered animations
- Comprehensive PROJECT_NOTES.md for running documentation
- Vanilla JavaScript (no build tools)
- Fully responsive design
- Clear narrative progression
- Deployed to GitHub Pages

### Approach Pattern Learned from Previous Projects
1. **Running notes document** (this file) - captures all context, decisions, changes
2. **Data compilation first** - understand the policy changes thoroughly
3. **Design for clarity** - policy changes should be immediately understandable
4. **Progressive disclosure** - reveal information at appropriate pace
5. **Multiple narrative sections** - guide users through the changes
6. **Mobile-first responsive** - works on all devices

---

## Phase 1: Research Context ✅

### What is HR1 (OBBBA)?
The **"One Big Beautiful Bill Act"** signed July 4, 2025. A major reconciliation bill that included significant changes to SNAP work requirements among other provisions.

**Sources:**
- [Congress.gov HR1 Text](https://www.congress.gov/bill/119th-congress/house-bill/1/text)
- [Propel SNAP Work Requirements Guide](https://www.propel.app/snap/snap-work-requirements-full-guide/)
- [USDA FNS OBBB Implementation Memo](https://www.fns.usda.gov/snap/obbb-implementation)

### SNAP Work Requirements Pre-HR1 (Before July 2025)

**General Work Requirements:**
- Register for work, accept job offers, participate in SNAP E&T programs
- Exempt if working 30+ hours/week or earning $217.50+/week

**ABAWD (Able-Bodied Adults Without Dependents) Requirements:**
- **Age range:** 18-54
- **Time limit:** 3 months of benefits in 36-month period unless meeting work requirements
- **Work requirement:** 80 hours/month of work, training, or volunteer activities
- **Parent exemption:** ANY dependent child under 18
- **Other exemptions:** Veterans, homeless individuals, foster youth ages 18-24

**Waivers:**
- States could request waivers for areas with insufficient jobs
- More flexible criteria

### SNAP Work Requirements Post-HR1 (After July 2025)

**Key Changes:**

| Category | Pre-HR1 | Post-HR1 |
|----------|---------|----------|
| **Age range** | 18-54 | **18-64** (10-year expansion) |
| **Parent exemption** | Child under 18 | **Child under 14** (4-year reduction) |
| **Veterans** | Exempt | **No longer exempt** |
| **Homeless** | Exempt | **No longer exempt** |
| **Foster youth (18-24)** | Exempt | **No longer exempt** |
| **Waiver threshold** | Discretionary/"insufficient jobs" | **10% unemployment rate** (much stricter) |

**New exemptions added:**
- Tribal members (Indian, Urban Indian, California Indian per IHCIA definitions)

### Implementation Timeline

- **July 4, 2025:** Bill signed, effective immediately
- **Sept 30, 2025:** Target for detailed USDA guidance
- **Dec 1, 2025:** Most states began enforcement checks
- **Dec 2025-2026:** Enforcement hits at recertification (6-12 month cycles)
- **June 2026:** First possible month for benefit terminations
- **Exceptions:** CA, DC, Guam, IL, NV, Virgin Islands have waivers delaying into 2026

---

## Phase 2: Design Approach ✅

### REVISED APPROACH: "Information Design Over Narrative"

**Core Insight:** This is a reference tool, not a story. Primary audience is people on SNAP who need to quickly understand if they're affected and what they need to do.

**Format:** Modular card-based design (not scrollytelling)

**Why This Approach:**
- **Digestible:** Three major changes, not seven sections to scroll through
- **Actionable:** Each card links to "Am I affected?" tools and next steps
- **Easy to understand:** Clear before/after comparisons, no metaphors
- **Mobile-first:** People on SNAP often accessing on phones with limited data/time
- **Non-partisan:** Just facts, numbers, dates - no emotional framing
- **Shareable:** Each card can be shared independently on social media
- **Respectful of cognitive load:** Let people find their situation fast (CTRL+F)

### Structure

**Hero Section:**
```
SNAP Work Requirements Changed in 2025
What you need to know

[Am I Affected? Take 2-min quiz →]
```

**Three Major Changes (Expandable Cards):**

**Card 1: Age Requirements Expanded**
- **Summary:** 18-54 → 18-64 (~2.5M people ages 55-64 affected)
- **Visualization:** Overlapping bar chart showing old rule vs. new rule
- **Expand for:** Before/after comparison, "Am I in this age range?" tool, timeline
- **Data needed:** SNAP participants by age (USDA data)

**Card 2: Parent Exemption Narrowed**
- **Summary:** Child under 18 → Child under 14 (~X00K parents of teens affected)
- **Visualization:** Child age timeline showing exempt vs. not exempt periods
- **Expand for:** Before/after comparison, "How old are your children?" calculator
- **Data needed:** SNAP households with children by age breakdown

**Card 3: Exemptions Removed**
- **Summary:** Veterans, Homeless, Foster Youth (~X00K lost protection)
- **Visualization:** Before/after matrix table (checkmarks showing what changed)
- **Expand for:** Details on each category, population sizes, what remains exempt
- **Data needed:** Veterans on SNAP, homeless on SNAP, foster youth on SNAP (by age 18-24)

**Timeline Section:**
- July 2025 (signed) → Dec 2025 (states enforce) → June 2026 (first terminations)
- Interactive: "Select your state to see your timeline" (note state waiver exceptions)

**What Happens Next Section:**
- What counts as meeting the requirement (80 hrs/month breakdown)
- Documentation you'll need (paystubs, verification forms)
- Where to get help (state SNAP offices, legal aid)
- When this applies to you (recertification cycles)

**Sources & Methodology:**
- All data sources cited with links
- USDA guidance documents
- Explanation of estimates and methodology

---

## Phase 3: Implementation Plan

### Technical Approach
**Simpler than previous projects** - no scrollytelling, just card-based layout:
- Vanilla JavaScript (no build tools)
- D3.js for specific visualizations (age bars, timeline)
- CSS Grid for card layout
- Responsive CSS (mobile-first, cards stack on small screens)
- Minimal animations (card expand/collapse only)

### File Structure
```
hr1-snap-work-requirements/
├── index.html                 # Main structure with card layout
├── css/
│   └── styles.css            # Card grid, responsive breakpoints
├── js/
│   ├── data.js               # Requirements data with SOURCES
│   ├── visualizations.js     # D3 charts (age bars, timeline, matrix)
│   ├── quiz.js               # "Am I affected?" decision tree
│   └── cards.js              # Card expand/collapse interactions
├── data/
│   └── requirements.json     # All comparison data with citations
├── PROJECT_NOTES.md          # Running documentation (this file)
└── README.md                 # Technical documentation
```

### Design Specifications

**Color Palette (Non-partisan, accessible):**
- Primary: Navy blue (#2c5282) for headers
- Before: Medium gray (#718096) - neutral
- After: Dark blue (#2d3748) - emphasis without red/negative
- Highlights: Teal (#319795) for interactive elements
- Background: White/light gray for cards
- Text: Dark gray (#1a202c) for readability

**Typography:**
- Headers: Clear sans-serif (Inter or system font)
- Body: Readable at small sizes (16px minimum)
- Data: Tabular figures for numbers

**Accessibility:**
- WCAG AA contrast ratios
- Keyboard navigation for all interactions
- Screen reader labels for visualizations
- Reduced motion support (no auto-animations)

---

## Session Log

### Session 1: Initial Planning (February 3, 2026)
- Read previous project documentation (SNAP waivers, food system infographic)
- Identified running notes pattern from food system PROJECT_NOTES.md
- Created plan file
- Researched HR1/OBBBA work requirements (web search, USDA, Propel sources)
- Launched Plan agent for strategic analysis (initially recommended scrollytelling)
- User provided critical reframing: "Make it a reference tool, not a story"
- Revised to modular card-based information design approach
- Defined data verification requirements (check and double-check all numbers)
- User confirmed: "I love this. I fist pumped it feels so right."
- Plan approved and ready to implement

### Session 2: Implementation (February 3, 2026)
- Created project directory structure
- Initialized git repository
- Created PROJECT_NOTES.md
- Implemented all core files:
  - ✅ `data/requirements.json` - Complete data with sources and methodology notes
  - ✅ `index.html` - Full structure with hero, 3 cards, timeline, what happens next, sources
  - ✅ `css/styles.css` - Mobile-first responsive design with accessibility features
  - ✅ `js/data.js` - Data loader with error handling
  - ✅ `js/cards.js` - Card expand/collapse + age/children calculators
  - ✅ `js/visualizations.js` - D3.js visualizations (age bars, parent timeline, exemptions table, timeline)
  - ✅ `js/quiz.js` - "Am I Affected?" decision tree with 4 questions
  - ✅ `README.md` - Complete documentation with testing checklist
  - ✅ `.gitignore` - Standard ignores for web project
- Local testing on port 8001 - page loads successfully
- Initial git commit created
- GitHub remote configured

**Current Status:** ✅ Core implementation complete, ready for deployment

**Next Steps:**
1. Create GitHub repository (needs to be done via web UI)
2. Push code to GitHub
3. Enable GitHub Pages
4. Test live deployment
5. Mobile device testing
6. Accessibility testing with screen reader
7. Cross-browser testing
8. Create social media preview images (optional)

**Testing Notes:**
- Local server running on http://localhost:8001
- HTML structure verified (title, headers render correctly)
- All files committed to git
- Ready to push to origin

### Session 4: Design Refinement - Remove Quiz CTA (February 3, 2026)

**User Feedback:**
- Remove "Am I Affected?" quiz button from hero section
- Focus entirely on shareable cards as primary content
- User: "the shareable cards are what I'm after"

**Changes Made:**

1. **index.html:**
   - Removed quiz CTA button from hero section (lines 17-19)
   - Updated subtitle from "What you need to know about HR1 (One Big Beautiful Bill Act)" to "Three major changes affecting millions of SNAP recipients"
   - Removed entire quiz modal HTML (lines 278-286)
   - Removed quiz.js script tag from page (line 307)

2. **README.md:**
   - Updated Features section to remove quiz mention
   - Changed description to "Age and family calculators (embedded in cards)"
   - Updated project structure to mark quiz.js as "(archived - not currently used)"
   - Removed quiz-related testing items from checklist

3. **PROJECT_NOTES.md:**
   - Added Session 4 documentation

**Files Kept:**
- `js/quiz.js` - Archived in repository for reference, but not loaded or used

**What Stays:**
- ✅ Three expandable cards (main feature)
- ✅ D3.js visualizations in each card
- ✅ Age calculator inside Age Requirements card
- ✅ Children's age calculator inside Parent Exemption card
- ✅ Timeline visualization
- ✅ "What Happens Next" section with resources

**Design Rationale:**
- Cleaner, more focused page with cards as immediate primary content
- No competing CTAs in hero
- Aligns with core purpose: creating shareable visual explainers
- Calculators still available within relevant cards

**Status:** ✅ Changes complete, ready to commit and test

---

*Last updated: February 3, 2026*
