import { FAQ } from "@/data/site";

export function FaqSection({ open, setOpen }: { open: number | null; setOpen: (value: number | null) => void }) {
  return (
    <section id="faq" className="section">
      <div className="container narrow">
        <h2 className="title">
          Frequently Asked <span className="hl">Questions</span>
        </h2>
        <div className="faq">
          {FAQ.map((f, i) => (
            <div className={`faq-item ${open === i ? "open" : ""}`} key={f.q}>
              <button onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <span>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <p>{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
