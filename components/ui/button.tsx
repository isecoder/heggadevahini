import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "danger";
}

export function Button({ variant = "default", className, ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-all";
  const variants = {
    default: "bg-gray-200 hover:bg-gray-300 text-black",
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}
