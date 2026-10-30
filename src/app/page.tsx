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
          {/* diamonds */}
          <div className="hjs hjs-d1" />
          <div className="hjs hjs-d2" />
          {/* 4-point sparkle stars */}
          <svg className="hjs hjs-s1" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0L17.8 14.2L32 16L17.8 17.8L16 32L14.2 17.8L0 16L14.2 14.2Z" fill="#FFB040"/>
          </svg>
          <svg className="hjs hjs-s2" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0L17.8 14.2L32 16L17.8 17.8L16 32L14.2 17.8L0 16L14.2 14.2Z" fill="#FF6020"/>
          </svg>
          <svg className="hjs hjs-s3" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0L17.8 14.2L32 16L17.8 17.8L16 32L14.2 17.8L0 16L14.2 14.2Z" fill="#FFB040"/>
          </svg>
          {/* crosses */}
          <div className="hjs hjs-c1" />
          <div className="hjs hjs-c2" />
          {/* orb */}
          <div className="hjs hjs-o1" />
          {/* rings */}
          <div className="hjs hjs-r1" />
          <div className="hjs hjs-r2" />
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
            <p className="store-eyebrow">Support the server</p>
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
                <small>SERVER ADDRESS</small>
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
          <div className="footer-from">
            <span>Developed by</span>
            <a href="https://from.jakenetwork.xyz" target="_blank" rel="noreferrer" className="from-link" aria-label="from – jakenetwork.xyz">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="1.4 -768 2119.2 797"
              className="from-logo"
              aria-label="from"
              role="img"
            >
              <path fill="#FFFFFF" d="M32 0Q19 0 22 -13L123 -445Q132 -482 99 -482H78Q62 -482 62 -496Q62 -510 80 -510Q111 -510 126.5 -518Q142 -526 147 -550Q160 -607 185.5 -651.5Q211 -696 247 -722Q283 -748 326 -748Q361 -748 382.5 -731.5Q404 -715 404 -686Q404 -664 392.5 -650.5Q381 -637 364 -637Q343 -637 336.5 -649Q330 -661 328.5 -677Q327 -693 322 -705Q317 -717 299 -717Q276 -717 258.5 -694.5Q241 -672 227 -610L207 -523Q204 -510 218 -510H298Q317 -510 313 -496Q310 -482 295 -482H208Q198 -482 195 -472L88 -11Q85 0 74 0ZM337 0Q323 0 326 -13L421 -412Q426 -434 422.5 -446.5Q419 -459 404 -459Q386 -459 364.5 -432.5Q343 -406 316 -332Q312 -319 302 -319Q287 -319 294 -337Q316 -406 340.5 -445Q365 -484 390 -500Q415 -516 436 -516Q469 -516 483 -491.5Q497 -467 484 -411L473 -364Q472 -357 476 -356Q480 -355 483 -361Q521 -448 552 -482Q583 -516 623 -516Q650 -516 663.5 -501.5Q677 -487 677 -462Q677 -437 665 -422Q653 -407 634 -407Q618 -407 611 -415Q604 -423 600.5 -433.5Q597 -444 593 -452Q589 -460 580 -460Q565 -460 541 -422Q517 -384 489.5 -319.5Q462 -255 436.5 -175Q411 -95 392 -11Q389 0 378 0ZM795 9Q733 9 697 -42.5Q661 -94 661 -182Q661 -247 682 -307Q703 -367 737.5 -414Q772 -461 814.5 -488.5Q857 -516 900 -516Q962 -516 998 -465Q1034 -414 1034 -325Q1034 -260 1013 -200Q992 -140 957.5 -93Q923 -46 880.5 -18.5Q838 9 795 9ZM793 -15Q825 -15 855.5 -46Q886 -77 911 -128Q936 -179 951 -241.5Q966 -304 966 -367Q966 -492 901 -492Q870 -492 839 -461.5Q808 -431 783.5 -380Q759 -329 744 -266.5Q729 -204 729 -141Q729 -15 793 -15ZM1646 9Q1610 9 1592 -21Q1574 -51 1590 -114L1667 -404Q1678 -443 1670.5 -458Q1663 -473 1649 -473Q1629 -473 1603 -445.5Q1577 -418 1548.5 -371Q1520 -324 1493 -264Q1466 -204 1443 -139Q1420 -74 1405 -11Q1402 0 1391 0H1352Q1338 0 1341 -13L1433 -404Q1442 -443 1435.5 -458Q1429 -473 1415 -473Q1396 -473 1370 -445.5Q1344 -418 1316 -371Q1288 -324 1261 -264Q1234 -204 1211 -139Q1188 -74 1174 -11Q1171 0 1160 0H1119Q1105 0 1108 -13L1203 -412Q1208 -434 1204.5 -446.5Q1201 -459 1186 -459Q1168 -459 1146.5 -432.5Q1125 -406 1098 -332Q1094 -319 1084 -319Q1069 -319 1076 -337Q1098 -406 1122.5 -445Q1147 -484 1172 -500Q1197 -516 1218 -516Q1251 -516 1265 -491.5Q1279 -467 1266 -411L1241 -303Q1240 -296 1244 -295Q1248 -294 1251 -300Q1309 -420 1356 -468Q1403 -516 1442 -516Q1479 -516 1494.5 -486Q1510 -456 1496 -394L1475 -303Q1474 -296 1478 -295Q1482 -294 1485 -300Q1523 -381 1556.5 -428.5Q1590 -476 1620 -496Q1650 -516 1676 -516Q1713 -516 1730 -486Q1747 -456 1730 -394L1654 -104Q1647 -76 1653 -62Q1659 -48 1675 -48Q1695 -48 1714.5 -74.5Q1734 -101 1755 -175Q1758 -186 1768 -186Q1776 -186 1777.5 -180Q1779 -174 1777 -166Q1758 -98 1736 -59.5Q1714 -21 1691.5 -6Q1669 9 1646 9Z"/>
              <path fill="#9FD6FF" transform="translate(1800.6 -525) scale(3.000)" d="M50 0c4 30 16 42 50 50-34 8-46 20-50 50-4-30-16-42-50-50C34 42 46 30 50 0z"/>
            </svg>
            </a>
          </div>
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
