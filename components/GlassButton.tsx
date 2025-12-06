import React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center transition-all duration-300 active:scale-95 font-medium disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-material-regular hover:bg-material-thick text-text-main border-glass-border",
    secondary:
      "bg-material-thin hover:bg-material-regular text-text-muted hover:text-text-main border-transparent hover:border-glass-border",
    ghost:
      "bg-transparent hover:bg-material-thin text-text-muted hover:text-text-main border-transparent",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-lg",
    md: "h-11 px-6 text-base rounded-xl",
    lg: "h-14 px-8 text-lg rounded-2xl",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        "border backdrop-blur-glass-thin shadow-glass-sheen hover:shadow-glass-hover hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
