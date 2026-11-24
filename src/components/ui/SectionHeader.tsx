export default function SectionHeader({
  command,
  title,
}: {
  command: string;
  title: string;
}) {
  return (
    <div className="mb-10">
      <p className="font-mono text-sm text-muted">
        <span className="text-green">❯</span> {command}
      </p>
      <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-text">
        {title}
      </h2>
    </div>
  );
}
