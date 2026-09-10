# Little Gift Finder

A personal gift inspiration project: https://sylarchan91.github.io/little-gift-finder/

## Run

- `npm ci`
- `npm run dev`
- `npm test`
- `npm run build`

React with Vite, GSAP and Phosphor. GitHub Pages serves the generated `docs/` folder from `main`. Build before pushing. Images and Satoshi fonts are hosted locally with the site. The `.nojekyll` file in `public/` is copied into the deployment.

## Features

- Original concept imagery, an expanding gift gallery, example-scenario carousel, image scroll transitions and desktop story stacking. Reduced-motion users get the full content without animations.
- Twelve editorial concepts ranked by evidence, gift intent and relationship context after budget and exclusion filters.
- Exact-request priority, explanations and uncertainty; bounded session feedback; shortlist and hidden-item reset.
- Native dialog details, privacy/credits and honest planned Etsy integration information.

See [MODEL.md](MODEL.md) for the actual scoring rules and limits. Illustrations are not products for sale. USD planning estimates are not current seller prices. No live Etsy connection, accounts, checkout, affiliate links or analytics.

## Asset credits

Original AI-generated concept images. Satoshi by Indian Type Foundry via https://www.fontshare.com/fonts/satoshi (unmodified webfonts). Phosphor icons and GSAP are bundled from their official npm packages.

## Deployment

`npm run build` regenerates `docs`. Commit source, package lock, model documentation and the generated folder. Push `main`; GitHub Pages publishes `docs`. Never add credentials or unrelated business archives.
