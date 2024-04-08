// src/hooks/useDarkMode.ts

import {useEffect, useState, Dispatch} from "react";

export default function useDarkMode(): [string, Dispatch<string>] {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // save theme to local storage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
