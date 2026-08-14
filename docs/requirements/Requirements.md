# Requirements Document
### Phase 1  — Design & Architecture

---

## 1. Purpose

This document defines what BookSwap must do (functional requirements), how well it must do it (non-functional requirements), and the data it must store, so the team can move from planning into design and build with a shared, agreed scope. It also finalizes the field-level database schema left open after Phase 0.

---

## 2. Stakeholders & User Roles

| Role | Description |
|---|---|
| **Guest** | Unauthenticated visitor. Can browse books and exchange listings, cannot purchase or list. |
| **Registered User (Buyer)** | Logged-in user who buys new books. |
| **Registered User (Exchanger)** | Logged-in user who lists, browses, and requests book exchanges. Same account type as Buyer — every user can do both. |
| **Admin** *(stretch goal, not MVP)* | Manages catalog, moderates exchange listings, views orders. Only build if time allows in Weeks 13–14. |

Note: there is only one account type (`User`). "Buyer" and "Exchanger" are behavior modes, not separate roles which keeps auth simple and matches the single `Users` collection already planned.

---

## 3. Functional Requirements

Each requirement is tagged **[MVP]** (must exist for the app to be demoable and gradeable as a complete two-feature product) or **[Post-MVP]**. 

*See Section 3.5 for the consolidated MVP scope.*

