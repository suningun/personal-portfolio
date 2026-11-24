import Reveal from "@/components/ui/Reveal";

export default function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <Reveal>
        <div className="mb-12 text-center">
          <p className="font-mono text-sm text-green">{eyebrow}</p>
          <h2 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight text-text">
            {title}
          </h2>
        </div>
        {children}
      </Reveal>
    </section>
  );
}


