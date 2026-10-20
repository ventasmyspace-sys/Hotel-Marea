# Codebase Map

npm workspaces monorepo at `/home/${username}/websites/${sandboxId}/public_html`. The web app ships standalone. Call `enable_pocketbase_integration` to add a database, or `enable_api_server_integration` to add an Express backend — each tool appends its own `## apps/<service>` section to this file.

## apps/web (React + Vite + Tailwind + shadcn/ui, port 3000)

Located at apps/web/. Run: `cd apps/web && npm run dev` (auto-started by the sandbox supervisor).
src/main.jsx — entry point, mounts <App />
src/App.jsx — React Router, all routes defined here
src/index.css — Tailwind theme, CSS variables, luxury hotel typography and colors
src/pages/HomePage.jsx — "/" route, hero section with animated heading, CTA, availability checker preview
src/pages/AboutPage.jsx — "/about" route, hotel story, amenities, team, advertising slots
src/pages/GalleryPage.jsx — "/gallery" route, photo and video gallery with lightbox
src/pages/ContactPage.jsx — "/contact" route, contact form, map, external booking links
src/components/Layout.jsx — header with nav, footer with Booking/TripAdvisor links, advertising sections
src/components/AvailabilityChecker.jsx — interactive date picker, room availability lookup, Booking.com redirect
src/components/ScrollToTop.jsx — resets scroll on route change
src/components/ui/ — shadcn/ui primitives — import from `@/components/ui/<name>`, do not edit the files
src/data/site.js — hotel metadata, room types, sample availability data, external links
src/hooks/use-mobile.jsx — mobile breakpoint detection
src/hooks/use-toast.js — toast notifications
src/lib/utils.js — cn() Tailwind class merge
vault/wiki/skills/design/SKILL.md — frontend craft, styling, typography, motion, and shadcn policy for UI surfaces.
apps/web/plugins/session-journal/ — infrastructure, DO NOT edit. Vite dev plugin injects the browser session journal client; events go over HMR (`import.meta.hot.send('session-journal:event', …)`); the plugin arranges persistence under `vault/temp/SESSION_JOURNAL.md`.
Routes: / → HomePage, /about → AboutPage, /gallery → GalleryPage, /contact → ContactPage
