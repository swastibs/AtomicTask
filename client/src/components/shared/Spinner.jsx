import { Loader2 } from "lucide-react";

/**
 * Reusable Spinner Component
 * Used for loading states across the app
 *
 * @param {string} size - 'sm', 'default', 'lg', 'xl'
 * @param {string} className - Additional Tailwind classes
 * @param {string} color - Tailwind text color class (default: 'text-primary')
 */
export function Spinner({
  size = "default",
  className = "",
  color = "text-primary",
}) {
  const sizeClasses = {
    sm: "size-4",
    default: "size-8",
    lg: "size-12",
    xl: "size-16",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]} ${color}`} />
    </div>
  );
}

export default Spinner;
