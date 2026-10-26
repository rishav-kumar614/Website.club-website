"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Logo } from "./ui/Logo";

const STUDIO_LINKS = {
  rentals: [
    { label: "Maison (Hospitality)", href: "#websites" },
    { label: "Forma (Architecture)", href: "#websites" },
    { label: "Orbit (Tech & Product)", href: "#websites" },
    { label: "Turnkey 48h Rental Process", href: "#process" },
    { label: "Rental Pricing & Tiers", href: "#pricing" },
  ],
  services: [
    { label: "Turnkey 3D Website Rentals", href: "#websites" },
    { label: "Bespoke 3D Worlds", href: "#custom" },
    { label: "Website Transformation", href: "#transform" },
    { label: "60 FPS GPU Performance", href: "#performance" },
    { label: "Shader & WebGL R&D", href: "#contact" },
  ],
  studio: [
    { label: "Selected Work & Case Studies", href: "#work" },
    { label: "Why Website Club", href: "#why-us" },
    { label: "Performance Benchmarks", href: "#performance" },
    { label: "Frequently Asked Questions", href: "#faq" },
    { label: "Direct Studio Desk", href: "#contact" },
  ],
  socials: [
    { label: "X (Twitter)", href: "https://x.com", external: true },
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "Instagram", href: "https://instagram.com", external: true },
    { label: "Behance", href: "https://behance.net", external: true },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Rental Master Terms", href: "#" },
    { label: "IP & Code Ownership", href: "#" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [times, setTimes] = useState({
    london: "--:-- GMT",
    sf: "--:-- PST",
    tokyo: "--:-- JST",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        london: now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" }) + " GMT",
        sf: now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit" }) + " PST",
        tokyo: now.toLocaleTimeString("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" }) + " JST",
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-root" aria-label="Website Club Footer">
      {/* Subtle Ambient Radial Lighting */}
      <div className="footer-ambient-aura" aria-hidden="true" />

      <div className="wrap">
        {/* Top Tier: Studio Brand, Live Mission & Studio Dispatch */}
        <div className="footer-top-panel">
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <Logo className="footer-logo" />
              <div className="footer-live-badge">
                <span className="footer-live-dot" />
                <span>Global Remote Studio</span>
              </div>
            </div>

            <p className="footer-brand-mission">
              Engineering turnkey 3D website rentals, bespoke WebGL digital universes, and website transformations
              for ambitious brands that refuse to look like templates.
            </p>

            {/* Studio World Clocks */}
            <div className="footer-clocks-bar">
              <div className="footer-clock-item">
                <span className="footer-clock-city">London</span>
                <span className="footer-clock-time">{times.london}</span>
              </div>
              <div className="footer-clock-item">
                <span className="footer-clock-city">San Francisco</span>
                <span className="footer-clock-time">{times.sf}</span>
              </div>
              <div className="footer-clock-item">
                <span className="footer-clock-city">Tokyo</span>
                <span className="footer-clock-time">{times.tokyo}</span>
              </div>
            </div>
          </div>

          {/* Studio Dispatch / Newsletter */}
          <div className="footer-dispatch-card">
            <div className="footer-dispatch-badge">STUDIO DISPATCH</div>
            <h4 className="footer-dispatch-title">The 3D Web Report</h4>
            <p className="footer-dispatch-desc">
              Curated breakdowns of real-time 3D, WebGL shaders, and high-performance interactive web design.
              Strictly no spam. Sent once a quarter.
            </p>

            {subscribed ? (
              <div className="footer-dispatch-success" role="status">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>You are subscribed to the Studio Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-dispatch-form">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  className="footer-dispatch-input"
                  aria-label="Work email address"
                />
                <button type="submit" className="footer-dispatch-btn">
                  <span>Join</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Tier: 4-Column Categorized Directory */}
        <div className="footer-directory-grid">
          {/* Column 1: Rentals */}
          <div className="footer-nav-col">
            <h5 className="footer-nav-heading">
              <span className="footer-nav-num">01</span>
              <span>Catalog &amp; Rentals</span>
            </h5>
            <ul className="footer-nav-list">
              {STUDIO_LINKS.rentals.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Studio Services */}
          <div className="footer-nav-col">
            <h5 className="footer-nav-heading">
              <span className="footer-nav-num">02</span>
              <span>Studio Capabilities</span>
            </h5>
            <ul className="footer-nav-list">
              {STUDIO_LINKS.services.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Studio & Knowledge */}
          <div className="footer-nav-col">
            <h5 className="footer-nav-heading">
              <span className="footer-nav-num">03</span>
              <span>Studio &amp; Insights</span>
            </h5>
            <ul className="footer-nav-list">
              {STUDIO_LINKS.studio.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-nav-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Channels & Socials */}
          <div className="footer-nav-col">
            <h5 className="footer-nav-heading">
              <span className="footer-nav-num">04</span>
              <span>Direct Channels</span>
            </h5>
            <div className="footer-contact-box">
              <span className="footer-contact-lbl">Studio Inquiries</span>
              <a href="mailto:hello@websiteclub.com" className="footer-contact-email">
                hello@websiteclub.com
              </a>
              <span className="footer-contact-sla">Avg Response &lt; 2 Hours</span>
            </div>

            <ul className="footer-social-list">
              {STUDIO_LINKS.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                  >
                    <span>{s.label}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Signature Monolith Studio Wordmark */}
        <div className="footer-monolith-wrap" aria-hidden="true">
          <span className="footer-monolith-text">WEBSITE CLUB</span>
          <div className="footer-monolith-line" />
        </div>

        {/* Bottom Tier: Colophon, Legal & Back to Top */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Website Club Inc. All rights reserved.
            </p>
            <span className="footer-colophon-sep">·</span>
            <p className="footer-colophon">
              Crafted with Next.js, Three.js &amp; WebGL · Audited 60 FPS
            </p>
          </div>

          <div className="footer-bottom-right">
            <ul className="footer-legal-list">
              {STUDIO_LINKS.legal.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-legal-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={scrollToTop}
              className="footer-top-btn"
              title="Scroll to top of page"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="footer-credit-row">
          {/* Site credits */}
          <div className="site-credit" aria-label="Site credits">
            <a href="https://fabulousmedia.in/" target="_blank" rel="noopener" title="Designed by Fabulous Media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.google.com/s2/favicons?domain=fabulousmedia.in&sz=64"
                alt="Fabulous Media"
                loading="lazy"
              />
            </a>
            <span className="divider" aria-hidden="true" />
            <a href="https://gocommercially.com/" target="_blank" rel="noopener" title="Powered by GoCommercially">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.google.com/s2/favicons?domain=gocommercially.com&sz=64"
                alt="GoCommercially"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
