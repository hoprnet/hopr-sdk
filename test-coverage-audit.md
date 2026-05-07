# SDK Test Coverage Audit

Date: 2026-05-07
Branch: hoprd-v4

## Summary

- **Spec coverage:** Every production endpoint under `src/api/` (excluding `adapter.ts`, `index.ts`, `*.spec.ts`) has a same-named `*.spec.ts`. **No missing specs.**
- **Spec orphans:** Every spec imports an endpoint function that still exists. **No orphans.**
- **Empty categories:** `src/api/messages/` and `src/api/tokens/` are empty directories (no production files, no specs needed).
- **Jest:** 31 suites, 285 tests, all passing.
- **TSC:** clean (exit 0).

## File-by-file matrix

| file                                   | docs status codes           | tested status codes             | gap                                | branch coverage | notes                        |
| -------------------------------------- | --------------------------- | ------------------------------- | ---------------------------------- | --------------- | ---------------------------- |
| account/getAddresses.ts                | 200,401,422                 | 200,403,422,500                 | docs-only: 401; spec-only: 403,500 | 100%            | spec uses 403 instead of 401 |
| account/getBalances.ts                 | 200,401,422                 | 200,401,403,422                 | spec-only: 403                     | 84.61%          | minor extra negative case    |
| account/withdraw.ts                    | 200,401,412,422             | 200,400,401,403,412,422         | spec-only: 400,403                 | 66.66%          | OK                           |
| channels/closeChannel.ts               | 200,400,401,404,412,422     | 200,400,401,404,412,422         | none                               | 100%            | exact parity                 |
| channels/fundChannel.ts                | 200,400,401,403,404,412,422 | 200,400,401,403,404,412,422     | none                               | 100%            | exact parity                 |
| channels/getChannel.ts                 | 200,400,401,404,422         | 200,400,401,404,422             | none                               | 75%             | exact parity                 |
| channels/getChannels.ts                | 200,401,422                 | 200,400,401,403,422             | spec-only: 400,403                 | 55.55%          | low branch cov               |
| channels/openChannel.ts                | 201,400,401,403,409,412,422 | 200,201,400,401,403,409,412,422 | spec-only: 200                     | 100%            | extra positive case          |
| checks/getMetrics.ts                   | 200,401,422                 | 200,400,401,403,422             | spec-only: 400,403                 | 66.66%          | OK                           |
| checks/isNodeEligible.ts               | 200,412,500                 | 200,400,412,500                 | spec-only: 400                     | 80%             | OK                           |
| checks/isNodeHealthy.ts                | 200,412                     | 200,400,412,500                 | spec-only: 400,500                 | 80%             | OK                           |
| checks/isNodeReady.ts                  | 200,412                     | 200,400,412,500                 | spec-only: 400,500                 | 80%             | OK                           |
| checks/isNodeStarted.ts                | 200,412                     | 200,400,412,500                 | spec-only: 400,500                 | 80%             | OK                           |
| configuration/getConfiguration.ts      | 200,401                     | 200,401                         | none                               | 100%            | exact parity                 |
| network/getAnnounced.ts                | 200,401,422                 | 200,401,422                     | none                               | 66.66%          | exact parity                 |
| network/getConnected.ts                | 200,401,422                 | 200,401,422                     | none                               | 66.66%          | exact parity                 |
| network/getGraph.ts                    | 200,401                     | 200,401                         | none                               | 50%             | low branch cov               |
| network/getMinimumTicketProbability.ts | 200,401,422                 | 200,401,422                     | none                               | 66.66%          | exact parity                 |
| network/getTicketPrice.ts              | 200,401,422                 | 200,401,422                     | none                               | 60%             | exact parity                 |
| node/getInfo.ts                        | 200,422                     | 200,400,401,403,422             | spec-only: 400,401,403             | 66.66%          | extra negatives              |
| node/getStatus.ts                      | 200,401                     | 200,401                         | none                               | 66.66%          | exact parity                 |
| node/getVersion.ts                     | 200,401                     | 200,400,401                     | spec-only: 400                     | 66.66%          | minor extra                  |
| peers/getPeer.ts                       | 200,400,401,422             | 200,400,401,403,422             | spec-only: 403                     | 66.66%          | OK                           |
| peers/pingPeer.ts                      | 200,400,401,404,408,412,422 | 200,400,401,403,404,408,412,422 | spec-only: 403                     | 66.66%          | OK                           |
| sessions/closeSession.ts               | 204,400,401,404,422         | 204,400,401,403,404,422         | spec-only: 403                     | 66.66%          | OK                           |
| sessions/getSessionConfig.ts           | 200,400,401,404,422         | 200,400,401,404,422,500         | spec-only: 500                     | 100%            | OK                           |
| sessions/getSessions.ts                | 200,400,401,422             | 200,400,401,422,500             | spec-only: 500                     | 100%            | OK                           |
| sessions/openSession.ts                | 200,400,401,409,422         | 200,400,401,403,409,422         | spec-only: 403                     | 75%             | OK                           |
| sessions/updateSessionConfig.ts        | 204,400,401,404,406,422     | 204,400,401,403,404,406,409,422 | spec-only: 403,409                 | 80%             | OK                           |
| tickets/getTicketStatistics.ts         | 200,401,422                 | 200,400,401,403,422             | spec-only: 400,403                 | 57.14%          | low branch cov               |
| tickets/redeemAllTickets.ts            | 202,400,401,404,422         | 202,400,401,403,404,412,422     | spec-only: 403,412                 | 66.66%          | OK                           |

