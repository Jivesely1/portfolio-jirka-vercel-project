import "./globals.css"
import { ThemeProvider } from "next-themes"

export const metadata = {
  title: "Portfolio Jirka Veselý",
  description: "Full-stack vývojář",
}

import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className="bg-slate-950 text-slate-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
