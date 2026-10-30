import { RANKS, SHARDS, STORE_URL } from "@/data/site";
import type { ShardPackage } from "@/data/site";

function RankPerkRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rank-row">
      <span className="rank-row-label">
        {label}
        {note && <small>{note}</small>}
      </span>
      <span className="rank-row-val">{value}</span>
    </div>
  );
}

function ShardCard({ shard }: { shard: ShardPackage }) {
  return (
    <a href={STORE_URL} target="_blank" rel="noreferrer" className={`shard-card${shard.bonus ? " shard-featured" : ""}`}>
      {shard.bonus && <span className="shard-bonus">{shard.bonus}</span>}
      <img src="/shards.png" alt="Shards" className="shard-img" />
      <div className="shard-amount">
        {shard.base != null && <s>{shard.base.toLocaleString()}</s>}
        {shard.amount.toLocaleString()}
      </div>
      <div className="shard-label">Shards</div>
      <div className="shard-divider" />
      <div className="shard-price">
        {shard.price} <span className="shard-usd">USD</span>
      </div>
    </a>
  );
}

export function StoreSection() {
  return (
    <section id="store" className="section alt">
      <div className="container">
        <div className="store-header">
          <h2 className="store-title">Ranks &amp; bundles</h2>
          <span className="store-sub">Find your next upgrade.</span>
        </div>

        <div className="rank-grid">
          {RANKS.map((r) => (
            <div className={`rank-card${r.featured ? " rank-featured" : ""}`} key={r.name}>
              {r.badge && <div className="rank-badge-bar">{r.badge}</div>}
              <div className="rank-card-body">
                <h3 className="rank-name">{r.name}</h3>
                {r.shards != null && (
                  <div className="rank-shards-block">
                    <div>
                      <span className="rank-shards-num">{r.shards.toLocaleString()}</span>
                      <span className="rank-shards-lbl">Shards included</span>
                    </div>
                    <img src="/shards.png" alt="Shards" className="rank-shards-img" />
                  </div>
                )}
                <div className="rank-perk-list">
                  {r.perks.map((p) => (
                    <RankPerkRow key={p.label} {...p} />
                  ))}
                </div>
              </div>
              <a href={r.link} target="_blank" rel="noreferrer" className={`rank-buy-btn${r.featured ? " rank-buy-featured" : ""}`}>
                <span className="rank-buy-price">{r.price}</span>
                <span className="rank-buy-usd">USD</span>
                <span className="rank-buy-period">/month</span>
              </a>
            </div>
          ))}
        </div>

      </div>

      <div className="shards-section">
        <div className="container">
          <div className="shards-header">
            <h2 className="title">
              Get some <span className="hl">Shards</span>
            </h2>
            <p className="sub">Use shards to unlock cosmetics, boosters and special in-game items.</p>
          </div>

          <div className="shards-grid">
            {SHARDS.map((s) => (
              <ShardCard key={s.amount} shard={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
