<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# WedPlan — Project Guide for AI Agents

Read this file before changing anything. It records the agreed architecture for Assignment 9 (Category 004). The managed Next.js block above must stay in place; append below it.

## Project status

- Planning/design analysis is complete. Client implementation has not started; the server repo contains a starter Express + MongoDB boilerplate.
- This repository is the **client**. The Express API lives in the separate **server repo** at `../wed-plan-server` (local path: `C:\Users\User\Downloads\WD\A09\wed-plan-server`).
- Do not build large features in one pass. Work feature by feature, test, then commit.
- Requirements live in `docs/Assignment 9-Category_004.pdf` and `docs/A9_Common_Development_Guidelines.pdf`. The design source is `docs/WedPlan.fig` (2.2 MB Figma export; extract embedded photos, do not parse the binary).

## Product summary

WedPlan is a role-based wedding-services marketplace.

- **Customer**: browse/search/filter services, view details, request bookings, track status, cancel pending requests.
- **Vendor**: manage business profile, publish services (pending admin approval), manage availability, accept/reject booking requests, manage Free/Premium subscription.
- **Admin**: manage users (block/unblock), moderate services (approve/reject/activate/delete), view transactions read-only.

## Repositories and architecture

Two GitHub repos, as required by the assignment:

| Repo | Stack | Responsibility |
|---|---|---|
| this repo | Next.js 16 App Router, React 19, TS, Tailwind v4, shadcn (Base UI) | All UI, auth screens, session handling, API calls |
| `wed-plan-server` (exists) | Express 5, JavaScript ESM, native MongoDB driver, Better Auth (JWT plugin), Stripe, ImgBB | Auth, JWT/JWKS, business logic, validation, ownership/role checks, payments, uploads |

```
Browser → Next.js (Vercel) → next.config rewrites /api/* → Express (Render/Railway)
                                                             ├── Better Auth
                                                             ├── JWT middleware
                                                             ├── business APIs
                                                             ├── ImgBB upload
                                                             └── Stripe webhook (direct, raw body)
                                                                      ↓
                                                                 MongoDB Atlas
```

Rules:

- The client **never** connects to MongoDB and never holds server secrets.
- The server **never** renders UI.
- Browser traffic goes through Next `rewrites` for same-origin cookies and no CORS. The Stripe webhook is the only endpoint hit directly on the server URL.
- Better Auth owns the entire auth flow (email/password, Google, sessions, users). Its **JWT plugin** issues the token used by the Express business APIs; the session cookie only keeps the browser logged in and is exchanged for a fresh JWT via `authClient.token()`.
- Business APIs require `Authorization: Bearer <jwt>`, verified in Express against Better Auth's JWKS with `jose` (issuer/audience = Better Auth base URL). Never trust a decoded-but-unverified token.
- Never trust `customerId`, `role`, `vendorId`, prices, or payment status sent by the browser. Derive identity from the verified token and re-load the user from MongoDB.

### Server repo layout (existing)

Path: `../wed-plan-server` (sibling directory), JavaScript ESM (`"type": "module"`), Express 5.

```
wed-plan-server/
  index.js                 # app bootstrap, middleware, route mounting
  lib/env.js               # dotenv + exported env object
  lib/db.js                # MongoClient, db, collections
  models/booking.model.js  # current stub
  routes/booking.js        # placeholder bookings route
  middleware/              # empty; auth middleware goes here
```

- Current dependencies: `express@5`, `mongodb@7`, `cors`, `dotenv`. There is no dev script, no TypeScript, and no Better Auth yet.
- Keep JavaScript ESM unless the owner asks for a TS migration. Use `node --watch index.js` for development (add a `dev` script when touching `package.json`).
- Do not delete the existing bookings stub without replacing it with the real bookings module.
- New server code goes in `lib/`, `routes/`, `models/`, `middleware/`; add `services/` for Stripe/ImgBB and `scripts/` for seeds.
- Env is read once in `lib/env.js`; extend that file instead of reading `process.env` in routes. It currently hardcodes `DB_NAME = "wed-plan-db"` — read `process.env.DB_NAME` when extending it.
- `lib/db.js` exports the shared `MongoClient`, `db`, and collections. Better Auth must use the same client/database.

## Next.js 16 rules (this repo is not the version you remember)

