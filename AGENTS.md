<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# WedPlan — Project Guide for AI Agents

Read this file before changing anything. It records the agreed architecture for Assignment 9 (Category 004). The managed Next.js block above must stay in place; append below it.

## Project status

- Planning/design analysis is complete. Implementation has not started.
- This repository is the **client**. The Express API belongs in a **separate server repository**.
- Do not build large features in one pass. Work feature by feature, test, then commit.
- Requirements live in `docs/Assignment 9-Category_004.pdf` and `docs/A9_Common_Development_Guidelines.pdf`. The design source is `docs/WedPlan.fig` (22 MB Figma export; extract embedded photos, do not parse the binary).

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
| `wed-plan-server` (to create) | Express.js, TypeScript, MongoDB driver, Better Auth, Stripe, ImgBB | Auth, business logic, validation, ownership/role checks, payments, uploads |

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
- Business APIs use `Authorization: Bearer <jwt>`; the Better Auth session cookie (httpOnly, first-party via the proxy) restores the session and mints new JWTs on refresh.
- Never trust `userId`, `role`, `vendorId`, prices, or payment status sent by the browser. Derive identity from the verified token and re-load the user from MongoDB.

## Next.js 16 rules (this repo is not the version you remember)

- Read `node_modules/next/dist/docs/` before using a Next API. Relevant starting points: `01-app/02-guides/authentication.md`, `authentication-with-cache-components.md`, `backend-for-frontend.md`, `01-app/03-api-reference/03-file-conventions/proxy.md`, `route.md`, `dynamic-routes.md`, `01-app/02-guides/upgrading/version-16.md`.
- `middleware.ts` is deprecated → use `proxy.ts` only if an edge redirect is genuinely needed. Security still lives in the API and route guards.
- `params`, `searchParams`, `cookies()`, `headers()` are async. Use generated types: `PageProps<'/services/[id]'>`, `LayoutProps<'/'>`, `RouteContext<'/api/...'>`; `await params`.
- `cacheComponents: true` is enabled: uncached runtime data / `cookies()` outside `<Suspense>` is a build error. Keep auth-dependent and mutable data client-side with TanStack Query.
- Turbopack is default; there is no `next lint` (use `npm run lint` / ESLint CLI).
- React Compiler is enabled. Keep components pure; no conditional hooks.
- shadcn is configured as style **`base-nova`** using **Base UI**, not Radix. Only add components via the shadcn CLI; copied Radix snippets will not compile.

## Stack

Installed: Next 16.4.6, React 19.3, TypeScript strict, Tailwind 4.3, `@base-ui/react`, `lucide-react`, `tw-animate-css`, shadcn.

Add when needed (client): `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`, `sonner`, `motion`, `better-auth`, `date-fns`, `embla-carousel-react`.

Server (planned): `express`, `mongodb`, `better-auth`, `stripe`, `jose`, `zod`, `cors`, `helmet`, `morgan`, `multer`, `express-rate-limit`, `dotenv`, `tsx`.

Do not add a second UI library, a CSS-in-JS library, Redux, Prisma, or Mongoose unless a concrete blocker is documented.

## Commands

Client (this repo):

```bash
npm run dev      # next dev (Turbopack)
npm run build
npm run start
npm run lint
```

Server (planned): `npm run dev`, `npm run build`, `npm run start`, `npm run seed`, `npm run seed:admin`.

## Environment variables

Never commit `.env*` or real secrets. Client exposes only `NEXT_PUBLIC_*`.

- Client: `NEXT_PUBLIC_APP_URL`, `API_URL` (server-only rewrite destination).
- Server: `PORT`, `NODE_ENV`, `MONGODB_URI`, `DB_NAME`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `CLIENT_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `JWT_ISSUER`, `JWT_AUDIENCE`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PREMIUM_PRICE_ID`, `IMGBB_API_KEY`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`.

## Database (MongoDB Atlas)

Business collections: `services`, `bookings`, `transactions`. Plus the Better Auth `users` collection (configure `user.modelName = "users"`). Better Auth's `session`, `account`, `verification`, and `jwks` are infrastructure — do not duplicate them and do not add extra business collections for the same information.

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

## Authentication and authorization

- Better Auth with MongoDB adapter, email/password, Google OAuth, `jwt` + `bearer` plugins.
- Sign-up fields: full name, email, password (min 6, one upper, one lower), optional profile image, role customer/vendor.
- **Role escalation guard**: a user-create hook must reject `admin` (and any role other than customer/vendor) even if the client sends it. Admin accounts are created only by the seed script.
- Google users start with no role → `/onboarding` to choose customer/vendor once (or the documented fallback default).
- Login redirects by role: `/dashboard/admin`, `/dashboard/vendor`, `/dashboard/customer`.
- Every protected request: verify JWT signature/exp/iss/aud with `jose` + JWKS → load user → reject if missing/blocked → check role → check ownership → attach `req.user`.
- Return 401 unauthenticated, 403 wrong role/blocked/not owner, 409 conflict, 422 validation.
- Blocking a user sets `isBlocked`, deletes their sessions, and the per-request DB check rejects still-valid JWTs.
- Profile updates use an explicit whitelist. Role, isBlocked, plan, expiry, and Stripe fields are never client-writable.
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
- Auth via Better Auth at `/api/auth/*`.
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
- Verify after deploy: refresh on every private route, direct URL access across roles, blocked user, checkout success/cancel, webhook replay, mobile widths, CORS, cold-start behavior.

## Pending decisions (do not silently lock in)

These were identified during planning and still need the project owner's confirmation. Until confirmed, implement the recommended default and leave the choice documented:

1. Create a separate `wed-plan-server` repo (recommended: yes, required by the rubric).
2. Better Auth on Express + Next proxy + JWT (recommended) vs auth inside Next vs direct CORS + bearer.
3. Recurring monthly Premium (recommended) vs one-time 30-day purchase; Premium price.
4. "3 active services" definition and expiry behavior (recommended: approved+active; grandfather existing).
5. Duplicate-booking scope (recommended: per customer + service + date).
6. Google role onboarding (recommended: `/onboarding` when role is null).
7. Currency for service prices and Stripe.
8. Admin seed email/password.
9. Exact Figma tokens/fonts and canonical frames.

Non-blocking defaults: customer-only bookings; material service edits reset to pending; soft delete services; `isActive` only (no date calendar); event date today or later; no reviews/chat/email flows; server-side regex search + filters + sort + pagination; six fixed categories.

## Definition of done

- Guest → details/booking redirects to sign-in and returns to the intended page.
- Customer → booking appears pending, duplicate blocked, cancel pending works, accepted cannot be cancelled.
- Vendor → service pending until approved, 3-service cap on Free, 4th allowed after Premium, accept/reject works, cannot touch others' data.
- Admin → approve/reject changes public visibility immediately; block revokes access; transactions are read-only.
- Payment → success page shows pending until webhook, then Premium; cancel leaves Free; replayed webhook is idempotent.
- Every dashboard route survives a hard refresh; blocked user gets 403; no console errors; responsive at mobile/tablet/desktop.
