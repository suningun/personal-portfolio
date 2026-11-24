import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonProps = {
  variant: "primary" | "outline";
  children: ReactNode;
  className?: string;
  href?: string;
  download?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  variant,
  children,
  className = "",
  href,
  download,
  ...props
}: ButtonProps) {
  const classes =
    variant === "primary"
      ? "h-12 px-6 rounded-full font-mono text-sm bg-primary text-on-primary hover:brightness-110"
      : "h-12 px-6 rounded-full font-mono text-sm border border-border text-text hover:border-primary";

  if (href) {
    return (
      <a
        href={href}
        download={download}
        className={`${classes} ${className}`}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${classes} ${className}`}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}