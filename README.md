# Alphatech Computer Engineering & Technologies — Website

Phase 1 of the build: project foundation, brand theme, Navbar, Footer, and Homepage.

## Tech stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- lucide-react (icons)
- next/font (Space Grotesk, Inter, JetBrains Mono — loaded automatically, no manual font files needed)

## Getting started

You'll need **Node.js 18.18 or newer** installed, and a free [Neon](https://neon.com) Postgres database.

```bash
# 1. Install dependencies
npm install

# 2. Set up your environment file
# Copy .env.local.example, rename the copy to .env.local, and fill in:
#   - DATABASE_URL (from your Neon dashboard)
#   - NEXTAUTH_SECRET (generate with the command shown inside the file)
#   - ADMIN_EMAIL / ADMIN_PASSWORD (your own admin login — pick anything)

# 3. Push the database schema to Neon
npx prisma generate
npx prisma db push

# 4. Create your admin account
npx prisma db seed

# 5. Run the dev server
npm run dev

# 6. Open the site
# http://localhost:3000
```

Once running, log in at `/login` with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in
`.env.local` to reach `/admin`. Anyone who registers normally through `/register`
gets a regular customer account and lands at `/account`.

## Project structure

```
app/
  layout.tsx        Root layout: fonts, SEO metadata, wraps Navbar/Footer + AuthProvider
  page.tsx           Homepage
  globals.css        Tailwind directives + circuit-trace animation
  (auth)/
    login/page.tsx
    register/page.tsx
  account/page.tsx    Customer dashboard (protected — requires login)
  admin/page.tsx       Admin dashboard (protected — requires ADMIN role)
  api/
    auth/[...nextauth]/route.ts   NextAuth handler
    auth/register/route.ts         Registration endpoint
components/
  layout/
    Navbar.tsx          Now session-aware: shows account icon, links to /login or /account
    Footer.tsx
    AlphaMark.tsx
  home/                  Homepage sections (unchanged from Phase 1)
  account/
    SignOutButton.tsx
  providers/
    AuthProvider.tsx     Wraps the app so login state works everywhere
lib/
  constants.ts          Business info — edit this for contact/location changes
  prisma.ts              Database client
  auth.ts                 NextAuth configuration (roles, credentials login)
prisma/
  schema.prisma           Full database schema: users, products, orders, repairs, etc.
  seed.js                  Creates your first admin account
middleware.ts              Protects /account (any logged-in user) and /admin (admin only)
types/
  next-auth.d.ts           TypeScript types for session.user.role
public/
  images/                  Drop product photos and the real logo files here when ready.
```

## Swapping in your real logo

`components/layout/AlphaMark.tsx` has step-by-step instructions in its top comment.
Short version: save your icon-only logo as `public/images/logo-icon.png`, then replace
the component body with a `next/image` call — full code snippet is right there in the file.

## Phase 2 setup: database & accounts

This phase adds a real PostgreSQL database (via Neon) and a login/register system.

1. **Install the new dependencies** (Prisma, NextAuth, etc.):
   ```bash
   npm install
   ```

2. **Create your environment file.** Copy `.env.example` to a new file named `.env.local` in the project root, then fill in real values:
   - `DATABASE_URL` — paste your Neon connection string here.
   - `NEXTAUTH_SECRET` — any long random string (ask Claude to generate one if needed).
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the login you'll use as the site owner/admin.

   **Never commit `.env.local` or share it** — it's already excluded via `.gitignore`.

3. **Push the schema to your database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
   This creates all the tables (users, products, orders, repairs, etc.) in your Neon database.

4. **Create your admin account:**
   ```bash
   npx prisma db seed
   ```

5. **Run the site:**
   ```bash
   npm run dev
   ```
   - Visit `/register` to create a normal customer account, or
   - Visit `/login` and sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set — this account can reach `/admin`.

### What's now in the project
- `prisma/schema.prisma` — the full database schema (users, products, orders, repairs, appointments, reviews, messages, blog posts, coupons).
- `app/(auth)/login` and `app/(auth)/register` — customer-facing auth pages.
- `app/account` — customer dashboard (protected, requires login).
- `app/admin` — admin dashboard (protected, requires the ADMIN role).
- `middleware.ts` — enforces those protections automatically.



- ✅ Phase 1: Homepage, branding, layout
- ✅ Phase 2: Database (PostgreSQL + Prisma) and authentication
- Phase 3: Store/e-commerce pages (product catalog, cart, checkout)
- Phase 4: Payments (Paystack/Flutterwave)
- Phase 5: Repair booking system
- Phase 6: Customer dashboard (full version — orders, repair tracking, invoices)
- Phase 7: Admin dashboard (full version — manage products, orders, repairs)
- Phase 8: Blog, newsletter wiring, reviews, coupons
- Phase 9: Testing, SEO polish, deployment

Each phase plugs into this same project — no rebuild needed.

## Deployment (when ready)

This project deploys cleanly to **Vercel**:
1. Push this folder to a GitHub repository.
2. Import the repo at vercel.com.
3. Add the same environment variables from `.env.local` in Vercel's project settings.
4. Vercel auto-detects Next.js and deploys.

