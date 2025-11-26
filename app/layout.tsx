import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import Header from "../components/Header"; // Uprav cestu podle projektu
import CookieBar from "../components/CookieBar";

export const metadata = {
  title: "Portfolio Jirka Veselý",
  description: "Full-stack vývojář",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      {/* Light/Dark pozadí řeší TAILWIND, ne natvrdo barvy */}
      <body className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
<CookieBar />
          {/* Obsah */}
          <main className="pt-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