## Adapter coverage

All 31 adapter methods are referenced in the corresponding spec files **except** for two adapter naming inconsistencies (the underlying endpoint functions are tested; only the adapter wrapper names diverge):

- `SessionsAdapter.OpenSession` (PascalCase, should be `openSession`) — underlying `openSession()` function is well-tested in `openSession.spec.ts`.
- `SessionsAdapter.getSessionsConfig` (extra "s", should be `getSessionConfig`) — underlying `getSessionConfig()` function is well-tested in `getSessionConfig.spec.ts`.

These are public-API naming bugs in the adapter, not test gaps. They are **flagged**, not fixed (renaming a public method is not a "trivial one-line addition").

## Branch coverage flags (<80%)

| file                                   | branch % |
| -------------------------------------- | -------- |
| account/withdraw.ts                    | 66.66%   |
| channels/getChannel.ts                 | 75%      |
| channels/getChannels.ts                | 55.55%   |
| checks/getMetrics.ts                   | 66.66%   |
| network/getAnnounced.ts                | 66.66%   |
| network/getConnected.ts                | 66.66%   |
| network/getGraph.ts                    | 50%      |
| network/getMinimumTicketProbability.ts | 66.66%   |
| network/getTicketPrice.ts              | 60%      |
| node/getInfo.ts                        | 66.66%   |
| node/getStatus.ts                      | 66.66%   |
| node/getVersion.ts                     | 66.66%   |
| peers/getPeer.ts                       | 66.66%   |
| peers/pingPeer.ts                      | 66.66%   |
| sessions/closeSession.ts               | 66.66%   |
| tickets/getTicketStatistics.ts         | 57.14%   |
| tickets/redeemAllTickets.ts            | 66.66%   |

The recurring uncovered branches (lines like 23/25/27/42/45) typically correspond to a `payload.timeout ?? this.timeout` style fallback or an `if (!response.ok)` early-exit that the specs do not deliberately exercise.

## Action items

- **Status-code parity gaps are minor and consistent**: most specs test more codes than the OpenAPI documents (extra negatives like 400/403/500). The only docs-only delta is **getAddresses 401 vs spec 403** — worth aligning so the spec exercises the documented `401 UNAUTHORIZED` path.
- **Adapter naming**: rename `SessionsAdapter.OpenSession` to `openSession` and `getSessionsConfig` to `getSessionConfig` (public-API change — not done here).
- **Branch coverage**: 17 files sit between 50% and 75% on branches. Most uncovered branches are `payload.timeout ?? this.timeout` ternaries; adding one `timeout` parameter to existing tests in each spec would lift these into the 80%+ bucket.
- Empty `src/api/messages/` and `src/api/tokens/` directories should be removed if intentionally deprecated.

## Final tooling status

- **Jest:** `Test Suites: 31 passed, 31 total | Tests: 285 passed, 285 total | Time: 9.69 s`
- **TSC:** `npx tsc --noEmit` — exit 0 (clean)

## Trivial fixes applied

None. No fix qualified as a one-or-two-line obvious addition — every gap is either:

1. A spec testing more codes than documented (not a gap, intentional defensive coverage), or
2. A branch-coverage shortfall requiring a new `timeout`-passing test case (not strictly one line), or
3. An adapter naming bug requiring a public-API rename (not trivial).
