import { SERVER_NAME, STAFF } from "@/data/site";

export function StaffSection() {
  return (
    <section id="staff" className="section">
      <div className="container">
        <h2 className="title">
          Meet the <span className="hl">Staff</span>
        </h2>
        <p className="sub">The team keeping the fire burning.</p>
        <div className="grid4">
          {STAFF.map((s) => (
            <div className="card staff" key={s.name}>
              <img
                src={`https://mc-heads.net/avatar/${s.name}/96`}
                alt={s.name}
                width={96}
                height={96}
              />
              <h3>{s.name}</h3>
              <span className="role" style={{ background: s.color }}>{s.role}</span>
            </div>
          ))}
        </div>
        <p className="note">Replace the names above with your real Minecraft usernames to show their skins.</p>
      </div>
    </section>
  );
}
