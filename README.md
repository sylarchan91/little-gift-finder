# Little Gift Finder

A personal, non-commercial gift inspiration prototype. Static HTML, CSS and JavaScript; no build, API credentials or external runtime dependencies.

## Live site
https://sylarchan91.github.io/little-gift-finder/

## Current functionality
- Match 12 editorial gift ideas by interest and a conservative budget ceiling.
- Prioritize the selected occasion; adapt guidance and card messages to the relationship.
- Discover a random matching idea and mark favorites during the current visit.
- Read source-linked relationship and gift-giving notes.
- Responsive layout, keyboard controls, native disclosure panels and privacy dialog.

The selections and saved markers are in-memory only. There is no account, analytics, checkout, affiliate program, live Etsy data or AI personality assessment. Broad USD budget estimates are editorial planning ranges, not current market prices. AI-created artwork illustrates a concept, not actual products.

## Local preview
Run `python3 -m http.server 8080` in this folder and open http://localhost:8080.

## Publishing
GitHub Pages publishes the root of `main`. The repository contains only this website. Do not add credentials or business research archives.

## Sources and interpretation
- Chan & Mogilner, Experiential Gifts Foster Stronger Social Relationships than Material Gifts: https://doi.org/10.1093/jcr/ucw067
- Gottman Institute, Small Actions Make Big Impacts: https://www.gottman.com/blog/small-actions-make-big-impacts/

The experience finding is a group-level result, not a validated prediction engine. Applying everyday attention to gift selection and relationship-stage tips is editorial interpretation, explicitly identified on the page.

## Planned Etsy integration
Subject to Etsy approval and applicable terms, a future backend may retrieve public listing titles, images, prices and shop information for buyer-facing discovery. No integration exists in this version. Any API secrets must stay server-side. Revisit hosting before commercial/affiliate use. Describe the public audience truthfully in the API application.
