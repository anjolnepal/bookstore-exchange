# BookSwap — Clickable Prototype

A single-file HTML/CSS/JS prototype for **BookSwap**, a marketplace to buy new books and exchange old ones. Built for Phase 1 (Design & Architecture) to validate flows, IA, and visual direction before the Next.js build.

## Status

Static mock — no backend, no database, no real auth or payments. All data lives in in-memory JS arrays and resets on page reload.

## Run it

Open `prototype-1.html` directly in a browser. No build step, no dependencies, no server required.

## What's included

- **Buy flow:** Home → Browse → Book Detail → Cart → Checkout (mock) → Order Confirmation → Order History
- **Exchange flow:** Exchange listings → Listing Detail → Request Exchange → owner Accept/Decline → status updates on both sides
- **Auth (simulated):** Login/Register just flip a `loggedIn` flag — no real credential check. Auth-gated actions redirect to `/login` and return to the original page after "logging in."
- **Account area:** Dashboard, Orders, Listings, Incoming Requests, Sent Requests, Profile
- Responsive layout (desktop nav collapses to a hamburger menu on mobile)
- Empty states (empty cart) and a styled 404 page

## What's intentionally not real

- No persistence — nothing is saved to a database or `localStorage`
- No real payment processing (checkout is a mock form)
- No file upload (photo picker on "New Listing" is decorative)
- No password/session security — "Log In" just sets a flag

## Structure

Everything lives in one file for portability:
- `<style>` — design tokens (CSS variables) and component styles
- `DATA` constants — mock `BOOKS`, `LISTINGS`, `REQUESTS_*`, `ORDERS`
- `STATE` — current page, params, cart, login state
- `PAGES` — one render function per route (mirrors the app's planned URL structure)
- A single click-delegated event handler drives navigation (`data-nav`) and actions (`data-action`)

## Reference docs

Built to match `Requirements.md` (functional/non-functional requirements, data schema) and `sitemap.md` (routes, nav, user flows) from the same project.

## Next step

Once flows are validated here, rebuild as the real Next.js app per `sitemap.md`'s App Router folder structure, backed by MongoDB.

[Open Website](prototype.html)
