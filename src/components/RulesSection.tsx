import { RULES } from "@/data/site";

export function RulesSection() {
  return (
    <section id="rules" className="section alt">
      <div className="container">
        <h2 className="title">
          Server <span className="hl">Rules</span>
        </h2>
        <p className="sub">Keep it fair and fun for everyone.</p>
        <div className="rules">
          {RULES.map((r, i) => (
            <div className="rule" key={i}>
              <span className="num">{i + 1}</span>
              <p>{r}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
