import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getName = (fullName) => {
  if (typeof fullName !== "string") {
    return "";
  }

  return fullName
    .split(" ")
    .filter((word) => word.length > 0)
    .join("");
};
