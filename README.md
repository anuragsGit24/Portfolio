# Portfolio (Production-Grade Personal Site)

This repo is a **portfolio engineered like a product**: it’s a fast, themeable Next.js application with performance-safe motion, a hardened contact path, GitHub activity integration, and an optional AI-driven personalization flow.

The goal isn’t “a pretty page.” The goal is to demonstrate how I design systems end-to-end: **clear boundaries, measurable performance, safe handling of secrets, and production deployment thinking**.

---

## 1) Project Overview

This portfolio is a **technical showcase** of:
- how I structure frontend systems with the same rigor as backend services,
- how I trade off animation/visual polish against runtime cost,
- how I handle environment-specific behavior (local vs preview vs production),
- how I design for failure modes (missing API keys, network variability, third-party dependency issues).

It’s intentionally built to be maintainable: the site is composed of isolated sections, shared UI primitives, and a small number of cross-cutting concerns (theme, motion preferences, personalization).

---

## 2) Tech Stack & Rationale

**Core runtime**
- **Next.js (App Router)**: routing + server/client split + deployment-friendly build output. Enables a clean separation between server actions (trusted boundary) and client UI.
- **React 18**: composable UI with predictable state, leveraging dynamic imports for expensive sections.

**Styling and UI**
- **Tailwind CSS**: constrained design tokens and rapid iteration without leaking one-off styles.
- **Radix UI primitives + shadcn/ui pattern**: accessible, unopinionated components with consistent behavior.
- **next-themes**: theme switching without flicker and with clear “source of truth” for light/dark.

**Motion**
- **Framer Motion**: controlled animation primitives; used with constraints and a reduced-motion strategy.

**Data & integrations**
- **GitHub activity**: showcases real engineering output; supports caching/limits via env-driven settings.
- **EmailJS (client-side)**: pragmatic contact delivery with public keys only; paired with spam controls.

**AI (optional feature)**
- **Genkit + Google Gemini plugin**: server-side personalization flow that consumes interaction signals and suggests highlights.

---

## 3) Architecture & Design Decisions

### Component structure
- **App entry**: `src/app/page.tsx` composes the page from section modules.
- **Sections**: `src/components/sections/*` are feature-level units (Hero, About, Skills, Projects, etc.).
- **UI primitives**: `src/components/ui/*` contains reusable, accessible building blocks.

### Rendering and boundaries
- The site uses **Next.js App Router** with **client components only where necessary** (e.g., motion, interactive forms).
- Heavy sections are **dynamically imported** to reduce initial JS and improve Time-to-Interactive.

### State management
- Local UI state stays local.
- Cross-section behavior (AI highlight + interaction tracking) lives in a **single context provider**: `src/context/portfolio-context.tsx`.
- The AI call is gated (interaction/time threshold) and designed to **fail gracefully**.

### Separation of concerns
- UI and styling are kept out of server logic.
- AI logic is isolated under `src/ai/*` and invoked via server actions (`src/app/actions.ts`).

---

## 4) Performance Optimization

This portfolio is designed to behave like a production app under real-world constraints.

**Animation constraints**
- Motion is used where it adds meaning (guidance, hierarchy), not everywhere.
- A `prefers-reduced-motion` path exists so accessibility does not regress due to animation.

**Rendering strategy**
- **Dynamic imports** for expensive sections to reduce first-load JS.
- Background effects are implemented with **CSS-first** patterns, avoiding expensive runtime filters.

**Static delivery / CDN**
- Next.js output is deployable to platforms that provide CDN distribution and immutable assets.

**Asset optimization**
- Remote images are whitelisted via `next.config.ts` `images.remotePatterns`.
- Skeleton fallbacks are used for dynamically loaded sections to keep perceived performance stable.

**Lighthouse evidence (recommended)**
Yes—adding a Lighthouse screenshot is useful if it reflects:
- the current main branch,
- a production build,
- and the same device/network profile.

A good pattern is keeping it under `public/metrics/` and referencing it from this README.

---

## 5) UX & Product Thinking

**Navigation clarity**
- The homepage is section-driven with predictable anchors and progressive disclosure.

**Accessibility**
- Reduced motion support.
- Form fields have labels, validation messages, and ARIA-friendly semantics.
- “Skip to content” patterns are present where appropriate.

**Responsive behavior**
- Sections are built mobile-first; layout scales without breaking hierarchy.
- Interactive elements keep adequate hit targets and spacing.

---

## 6) Security Considerations

**Environment variables and secrets**
- Sensitive tokens (e.g., GitHub token, AI API key) belong in `.env.local` and are never committed.
- Client-exposed variables are explicitly prefixed with `NEXT_PUBLIC_` (e.g., EmailJS public config).

**No secrets in the client**
- AI runs server-side (Genkit invoked via a server action). This keeps provider API keys off the client.

**Contact form protection**
- Input validation via Zod.
- Honeypot field to catch basic bots.
- Defensive trimming/sanitization of user input.

**Safe deployment practices**
- Separate environments (local/preview/prod) with distinct environment variables.
- Principle: “treat third-party APIs as unreliable” and always handle error paths.

---

## 7) Distributed & Production Environment

This repo is designed for modern immutable deployments.

**Vercel model (recommended)**
- **Immutable deployments**: each commit produces a uniquely versioned build.
- **CDN-backed static assets**: `public/*` and generated assets are distributed globally.
- **Environment separation**: Preview deployments can use different API keys/limits than Production.

**Other hosts**
- The repo also includes `apphosting.yaml`, making it compatible with Firebase App Hosting-style workflows.

---

## 8) Observability & Reliability

**Error handling**
- Server actions catch failures and return safe fallbacks.
- Client UX degrades gracefully when AI/GitHub integrations are unavailable.

**Operational resilience**
- Clear boundaries help isolate failures (e.g., AI key missing should not break the page).

> Note: the AI flow requires `GEMINI_API_KEY` or `GOOGLE_API_KEY`. Without it, personalization should be treated as an optional enhancement.

---

## 9) Developer Experience (DX)

**Project structure**
- `src/app/*`: routing and server actions
- `src/components/sections/*`: feature modules
- `src/components/ui/*`: reusable primitives
- `src/lib/*`: shared utilities + data
- `src/ai/*`: AI flows and Genkit wiring

**Maintainability**
- Small, composable components.
- Clear conventions for what runs on the server vs client.

**Scalability for future features**
- New sections can be added as independent modules.
- Additional integrations (e.g., blog, telemetry, backend contact API) fit naturally behind server actions.

---

## 10) Features Implemented

- **Theme system** (light/dark) using `next-themes`
- **Performance-safe animations** (with reduced-motion support)
- **Dynamic section loading** for better first-load performance
- **Contact system** with validation + honeypot spam defense
- **GitHub activity section** (token-driven integration)
- **AI personalization (optional)**: highlights projects/skills based on interaction signals

---

## 11) Future Improvements

If this were evolving like a long-lived production system:
- Move EmailJS to a **server-owned contact API** (rate limiting, abuse protection, audit logs).
- Add **real rate limiting** and caching on GitHub requests (edge cache + backoff).
- Add structured **analytics/telemetry** (performance budgets, error rates).
- Make AI personalization **observable** (trace IDs, guarded retries) and add explicit user opt-in.
- Tighten CI: enforce typecheck/lint in builds (currently `next.config.ts` is configured to ignore build errors).

---

## Performance Metrics: 

![Lighthouse report](public/metrics/lighthouse.png)