- Read `node_modules/next/dist/docs/` before using a Next API. Relevant starting points: `01-app/02-guides/authentication.md`, `authentication-with-cache-components.md`, `backend-for-frontend.md`, `01-app/03-api-reference/03-file-conventions/proxy.md`, `route.md`, `dynamic-routes.md`, `01-app/02-guides/upgrading/version-16.md`.
- `middleware.ts` is deprecated → use `proxy.ts` only if an edge redirect is genuinely needed. Security still lives in the API and route guards.
- `params`, `searchParams`, `cookies()`, `headers()` are async. Use generated types: `PageProps<'/services/[id]'>`, `LayoutProps<'/'>`, `RouteContext<'/api/...'>`; `await params`.
- `cacheComponents: true` is enabled: uncached runtime data / `cookies()` outside `<Suspense>` is a build error. Keep auth-dependent and mutable data client-side with TanStack Query.
- Turbopack is default; there is no `next lint` (use `npm run lint` / ESLint CLI).
- React Compiler is enabled. Keep components pure; no conditional hooks.
- shadcn is configured as style **`base-nova`** using **Base UI**, not Radix. Only add components via the shadcn CLI; copied Radix snippets will not compile.

## Stack

**UI rule: shadcn is the component library.** Use shadcn components for every control (buttons, inputs, dialogs, tables, dropdowns, sheets, toasts, etc.). Do not add HeroUI, MUI, Chakra, DaisyUI, Ant Design, or hand-rolled clones of shadcn primitives. Add new primitives with the shadcn CLI against the existing `components.json` (`base-nova` / Base UI).

Installed client: Next 16.4.6, React 19.3, TypeScript strict, Tailwind 4.3, `@base-ui/react`, `lucide-react`, `tw-animate-css`, shadcn.

Add when needed (client): `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`, `sonner`, `motion`, `better-auth`, `date-fns`, `embla-carousel-react`.

Server installed: `express@5`, `mongodb@7`, `cors`, `dotenv`.
Server to add: `better-auth`, `jose`, `stripe`, `zod`, `helmet`, `morgan`, `multer`, `express-rate-limit`.

Do not add a second UI library, a CSS-in-JS library, Redux, Prisma, Mongoose, or a second auth system.

## Commands

Client (this repo):

```bash
npm run dev      # next dev (Turbopack)
npm run build
npm run start
npm run lint
```

Server (`../wed-plan-server`): currently `npm start` only (`node index.js`). Add `dev` (`node --watch index.js`), `seed`, and `seed:admin` scripts when the corresponding files exist. Run commands from the server directory, not this repo.

## Environment variables

Never commit `.env*` or real secrets. Client exposes only `NEXT_PUBLIC_*`.

- Client: `NEXT_PUBLIC_APP_URL`, `API_URL` (server-only rewrite destination).
- Server: `PORT`, `NODE_ENV`, `MONGODB_URI`, `DB_NAME`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `CLIENT_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `JWT_ISSUER`, `JWT_AUDIENCE`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PREMIUM_PRICE_ID`, `IMGBB_API_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`.

`BETTER_AUTH_URL` is the public auth origin the browser calls (the Next app origin when proxied); Better Auth uses it as the JWT issuer and audience by default. Override `JWT_ISSUER`/`JWT_AUDIENCE` only if intentional, and keep the Express verifier aligned. `CLIENT_URL` is the allowed browser origin used for `trustedOrigins`, CORS, and OAuth callbacks.

## Database (MongoDB Atlas)

Business collections: `services`, `bookings`, `transactions`. Plus the Better Auth `users` collection (configure `user.modelName = "users"`). Better Auth's `session`, `account`, `verification`, and `jwks` (created by the JWT plugin) are infrastructure — do not duplicate them and do not add extra business collections for the same information.

| Collection | Fields | Indexes |
|---|---|---|
| `users` | name, email, emailVerified, image, role, isBlocked, businessName, phone, location, description, website, subscriptionPlan, subscriptionExpiresAt, stripeCustomerId, stripeSubscriptionId, timestamps | email unique, role, isBlocked |
| `services` | vendorId, serviceName, category, description, price, location, images[], status, isActive, rejectionReason, deletedAt, timestamps | `{status,isActive,deletedAt,createdAt}`, `{vendorId,createdAt}`, `{category,price}` |
| `bookings` | serviceId, vendorId, customerId, eventDate, eventLocation, message, status, activeKey (unique sparse), respondedAt, cancelReason, timestamps | `{customerId,createdAt}`, `{vendorId,status,createdAt}`, `{serviceId,eventDate,status}`, unique sparse `activeKey` |
| `transactions` | vendorId, plan, amount (cents), currency, stripeSessionId, stripeSubscriptionId, stripeInvoiceId, status, createdAt, paidAt | unique `stripeSessionId`, unique sparse `stripeInvoiceId`, `{vendorId,createdAt}` |

