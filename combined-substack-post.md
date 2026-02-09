# When the Policy Changes Faster Than the Explainer: Building Two SNAP Tools Without Writing Code

The morning H.R. 1 passed the House, I sat at my kitchen table reading through the SNAP provisions and doing math in my head. The work requirement age cap was going from 54 to 64. Parents would only be exempt if their youngest child was under 14, not 18. Veterans, people experiencing homelessness, foster youth aging out of the system — their exemptions were gone.

I kept thinking about the caseworkers and advocates I know who were going to have to explain these changes to real people. Not the policy summary version. The "does this affect me?" version. Someone who's 57 and just assumed they'd aged out of work requirements. A parent whose youngest just turned 14. A veteran who'd been told they were exempt.

This was the second time in a few months I'd had that same feeling — that urgent gap between "the policy changed" and "the people affected can understand what it means for them."

## The First Time: 18 States, 18 Different Definitions

The first time was back in late 2025, when I was trying to explain SNAP purchase restriction waivers to a colleague. By that point, 18 states had received USDA approval to restrict what could be bought with SNAP benefits. But the specifics varied wildly. Iowa ties restrictions to their tax code. Arkansas created five distinct categories. What Nebraska calls "soft drinks" isn't quite what Texas calls "sweetened drinks" or Virginia calls "sweetened beverages."

I wanted to show this variation — not just describe it in a policy brief that would sit in someone's inbox. So I opened Claude Code and described, conversationally, what I wanted: a scrollytelling map that walks through the waiver approvals chronologically and lets you click any state to see what they actually restrict.

An hour later, I had a working interactive visualization. D3.js map, scroll-triggered animations, clickable state details. I don't write D3.js. I've never used the Scrollama library that handles the scroll triggers. But I could describe what I wanted to see, and I could tell when the result was right or wrong because I understood the policy.

