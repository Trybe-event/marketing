# Contributing to Trybe Marketing

Read [Trybe MVP](docs/trybe-mvp.md) ([PDF](docs/trybe-mvp.pdf)) before changing product
copy, entry routes or feature claims. It is the required product scope and milestone
reference. Read the relevant issue and [planning index](docs/README.md) as well.

- Follow M1 accounts/privacy, M2 events/registration, M3 discovery/connections, then
  M4 messaging/pilot readiness. A merged PR does not sign off a milestone audit.
- Organizer and attendee identities stay separate. Marketing sends people to the
  appropriate web route; it does not authenticate users or create memberships.
- Describe contact privacy accurately. Hidden details are omitted by the API, and
  attendees explicitly confirm registration and choose contact visibility.
- Present future AI, personalized sessions, streaming, carpool, payments, 4K posters
  and event-code entry as future plans until their release is verified. Do not claim
  illustrative people, metrics or testimonials are real customer results.
- Current maintainer instructions take priority over stale baseline wording. For
  example, attendee photos are mandatory in the current application despite the
  baseline's optional-photo wording; do not advertise a conflicting requirement.
- This repository maintains the product master MVP Markdown/PDF pair. Keep those
  formats consistent and synchronize exact copies to web/docs and api/docs in linked
  PRs whenever requirements change. Version 1.1 adds future notes, not extra MVP scope.
- Every PR must identify the relevant MVP milestone/section, issue, acceptance evidence,
  dependencies and checks still pending. Use the PR template and descriptive branches.
  Only maintainers or explicitly authorized agents may merge; audit evidence is required
  before promoting a milestone.

Keep changes scoped, preserve partner work, and do not commit credentials, local paths
or generated preview artifacts. Run checks appropriate to the changed files and report
actual results. For runtime changes run typecheck, lint and build; documentation-only
changes require valid links, matching document copies and formatting verification.
