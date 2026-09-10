# Recommendation model v0.2

This is a transparent editorial heuristic, not a psychological assessment or probability of satisfaction. No weights were learned from users or derived numerically from research.

## Pipeline

1. **Hard filter**: upper end of the concept's USD planning range must fit the budget; explicit booking/food exclusions and hidden IDs are enforced. A zero budget requires an upper bound of zero. Never use a lower bound to make an expensive concept appear affordable.
2. **Requested concept priority**: a user-selected exact concept requested by the recipient sorts first if eligible. If blocked, the UI explains the budget/exclusion conflict. General interest mentions are not treated as exact requests.
3. **Editorial score**: `40P + 25I + 15R + 10U + 7O + 3N + F - Risk`.
4. **Diversity rerank**: reduce candidate priority by 6 per already selected concept from the same category, until four suggestions are selected. An eligible specific request remains first.

## Components

- P: matching selected interests (0.8 for one, 1 for two), multiplied by evidence strength: guess 0.35; observed enjoyment 0.75; recipient-mentioned interest 1. Exact concept request uses 1. No selected matching interest means no preference points.
- I: selected intention belongs to a concept's editorial intent tags.
- R: 1 minus the amount by which concept intimacy exceeds the relationship setting, divided by 3. Intimacy tolerance is an editorial default: early dating/colleague 1; friend 2; long-term partner/family 3. It is not a measured attribute of the recipient.
- U: editorial usefulness assumption, never an actual product quality score.
- O: concept's occasion tags contain the chosen occasion.
- N: small editorial novelty component.
- F: max 6 points from saved concepts: same category +6, otherwise a shared interest +3. Applied on explicit “Refine my picks” or form submission. It is sender feedback, not stronger recipient evidence. Hidden items are omitted immediately.
- Risk: 10 per excess intimacy level; 12 for an experience when interests are unknown/unmatched or evidence is a guess, unless specifically requested.

Scores are internal ranking aids. No match percentages, demographic stereotypes, attachment types, MBTI, diagnoses, shipping estimates, seller quality or popularity scores are displayed or fabricated.

## UI behavior and limitations

Twelve editorial concepts use seven original illustrations. A result explains interest evidence, intent relevance, relationship intensity, feedback if present, and uncertainty. Cards disclose planning estimates and illustrative imagery. No live listings, prices, availability or shipping information are available. The prototype cannot enforce a delivery deadline, so it does not ask for one or suggest it has checked one. Currency is USD.

The user can review a shortlist, remove saves, hide candidates, refine and reset all session feedback. All state is in memory and disappears on reload. Exact wishes are limited to the existing concept menu; arbitrary natural-language extraction is not implemented.

## Reading behind the approach

- Chan & Mogilner, experiential gifts and relationship strength: https://doi.org/10.1093/jcr/ucw067
- Gottman Institute, responding to everyday bids for connection: https://www.gottman.com/blog/small-actions-make-big-impacts/

These inform the editorial direction, not the numerical weights. Group-level experience findings do not predict a particular recipient's response. Gift applications of everyday attention and relationship-stage limits are product interpretations, not validated clinical guidance.

## Validation

Run `npm test`. Cases verify strict budgets/exclusions, exact wishes, relationship/intent/evidence effects, experience uncertainty, bounded feedback, reset, finite scores and diversity integrity.
