# Kurukshetra — Blockchain Battlefield (Page 1)

A dark, cinematic, futuristic landing page for **Kurukshetra**, a battle-royale
game with a blockchain identity. Frontend only — no backend, wallet, or real
blockchain logic is wired up.

## Stack

- React 19 + Vite
- Plain CSS (no UI framework) with a small token system in `src/index.css`
- No external runtime dependencies beyond React — animations are done with
  CSS keyframes/transitions and `IntersectionObserver`, kept deliberately
  light so the page stays fast

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

## Project structure

```
src/
  App.jsx                 # assembles the page, gates the intro animation
  index.css                # design tokens (color/type/spacing) + shared button/reveal styles
  components/
    IntroAnimation.jsx/css  # the center-point → battlefield → letter reveal intro
    Navbar.jsx/css          # sticky glass nav + mobile hamburger drawer
    Battlefield.jsx/css     # reusable CSS-drawn cinematic backdrop (used by Hero + CTA)
    Hero.jsx/css
    Stats.jsx/css           # animated stat counters (industry numbers)
    WhyKurukshetra.jsx/css  # Battle / Mine / Earn cards
    Gameplay.jsx/css        # Drop In → Survive & Mine → Earn Real Value timeline
    Community.jsx/css       # social channel buttons
    CTA.jsx/css             # closing cinematic call-to-action band
    Footer.jsx/css
    Icons.jsx                # inline SVG icon set (social + gameplay icons)
  hooks/
    useReveal.js             # IntersectionObserver scroll-reveal hook
    useCountUp.js             # animated number counter hook
```

## Replacing placeholder content

- **Social links** — every WhatsApp/X/Telegram/Discord/YouTube `href` is a
  placeholder (`wa.me/00000000000`, `x.com/kurukshetra`, etc.). Search for
  `SOCIALS` / `CHANNELS` in `Navbar.jsx`, `Community.jsx`, and `Footer.jsx`
  and swap in the real URLs.
- **Battlefield artwork** — the hero and closing CTA backgrounds are drawn
  entirely in CSS (`Battlefield.jsx/css`) so the page never depends on a
  missing image file. To use real key art instead, drop a file into
  `public/assets/` and pass it in:

  ```jsx
  <Battlefield variant="hero" image="/assets/hero-bg.jpg" />
  ```

  The photo renders as a base layer underneath the existing gradient/particle
  treatment, so the composition doesn't need to change.
- **Stats** — the three industry numbers live in `Stats.jsx` (`STATS` array).
  Update the `target` values if the figures change; the count-up animation
  picks up the new numbers automatically.

## Notes

- The intro animation runs once per page load only (state-gated in
  `App.jsx`) — it never replays on scroll or section changes.
- `prefers-reduced-motion` is respected globally (`index.css`) and with a
  dedicated simplified path inside the intro animation itself.
- Deploy `dist/` (after `npm run build`) to any static host — Vercel,
  Netlify, GitHub Pages, Cloudflare Pages, etc. Ready to push to GitHub as-is.
