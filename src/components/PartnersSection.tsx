import { PARTNERS } from "@/data/site";

export function PartnersSection() {
  const looped = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <div className="partners-band">
      <div className="partners-eyebrow">
        <span className="partners-rule" />
        OFFICIAL FLARO PARTNERS
        <span className="partners-rule" />
      </div>
      <div className="partners-marquee-wrap">
        <div className="partners-marquee">
          {looped.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noreferrer" className="partner-item">
              <img src={p.logo} alt={p.name} className="partner-avatar" />
              <span className="partner-item-name">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
