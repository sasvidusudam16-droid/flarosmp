"use client";

import "@/styles/landing.css";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { Navigation } from "@/components/Navigation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SERVER_NAME, SERVER_IP, DISCORD_URL, STORE_URL, VOTE_URL, RANKS, SHARDS } from "@/data/site";

export default function Home() {
  const [online, setOnline] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const joinRef = useRef<HTMLElement>(null);
  const bttRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [year, setYear] = useState(2025);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  useEffect(() => {
    const section = joinRef.current;
    if (!section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    section.classList.add('htj-animated');
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { section.classList.add('htj-visible'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`)
      .then((r) => r.json())
      .then((d) => setOnline(d?.players?.online ?? 0))
      .catch(() => setOnline(null));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const backToTop = () => {
    if (launching) return;
    const btn = bttRef.current;
    if (!btn) return;
    setLaunching(true);

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    /* Flying sword clone */
    const flier = document.createElement('div');
    flier.className = 'btt-flier';
    flier.style.left = `${cx}px`;
    flier.style.top = `${cy}px`;
    document.body.appendChild(flier);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => { flier.classList.add('btt-flier-go'); });
    });

    /* Explode at the top when flier arrives (~500ms) */
    const explode = () => {
      const ex = cx;
      const ey = 60; /* near the top of the screen */

      /* Burst ring */
      const ring = document.createElement('div');
      ring.className = 'btt-burst-ring';
      ring.style.left = `${ex}px`;
      ring.style.top = `${ey}px`;
      ring.style.width = '120px';
      ring.style.height = '120px';
      document.body.appendChild(ring);
      requestAnimationFrame(() => requestAnimationFrame(() => ring.classList.add('go')));
      setTimeout(() => ring.remove(), 700);

      /* Spark particles */
      const colours = ['#FFB800', '#FF5200', '#FF8C00', '#FFD700', '#FFF'];
      const count = 14;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'btt-explode';
        p.style.left = `${ex}px`;
        p.style.top = `${ey}px`;
        const angle = (i / count) * Math.PI * 2;
        const dist = 40 + Math.random() * 60;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        p.style.background = colours[i % colours.length];
        p.style.width = `${4 + Math.random() * 6}px`;
        p.style.height = p.style.width;
        document.body.appendChild(p);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          p.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`;
          p.classList.add('go');
        }));
        setTimeout(() => p.remove(), 650);
      }
    };

    setTimeout(() => {
      explode();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => { flier.remove(); setLaunching(false); }, 700);
    }, 420);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      <SmoothScroll />
      <Navigation />

      <section id="home" className="hero">
        {/* Floating geometric shapes */}
        <div className="hero-shapes" aria-hidden="true">
          <div className="hs hs-diamond hs-1" />
          <div className="hs hs-diamond hs-2" />
          <div className="hs hs-diamond hs-3" />
          <div className="hs hs-hex hs-4" />
          <div className="hs hs-hex hs-5" />
          <div className="hs hs-ring hs-6" />
          <div className="hs hs-ring hs-7" />
          <div className="hs hs-cross hs-8" />
          <div className="hs hs-cross hs-9" />
          <div className="ember e1" /><div className="ember e2" /><div className="ember e3" />
          <div className="ember e4" /><div className="ember e5" /><div className="ember e6" />
        </div>

        <div className="hero2">
          <h1 className="hero-title">
            <span className="hw hw-flaro">FLARO</span>
            <span className="hw hw-smp">SMP</span>
          </h1>

          <span className="pill">
            <b className="pill-no">#1</b>
            Minecraft SMP Server
          </span>

          <img className="logo-main" src="/logo.png" alt={`${SERVER_NAME} logo`} />

          <div className="side side-left">
            <h3>Choose your path</h3>
            <div className="side-line"><i /></div>
            <p>Survive, build and trade your way across our custom world.</p>
          </div>

          <div className="side side-right">
            <h3>Enjoy the moment</h3>
            <div className="side-line rev"><i /></div>
            <p>We handle the rest. Lag-free, fair and active 24/7.</p>
          </div>

          <div className="hero2-bottom">
            <div className="info-card">
              <div className="info-icon"><Icon name="chat" size={28} /></div>
              <div>
                <b>Join our community</b>
                <span>Chat, trade &amp; get support</span>
                <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="mini-link">
                  Open Discord <Icon name="arrow" size={14} />
                </a>
              </div>
            </div>

            <div className="center-cta">
              <p className="tagline">
                Premium survival made for those who crave more than just vanilla.
              </p>
              <div className="btn-row">
                <button onClick={copy} className="btn btn-fire big">
                  {copied ? (
                    <><Icon name="check" size={18} /> Copied!</>
                  ) : (
                    <><Icon name="copy" size={18} /> Copy IP: {SERVER_IP}</>
                  )}
                </button>
                <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn btn-outline big">
                  Visit Store
                </a>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-big">
                {online === null ? "—" : online}+
              </div>
              <span>Players online now</span>
              <div className="avatars">
                <img src="https://mc-heads.net/avatar/Steve/40" alt="" />
                <img src="https://mc-heads.net/avatar/Alex/40" alt="" />
                <img src="https://mc-heads.net/avatar/Notch/40" alt="" />
                <em>24/7 · 1.21+</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How to Join ── */}
      <section id="join" className="htj" ref={joinRef}>

        {/* ambient floating shapes */}
        <div className="htj-shapes" aria-hidden="true">
          <div className="hjs hjs-d1" />
          <div className="hjs hjs-d2" />
          <svg className="hjs hjs-s1" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0L17.8 14.2L32 16L17.8 17.8L16 32L14.2 17.8L0 16L14.2 14.2Z" fill="#FFB040"/>
          </svg>
          <svg className="hjs hjs-s2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0L17.8 14.2L32 16L17.8 17.8L16 32L14.2 17.8L0 16L14.2 14.2Z" fill="#FF6020"/>
          </svg>
          <div className="hjs hjs-c1" />
        </div>

        <div className="htj-inner">
          <h2 className="htj-title">How to join</h2>
          <div className="htj-steps">

            <div className="htj-step">
              <span className="htj-num" aria-hidden="true">1</span>
              <h3 className="htj-step-name">Get Minecraft</h3>
              <p className="htj-step-desc">Java or Bedrock, version 1.21 or newer. Any device, any platform.</p>
            </div>

            <div className="htj-step">
              <span className="htj-num" aria-hidden="true">2</span>
              <h3 className="htj-step-name">Copy the IP</h3>
              <p className="htj-step-desc">Open Multiplayer, add a new server and paste the address below.</p>
              <button onClick={copy} className="htj-ip" aria-label={copied ? "IP copied" : `Copy server IP: ${SERVER_IP}`}>
                {copied ? <><Icon name="check" size={14} /> Copied!</> : <><Icon name="copy" size={14} /> {SERVER_IP}</>}
              </button>
            </div>

            <div className="htj-step htj-step-last">
              <span className="htj-num" aria-hidden="true">3</span>
              <h3 className="htj-step-name">Jump in</h3>
              <p className="htj-step-desc">Connect, pick your path and start building your story on FlaroSMP.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Store ── */}
      <section id="store" className="store-sec">
        <div className="store-inner">
          <div className="store-heading">
            <h2 className="store-title">Pick your rank</h2>
          </div>

          <div className="ranks-grid">
            {RANKS.map(rank => (
              <div key={rank.name} className={`rank-card${rank.featured ? ' rank-card-featured' : ''}`}>
                {rank.badge && <span className="rank-badge">{rank.badge}</span>}
                <h3 className="rank-name">{rank.name}</h3>
                {rank.shards && (
                  <div className="rank-shards-inc">
                    <img src="/shard.png" width={18} height={18} alt="" aria-hidden="true" />
                    <span>{rank.shards.toLocaleString()} Shards included</span>
                  </div>
                )}
                <ul className="rank-perks">
                  {rank.perks.map(perk => (
                    <li key={perk.label} className="rank-perk">
                      <span className="rp-label">{perk.label}</span>
                      <span className="rp-val">
                        {perk.value}
                        {perk.note && <em className="rp-note"> · {perk.note}</em>}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="rank-foot">
                  <div className="rank-price">
                    {rank.price}<span>/month</span>
                  </div>
                  <a href={rank.link} target="_blank" rel="noreferrer" className="btn btn-fire">
                    Get {rank.name}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="shards-sec">
            <div className="shards-hdr">
              <img src="/shard.png" className="shards-hero-img" alt="Shards" />
              <div>
                <h3 className="shards-title">Shards</h3>
                <p className="shards-desc">The in-game currency. Spend in the shard shop for cosmetics, claim bonuses, and more.</p>
              </div>
            </div>
            <div className="shards-grid">
              {SHARDS.map(pkg => (
                <div key={pkg.amount} className="shard-card">
                  {pkg.bonus && <span className="shard-bonus">{pkg.bonus}</span>}
                  <img src="/shard.png" className="shard-img" alt="" aria-hidden="true" />
                  <div className="shard-amt">
                    {pkg.base && <s className="shard-base">{pkg.base.toLocaleString()}</s>}
                    <span>{pkg.amount.toLocaleString()}</span>
                  </div>
                  <div className="shard-price">{pkg.price}</div>
                  <a href={STORE_URL} target="_blank" rel="noreferrer" className="btn btn-outline">Buy</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand-col">
            <a href="#home" className="footer-logo-link">
              <img src="/logo.png" width={28} height={28} alt="" aria-hidden="true" />
              <span className="footer-logo-name">FLARO <b>SMP</b></span>
            </a>
            <p className="footer-desc">Premium survival SMP where legends are built. Join thousands of players on the adventure of a lifetime.</p>
            <button
              onClick={copy}
              className="footer-ip-btn"
              aria-label={copied ? "IP copied" : `Copy server IP: ${SERVER_IP}`}
            >
              <span className="footer-ip-text">
                <strong>{SERVER_IP}</strong>
              </span>
              <span className="footer-ip-icon" aria-hidden="true">
                {copied ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
              </span>
            </button>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#store">Store</a></li>
              <li><a href={VOTE_URL} target="_blank" rel="noreferrer">Vote</a></li>
              <li><a href="#join">How to Join</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Community</h4>
            <ul className="footer-links">
              <li><a href={DISCORD_URL} target="_blank" rel="noreferrer">Discord</a></li>
              <li><a href="https://tiktok.com/@mrflaro" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href="https://youtube.com/@mrflaroo" target="_blank" rel="noreferrer">YouTube</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links">
              <li><a href={DISCORD_URL} target="_blank" rel="noreferrer">Open a Ticket</a></li>
              <li><a href={DISCORD_URL} target="_blank" rel="noreferrer">Ban Appeals</a></li>
              <li><a href={DISCORD_URL} target="_blank" rel="noreferrer">Report a Player</a></li>
              <li><a href="https://www.minecraft.net/en-us/eula" target="_blank" rel="noreferrer">EULA</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} {SERVER_NAME}. All rights reserved.
            <span className="footer-copy-sep"> · </span>
            <span className="footer-copy-note">Not affiliated with Mojang or Microsoft.</span>
          </p>
        </div>
      </footer>

      {/* ── Back to top ── */}
      <button
        ref={bttRef}
        onClick={backToTop}
        className={`btt${scrolled ? ' btt-visible' : ''}${launching ? ' btt-launch' : ''}`}
        aria-label="Back to top"
      >
        <span className="btt-ring" aria-hidden="true" />
        <span className="btt-inner" aria-hidden="true">
          <img
            src="/sword.png"
            className="btt-sword"
            alt=""
            aria-hidden="true"
            draggable={false}
          />
          <span className="btt-trails" aria-hidden="true">
            <i /><i /><i />
          </span>
        </span>
        <span className="btt-label">back to top</span>
      </button>
    </>
  );
}
