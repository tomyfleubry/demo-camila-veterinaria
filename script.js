(() => {
  // Se anima el elemento original una sola vez; el HTML queda visible sin JS.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!("IntersectionObserver" in window) || reducedMotion.matches) return;

  const elements = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      entry.target.classList.add("is-visible");
    }
  }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });

  elements.forEach((element) => {
    element.classList.add("reveal-pending");
    observer.observe(element);
  });
  reducedMotion.addEventListener("change", (event) => {
    if (!event.matches) return;
    observer.disconnect();
    elements.forEach((element) => element.classList.remove("reveal-pending", "is-visible"));
  });
})();
