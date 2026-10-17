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
- Sign-in and sign-up buttons link to the web app's `/attendee/*` and `/organizer/*` routes once `NEXT_PUBLIC_WEB_APP_URL` is set (see `.env.example`). Without it, `/attendee`, `/organizer` and `/profile` show an entry preview. In development they point at `http://localhost:3000`.
- Features marked "coming later" (Connect AI, personalized sessions, carpool, virtual attendance, event discovery) are on the roadmap, not in the first release.

## Run locally

Requires Node.js 20.9 or newer.

```bash
git clone https://github.com/Trybe-event/marketing.git
cd marketing
npm ci
npm run dev
```

Open http://localhost:5173.

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

## Development ports and restart rules

Run one terminal per service: marketing on `http://localhost:5173`, web on
`http://localhost:3000`, and API on `http://localhost:8080`.
The frontend dev commands explicitly pin their ports and fail if occupied rather
than silently moving sign-in to another origin.

Use `http://localhost:3000` for signing in. Set web `NEXT_PUBLIC_APP_URL` and
API `PUBLIC_WEB_URL` to that same origin. Marketing `NEXT_PUBLIC_WEB_APP_URL`
should point there too; web `API_INTERNAL_URL` should be `http://127.0.0.1:8080`.
Keep the existing matching proxy secret in both services. Never copy secrets into
public variables or disable Clerk validation to solve a port conflict.

Before restarting, press Ctrl+C in the service's existing terminal. If API
`/readyz` already returns ready, the API is running; do not start a second copy.
For an occupied port on Windows, inspect it with:

```powershell
Get-NetTCPConnection -State Listen -LocalPort 3000,3001,5173,8080 |
  Select-Object LocalPort, OwningProcess
```

Identify the owning process before stopping it. Never kill all Node or Go
processes. If the workspace remains unavailable with the right ports, check the
API terminal and `/readyz`; an unavailable API is different from an empty account.
