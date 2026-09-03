# Saksham — Futuristic Full-Stack Portfolio

A production-minded portfolio platform built with Next.js App Router, TypeScript, Tailwind CSS, MongoDB + Mongoose, Auth.js credentials, Zod, Framer Motion and Nodemailer.

## Included

- Original dark futuristic visual system with hand-drawn accents.
- Responsive home page, project archive, about, skills, experience, services, blog and contact pages.
- MongoDB persistence for projects, posts, messages, admin user and aggregate analytics.
- Auth.js / NextAuth credentials login for `/admin/*`.
- CMS dashboard for projects + posts.
- Contact inbox with message status changes.
- Optional SMTP notification for contact submissions.
- Aggregate page-view analytics stored as daily counters.
- Custom loading + 404 states, reveal animations, scroll progress and interactive cursor.
- Demo content automatically used when the database is empty; `npm run seed` persists it.

## Local setup

1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env.local` and fill in MongoDB + auth values.
3. `npm install`
4. `npm run seed` (optional — the public site also has demo fallbacks)
5. `npm run dev`
6. Open `http://localhost:3000`
7. Admin: `http://localhost:3000/admin/login`

The initial admin credentials come from `ADMIN_EMAIL` and `ADMIN_PASSWORD`. On first successful login, the password is stored as a bcrypt hash in MongoDB.

## Vercel

Add all environment variables from `.env.example` to the Vercel project. Use a MongoDB Atlas database and set `NEXT_PUBLIC_SITE_URL` to the deployed URL.

## Customization

The fastest edits are in `lib/site-data.ts`, `app/page.tsx`, and the `public/project-*.svg` assets. For live CMS updates, use the admin dashboard after MongoDB is connected.
