# H.R. 1 (OBBBA) SNAP Work Requirements Visual Explainer - Project Notes

> **For future sub-agents:** This document captures the complete context, research, design decisions, and implementation plan for this visual explainer project. Use this as your primary reference.

---

## Project Overview

### What This Is
A visual explainer/infographic showing SNAP work requirement changes before and after H.R. 1 (OBBBA - One Big Beautiful Bill Act).

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

### What is H.R. 1 (OBBBA)?
The **"One Big Beautiful Bill Act"** signed July 4, 2025. A major reconciliation bill that included significant changes to SNAP work requirements among other provisions.

**Sources:**
- [Congress.gov H.R. 1 Text](https://www.congress.gov/bill/119th-congress/house-bill/1/text)
- [Propel SNAP Work Requirements Guide](https://www.propel.app/snap/snap-work-requirements-full-guide/)
- [USDA FNS OBBB Implementation Memo](https://www.fns.usda.gov/snap/obbb-implementation)

### SNAP Work Requirements Pre-H.R. 1 (Before July 2025)

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

### SNAP Work Requirements Post-H.R. 1 (After July 2025)

**Key Changes:**

| Category | Pre-H.R. 1 | Post-H.R. 1 |
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
- **Oct 3, 2025:** USDA enforcement and waiver implementation memos issued ([FNS memo](https://www.fns.usda.gov/snap/obbb-abawd-waivers-implementation))
- **Nov 1, 2025:** Most states began enforcing expanded work requirements ([FFESP](https://ffesp.org/usda-new-work-requirements-for-snap/), [NACo](https://www.naco.org/resource/hr-1-and-supplemental-nutrition-assistance-program-snap-what-counties-should-know))
- **Feb 1, 2026:** First benefit terminations (Nov + Dec + Jan = 3 ABAWD months)
- **Waivers:** CA (enforcement delayed to June 2026), NV (ended Jan 31), IL (ended Nov 2025), DC (early 2026), Guam & VI (unverified)

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
- Researched H.R. 1/OBBBA work requirements (web search, USDA, Propel sources)
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
   - Updated subtitle from "What you need to know about H.R. 1 (One Big Beautiful Bill Act)" to "Three major changes affecting millions of SNAP recipients"
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

### Session 5: Federal Definition Tooltips (February 5, 2026)

**Goal:** Add hover tooltips to exemption category names showing formal federal definitions from 7 CFR, so readers can see exactly what each legal term means.

**Fact-Check (completed before implementation):**
All Exemptions Removed card content verified against:
- 7 CFR 271.2 (homeless definition)
- 7 CFR 273.24 (foster youth, ABAWD rules)
- 7 CFR 273.7(b)(1) (pregnant, disabled exemptions)
- USDA FNS OBBB implementation guidance
- H.R. 1 legislative text (tribal member addition)

**Definitions sourced and applied:**

| Category | Federal Source | Citation |
|---|---|---|
| Veterans | Food and Nutrition Act §6(o), per FRA 2023 | Broader than 38 U.S.C. §101 — all discharge statuses |
| Homeless | 7 CFR 271.2 | Lacks fixed nighttime residence; shelter/halfway house/temp stay ≤90 days |
| Foster Youth (18-24) | 7 CFR 273.24(g) | In foster care on 18th birthday; eligible until 25th birthday |
| Pregnant | 7 CFR 273.7(b)(1) | Verified per State agency procedures |
| Disabled | 7 CFR 273.7(b)(1) | Receives disability benefits or medically certified unfit |
| Tribal Member | 25 U.S.C. §1603(13), added by H.R. 1 | Member of federally recognized Indian Tribe per IHCIA |

**Changes Made:**

1. **`css/styles.css`** — Added `.def-tooltip` class (~50 lines):
   - Dotted underline + `cursor: help` to signal hoverability
   - `::after` pseudo-element using `content: attr(data-tip)` for tooltip display
   - Dark tooltip box (#2d3748) with white text, 280px wide, rounded corners
   - `@media (hover: hover)` — tooltips only activate on hover-capable devices
   - `tabindex="0"` + `:focus` styles for keyboard accessibility (outline on focus)
   - Smooth opacity transition (0.15s)

2. **`js/visualizations.js`** — Exemptions table (lines ~266-306):
   - Wrapped each `<strong>` category name with `<span class="def-tooltip" tabindex="0" data-tip="...">`
   - Added **Tribal Member** row to the table (was previously missing):
     - Before HR1: ✗ Not Exempt
     - After HR1: ✓ Exempt
   - All 6 categories now have federal definition tooltips

3. **`index.html`** — Exemptions card bullet lists (lines ~148-173):
   - "Before H.R. 1" list: Veterans, Homeless individuals, Foster youth ages 18-24
   - "Exemptions That Still Apply" list: pregnant, disability, tribal member
   - Positive-change callout: tribal members mention
   - Total of 7 tooltip instances in HTML

**Technical approach:** Pure CSS — no JavaScript needed. Tooltip text stored in `data-tip` attribute and displayed via `::after` pseudo-element. Mobile-safe via `@media (hover: hover)` media query.

**Testing:**
- Hard refresh http://localhost:8002/
- Expand Exemptions Removed card
- Hover over any dotted-underline category name → tooltip appears with federal definition
- Tab through tooltips with keyboard → same tooltip appears on focus
- Resize to mobile width → tooltips don't appear (no hover capability)

**Status:** ✅ Implementation complete

---

### Session 6: Timeline & Waiver Date Corrections (February 5, 2026)

**Goal:** Fix 3 incorrect dates in the main timeline and update waiver end dates based on source verification.

**Errors Found (compared against USDA FNS memos, FFESP, NACo, state-level sources):**

| Milestone | Was (Wrong) | Corrected To | Source |
|---|---|---|---|
| USDA Guidance | Sept 30, 2025 | **Oct 3, 2025** | [FNS Waivers Memo](https://www.fns.usda.gov/snap/obbb-abawd-waivers-implementation) |
| State enforcement | Dec 1, 2025 | **Nov 1, 2025** | [FFESP](https://ffesp.org/usda-new-work-requirements-for-snap/), [NACo](https://www.naco.org/resource/hr-1-and-supplemental-nutrition-assistance-program-snap-what-counties-should-know) |
| First terminations | June 2026 | **Feb 1, 2026** | Math: Nov + Dec + Jan = 3 ABAWD months |

**Waiver corrections:**
- California: June 30, 2026 → **Jan 31, 2026** ([CA Food Banks](https://www.cafoodbanks.org/abawd/))
- Illinois: June 30, 2026 → **Nov 2025** (already ended; [IL DHS](https://www.dhs.state.il.us/page.aspx?item=175082))
- Nevada: June 30, 2026 → **Jan 31, 2026** ([FNS response](https://fns-prod.azureedge.us/sites/default/files/resource-files/nv-abawd-response-fy2025.pdf))
- DC: June 30, 2026 → **~early 2026** (approx; [DC DHS](https://dhs.dc.gov/page/snap-work-requirements))
- Guam & VI: Kept at June 30, 2026 (unverified, conservative)

**Note on legal fluidity:** H.R. 1 changed waiver criteria to require >10% unemployment. USDA attempted to terminate all "lack of sufficient jobs" waivers by Nov 2, 2025. A federal court partially reversed this. State Exceptions box rewritten to avoid over-specific dates given legal uncertainty.

**Files Modified:**
1. `data/requirements.json` — Timeline dates, waiver dates, metadata dates
2. `index.html` — Timeline items, aria-label, State Exceptions box, last updated
3. `js/visualizations.js` — D3 events array, scale domain, aria-label
4. `PROJECT_NOTES.md` — Implementation Timeline section, this session entry

**Status:** ✅ All corrections applied

---

### Session 7: Timeline Corrections Round 2 — Full Fact-Check (February 5, 2026)

**Goal:** Deep fact-check of all timeline dates against multiple authoritative sources. Remove USDA Guidance dot to simplify to 3 events. Fix major California waiver error.

**Sources consulted:**
- FRAC (Food Research & Action Center) — [Q&A blog post, Oct 10 2025](https://frac.org/blog/qa-how-does-the-new-snap-time-limits-policy-affect-you-what-states-and-families-need-to-know)
- CBPP (Center on Budget and Policy Priorities) — [Sep 10 2025 analysis](https://www.cbpp.org/research/food-assistance/many-low-income-people-will-soon-begin-to-lose-food-assistance-under); [Implementation timeline](https://www.cbpp.org/research/federal-budget/implementing-the-harmful-republican-megabill-a-timeline)
- USDA FNS — [OBBB landing page](https://www.fns.usda.gov/obbb); [ABAWD Waivers Memo](https://www.fns.usda.gov/snap/obbb-abawd-waivers-implementation); [ABAWD Exceptions Memo](https://www.fns.usda.gov/snap/obbb-abawd-exemptions-implementation)
- State sources — IL DHS, CA Food Banks, NY OTDA, ABC News

**Key corrections:**

| Item | Was | Corrected To | Why |
|---|---|---|---|
| USDA Guidance dot | Shown on timeline | **Removed** | Simplified to 3 dots per user decision |
| Timeline scale end | March 31, 2026 | **Feb 1, 2026** | Last dot is the right edge of the scale |
| California waiver | "Ended Jan 31, 2026" | **"Enforcement delayed until June 2026"** | FRAC/CA Food Banks confirm CA chose to delay enforcement until June 1, 2026. Three counties (Colusa, Imperial, Tulare) retain waivers through Oct 2026 |
| Nevada note | "Partial waiver approval ended Jan 31" | **"Statewide waiver expired Jan 31, 2026"** | CBPP confirms statewide |
| State Exceptions box | Inline text format | **Structured `<ul>` list** | Better readability |

**First Terminations date rationale:**
- CBPP says some could be cut as early as January 2026 (non-waiver states, Sept recertification)
- FRAC says March 2026 for waiver states
- We chose **February 2026** as the middle-ground date representing the first wave of terminations

**Files Modified:**
1. `js/visualizations.js` — Removed USDA Guidance event, changed scale domain end to Feb 1
2. `index.html` — Rewrote State Exceptions box with `<ul>` list and corrected CA info
3. `data/requirements.json` — Removed `usda_guidance` entry, fixed CA waiver to June 2026, updated NV note
4. `PROJECT_NOTES.md` — Updated Implementation Timeline, added this session entry

**Status:** ✅ All round-2 corrections applied

---

*Last updated: February 5, 2026*