### 3.1 Authentication (shared foundation)
- FR-1 **[MVP]**: A user can register with email + password (via NextAuth.js credentials or an OAuth provider.
- FR-2 **[MVP]**: A user can log in and log out.
- FR-3 **[MVP]**: A logged-in user's session persists across page reloads.
- FR-4 **[MVP]**: Unauthenticated users attempting to buy, list, or request an exchange are redirected to login.

### 3.2 Buy New Books (user's ownership)
- FR-5 **[MVP]**: Any visitor can browse a paginated/scrollable catalog of new books.
- FR-6 **[MVP]**: Any visitor can view a single book's detail page (cover, title, author, price, description).
- FR-7 **[MVP]**: Any visitor can search/filter the catalog.
- FR-8 **[MVP]**: A logged-in user can add a book to a cart.
- FR-9 **[MVP]**: A logged-in user can view/edit their cart (change quantity, remove item).
- FR-10 **[MVP]**: A logged-in user can check out via **mock checkout** (no real payment processor) and receive an order confirmation.
- FR-11 **[MVP]**: A logged-in user can view their past orders (order history page).
- FR-12 **[Post-MVP]**: The system decrements available stock (or otherwise reflects purchase) on successful mock checkout. For MVP, `stock` is a cosmetic "in stock" display only and does not block checkout.

### 3.3 Exchange Old Books (friend's ownership)
- FR-13 **[MVP]**: A logged-in user can create an exchange listing (title, author, condition, description, photo via Cloudinary, optional "wanted in return" note).
- FR-14 **[MVP]**: Any visitor can browse/search exchange listings.
- FR-15 **[MVP]**: Any visitor can view a single exchange listing's detail page.
- FR-16 **[MVP]**: A logged-in user can request an exchange on another user's listing.
- FR-17 **[MVP]**: The listing owner can view incoming requests and **accept** or **decline** each one.
- FR-18 **[MVP]**: Once accepted, the listing is marked unavailable/closed to further requests.
- FR-19 **[MVP]**: A logged-in user can view their own listings and their status (open / pending / closed).
- FR-20 **[MVP]**: A logged-in user can view exchange requests they've sent and their status.
- FR-21 **[Post-MVP]**: A logged-in user can delete/cancel their own listing if no request has been accepted on it.

### 3.4 Cross-cutting / Shared
- FR-22 **[MVP]**: Consistent site-wide navigation and header/footer across all pages (already scaffolded in `page.js`).
- FR-23 **[MVP]**: Responsive layout — usable on mobile, tablet, and desktop.
- FR-24 **[MVP, basic version]**: Basic error states — empty catalog, empty cart, failed checkout, no listings found, no requests found. Deeper edge-case handling and polished empty-state illustrations are Post-MVP.
- FR-25 **[MVP, basic version]**: Basic loading states while data fetches from MongoDB. Skeleton loaders / shimmer polish are Post-MVP.

---

## 3.5 MVP Scope Summary

The MVP is the smallest version of BookSwap where **both core features work end-to-end with a real database**, not mocked data — this is the bar for "the app actually does the two things the project promises," independent of visual polish.

### MVP = these three user journeys, fully working
1. **Account:** register → log in → session persists → log out.
2. **Buy:** browse catalog → view book detail → add to cart → edit cart → mock checkout → order confirmation → see it in order history.
3. **Exchange:** create a listing → browse/view listings → request an exchange → owner sees the request → owner accepts or declines → listing closes on accept → both sides see the correct status in their own account pages.

If all three journeys work against real MongoDB data with the existing nav/responsive shell, the MVP is done — everything else is refinement.

### Explicitly deferred past MVP (build after the three journeys work, time permitting)
| Item | Why it's deferred |
|---|---|
| Genre/price filters on Browse & Exchange (FR-7 partial) | Title/author search alone proves the search pattern; filters are additive UI, not core logic. |
| Stock blocking at checkout (FR-12) | Cosmetic "in stock" badge is enough to demo; real inventory logic adds edge cases (race conditions, 0-stock UI) without changing the grading story. |
| Delete/cancel own listing (FR-21) | The accept/decline loop already proves the exchange workflow; cancel is a straightforward CRUD add-on once the schema and API routes exist. |
| Polished error/loading states (FR-24/25 beyond basics) | A visible "no results" message and a basic spinner satisfy MVP; skeleton loaders and illustrated empty states are visual polish. |
| Admin panel, Flutter companion app, formal book-for-book matching | Already flagged as stretch/out-of-scope in Sections 1 and 7 — unchanged by this MVP pass. |

### How this maps to the Extended Timeline
- **Weeks 5–12 (feature sprints):** build exactly the MVP-tagged FRs for each owner's feature — resist scope creep into Post-MVP items during these sprints.
- **Weeks 13–14 (Integration & Polish):** pick up the Post-MVP table above, in priority order, only after both MVP journeys are verified working together end-to-end.
- **Weeks 15–16 (Hardening & Report):** no new features — MVP + whatever Post-MVP items fit are what ships.

---

## 4. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Reasonable Lighthouse performance score by Week 13–14 polish pass (target: 80+, stretch: 90+). No hard real-time requirement. |
| **Accessibility** | Semantic HTML, sufficient color contrast (Tailwind default palette should satisfy this), alt text on book covers/photos, keyboard-navigable nav and forms. Checked in the Week 13–14 accessibility pass. |
| **Security** | Passwords never stored in plaintext (handled by NextAuth.js). Environment variables (Mongo URI, Cloudinary keys, NextAuth secret) never committed to the repo — `.env.local` in `.gitignore`. |
| **Reliability** | Live Vercel deployment must stay in sync with `main` — every merged PR should deploy cleanly. |
| **Usability** | "Picture perfect" polish is an explicit project goal — visual consistency (spacing, color, typography) driven by the Design Lead's Figma system, not ad hoc per-page styling. |
| **Maintainability** | Feature-vertical code ownership (Buy vs. Exchange) with shared components (e.g., `BookCard`) kept in `app/components/` to avoid duplication. |
| **Browser support** | Latest Chrome, Firefox, Safari, Edge. No legacy browser support required (academic project). |

---

## 5. Data Requirements — Draft Field-Level Schema

This resolves the open Phase 1 item: field-level schema for the five planned collections.

### `Users`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `name` | String | |
| `email` | String | unique, indexed |
| `passwordHash` | String | if using credentials auth |
| `image` | String (URL) | optional, Cloudinary |
| `createdAt` | Date | |

### `Books` (catalog — new books for sale)
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `title` | String | |
| `author` | String | |
| `description` | String | |
| `price` | Number | |
| `coverImageUrl` | String | Cloudinary URL |
| `stock` | Number | decremented on mock checkout |
| `genre` | String | optional, for filtering |
| `createdAt` | Date | |

### `Orders`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `userId` | ObjectId (ref `Users`) | |
| `items` | Array of `{ bookId, title, price, quantity }` | snapshot at purchase time |
| `total` | Number | |
| `status` | String | e.g. `"confirmed"` (mock checkout — no pending/failed states needed) |
| `createdAt` | Date | |

### `ExchangeListings`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `ownerId` | ObjectId (ref `Users`) | |
| `title` | String | |
| `author` | String | |
| `condition` | String | e.g. `"like new"`, `"good"`, `"worn"` |
| `description` | String | |
| `photoUrl` | String | Cloudinary URL |
| `wantedInReturn` | String | optional free-text |
| `status` | String | `"open"` \| `"pending"` \| `"closed"` |
| `createdAt` | Date | |

### `ExchangeRequests`
| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `listingId` | ObjectId (ref `ExchangeListings`) | |
| `requesterId` | ObjectId (ref `Users`) | |
| `message` | String | optional note from requester |
| `status` | String | `"pending"` \| `"accepted"` \| `"declined"` |
| `createdAt` | Date | |

---

## 6. Constraints (carried over from project scope)

- No real payment gateway — mock checkout only.
- JavaScript only, no TypeScript.
- Free-tier services only (MongoDB Atlas M0, Cloudinary free, Vercel free).
- Timeline: 16 weeks, feature-vertical ownership (user = Buy, friend = Exchange).

---

## 7. Out of Scope

Fully out of scope for the whole project (not just MVP — these are not planned even in the Weeks 13–16 polish window unless time is unusually generous):

- Real payments/checkout.
- Admin moderation panel (stretch only).
- In-app messaging between exchange participants (a `message` field on the request covers the minimum; a full chat thread is out of scope).
- Shipping/logistics for exchanges (assume users arrange handoff themselves — this is an academic project, not a real marketplace).
- Companion Flutter mobile app (flagged only as a late stretch goal).
- Formal book-for-book exchange matching (owner picking from requester's own listings) — free-text "wanted in return" only.

Items deferred *specifically* from MVP but still planned for the polish phase (filters, stock blocking, listing cancellation, polished empty/loading states) are tracked separately in Section 3.5, not here — they're expected to ship, just not in the first working version.

---

## 8. Open Questions (need a decision before Phase 1 is fully closed)

1. **Auth method:** Email/password credentials via NextAuth, or an OAuth provider (Google)? Credentials is more self-contained; OAuth is less code but adds a Google Cloud setup step.
2. **Stock handling:** Should `Books.stock` block checkout at 0, or is stock just cosmetic ("in stock" badge) for this academic project? Affects FR-12 complexity.
3. **Exchange matching:** Is a single "wanted in return" free-text field enough, or should exchanges support formal book-for-book matching (owner picks from requester's own listings)? Current schema assumes free-text only — simpler build, less "smart" matching.
4. **Team name:** still unresolved from Phase 0 — not a blocker for development but needed before README/report finalization.

---

## 9. Acceptance Criteria

Two gates, in order:

1. **MVP gate (end of Week 12):** all **[MVP]**-tagged requirements from Section 3 are met, and the three user journeys in Section 3.5 work end-to-end against real MongoDB data (not mocked). This is the minimum bar before Integration & Polish (Weeks 13–14) begins.
2. **Full requirements gate (end of Week 15):** each functional requirement (FR-1 through FR-25), including Post-MVP items picked up during polish, is verifiable against the existing **Definition of Done checklist** in `Extended Timeline - Online Bookstore.md` for its owning feature (Buy New Books or Exchange Old Books).

If time runs short between these gates, the MVP gate is the non-negotiable one — Post-MVP items in Section 3.5 are cut in the priority order listed there before any MVP item is cut.
