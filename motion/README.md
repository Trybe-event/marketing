# Trybe motion campaign

Approved brand media and an isolated Remotion project. It does not change the
marketing app's pages, production dependencies, registration or account logic.

## Deliverables

`deliverables/` contains the approved 12-second MP4, rebuilt 40-second MP4 and
captions, and current email-header GIF. Rejected drafts and local frame caches
are excluded. The 40-second advert is 1920 x 1080, 30 fps, H.264/AAC stereo.
The URL appears before the final symbol-left/wordmark-right lockup.

The 12-second email GIF is silent. Its first frame remains meaningful in clients
that do not animate GIFs. Source is 1200 x 360, rendered from lossless PNG frames;
display is responsive up to 600 x 180. Current export: 417,965 bytes, 128 colors,
6 fps, no dithering, differential frames. First and last frames match. The old
158 KB export was rejected as soft and must not be deployed.

## Install and render

Requires Node.js 20.9+, Python 3.10+ and FFmpeg with libx264, libmp3lame and AAC.
All paths resolve from this package. No developer-specific absolute paths apply.

```sh
cd motion
npm ci
npm run typecheck
npm run studio
node scripts/render.mjs --study --frames
node scripts/render.mjs --continuous --frames
node scripts/render.mjs --email-only --frames
python scripts/export.py --ffmpeg ffmpeg
python scripts/export-continuous.py --music /path/to/authorized-recording --ffmpeg ffmpeg
```

Optional: set REMOTION_BROWSER_EXECUTABLE to installed Chrome. Otherwise Remotion
manages an isolated browser. Visuals render through Remotion; FFmpeg encodes and
mixes the exported frames. This also avoids a native Remotion encoder crash on
one Windows host without changing production app dependencies. The supplied
12-second MP4 has original music; the 40-second export script requires its music
file explicitly. Remotion Studio previews narration, with optional musicSrc
pointing to a local file under public/licensed-music/ (git-ignored). The final mix
uses the export script's frame-timed effects, gradual music rise and voice ducking.

## Brand and sound provenance

Uses Trybe's approved swept-spoke mark, cream/deep-green/lime palette, existing
brand photography and local fonts. Each font's redistribution license is beside
it in public/fonts/. No graphics, narration, footage or soundtrack from the Miva
reference clip are reused. It informed pacing only.

Narration is synthetic British-English en-GB-RyanNeural with natural pauses.
`narration-v2.json` records the spoken copy and timing. Trybe is pronounced Tribe.
The original interface effects and 12-second music bed are synthesized, with no
third-party samples. Current copy avoids presenting planned AI, ticket payments
or streaming as live features.

The user selected LoVibe's a good man with a broken heart, confirmed the exact
YouTube upload and stated permission for promotional use on 17 November 2026.
The recording is not included as a standalone source asset. Supply an authorized
file with --music; retain the permission evidence with the team's release records.
The approved integrated 40-second advert is included in deliverables/.

## Email rollout and handoff

1. Deploy web/public/brand/trybe-email-loop-v3.gif and the first-frame poster.
2. Verify unauthenticated HTTP 200, image/gif, and immutable cache headers from the
   permanent Vercel production domain. Do not use a temporary tunnel in production.
3. Deploy the API shared email layout after the assets. It covers welcome,
   registration, event created, started, ending, end reminder and both recaps.
   Future template kinds rendered through the same layout inherit the header.
4. Clerk verification/password-reset emails are managed separately in Clerk's
   dashboard. Use the public GIF URL there once assets are deployed. This release
   does not change Clerk keys, enable a scheduler or alter sending credentials.

Email clients control remote-image fetching, caching and animation. Eager-loading
hints, a readable first frame, live-text branding and permanent cached assets
reduce avoidable delays; they cannot force preloading or offline animation.
Never add JavaScript, tracking identifiers, autoplay video or a CID attachment to
simulate preloading. Preserve the live-text logo, plain-text body and alt text.
SMTP acceptance does not guarantee inbox delivery. Do not promise that changing
a subject or file size alone fixes spam placement.
