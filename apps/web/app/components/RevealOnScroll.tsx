"use client";

import { useEffect } from "react";

/**
 * Fades `.fade-up` elements in as they scroll into view. Lets a server-
 * rendered page use the same reveal as the client pages without becoming a
 * client component itself. Renders nothing.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
