"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Import the types directly from the package
import { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}