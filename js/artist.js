// Artist page: builds the work gallery from js/artists.js and runs the photo viewer.
// Loaded before main.js so the gallery exists when the scroll animations are set up.
(() => {
  const page = document.querySelector("[data-artist]");
  if (!page) return;
  const slug = page.dataset.artist;
  const artist = window.LUCENT_ARTISTS[slug];
  const t = key => {
    const lang = document.documentElement.lang === "bg" ? "bg" : "en";
    return window.LUCENT_I18N[lang][key] || key;
  };

  document.documentElement.style.setProperty("--artist", artist.color);

  /* ---------- gallery ---------- */
  const grid = document.querySelector("[data-gallery]");
  const count = document.querySelector("[data-count]");
  const base = `../assets/img/works/${slug}/`;
  // same tilt for the same photo on every visit
  const tilt = i => (((i * 37) % 11) - 5) * 0.6;

  grid.innerHTML = artist.works.map((file, i) => `
    <figure class="shot scrap" data-place style="--r:${tilt(i).toFixed(1)}deg">
      <button class="shot__open" type="button" data-open="${i}">
        <img src="${base}${file}" alt="" loading="${i < 6 ? "eager" : "lazy"}">
      </button>
      ${i % 3 === 0 ? '<span class="tape tape--t"></span>' : ""}
    </figure>`).join("");
  if (count) count.textContent = artist.works.length;

  /* ---------- photo viewer ---------- */
  const box = document.querySelector("[data-lightbox]");
  const img = box.querySelector("img");
  const counter = box.querySelector("[data-lb-count]");
  let index = 0;

  function show(i) {
    index = (i + artist.works.length) % artist.works.length;
    img.src = base + artist.works[index];
    img.alt = `${artist.name}, ${index + 1} / ${artist.works.length}`;
    counter.textContent = `${index + 1} / ${artist.works.length}`;
    if (window.gsap) gsap.fromTo(img, { opacity: 0, scale: .97 }, { opacity: 1, scale: 1, duration: .35, ease: "power2.out" });
  }
  function open(i) {
    show(i);
    box.showModal();
    window.Lucent?.lenis?.stop();
  }
  function close() {
    box.close();
  }
  box.addEventListener("close", () => window.Lucent?.lenis?.start());

  grid.addEventListener("click", e => {
    const btn = e.target.closest("[data-open]");
    if (btn) open(+btn.dataset.open);
  });
  box.querySelector("[data-lb-close]").addEventListener("click", close);
  box.querySelector("[data-lb-prev]").addEventListener("click", () => show(index - 1));
  box.querySelector("[data-lb-next]").addEventListener("click", () => show(index + 1));
  box.addEventListener("click", e => { if (e.target === box) close(); });
  box.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  // swipe between photos on touch screens
  let startX = null;
  img.addEventListener("pointerdown", e => { startX = e.clientX; });
  img.addEventListener("pointerup", e => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
  });

  // the viewer's button labels follow the language switch
  const label = () => box.querySelectorAll("[data-lb-label]").forEach(b => b.setAttribute("aria-label", t(b.dataset.lbLabel)));
  label();
  new MutationObserver(label).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