Conventions:

- Use `ObjectId` references; validate IDs with `ObjectId.isValid`.
- Enums: service `pending|approved|rejected`; booking `pending|accepted|rejected|cancelled`; subscription `free|premium`; transaction `pending|paid|failed|refunded|expired`.
- `activeKey = customerId:serviceId:YYYY-MM-DD`, set only for pending/accepted bookings, unset on cancel/reject.
- Soft delete services via `deletedAt`; every public query filters `deletedAt: null`.
- Store event dates as UTC midnight; format for display with `date-fns`.
- Never store secrets or raw card data.

## Authentication and authorization (locked: Better Auth + JWT plugin)

Better Auth is the **only** authentication system and runs inside the Express server at `../wed-plan-server`. It owns users, credentials, Google OAuth, sessions, password hashing, and the JWT/JWKS endpoints. Do not add NextAuth, Clerk, Passport, a custom session system, or a second JWT issuer.

### Server side

- Use `better-auth` with the MongoDB adapter and the **existing shared `MongoClient`/`db`** from `lib/db.js`.
- Config in `lib/auth.js`: `baseURL: env.BETTER_AUTH_URL`, `secret: env.BETTER_AUTH_SECRET`, `trustedOrigins` including `env.CLIENT_URL` and the local dev origin, email/password enabled, Google provider, and `plugins: [jwt()]`.
- Mount Better Auth **before** `express.json()` because its handler needs the untouched request stream:
  `app.all("/api/auth/*splat", toNodeHandler(auth))` — Express 5 wildcard syntax, not `*`.
- Mount the Stripe webhook with `express.raw({ type: "application/json" })` **before** the global JSON parser; signature verification needs the raw body.
- JWT plugin:
  - `GET /api/auth/token` returns `{ token }` (client calls it via `authClient.token()`).
  - `GET /api/auth/jwks` returns the public keys. The plugin adds the `jwks` collection; never edit it manually.
  - Customize claims with `jwt({ jwt: { definePayload: ({ user }) => ({ id, email, role }) } })`; default expiry is 15 minutes.
  - Default issuer and audience are the Better Auth `baseURL`. Keep them aligned with `jwtVerify`.
- Verification middleware (`middleware/require-auth.js`):
  - `createRemoteJWKSet(new URL(`${env.BETTER_AUTH_URL}/api/auth/jwks`))` + `jwtVerify(token, JWKS, { issuer, audience })`.
  - Cache the JWK set; `jose` refetches when an unknown `kid` appears.
  - Reject missing, malformed, expired, or wrongly-signed tokens with **401**.
  - After verification, load the user from MongoDB and use the **database role**. The JWT role is a hint and may be stale. Reject `isBlocked` users with **403**.
  - Attach a sanitized `req.user` (id, email, name, image, role, plan) — never the full DB document.
- `requireRole("vendor" | "customer" | "admin")` composes after `requireAuth`.
- Ownership checks (`service.vendorId === req.user.id`, `booking.customerId === req.user.id`) belong in handlers, not middleware.
- The JWT plugin is explicitly **not a session replacement**: the session cookie remains the login state; the JWT exists only for the Express API.
- Do not add the `bearer` plugin for business APIs. It is only needed if Better Auth's own endpoints must accept a bearer session token.

### Client side

- `createAuthClient({ baseURL, plugins: [jwtClient()] })` from `better-auth/client`.
- After sign-in/sign-up/Google callback, call `authClient.token()` and keep the JWT in memory (React context/state). Do not persist it in `localStorage`.
- The API client adds `Authorization: Bearer <jwt>` to every business request. On 401, call `authClient.token()` once and retry; if that fails, sign out.
- On page reload, `useSession()` restores the user from the httpOnly cookie; fetch a new JWT immediately.
- `authClient.getSession` also exposes a `set-auth-jwt` response header as a fallback; prefer `authClient.token()`.
- Keep the navbar in sync with `useSession` and invalidate auth-dependent queries after login/logout.

### Sign-up / sign-in rules

