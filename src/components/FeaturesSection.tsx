import { FEATURES, SERVER_NAME } from "@/data/site";
import { Icon } from "@/components/Icon";

export function FeaturesSection() {
  return (
    <section id="features" className="section">
      <div className="container">
        <h2 className="title">
          Why Play <span className="hl">{SERVER_NAME}</span>?
        </h2>
        <p className="sub">Everything you need for a great survival experience.</p>
        <div className="grid3">
          {FEATURES.map((f) => (
            <div className="card" key={f.title}>
              <div className="icon">
                <Icon name={f.icon} size={30} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
