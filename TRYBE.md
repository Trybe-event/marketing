# Trybe marketing site

React and TypeScript with an App Router project. The Sites development adapter is Vinext; the product pages use React and Next-compatible conventions. Product APIs, authentication, and persistence are not implemented in this milestone.

## Routes

- `/`: marketing landing page, interactive sample attendee filters, sample connection requests, privacy demo, FAQ, and future roadmap.
- `/organizer`: separate organizer entry preview, ready for organizer authentication and dashboard work.
- `/profile`: separate attendee entry preview, ready for attendee authentication and reusable profiles.

The preview interactions use component state only and reset on reload. No personal information is collected. All displayed attendee identities are illustrative sample profiles. Stock portrait images are provided from Unsplash; fonts from Google Fonts. These require network access.

## Account boundary

An account may be organizer or attendee, never both. No shared-role switch is implemented. When APIs are added, enforce the immutable account type and resource access on the server. Separate frontend routes do not establish authorization on their own.

## Development

Install dependencies, then run `npm run dev`. The portable Sites starter serves on port 5173. Validate with `npx tsc --noEmit` and `npm run build`. The hosted build uses the retained Sites build integration in `vite.config.ts`.

## Next milestone

Implement separate account registration and sign-in, immutable backend account type, and attendee privacy fields. Then add organizer event creation and event-link registration according to the MVP. Keep AI matching, personalized sessions, carpool, and streaming clearly labeled as future features until implemented.