- Sign-up fields: full name, email, password (min 6, one upper, one lower), optional profile image, role customer/vendor.
- A Better Auth user-create hook must reject `admin` (and any role other than customer/vendor) even if the client sends it. Admin accounts are created only by the seed script.
- Google users start with no role → `/onboarding` to choose customer/vendor once (or the documented fallback default).
- Login redirects by role: `/dashboard/admin`, `/dashboard/vendor`, `/dashboard/customer`.
- Blocking a user sets `isBlocked`, deletes their sessions, and the per-request DB check rejects still-valid JWTs.
- Profile updates use an explicit whitelist; role, isBlocked, plan, expiry, and Stripe fields are never client-writable.
- A client-side role guard is UX only; the API is authoritative.

## Business rules (must be enforced on the server)

1. Public listings/featured/details/booking require `status=approved`, `isActive=true`, `deletedAt=null`.
2. Pending/rejected/deleted services are visible only to the owning vendor and admins.
3. Only customers can create booking requests; vendors cannot book their own services and admins cannot book.
4. Service must still be approved + active when the booking is created.
5. Free plan: max 3 active services (approved + active + not deleted). Premium: unlimited. Enforce on create/activate.
6. Premium is granted only by a verified Stripe webhook. The success redirect never activates anything.
7. Vendor may accept/reject only pending requests for their own services; processed requests are immutable.
8. Customer may cancel only their own pending bookings.
9. Reject duplicate active requests for the same customer + service + event date.
10. Admin may approve/reject/activate/delete services but must never edit transaction records.
11. Vendors cannot modify other vendors' services/bookings; customers cannot read or modify other customers' bookings.
12. Images: jpg/png/webp, max 5 MB, magic-byte checked; ImgBB key stays on the server.
13. Event date must be today or later.
14. On Premium expiry, grandfather existing services but block new publishing beyond 3 until compliant.
15. Use transactions where a check-then-write race matters (service limit, duplicate booking).

## API conventions (server)

Envelope:

```json
{ "success": true, "data": {}, "meta": { "page": 1, "limit": 12, "total": 0, "totalPages": 0 } }
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "..." } }
```

- List params: `page`, `limit`, `q`, `status`, `category`, `location`, `minPrice`, `maxPrice`, `sort=price_asc|price_desc|newest`.
- Auth via Better Auth at `/api/auth/*`, including `/token` and `/jwks` for the JWT plugin.
- Status codes: 400 malformed, 401 unauthenticated/invalid or expired JWT, 403 wrong role/blocked/not owner, 404 missing, 409 duplicate/conflict, 422 validation, 429 rate limit, 500 unexpected.
- Public: `GET /api/health`, `/api/services`, `/api/services/featured`, `/api/services/categories`; `/api/services/:id` requires auth.
- Profile: `GET/PATCH /api/me`.
- Customer: `GET /api/customer/stats`, `POST /api/bookings`, `GET /api/bookings`, `GET /api/bookings/:id`, `PATCH /api/bookings/:id/cancel`.
- Vendor: `/api/vendor/profile`, `/api/vendor/services` (CRUD + `/availability`), `/api/vendor/bookings` (+ accept/reject PATCH), `/api/vendor/stats`, `GET /api/vendor/subscription`, `POST /api/vendor/subscription/checkout`.
- Admin: `/api/admin/stats`, `/api/admin/users` (+ `/:id`, `/:id/block`), `/api/admin/services` (+ status/availability/delete), `/api/admin/transactions`.
- Uploads: `POST /api/uploads/image` (auth), `POST /api/uploads/public` (rate-limited signup avatar).
- Payments: `POST /api/webhooks/stripe` (raw body, signature verified, idempotent).
- Never leak stack traces, Mongo errors, or secrets in responses.

## Frontend map

| Route | Access |
|---|---|
| `/`, `/services`, `/sign-in`, `/sign-up` | public |
| `/services/[id]` | authenticated (redirect to `/sign-in?next=...`) |
| `/dashboard` | redirect by role |
| `/dashboard/customer`, `/bookings`, `/settings` | customer |
| `/dashboard/vendor`, `/services`, `/services/new`, `/services/[id]/edit`, `/bookings`, `/subscription`, `/settings` | vendor |
| `/dashboard/admin`, `/users`, `/users/[id]`, `/services`, `/transactions` | admin |
| `/payment/success`, `/payment/cancel` | vendor |
| `/onboarding` | authenticated (Google role) |
| `loading.tsx`, `error.tsx`, `not-found.tsx` | — |

