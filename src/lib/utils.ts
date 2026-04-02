import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitário para combinar de forma inteligence classes Tailwind
 * e lidar com conflitos (essencial para componentes flexíveis).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
