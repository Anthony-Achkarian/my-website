"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string; status?: "live" | "soon" };

const PRODUCTS: NavItem[] = [
  { href: "/software", label: "ARK Studio", status: "soon" },
  { href: "/robotics", label: "Robotics", status: "live" },
  { href: "/quantum", label: "Quantum Computers", status: "soon" },
  { href: "/data-centers", label: "Data Centers", status: "soon" },
  { href: "/health", label: "Health", status: "soon" },
  { href: "/housing", label: "Housing", status: "soon" },
];

const SECONDARY: NavItem[] = [
  { href: "/careers", label: "Careers" },
  { href: "/merch", label: "Merch" },
  { href: "/invest", label: "Invest" },
];

function StatusBadge({ status }: { status: NavItem["status"] }) {
  if (!status) return null;
  return <span className={`nav-badge nav-badge--${status}`}>{status === "live" ? "Live" : "Soon"}</span>;
}

function Caret() {
  return (
    <svg className="nav-caret" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  // Hover-to-open only where hovering is a real input, so a tap on a
  // touch device doesn't open and immediately re-close the popover.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Any navigation closes every open surface.
  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setProductsOpen(false);
      setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!productsRef.current?.contains(e.target as Node)) setProductsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  // Hold the page still behind the mobile sheet.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href;
  const productsActive = PRODUCTS.some((p) => isActive(p.href));

  return (
    <header className={`site-nav${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}>
      <div className="site-nav-bar">
        <Link href="/" className="site-nav-logo" aria-label="Ark Industries — home">
          <Image src="/logo-mark.png" alt="Ark Industries" width={652} height={261} priority />
        </Link>

        <nav className="site-nav-desktop" aria-label="Primary">
          <div
            className="site-nav-products"
            ref={productsRef}
            onMouseEnter={canHover ? () => setProductsOpen(true) : undefined}
            onMouseLeave={canHover ? () => setProductsOpen(false) : undefined}
          >
            <button
              type="button"
              className={`site-nav-link site-nav-trigger${productsActive ? " is-active" : ""}`}
              aria-expanded={productsOpen}
              aria-controls="site-nav-products-menu"
              // On a hover device the popover is already open by the time a
              // click lands, so a toggle here would read as "clicking does
              // nothing". Click only ever opens; Escape, outside-click and
              // mouse-leave close it.
              onClick={() => setProductsOpen((open) => (canHover ? true : !open))}
            >
              Products
              <Caret />
            </button>

            <div
              className="site-nav-popover"
              id="site-nav-products-menu"
              data-open={productsOpen ? "true" : "false"}
            >
              {PRODUCTS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav-popover-item${isActive(item.href) ? " is-active" : ""}`}
                  onClick={() => setProductsOpen(false)}
                >
                  <span>{item.label}</span>
                  <StatusBadge status={item.status} />
                </Link>
              ))}
            </div>
          </div>

          {SECONDARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav-link${isActive(item.href) ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          <Link href="/#contact" className="site-nav-cta">
            Get in Touch
          </Link>
        </nav>

        <button
          type="button"
          className="site-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-nav-sheet"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="site-nav-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className="site-nav-sheet" id="site-nav-sheet" data-open={menuOpen ? "true" : "false"}>
        <nav className="site-nav-sheet-inner" aria-label="Mobile">
          <button
            type="button"
            className={`site-nav-sheet-disclosure${mobileProductsOpen ? " is-open" : ""}`}
            aria-expanded={mobileProductsOpen}
            aria-controls="site-nav-sheet-products"
            onClick={() => setMobileProductsOpen((open) => !open)}
          >
            Products
            <Caret />
          </button>

          <div
            className="site-nav-sheet-products"
            id="site-nav-sheet-products"
            data-open={mobileProductsOpen ? "true" : "false"}
          >
            {/* Single child: the 0fr -> 1fr grid collapse needs one row to animate. */}
            <div className="site-nav-sheet-products-list">
              {PRODUCTS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav-sheet-sublink${isActive(item.href) ? " is-active" : ""}`}
                  tabIndex={mobileProductsOpen ? undefined : -1}
                  aria-hidden={mobileProductsOpen ? undefined : true}
                >
                  <span>{item.label}</span>
                  <StatusBadge status={item.status} />
                </Link>
              ))}
            </div>
          </div>

          {SECONDARY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav-sheet-link${isActive(item.href) ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          <Link href="/#contact" className="site-nav-cta site-nav-sheet-cta">
            Get in Touch
          </Link>
        </nav>
      </div>
    </header>
  );
}
