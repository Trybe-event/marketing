# Trybe Marketing

**Connection with convenience.**

Trybe helps people discover relevant attendees, make mutual connections, and stay in touch before, during, and after an event. This repository contains the marketing website that introduces Trybe to attendees and event hosts.

[View the website](https://trybe-connect-events.codex-accele-8570.chatgpt.site) · [GitHub organization](https://github.com/Trybe-event)

The hosted website currently uses private access.

## What is included

- Responsive landing page with a rotating product showcase.
- Animated Trybe logo and light, dark, and system appearance modes.
- About Trybe and the before, during, and after event experience.
- Attendee discovery preview with role filters and sample connection interactions.
- Event-code entry below the attendee discovery section.
- Event community visualization with expanding rings.
- Connect AI conversation preview with a response-only matching card.
- Contact-sharing switches for direct conversation, LinkedIn, X, and Instagram.
- Event activity examples and illustrative feedback.
- Event-host information, product capabilities, and FAQs.
- Separate attendee and organizer entry routes.

## Current implementation status

This is the marketing frontend. Authentication, real registrations, private messaging, production AI matching, attendance tracking, and database-backed event-code lookup are not implemented here.

Sample profiles, activity figures, and feedback illustrate the product experience; they are not verified customer results. Preview switches and connection interactions use local component state and reset on reload. Appearance preferences are stored in the browser.

AI agents, personalized session recommendations, carpool coordination, streaming, and personalized event discovery are part of the broader product direction. Their implementation belongs in the application and API repositories.

## Technology

| Layer | Technology |
| --- | --- |
| Interface | React and TypeScript |
| Routing | Next-compatible App Router conventions |
| Development and build | Vinext and Vite |
| Styling | Tailwind CSS and custom CSS |
| Icons | Lucide React and project SVG assets |
| Hosted runtime | Cloudflare Workers through the retained Sites integration |

The project uses a Sites starter with Vinext as its framework adapter. It is not configured as a standard `next dev` project.

## Run locally

Install **Node.js 22.13.0 or newer** and npm.

From a fresh clone:

```powershell
git clone https://github.com/Trybe-event/marketing.git
cd marketing
npm ci
npm run dev
```

From the existing workspace:

```powershell
 cd "C:\Users\durojaiye moturayo\trybe\marketing"
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173), or the local URL printed by the server. Keep the terminal running. Stop the server with `Ctrl+C`.

Run commands inside the `marketing` directory, which contains `package.json`. The parent Trybe directory contains planning documents and other project files.

## Routes

| Route | Current behavior |
| --- | --- |
| `/` | Marketing website and product previews |
| `/#about` | About Trybe |
| `/#attendees` | Attendee discovery preview |
| `/#join` | Event-code form |
| `/#connect-ai` | Connect AI conversation preview |
| `/#organizers` | Event-host section |
| `/join?code=TRYBE2026` | Sample event landing page |
| `/profile` | Attendee entry placeholder |
| `/profile/sign-in` | Attendee sign-in placeholder |
| `/organizer` | Organizer entry placeholder |
| `/organizer/sign-in` | Organizer sign-in placeholder |

Use **TRYBE2026** to explore the event-code preview. Other codes are not checked against a live event database. The sign-in routes do not authenticate users yet.

## Project structure

```text
app/
  page.tsx                 Marketing page
  layout.tsx               Shared layout and page metadata
  globals.css              Site styles and responsive layouts
  community-effects.css    Community pulse and response typography
  join/                    Sample event landing page
  organizer/               Organizer entry routes
  profile/                 Attendee entry routes
components/
  brand-logo.tsx           Trybe wordmark and symbol
  entry-page.tsx           Shared entry-page presentation
  product-experience.tsx   Event code and product preview sections
public/                    Public assets and favicon
build/                     Sites runtime and Vite integration sources
scripts/                   Framework and environment helpers
.openai/hosting.json        Optional local hosting configuration (ignored)
```

Some starter integration files remain in the repository. Their presence does not mean product authentication or database services are connected.

## Validation and build

```powershell
npx tsc --noEmit
npm run build
```

Optional linting:

```powershell
npm run lint
```

To preview the production build locally:

```powershell
npm start
```

`npm start` uses Wrangler and the generated configuration under `dist/server/`. Use the URL it prints. It does not deploy the website.

The `vite.config.ts` and `build/` integration sources remain tracked because they support development and production builds. Optional hosting metadata in `.openai/` stays local; fresh clones can build without it.

## Repository boundaries

Trybe uses three repositories:

| Repository | Responsibility |
| --- | --- |
| `marketing` | Marketing content, design, and entry links |
| `web` | Organizer and attendee application workflows |
| `api` | Go APIs, Python AI services, database migrations, notification workers, and backend deployment configuration |

The entry routes in this repository are placeholders. When the web application is available, update marketing calls to action to point to its appropriate routes.

Organizer and attendee accounts must remain separate. An account cannot hold both roles or switch between them. This must be enforced by the application and API, not just by different frontend paths.

## Assets and configuration

Fonts load from Google Fonts and stock portraits from Unsplash. These assets require network access.

The current marketing interactions do not require product API credentials. Keep future service credentials on the server; browser-visible configuration must contain only intentionally public values.

`.env` files, `node_modules/`, `dist/`, `.wrangler/`, `.vinext/`, `.sites-runtime/`, `.openai/`, `.agents/`, `.codex/`, and the unused `app/chatgpt-auth.ts` helper are excluded by `.gitignore`. Checkout-local preview state and credentials do not belong in commits.

## Troubleshooting

- **Missing `package.json`:** enter the `marketing` directory before running npm commands.
- **Another preview is already running:** use its printed URL, or stop that server with `Ctrl+C` before starting a new one.
- **Old styles remain visible:** refresh the browser. If necessary, stop and restart the development server.
- **Missing dependencies after cloning:** run `npm ci` before `npm run dev`.
