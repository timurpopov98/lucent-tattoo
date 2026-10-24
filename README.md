# Lucent Tattoo Studio — website

Static site, no build step. Open `index.html` through any static server:

```bash
python3 -m http.server 8080
```

## Structure

```
index.html            home page (hero video, manifesto, artists, piercing, events, journal, visit)
artists/anna.html     artist page: dossier, work gallery, sticky booking button
css/style.css         design tokens at the top (:root) and all styles
js/i18n.js            all copy in English and Bulgarian (keys match data-i18n attributes)
js/main.js            torn-paper edges, language switch, GSAP/ScrollTrigger/Lenis motion (all pages)
js/artists.js         artist data: Instagram, accent colour, list of work photos
js/artist.js          artist page gallery and photo viewer
js/dossier.js         artist page opening animation
assets/video/hero.mp4 hero banner video (replace with the final film, keep the name)
assets/img/paper.jpg  generated crumpled-paper texture
assets/img/brand/     logo (black and white versions) and favicon
vendor/               GSAP, ScrollTrigger, Lenis
preview.html          copy of index.html without the document wrapper, used for the Claude artifact preview
```

## Still needed

- Photo of Viga: `assets/img/artists/viga.jpg` (4:5, about 720×900). Until the
  file exists the card shows "photo coming". The other artists' photos are in
  the same folder, cropped to 720×900.
- Opening hours (`visit.tbd` in `js/i18n.js`).
- Events: dates and real events (currently "date soon" placeholders).
- Journal posts: titles are drafts, the links do not lead anywhere yet.

## Adding work photos to an artist page

1. Put the photos in `assets/img/works/<artist>/` (for Anna: `assets/img/works/anna/`).
2. Add the file names to `works` for that artist in `js/artists.js`.

The gallery, the counter and the photo viewer pick them up automatically.
Anna's first three photos are cut from her dossier image and are low resolution;
replace them with the originals.