**[View the SNAP Restriction Waivers Map →](https://joelmcclurg.github.io/snap-restriction-waivers-visualization/)**

*The interactive version lets you scroll through the chronological rollout and click any state for detailed restriction information.*

![Screenshot: Map showing all 18 states with approved SNAP purchase restriction waivers, color-coded by implementation date](screenshot-waivers-map.png)

That project taught me something I hadn't expected. The hard part wasn't the technology. It was knowing what mattered. Knowing that the definition differences between states were the real story, not just the count of states. Knowing that advocates needed to see the timeline because implementation dates determine when their guidance materials need to be ready. The AI handled the code. The domain knowledge shaped what the code needed to do.

## The Second Time: Three Changes, Three Different Populations

So when H.R. 1 passed and I felt that same urgency, I already had a mental model for what to do. But this project was more complex than the waivers map. The work requirement changes aren't one story — they're three distinct changes affecting different populations:

**The age expansion** pushes work requirements from ages 18-54 to 18-64. That's roughly 2.5 million people ages 55-64 who are newly subject to requirements they weren't before.

**The parent exemption narrowing** changes the threshold from having a child under 18 to having a child under 14. If your youngest just turned 14, you've lost your exemption. About 500,000 parents are affected.

**The exemptions removed** — this is the one that hits hardest. Veterans, people experiencing homelessness, and foster youth ages 18-24 were previously exempt from work requirements. Those exemptions are gone.

A simple map wouldn't work here. People don't need a geographic view — they need to know which change affects them, and what it actually means for their situation. So I built something different: an interactive card-based explainer with three expandable sections, one for each change. Each card has a built-in calculator — enter your age, your family situation, and it tells you directly whether you're affected.

And because I kept thinking about caseworkers, I added shareable cards. A caseworker helping a 58-year-old client doesn't need to send them the whole explainer. They can share just the age expansion card with the specific information that's relevant.

**[Explore the H.R. 1 Work Requirement Changes Explainer →](https://joelmcclurg-personal.github.io/hr1-work-requirement-changes/)**

*The interactive version includes calculators for each change and shareable individual cards.*

![Screenshot: Card-based explainer showing the three major SNAP work requirement changes under H.R. 1](screenshot-hr1-cards.png)

## What I Learned Building Both

Building these two tools back to back clarified something for me about where the real barriers are — and aren't — in advocacy work right now.

The technical barrier is largely gone. I don't say that lightly. A year ago, building either of these would have required hiring a developer, writing a scope of work, going through revision cycles. Weeks or months of calendar time, and real money. Now I can describe what I want in plain language and iterate on it in an afternoon.

But the domain expertise barrier is higher than ever. And honestly, that's good news for people who do this work.

The waivers map works because I knew that definition variation between states was the central challenge for advocates. Not someone with general data visualization skills — me, someone who's spent years in food security work and knows what questions people actually ask.

The HR1 explainer works because I knew that a 58-year-old SNAP participant doesn't care about the legislative history or the CBO score. They care about one question: "Do I now have to meet work requirements?" The calculator answers that directly because I knew to build it that way.

AI tools can generate the code. They can't generate the judgment about what matters. That's the part that comes from years of working in a field, talking to the people affected, understanding what they actually need to navigate a system.

Your competitive advantage as an advocate was always your domain expertise. What's changed is that the distance between that expertise and a working, shareable tool has collapsed from months to hours.

## The Concerns I Take Seriously

I want to be honest about what makes me uncomfortable, because I think the AI enthusiasm in civic tech spaces sometimes glosses over real concerns.

**Accuracy matters more here than almost anywhere.** These tools deal with policy that directly affects whether people eat. If the age calculator gives someone the wrong answer, or if the waivers map shows the wrong restrictions for a state, the consequences aren't abstract. I spent significant time verifying every data point against primary sources — the actual text of H.R. 1, USDA FNS guidance documents, state waiver applications.

**These are communication tools, not legal guidance.** Both projects include clear language about what they are and what they aren't. The waivers map shows the policy landscape — it doesn't tell you whether a specific product is allowed in a specific store. The work requirements explainer helps you understand the changes — it's not a substitute for talking to a caseworker or benefits counselor.

**I worry about the failure mode.** The same speed that makes these tools possible also makes it possible to build something that looks authoritative but is wrong. A polished interactive visualization carries an implicit claim of accuracy that a rough policy brief doesn't. The presentation quality that AI tools enable can outrun the verification quality if you're not careful.

I don't have a clean answer to these concerns. I just think they need to be part of the conversation every time someone in the nonprofit space talks about using AI tools.

## Why This Matters for Nonprofits Right Now

Here's the timing reality that drives everything I just described: H.R. 1 was signed July 4, 2025. States have until April 2026 to implement the work requirement changes, with a 10-month phase-in period. The purchase restriction waivers are rolling out January through October 2026.

This is policy changing on a compressed timeline. The people affected need clear information now — not after a consultant engagement, not after a grant cycle funds a proper web development project.

The pattern I've stumbled into is this: when you already understand the policy, you can build a useful communication tool in hours instead of months. Not a perfect tool. Not a production application. But something that helps a caseworker explain changes to a client, helps an advocate understand the landscape, helps a person figure out whether they're affected.

Every nonprofit I know is sitting on domain expertise that could be translated into tools like these. The policy analyst who tracks state-by-state variations. The program director who knows exactly which questions clients ask at intake. The advocate who's mapped the gap between eligibility rules and real-world access.

That expertise is now directly translatable into interactive, shareable resources — without a development team, without a budget line item, without learning to code.

The organizations that figure this out are going to be able to respond to policy changes at the speed those changes happen. The ones that don't will keep producing PDF fact sheets that arrive after the implementation deadline.

## What's Next

I'll be presenting on AI tools for benefits navigation at the FRAC conference in April 2026. The conversation I want to have there isn't really about AI — it's about speed, about who gets to build tools, and about what happens when domain expertise becomes the bottleneck instead of technical skill.

If you're working on benefits access, food security, or any area where policy complexity is a barrier to the people the policy affects — I'd genuinely like to hear what you'd want to build. What's the tool you wish existed? What's the data you understand deeply that other people can't navigate?

Because the gap between "I understand this problem" and "I can show others what I see" is smaller than it's ever been. And for mission-driven work, that matters.

---

**Explore the interactive tools:**

- [SNAP Restriction Waivers Map](https://joelmcclurg.github.io/snap-restriction-waivers-visualization/) — 18 states, scroll-triggered animations, clickable state details
- [H.R. 1 Work Requirement Changes Explainer](https://joelmcclurg-personal.github.io/hr1-work-requirement-changes/) — Three expandable cards, built-in calculators, shareable individual sections

**Data sources:** [H.R. 1 full text](https://www.congress.gov/bill/119th-congress/house-bill/1), USDA Food and Nutrition Service, U.S. Census Bureau

*If you try building something with these tools, I'd love to hear about it — what you tried, what worked, what didn't. Leave a comment or reach out directly.*
