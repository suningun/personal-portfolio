// src/components/Section.tsx
export default function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl sm:text-4xl font-bold mb-12 text-gradient text-center">
        {title}
      </h2>
      {children}
    </section>
  );
}


