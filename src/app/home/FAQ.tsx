const faqs = [
  {
    question: "What technologies do you work with?",
    answer:
      "Across my real projects: Python and C++ (ml-from-scratch), JavaScript/TypeScript with Docker and CI (map_scraper_systems), data and ML tooling including a neural-net component (pretty_fly_analytics), plus Arduino (Line-Following-Robot) and Minecraft Bedrock addon development (Scythe-add-on_minecraft-mod).",
  },
  {
    question: "Are you open to freelance or collaboration?",
    // TODO(visesh): confirm real current availability/timeline before shipping — the line below is a placeholder, not a commitment.
    answer:
      "Reach out via the Contact page with what you have in mind and I'll let you know if the timing works.",
  },
  {
    question: "Can I see your past work or code?",
    answer: "Yes — check out my Projects page, or browse the repos directly at github.com/Laluboom.",
  },
  {
    question: "Do you do design as well?",
    answer: "My focus is more on the engineering side — full-stack apps, ML fundamentals, and automation systems — rather than visual/UI design.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="mb-8 text-3xl">FAQ</h2>

        <div className="flex flex-col gap-4">
          {faqs.map((item) => (
            <details key={item.question} className="box">
              <summary className="font-bold">{item.question}</summary>
              <p className="mt-4">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
