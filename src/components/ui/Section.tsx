import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Section({
  title,
  command,
  children,
}: {
  title: string;
  command: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
      <Reveal>
        <SectionHeader command={command} title={title} />
        {children}
      </Reveal>
    </div>
  );
}


