# Fonts

Two open-license fonts are self-hosted here — no CDN. Drop the two `.woff2`
files into this folder with the exact names below and the site picks them up.
(Monospace text uses your system's built-in mono font — nothing to download.)

## 1. `press-start-2p.woff2`  (name, section labels, buttons)

- Source: Google Fonts — https://fonts.google.com/specimen/Press+Start+2P
- Easiest route: https://gwfh.mranftl.com/fonts/press-start-2p?subsets=latin
  - Download, take the `.woff2`, rename it to `press-start-2p.woff2`.
- License: SIL Open Font License 1.1 (free to self-host and redistribute).

## 2. `space-grotesk.woff2`  (body text)

- Source: Google Fonts — https://fonts.google.com/specimen/Space+Grotesk
- Easiest route: https://gwfh.mranftl.com/fonts/space-grotesk?subsets=latin
  - Choose the variable file (or weights 300–600), take the `.woff2`,
    rename it to `space-grotesk.woff2`.
- License: SIL Open Font License 1.1.

Until these files are in place the site still works — it falls back to a system
monospace and sans, and `font-display: swap` means text renders immediately.
