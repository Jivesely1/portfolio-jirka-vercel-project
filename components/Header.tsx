"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonStar, SunMedium, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#uvod", label: "Úvod" },
  { href: "/#o-mne", label: "O mně" },
  { href: "/#dovednosti", label: "Dovednosti" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#sluzby", label: "Služby" },
  { href: "/#reference", label: "Reference" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50
        backdrop-blur-xl 
        bg-white/80 dark:bg-brand-bgDark/80
        border-b border-black/[0.06] dark:border-white/[0.06]
        shadow-[0_6px_20px_rgba(0,0,0,0.06)]
      "
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="
            text-2xl font-extrabold tracking-tight
            text-brand-text dark:text-white
          "
        >
          JIRKA <span className="text-brand-accent">VESELÝ</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                relative text-[17px] font-semibold
                text-brand-text dark:text-brand-textDark
                group transition-colors
              "
            >
              {link.label}

              <span
                className="
                  absolute left-0 -bottom-1 h-[2px] w-0 
                  bg-brand-accent rounded-full
                  transition-all duration-300 group-hover:w-full
                "
              />
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* THEME SWITCH */}
          <button
            onClick={toggleTheme}
            className="
              w-10 h-10 flex items-center justify-center rounded-full
              border border-black/10 dark:border-white/10
              hover:bg-black/5 dark:hover:bg-white/10
              transition-all
            "
          >
            {theme === "dark" ? (
              <SunMedium size={22} className="text-yellow-300" />
            ) : (
              <MoonStar size={22} className="text-slate-700" />
            )}
          </button>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden w-10 h-10 flex items-center justify-center rounded-full
              border border-black/10 dark:border-white/10
              hover:bg-black/5 dark:hover:bg-white/10
              transition-all
            "
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION PANEL */}
      {open && (
        <div
          className="
            md:hidden border-t border-black/10 dark:border-white/10
            bg-white/95 dark:bg-brand-bgDark/95 backdrop-blur-xl
          "
        >
          <nav className="flex flex-col px-6 py-4 gap-3 text-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="
                  py-2
                  text-brand-text dark:text-brand-textDark
                  font-semibold
                  hover:text-brand-accent dark:hover:text-brand-accentHover
                  transition-colors
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
