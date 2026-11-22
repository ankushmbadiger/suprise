A mobile-friendly, browser-based pani puri birthday game built with Phaser 3 and Vite.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Use the browser's device toolbar or a phone on the same Wi-Fi to test touch controls.

## Build for deployment

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`. Deploy that folder to a static hosting provider such as Cloudflare Pages, Netlify, or Vercel.

## Game flow

Welcome → choose shell → choose 4, 5, or 6 puris → choose either **same flavour for every puri** or **customise every puri individually** → assemble the plate → vendor dialogue → serving → birthday screen.

In individual mode, each puri gets its own filling, chutney, and pani selection. In same-flavour mode, one set of choices is applied to all puris.

## Birthday reveal date

The birthday message is visible only on **23 November 2026**, based on the device's local date. On every other date, the game shows a return-on-the-day screen instead of the birthday message.

## Technical notes

No backend, account, API key, or database is required. Existing concept images are retained in `public/assets/concept/` for future art upgrades.
