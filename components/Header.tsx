"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const NAV_LINKS = [
  { href: "#uvod", label: "Úvod" },
  { href: "#o-mne", label: "O mně" },
  { href: "#dovednosti", label: "Dovednosti" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#sluzby", label: "Služby" },
  { href: "#reference", label: "Reference" },
  { href: "#kontakt", label: "Kontakt" },
]

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-[50] backdrop-blur-xl border-b border-white/10 bg-slate-950/70 dark:bg-slate-900/70">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a
          href="#uvod"
          className="text-xl font-extrabold text-indigo-400 tracking-tight"
        >
          &lt;JirkaVeselý /&gt;
        </a>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-indigo-300 transition font-medium"
            >
              {link.label}
            </Link>
          ))}

          {/* THEME TOGGLE */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-slate-800 dark:bg-slate-200 text-slate-200 dark:text-slate-900 border border-slate-700 dark:border-slate-300 flex items-center justify-center shadow-md hover:shadow-lg transition"
          >
            {theme === "dark" ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="text-xl"
              >
                ☀️
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="text-xl"
              >
                🌙
              </motion.span>
            )}
          </motion.button>
        </nav>

        {/* mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-indigo-300"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-slate-900 dark:bg-slate-800 border-t border-slate-700"
        >
          <div className="flex flex-col p-4 gap-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-slate-300 hover:text-indigo-300 transition"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            {/* toggle také v mobilní verzi */}
            <button
              onClick={toggleTheme}
              className="mt-3 w-full py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-500 transition"
            >
              Přepnout motiv
            </button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