- Layout: public navbar + footer; dashboard shell with role-based sidebar and main content.
- Navbar must update immediately after auth changes; user dropdown shows name/image, Dashboard, Profile Settings, Logout.
- Every async surface needs loading, empty, and error states; every mutation needs a Sonner toast (never `alert()`).
- Use `next/image`; add ImgBB/Unsplash hosts to `images.remotePatterns`.
- Motion is client-only (`motion/react`), subtle section reveals, respect `prefers-reduced-motion`.
- Design language: ivory/cream background, deep plum primary, gold accent, serif display + sans body, rounded photo cards. Sample exact tokens from the Figma file.
- All buttons and links must work; avoid `href="#"`.

## Code conventions

- TypeScript strict; no `any`; no unused imports. Zod at every API boundary and form.
- Server derives `customerId`/`vendorId` from auth/service records, never from the request body.
- Consistent response shapes and centralized Express error handler.
- Keep components small and shared (`ServiceCard`, `StatusBadge`, `StatCard`, `EmptyState`, `Skeleton`, `DataTable`, `Pagination`).
- URL state for browse filters; debounce search ~300 ms.
- Money in transactions is integer cents; service prices are numbers with one display currency.
- Do not introduce unrequested features (reviews, favorites, chat, email verification, password-reset email, dark mode, CMS).

## Git and deliverables

- Minimum 20 meaningful client commits and 12 meaningful server commits; one feature per commit; no "update", "fix", or "changes" messages.
- Commit after each slice builds and runs.
- Never commit `.env*`, keys, or credentials.
- Each repo needs a README with: project name/description, features, stack, installation, local run, live link, repo links, env var list (names only).
- Admin credentials for evaluation are supplied outside the repo (submission notes) and seeded from env.

## Deployment

- Vercel (client) + Render/Railway (server) + Atlas. Deploy a skeleton early; do not leave deployment to the end.
- Configure Next rewrites `/api/:path*` → `API_URL`; keep the Stripe webhook direct to the server.
- Stripe test mode: recurring Premium price; register the webhook endpoint; use Stripe CLI locally.
- Google OAuth: exact callback URI matching the auth topology; authorized JS origins for both dev and prod.
- Better Auth/JWT: `BETTER_AUTH_URL` must be the same public origin used in the JWT `iss`/`aud`; `/api/auth/jwks` must be reachable from the Express process; test expired, tampered, and wrong-audience tokens.
- Verify after deploy: refresh on every private route, direct URL access across roles, blocked user, checkout success/cancel, webhook replay, mobile widths, CORS, cold-start behavior.

## Decisions locked

- **UI library**: shadcn (existing `base-nova` / Base UI config) is the only component library.
- **Auth**: Better Auth on the Express server owns the entire authentication process. The Better Auth **JWT plugin** issues tokens; Express verifies them against the JWKS endpoint with `jose`, then loads the user from MongoDB for role/blocked checks.
- **Server**: the separate repo already exists at `../wed-plan-server`, using JavaScript ESM, Express 5, and the native MongoDB driver.

## Pending decisions (do not silently lock in)

These still need the project owner's confirmation. Until confirmed, implement the recommended default and leave the choice documented:

1. Recurring monthly Premium (recommended) vs one-time 30-day purchase; Premium price.
2. "3 active services" definition and expiry behavior (recommended: approved+active; grandfather existing).
3. Duplicate-booking scope (recommended: per customer + service + date).
4. Google role onboarding (recommended: `/onboarding` when role is null).
5. Currency for service prices and Stripe.
6. Admin seed email/password.
7. Exact Figma tokens/fonts and canonical frames.

Non-blocking defaults: customer-only bookings; material service edits reset to pending; soft delete services; `isActive` only (no date calendar); event date today or later; no reviews/chat/email flows; server-side regex search + filters + sort + pagination; six fixed categories.

## Definition of done

- Auth → sign-up/sign-in/Google work through Better Auth; `authClient.token()` returns a JWT; protected APIs return 401 for missing/expired/tampered tokens; refresh and reload keep the user signed in; logout clears the session and JWT.
- Guest → details/booking redirects to sign-in and returns to the intended page.
- Customer → booking appears pending, duplicate blocked, cancel pending works, accepted cannot be cancelled.
- Vendor → service pending until approved, 3-service cap on Free, 4th allowed after Premium, accept/reject works, cannot touch others' data.
- Admin → approve/reject changes public visibility immediately; block revokes access; transactions are read-only.
- Payment → success page shows pending until webhook, then Premium; cancel leaves Free; replayed webhook is idempotent.
- Every dashboard route survives a hard refresh; blocked user gets 403; no console errors; responsive at mobile/tablet/desktop.
