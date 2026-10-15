# Trybe Marketing

**Connection with convenience.**

Trybe helps people discover relevant attendees, make mutual connections, and stay in touch before, during, and after an event. This repository is the public marketing site for attendees and event hosts.

## Status

This is the marketing site only. Sign-in, registration, profiles, connections and messaging live in the [`web`](https://github.com/Trybe-event/web) app and the [`api`](https://github.com/Trybe-event/api) service.

- Sample profiles, activity figures and feedback illustrate the product; they are not real results.
- Preview interactions use component state and reset on reload. The appearance preference is stored in the browser.
- `/organizer`, `/profile` and `/join` are placeholders until the web app is live; they will link to its routes.
- Features marked "coming later" (Connect AI, personalized sessions, carpool, virtual attendance, event discovery) are on the roadmap, not in the first release.

## Run locally

Requires Node.js 20.9 or newer.

```bash
git clone https://github.com/Trybe-event/marketing.git
cd marketing
npm ci
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command             | Purpose                    |
| ------------------- | -------------------------- |
| `npm run dev`       | Development server         |
| `npm run build`     | Production build           |
| `npm start`         | Serve the production build |
| `npm run lint`      | ESLint                     |
| `npm run typecheck` | TypeScript                 |
| `npm run format`    | Prettier                   |

## Structure

```text
app/
  page.tsx                 Marketing page
  layout.tsx               Root layout and metadata
  globals.css              Site styles and responsive layout
  community-effects.css    Community and response animations
  join/                    Sample event landing page
  organizer/               Organizer entry placeholders
  profile/                 Attendee entry placeholders
components/
  brand-logo.tsx           Trybe wordmark
  entry-page.tsx           Shared entry placeholder
  product-experience.tsx   Event code and Connect AI preview sections
public/                    Favicon
```

## Deployment

A standard Next.js app; deploy it to any Next.js host (for example Vercel) with the default build settings. No environment variables are required.

## Assets

Fonts load from Google Fonts and sample portraits from Unsplash, so the page needs network access to render them.

## Repositories

| Repository  | Responsibility                       |
| ----------- | ------------------------------------ |
| `marketing` | Marketing content and entry links    |
| `web`       | Organizer and attendee application   |
| `api`       | Go API, database migrations, workers |

Organizer and attendee accounts are always separate. That boundary is enforced by the API, not by the routes on this site.
