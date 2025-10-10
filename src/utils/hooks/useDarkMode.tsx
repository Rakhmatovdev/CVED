import { useEffect, useState } from "react";

export default function useDarkMode() {
  const getCurrentTheme = () => {
    if (typeof window === "undefined") return "light";
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    const updateThemeFromClass = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    const observer = new MutationObserver(updateThemeFromClass);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    const onStorageChange = (e) => {
      if (e.key === "theme") updateThemeFromClass();
    };
    window.addEventListener("storage", onStorageChange);
    updateThemeFromClass();

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return { theme, isDarkMode: theme === "dark" };
}
