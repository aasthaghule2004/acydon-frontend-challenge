# Decisions & Trade-offs (Part 2: Premium Home Page)

## 1. Why this implementation strategy over the obvious alternative?
*(Note: Assuming "ingestion strategy" in the prompt applied to Part 1, I am answering for my UI/Architecture strategy).*

I chose **React + Vite + Tailwind CSS** built as a single-page client app. The obvious alternative was a heavy SSR framework like Next.js or Remix. However, the core requirement was a highly interactive, "wow" factor landing page with scroll-linked animations and Easter eggs. Next.js would have added unnecessary routing and server-side complexity for a single view. Vite allowed me to ship a polished, client-heavy interaction model in a fraction of the time, keeping the bundle size small and the focus entirely on the UI craft.

## 2. One trade-off made under the time limit, and what I’d do with a real week
**The Trade-off:** I implemented the scroll-reveal animations and the core visual metaphor (the glowing ember climbing the neural-network staircase) using raw `IntersectionObserver` and CSS transitions based on percentage states.
**With a real week:** I would integrate an animation orchestration library like **Framer Motion** or **GSAP**. Right now, the ember moves diagonally across the screen as an approximation of the path. With more time, I would mathematically bind the ember to the exact SVG `<path>` coordinates using `stroke-dashoffset` or GSAP's `MotionPathPlugin` so it flawlessly tracks the sharp corners of the staircase diagram. I would also add more sophisticated accessibility (a11y) support for users with `prefers-reduced-motion`.

## 3. Where I used AI tools, and what I personally verified/changed
**Where I used AI:** I used an AI coding assistant as a pair-programmer to rapidly scaffold the Vite project, generate the boilerplate for the `IntersectionObserver` hook, and flesh out the raw SVG path coordinates for the background graphic.

**What I personally drove and verified:**
- **The Design Restraint & Honesty:** I explicitly directed the AI *not* to generate fake testimonials, fake user counts, or "trusted by" logo farms. The copy (e.g., "Built with real code. Zero fake testimonials.") was a deliberate human choice to adhere to the core grading constraint.
- **The Visual Metaphor:** I concepted the idea of the "career staircase" and the interactive product demo. I verified and tweaked the CSS glassmorphism and the Konami Code Easter Egg logic to ensure they didn't feel cheap or overly noisy.
- **Responsive QA:** I personally verified the layout at 390px (mobile) and 1440px (desktop), ensuring the SVG didn't break horizontal scrolling and that the typography scaled correctly.
