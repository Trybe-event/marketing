# Trybe planning docs: marketing scope

Current references: [approved implementation plan](implementation-plan.md) and
[Milestone 1A status and setup](milestone-1a-status.md). Set
`NEXT_PUBLIC_WEB_APP_URL` to enable production account-entry handoff; local
development defaults to the product app on port 3000. No hosted marketing
deployment was performed for this increment.

This folder replicates the Trybe planning documents so they travel with the `marketing`
repository. The Markdown and PDFs share the same revision. The v0.6 PRD and v1.0 MVP
baseline are retained in history; the latest revisions add future roadmap requirements
without expanding the MVP or claiming a new milestone/release sign-off.

| File | What it is |
| --- | --- |
| `trybe-mvp.pdf` / `trybe-mvp.md` | MVP Scope and Delivery Plan v1.1 (four milestones unchanged; future poster/code-entry addendum). |
| `trybe-prd.pdf` / `trybe-prd.md` | Product Requirements Document v0.7 (full product, sections 1 to 65). |

The integrated, cross-repo Milestone 1 plan lives at the workspace root as
`MILESTONE-1-PLAN.md`.

## What `marketing` is responsible for

From the repository boundary in the product docs:

> `marketing` owns marketing content, design and entry links.

The marketing site introduces Trybe, demonstrates the privacy model, communicates free demo
access and routes organizers and attendees to the application. It holds no product data and
performs no authentication or authorization of its own.

## The PRD sections that drive this repo

- **Section 2 Commercial scope.** The platform is free during the demo stage. Keep that
  message accurate and avoid implying paid plans, payments, or native streaming.
- **Section 7 Marketing site and organizer workspace.** The marketing site explains convenient
  networking, demonstrates privacy controls and offers organizer registration and sign-in
  entry points.
- **Section 11 Event landing page.** Reference copy and the call-to-action tone, for example
  "Join Google DevFest 2026. Set up your profile, explore the program and meet the right
  people." The real event landing page and directory live behind the application, not here.
- **Sections 14 to 16 Profiles and privacy.** Source for the privacy demo and the
  hidden, connections-only and event-attendee visibility story the site illustrates.
- **Section 5 Route structure.** Entry links should point at the application's organizer and
  attendee routes once `web` is deployed.
- **Section 65 Future branded posters and event-code entry.** Future posters reuse the
  saved organizer organization name and show Trybe branding, event title, QR and code.
  Marketing will hand code-entry visitors to the attendee flow when the feature exists.
  The current MVP does not implement short event codes or a 4K poster export.

## Invariants the marketing site must respect

- Represent organizer and attendee accounts as strictly separate. Never suggest one account can
  do both or switch roles (PRD sections 4 and 40).
- Any attendee identities, figures, or testimonials shown are illustrative samples, not
  verified customer results.
- No product secrets or credentials belong in the marketing site; browser-visible configuration
  carries only intentionally public values (PRD section 38).
- Features not yet built (AI matching, personalized sessions, carpool, streaming) stay clearly
  labeled as future direction (PRD sections 47 to 57).

## Milestone 1 role

Marketing's Milestone 1 work is light: keep the organizer and attendee calls to action pointing
at the correct application routes and keep the free-demo and privacy messaging consistent with
the foundation being built in `web` and `api`. See `MILESTONE-1-PLAN.md` at the workspace root.
