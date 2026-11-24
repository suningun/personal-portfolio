import { forwardRef, type ReactNode } from "react";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

type ChipProps = (
  | ButtonHTMLAttributes<HTMLButtonElement>
  | HTMLAttributes<HTMLSpanElement>
) & {
  children?: ReactNode;
  interactive?: boolean;
  as?: "button" | "span";
};

const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  {
    interactive = false,
    as = "button",
    className = "",
    children,
    ...props
  },
  ref,
) {
  const classes = `inline-flex items-center font-mono text-sm px-3 py-1 rounded-full bg-bg border border-border text-text ${
    interactive ? "hover:border-primary hover:text-primary" : ""
  } ${className}`;

  if (as === "span") {
    return (
      <span className={classes} {...(props as HTMLAttributes<HTMLSpanElement>)}>
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      ref={ref}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});

export default Chip;
