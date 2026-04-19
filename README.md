# BrandFoundry demo page

A static GitHub Pages site that showcases recorded walkthroughs of the BrandFoundry
workspace. We use this at presentations so we don't have to do live demos — attendees
scan a QR code and watch the videos on their own devices.

**Live:** https://muzamanig.github.io/brandfoundry-demo/

## Adding a new video

1. Drop the `.mp4` file into `videos/` (keep filenames kebab-case, e.g. `prompt-to-brand.mp4`).
2. Add an entry to `videos.json`:
   ```json
   {
     "videos": [
       {
         "title": "Prompt to brand in 60 seconds",
         "description": "Type a business description, get a logo, palette, and tagline.",
         "src": "videos/prompt-to-brand.mp4",
         "poster": "assets/prompt-to-brand-poster.png"
       }
     ]
   }
   ```
   `poster` is optional but recommended — an 1280x720 PNG frame captured from the video.
3. Commit and push. GitHub Pages redeploys automatically within ~30 seconds.

No HTML, CSS, or JS changes are needed to add videos.

## Regenerating the QR code

The QR image at `assets/qr-code.png` points at the Pages URL. If the URL ever changes:

```bash
curl -L -o assets/qr-code.png \
  "https://api.qrserver.com/v1/create-qr-code/?size=512x512&margin=10&data=https%3A%2F%2Fmuzamanig.github.io%2Fbrandfoundry-demo%2F"
```

Commit the new PNG and push.

## Local preview

No build step. From the repo root:

```bash
python -m http.server 8080
# then open http://localhost:8080
```

Opening `index.html` directly via `file://` won't work — `fetch('videos.json')` needs HTTP.
