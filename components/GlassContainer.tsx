import React from "react";
import { cn } from "@/lib/utils"; // Assuming this utility exists, as is common in Next.js projects

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  intensity?: "thin" | "regular" | "thick";
  className?: string;
  as?: React.ElementType;
  [key: string]: unknown;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  intensity = "regular",
  className,
  as: Component = "div",
  ...props
}) => {
  const intensityStyles = {
    thin: "bg-material-thin backdrop-blur-glass-thin",
    regular: "bg-material-regular backdrop-blur-glass-regular",
    thick: "bg-material-thick backdrop-blur-glass-thick",
  };

  return (
    <Component
      className={cn(
        "rounded-2xl border border-glass-border shadow-glass-sheen transition-all duration-300",
        intensityStyles[intensity],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
