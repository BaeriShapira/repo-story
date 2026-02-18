# Codebase Discovery Guide

Step-by-step instructions for analyzing any web project. Follow these in order.

---

## Step 1: Detect Framework & Tech Stack

Read `package.json` (or equivalent) and check dependencies:

| Dependency | Framework | Next Check |
|---|---|---|
| `next` | Next.js | `src/app/` dir → App Router; `pages/` dir → Pages Router |
| `react` (no next) | React | Check for `vite.config` (Vite) or `react-scripts` (CRA) |
| `vue` | Vue.js | Check for `nuxt.config.*` (Nuxt) or `vite.config` (Vite) |
| `nuxt` | Nuxt | Check version: v3+ uses `app.vue`, v2 uses `pages/` |
| `@angular/core` | Angular | Check `angular.json` for project structure |
| `svelte` | Svelte | Check for `svelte.config.*` (SvelteKit) |
| `astro` | Astro | Check `astro.config.*` |
| `gatsby` | Gatsby | Check `gatsby-config.*` |
| `@remix-run/react` | Remix | Check `remix.config.*` or `app/routes/` |

Also note:
- **Styling**: `tailwindcss` → Tailwind, `styled-components`, `@emotion`, `sass` → corresponding
- **State**: `redux`, `zustand`, `@tanstack/react-query`, `pinia`, `vuex`
- **Auth**: `next-auth` / `@auth/core`, `firebase`, `supabase`, `clerk`
- **Database**: `prisma`, `drizzle`, `typeorm`, `mongoose`, `@supabase/supabase-js`
- **AI**: `openai`, `@anthropic-ai/sdk`, `langchain`

Config files to check:
```
Glob: package.json, tsconfig.json, next.config.*, vite.config.*, nuxt.config.*, angular.json, svelte.config.*, astro.config.*
```

---

## Step 2: Extract Color Palette

Search these locations in priority order. Stop when you find a clear palette:

### Priority 1: CSS/Tailwind theme
```
Glob: **/globals.css, **/global.css, **/app.css, **/index.css
Grep: @theme|--color-|--primary|--accent
```
Look for `:root` blocks with CSS custom properties or Tailwind `@theme` blocks.

### Priority 2: Tailwind config
```
Glob: tailwind.config.*, tailwind.config.ts, tailwind.config.js
```
Look for `theme.extend.colors` or `theme.colors` objects.

### Priority 3: Theme/design token files
```
Glob: **/theme.*, **/colors.*, **/tokens.*, **/design-system.*, **/palette.*
```

### Priority 4: Sass/SCSS variables
```
Glob: **/_variables.scss, **/_variables.sass, **/variables.scss
Grep: \$primary|\$accent|\$brand
```

### Priority 5: CSS-in-JS theme objects
```
Glob: **/styled.*, **/ThemeProvider.*, **/theme.ts, **/theme.js
Grep: primary|accent|brand.*color
```

### Fallback: Color frequency analysis
```
Grep: #[0-9a-fA-F]{6}
```
Count occurrences across component files. The most frequent non-white/black/gray colors are likely the brand palette.

**Map extracted colors to these roles:**

| Role | What to look for |
|---|---|
| Primary | `primary`, `brand`, `main`, most-used accent color |
| Primary Light | Lighter variant or computed at +15% lightness |
| Primary Dark | Darker variant or computed at -15% lightness |
| Accent | `accent`, `secondary`, `highlight`, `cta` |
| Success | `success`, `green`, `positive`, `confirm` |
| Error | `error`, `danger`, `red`, `destructive` |
| Background | `bg`, `background`, `surface`, usually near-white |
| Text | `text`, `foreground`, `body`, usually near-black |

If light/dark variants aren't defined, compute them by adjusting the primary hex:
- Light: increase each RGB channel by ~30 (cap at 255)
- Dark: decrease each RGB channel by ~30 (min 0)

---

## Step 3: Map Pages & Routes

