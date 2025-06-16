import { useEffect, useState } from "react";

export function useThemeColor() {
  const [color, setColor] = useState(() => {
    return localStorage.getItem("theme-color") || "5 163 240";
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", color);
    localStorage.setItem("theme-color", color);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      const rgb = `rgb(${color.trim().replace(/\s+/g, ", ")})`;
      meta.setAttribute("content", rgb);
    }
  }, [color]);

  return [color, setColor];
}
