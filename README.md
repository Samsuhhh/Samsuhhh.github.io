# samsuhhh.github.io

Personal site. Static — hand-written HTML, CSS, and vanilla JS, no build step.
Open `index.html` in a browser and it runs.

## Structure

    index.html    markup
    styles.css    styling + theme tokens (dark, Game Boy Advance SP palette)
    main.js       boot-in reveals, hero start-menu, tabbed experience section
    fonts/        self-hosted woff2 (see fonts/README.md before first run)
    Samuel_Suh_Software_Engineering_Resume.pdf   linked from the Resume button

## Before it looks right

The two fonts aren't checked in — grab them per `fonts/README.md` and drop the
`.woff2` files into `fonts/`. Without them the site falls back to system fonts.

## Notes

- Section headers "power on" like an LCD on load, on scroll, and on jump-link.
  All of it is disabled automatically under `prefers-reduced-motion`.
- The contact "Send a message" button opens the visitor's mail app (mailto).
- No framework, no build, no CDN. It deploys to GitHub Pages as-is.

## Deploy

Pushing to the default branch redeploys via GitHub Pages. No configuration.
