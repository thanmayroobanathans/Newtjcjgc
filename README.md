# VIT Pulse — V1

A free, static campus social experiment.

## Run locally

Open `index.html` in a browser.

## Deploy on GitHub Pages

1. Create a public GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js`.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

GitHub will provide the Pages URL.

## V1 architecture

No backend is required. The quiz and demo similarity calculation run in the browser.

## V2

Replace the demo participant pool in `script.js` with a backend containing only participants who explicitly opted in.

Do not scrape student photographs, VIT records, or personal information.
