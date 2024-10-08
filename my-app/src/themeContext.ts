// themeContext.ts
import React from "react";

export const themes = {
  light: {
    foreground: "#000000",
    background: "lightgrey",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

// From React docs, the defaultValue parameter is meant as a
// "last resort" fallback.
export const ThemeContext = React.createContext(themes.light);
