// Artist page opening: the folder is dropped on the table, the photo is clipped on,
// and the private fields get blacked out with a marker.
(() => {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!document.querySelector("[data-folder]")) return;

  gsap.timeline({ defaults: { ease: "expo.out" } })
    .from("[data-folder]", { opacity: 0, y: 60, rotation: 3, scale: .97, duration: 1.2 })
    .from("[data-sheet]", { y: 30, opacity: 0, duration: .9 }, "-=0.8")
    .from(".clip", { y: -40, opacity: 0, duration: .6, ease: "back.out(2)" }, "-=0.5")
    .from("[data-polaroid]", { opacity: 0, y: -80, rotation: 14, scale: 1.1, duration: 1, ease: "back.out(1.4)" }, "-=0.6")
    .from(".polaroid--portrait .tape", { opacity: 0, scale: 1.5, duration: .4, ease: "back.out(2)" }, "-=0.3")
    .from(".chip", { opacity: 0, scale: 1.4, rotation: -6, duration: .45, stagger: .12, ease: "back.out(2.5)" }, "-=0.4")
    .from("[data-redact]", { scaleX: 0, duration: .5, stagger: .18, ease: "power2.inOut" }, "-=0.2")
    .from("[data-prints]", { opacity: 0, x: 60, rotation: 8, duration: .9, ease: "back.out(1.3)" }, "-=0.8")
    .from(".pen", { opacity: 0, x: 140, y: 40, duration: 1.1 }, "-=0.7");

  // the photo drifts a little slower than the sheet while scrolling
  gsap.to("[data-polaroid]", { yPercent: -6, rotation: 4, ease: "none",
    scrollTrigger: { trigger: ".dossier", start: "top top", end: "bottom top", scrub: true } });
  gsap.from(".book-sticky", { y: 120, duration: .9, delay: 1.6, ease: "back.out(1.6)",
    clearProps: "transform,translate,rotate,scale" });
})();
