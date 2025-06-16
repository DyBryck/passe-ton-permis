import { redirect } from "react-router";
import { supabase } from "../lib/supabase";

export const formatDateToDatetimeLocal = (date) => {
  const pad = (n) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const hexToRgbString = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
};

export const rgbStringToHex = (rgb) => {
  const [r, g, b] = rgb.split(" ").map(Number);
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
};

export async function requireAuth() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (err) {
    console.error("Auth check failed:", err);
    throw redirect("/connexion");
  }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw new Error("Impossible de récupérer l'utilisateur.");
  }

  if (!data.user) {
    throw new Error("Aucun utilisateur authentifié.");
  }

  return data.user;
}
