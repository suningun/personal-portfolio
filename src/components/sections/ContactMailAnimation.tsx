"use client";

export default function ContactMailAnimation({ active }: { active: boolean }) {
  return (
    <div className="relative h-16 w-full lg:flex-1">
      <div className="absolute left-0 right-20 top-1/2 border-t-2 border-dashed border-border" />
      <span
        className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary transition-[left,opacity] duration-[900ms] ease-in-out motion-reduce:transition-none ${
          active ? "opacity-100" : "opacity-0"
        }`}
        style={{ left: active ? "calc(100% - 5.5rem)" : "0.25rem" }}
      />
      <span className="absolute right-0 top-1/2 grid h-20 w-28 -translate-y-1/2 place-items-center rounded-2xl border-2 border-lavender text-xl text-text">
        API
      </span>
    </div>
  );
}
