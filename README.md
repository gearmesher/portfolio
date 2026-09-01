# Gerald Galdo — Portfolio

A static portfolio site for Gerald Galdo, Web Developer.

Live: https://gearmesher.github.io/portfolio

## What's in here

- `index.html` — home page: hero, project grid with filtering + a detail modal, contact CTA
- `about.html` — bio, services, skills and tools
- `plugins.html` — plugin gallery
- `plugins/*.html` — individual plugin detail pages
- `assets/css/style.css` — single stylesheet (design tokens + components)
- `assets/js/main.js` — nav, scroll reveal, project filter/modal, typing effect, back-to-top
- `assets/images/` — project screenshots, icons, profile photo, plugin thumbnails
- `assets/files/` — downloadable CV

## Stack

Plain HTML, CSS and vanilla JavaScript — no build step, no framework, no WordPress. Icons come from
[devicon](https://devicon.dev/) and [Ionicons](https://ionic.io/ionicons) via CDN; font is
[Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts.

## Running locally

It's a static site — open `index.html` directly, or serve the folder with any static server, e.g.:

```
python3 -m http.server 8000
```

## Editing content

- Add/edit a project: copy a `<article class="project-card">` block in `index.html`, update the image,
  title, category classes (`shopify` / `woocommerce` / `wordpress`), and the `data-*` attributes used by
  the modal.
- Add/edit a plugin: add a card in `plugins.html` and a matching page in `plugins/`.
- Colors, spacing and type scale are all CSS custom properties at the top of `assets/css/style.css`.

## Contact

- Email: dev.gearmesher@gmail.com
- GitHub: https://github.com/gearmesher