### Next.js App Router
```
Glob: **/app/**/page.tsx, **/app/**/page.jsx, **/app/**/page.ts, **/app/**/page.js
```
Directory structure = routes. `app/login/page.tsx` → `/login`.

### Next.js Pages Router
```
Glob: **/pages/**/*.tsx, **/pages/**/*.jsx
```
Exclude `_app`, `_document`, `_error`. File name = route.

### Vue / Nuxt
```
Glob: **/pages/**/*.vue, **/views/**/*.vue
```
Also check `src/router/index.*` for route definitions.

### Angular
```
Glob: **/app-routing.module.ts, **/*-routing.module.ts, **/app.routes.ts
```
Read route configuration arrays.

### Svelte / SvelteKit
```
Glob: **/routes/**/+page.svelte
```

### React (generic)
```
Grep: Route|createBrowserRouter|createRoutesFromElements
Glob: **/routes.*, **/router.*, **/App.tsx
```

**Build a route list** with format: `path → description (inferred from component name / content)`

If more than 20 routes are found, group by top-level path segment and note the count.

---

## Step 4: Catalog Key Components

### Find component directories
```
Glob: **/components/**/*.tsx, **/components/**/*.vue, **/components/**/*.svelte, **/components/**/*.jsx
```

### Categorize by directory structure:
- `components/ui/` → UI primitives (Button, Card, Input, Modal, Badge)
- `components/pages/` or `components/views/` → Page-level content
- `components/layout/` → Layout wrappers (Sidebar, Header, Footer)
- `components/shared/` or `components/common/` → Reusable shared components

### Read 3-5 representative components to understand visual patterns:
1. The main card/list-item component (hero element)
2. The primary button component
3. A form/input component
4. The main layout/nav component
5. Any distinctive feature component (compatibility ring, score badge, etc.)

Extract:
- **Card style**: Border radius, shadow, padding pattern
- **Button style**: Pill vs rounded-rect, size variants, color usage
- **Typography**: Heading sizes, weights, font family
- **Spacing**: Common padding/margin values
- **Icons**: SVG inline, icon library (Lucide, Heroicons, etc.)
- **Animations**: Framer Motion, CSS transitions, spring physics

---

## Step 5: Identify User Flows

Based on routes and components, infer the main user journeys:

### Common flow patterns:

**Consumer app** (social, marketplace, dating):
Landing → Auth → Profile Setup → Feed/Browse → Detail → Action → Success → Messages

**SaaS / Dashboard app**:
Landing → Auth → Dashboard → Create/Edit → List → Detail → Settings

**E-commerce**:
Landing → Browse/Search → Product Detail → Cart → Checkout → Confirmation

**Multi-role app** (e.g., buyer/seller, seeker/employer):
Identify role-specific routes and map separate flows per role.

### Suggest 2-3 flows to the user:
For each flow, list 5-8 screens that tell a complete story with a satisfying arc:
- Start: Entry point (landing or login)
- Middle: Core experience (the unique value prop)
- End: Successful outcome (match, purchase, message)

---

## Step 6: Build Discovery Summary

Compile everything into this format for Phase 2 presentation:

```
App: {name} — {tagline or description from package.json}
Framework: {framework} {version} + {styling} + {state mgmt}
Database: {ORM/DB}
Auth: {auth system}

Color Palette:
  ■ Primary:  {hex}
  ■ Accent:   {hex}
  ■ Success:  {hex}
  ■ Error:    {hex}
  ■ BG:       {hex}

Pages: {count} routes discovered
  - / (Landing)
  - /login (Authentication)
  - /dashboard (Main dashboard)
  - ... (list top 10)

Components: {count} components in {categories}
Key UI patterns: {card style}, {button style}, {distinctive features}

Suggested flows:
  1. {Flow name}: {Screen 1} → {Screen 2} → ... → {Screen N}
  2. {Flow name}: {Screen 1} → {Screen 2} → ... → {Screen N}
```
