import { forwardRef } from "react";

const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Card({ className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`rounded-2xl bg-surface border border-border p-5 md:p-6 transition-colors hover:border-primary/40 ${className}`}
      {...props}
    />
  );
});

export default Card;