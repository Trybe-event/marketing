# Trybe Marketing

**Connection with convenience.**

Trybe helps people discover relevant attendees, make mutual connections, and stay in touch before, during, and after an event. This repository is the public marketing site for attendees and event hosts.

## Status

This is the marketing site only. Sign-in, registration, profiles, connections and messaging live in the [`web`](https://github.com/Trybe-event/web) app and the [`api`](https://github.com/Trybe-event/api) service.

Required before contributing: [Trybe MVP](docs/trybe-mvp.md) ([PDF](docs/trybe-mvp.pdf))
and [CONTRIBUTING.md](CONTRIBUTING.md). Product changes must follow its four milestones,
acceptance criteria and audit gates; future roadmap items do not expand the MVP.

- Sample profiles, activity figures and feedback illustrate the product; they are not real results.
- Preview interactions use component state and reset on reload. The appearance preference is stored in the browser.
- Sign-in and sign-up buttons link to the web app's `/attendee/*` and `/organizer/*` routes once `NEXT_PUBLIC_WEB_APP_URL` is set (see `.env.example`). Without it, `/attendee`, `/organizer` and `/profile` show an entry preview. In development they point at `http://127.0.0.1:3000`.
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
