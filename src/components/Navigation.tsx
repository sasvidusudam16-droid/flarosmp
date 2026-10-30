"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "About",     href: "#home" },
  { label: "Features",  href: "#features" },
  { label: "Store",     href: "#store" },
  { label: "Community", href: "#community" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav
        className="fsnav"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="#home" className="fsnav-brand" aria-label="Flaro SMP – home" onClick={() => setMenuOpen(false)}>
          <img src="/logo.png" alt="" aria-hidden="true" width={32} height={32} className="fsnav-logo-img" />
          <span className="fsnav-brand-text">
            FLARO <span className="fsnav-brand-accent">SMP</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="fsnav-links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a href={link.href} className="fsnav-link">
                {link.label}
                <span className="fsnav-link-bar" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="fsnav-right">
          <a href="https://flarosmp.net" className="fsnav-cta">Play Now</a>

          <button
            type="button"
            className="fsnav-burger"
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-controls="fsnav-mobile"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="fsnav-bar" style={{ transform: menuOpen ? "rotate(45deg) translate(0, 4.5px)" : "none" }} />
            <span className="fsnav-bar" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="fsnav-bar" style={{ transform: menuOpen ? "rotate(-45deg) translate(0, -4.5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="fsnav-mobile"
        className="fsnav-mobile"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", transform: menuOpen ? "translateY(0)" : "translateY(-6px)" }}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map(link => (
            <li key={link.label}>
              <a href={link.href} className="fsnav-mobile-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="https://flarosmp.net" className="fsnav-mobile-cta" onClick={() => setMenuOpen(false)}>
              PLAY NOW
            </a>
          </li>
        </ul>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className="fsnav-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <style>{`
        /* ── Navbar ── */
        .fsnav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          background: linear-gradient(to bottom, rgba(8,5,15,0.92) 0%, transparent 100%);
          backdrop-filter: blur(6px);
          animation: fsnav-drop 0.65s cubic-bezier(0.16,1,0.3,1) 0.1s backwards;
        }
        @keyframes fsnav-drop {
          from { opacity: 0; transform: translateY(-40px); }
        }

        /* Brand */
        .fsnav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          user-select: none;
          flex-shrink: 0;
        }
        .fsnav-logo-img { object-fit: contain; flex-shrink: 0; }
        .fsnav-brand-text {
          font-family: 'Russo One', sans-serif;
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          color: #ffffff;
          letter-spacing: 0.08em;
        }
        .fsnav-brand-accent { color: #FF5200; }

        /* Desktop links */
        .fsnav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0; padding: 0;
        }
        @media (max-width: 767px) { .fsnav-links { display: none; } }

        .fsnav-link {
          position: relative;
          font-family: 'Chakra Petch', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: rgba(232,213,183,0.75);
          text-decoration: none;
        }
        .fsnav-link-bar {
          position: absolute;
          left: 0; bottom: -2px;
          height: 1px;
          width: 0;
          background: #FF5200;
          transition: width 0.25s cubic-bezier(0.16,1,0.3,1);
        }
        @media (hover: hover) {
          .fsnav-link:hover { color: #fff; }
          .fsnav-link:hover .fsnav-link-bar { width: 100%; }
        }

        /* Right section */
        .fsnav-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        /* CTA pill */
        .fsnav-cta {
          display: none;
          font-family: 'Chakra Petch', sans-serif;
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          background: #FF5200;
          border-radius: 999px;
          padding: 8px 22px;
          box-shadow: 0 0 20px rgba(255,82,0,0.3);
          transition: filter 0.2s ease, box-shadow 0.2s ease;
        }
        @media (min-width: 768px) { .fsnav-cta { display: inline-flex; align-items: center; } }
        @media (hover: hover) {
          .fsnav-cta:hover { filter: brightness(1.15); box-shadow: 0 0 32px rgba(255,82,0,0.5); }
        }
        .fsnav-cta:active { transform: scale(0.96); }

        /* Hamburger */
        .fsnav-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 767px) { .fsnav-burger { display: flex; } }

        .fsnav-bar {
          display: block;
          width: 20px;
          height: 1.5px;
          background: #E8D5B7;
          transform-origin: center;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        /* Mobile menu */
        .fsnav-mobile {
          position: fixed;
          top: 64px; left: 0; right: 0;
          z-index: 40;
          padding: 20px 24px 28px;
          background: rgba(6,8,15,0.97);
          border-bottom: 1px solid rgba(255,82,0,0.14);
          backdrop-filter: blur(12px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        @media (min-width: 768px) { .fsnav-mobile { display: none; } }

        .fsnav-mobile ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
        .fsnav-mobile-link {
          display: block;
          padding: 14px 0;
          font-family: 'Chakra Petch', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #E8D5B7;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .fsnav-mobile-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 16px;
          padding: 14px;
          font-family: 'Chakra Petch', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-decoration: none;
          color: #fff;
          background: #FF5200;
          border-radius: 6px;
        }

        /* Backdrop */
        .fsnav-backdrop {
          position: fixed;
          inset: 0;
          z-index: 30;
          background: rgba(0,0,0,0.4);
        }

        @media (max-width: 767px) {
          .fsnav { padding: 0 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fsnav { animation: none; }
          .fsnav-cta, .fsnav-link-bar, .fsnav-bar, .fsnav-mobile { transition: none; }
        }
      `}</style>
    </>
  );
}
