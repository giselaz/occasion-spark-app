import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const axiosInstance = axios.create({
  baseURL: "https://event-system-yb18.onrender.com",
  // baseURL: "http://localhost:4000",
});
