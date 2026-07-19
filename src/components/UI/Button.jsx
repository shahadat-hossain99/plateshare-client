import React from "react";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  // Modern buttons use smaller, crisper text (text-sm) with slightly tighter tracking,
  // precise padding, active click scales, and clear focus rings for accessibility.
  const baseStyle =
    "inline-flex items-center justify-center gap-2 rounded-4xl px-4 py-2 text-sm font-medium tracking-tight shadow-sm transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    // Adds a subtle inner border (via ring) to make the solid button pop
    primary:
      "bg-[var(--primary)] text-white ring-1 ring-inset ring-white/10 hover:bg-[var(--primary)]/90",

    secondary:
      "bg-[var(--secondary)] text-white ring-1 ring-inset ring-white/10 hover:bg-[var(--secondary)]/90",

    // Replaced the harsh solid border with a subtle border and softer hover background
    outline:
      "border border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/5",

    danger:
      "bg-red-600 text-white ring-1 ring-inset ring-red-500/20 hover:bg-red-500",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
