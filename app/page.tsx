"use client";

import { useEffect, useState, useCallback, useMemo, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  getProjects,
  getServices,
  getReferences,
  getSkills,
  type SanityProject,
  type SanityService,
  type SanityReference,
  type SanitySkill,
} from "../lib/sanity";

const NAV_LINKS = [
  { href: "#uvod", label: "Úvod" },
  { href: "#o-mne", label: "O mně" },
  { href: "#dovednosti", label: "Dovednosti" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#sluzby", label: "Služby" },
  { href: "#reference", label: "Reference" },
  { href: "#kontakt", label: "Kontakt" },
];

const SCROLL_OFFSET = 90;

type Theme = "light" | "dark";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("uvod");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [services, setServices] = useState<SanityService[]>([]);
  const [references, setReferences] = useState<SanityReference[]>([]);
  const [skills, setSkills] = useState<SanitySkill[]>([]);

  // Načtení dat ze Sanity
  useEffect(() => {
    async function load() {
      try {
        const [p, s, r, sk] = await Promise.all([
          getProjects(),
          getServices(),
          getReferences(),
          getSkills(),
        ]);
        setProjects(p);
        setServices(s);
        setReferences(r);
        setSkills(sk);
      } catch (e) {
        console.error("Chyba při načítání dat ze Sanity:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Smooth scroll
  const handleSmoothScroll = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const targetId = e.currentTarget.getAttribute("href")?.substring(1);
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - SCROLL_OFFSET,
          behavior: "smooth",
        });
        setIsMenuOpen(false);
      }
    },
    []
  );

  // Aktivní sekce podle scrollu
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const onScroll = () => {
      const scrollY = window.scrollY + SCROLL_OFFSET + 10;
      let currentId = "uvod";

      sections.forEach((el) => {
        if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          currentId = el.id;
        }
      });

      setActiveSection(currentId);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Styl mobilního menu
  const mobileMenuStyles = useMemo(
    () => ({
      height: isMenuOpen ? "auto" : "0",
      opacity: isMenuOpen ? 1 : 0,
      pointerEvents: isMenuOpen ? "auto" as const : "none" as const,
    }),
    [isMenuOpen]
  );

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300",
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      )}
    >
      {/* Horní navigace */}
      <header
        className={cn(
          "sticky top-0 z-40 border-b backdrop-blur-xl",
          isDark
            ? "bg-slate-950/85 border-slate-800"
            : "bg-white/85 border-slate-200 shadow-sm"
        )}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
          {/* Logo / jméno */}
          <a
            href="#uvod"
            onClick={handleSmoothScroll}
            className="flex items-center gap-2"
          >
            <div
              className={cn(
                "h-9 w-9 rounded-2xl flex items-center justify-center text-sm font-semibold",
                isDark ? "bg-indigo-500 text-white" : "bg-indigo-600 text-white"
              )}
            >
              JV
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">Jiří Veselý</span>
              <span className="text-xs text-slate-400">
                Full-stack vývojář &amp; konzultant
              </span>
            </div>
          </a>

          {/* Desktop navigace */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSmoothScroll}
                className={cn(
                  "transition-colors",
                  activeSection === link.href.slice(1)
                    ? isDark
                      ? "text-indigo-300"
                      : "text-indigo-600"
                    : isDark
                    ? "text-slate-300 hover:text-slate-100"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {link.label}
              </a>
            ))}

            {/* CTA */}
            <a
              href="#kontakt"
              onClick={handleSmoothScroll}
              className={cn(
                "ml-2 px-4 py-2 rounded-full text-xs font-medium shadow-sm transition-colors",
                isDark
                  ? "bg-indigo-500 text-white hover:bg-indigo-400"
                  : "bg-indigo-600 text-white hover:bg-indigo-500"
              )}
            >
              Domluvit konzultaci
            </a>

            {/* Přepínač tématu */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={cn(
                "ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs",
                isDark
                  ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                  : "border-slate-200 text-slate-600 hover:bg-slate-100"
              )}
              aria-label="Přepnout světlý / tmavý režim"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </nav>

          {/* Mobilní ovladače */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border text-base",
                isDark
                  ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                  : "border-slate-200 text-slate-700 hover:bg-slate-100"
              )}
              aria-label="Přepnout světlý / tmavý režim"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border text-lg",
                isDark
                  ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                  : "border-slate-200 text-slate-700 hover:bg-slate-100"
              )}
              aria-label="Otevřít menu"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobilní menu */}
        <nav
          style={mobileMenuStyles}
          className={cn(
            "md:hidden overflow-hidden transition-all duration-200 border-t",
            isDark ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
          )}
        >
          <div className="px-4 py-3 flex flex-col gap-1 text-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSmoothScroll}
                className={cn(
                  "rounded-lg px-2 py-2",
                  activeSection === link.href.slice(1)
                    ? isDark
                      ? "bg-slate-800 text-indigo-300"
                      : "bg-indigo-50 text-indigo-700"
                    : isDark
                    ? "text-slate-200 hover:bg-slate-900"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hlavní obsah */}
      <main className="max-w-6xl mx-auto px-4 pt-10 pb-20 space-y-24">
        {/* Úvod */}
        <section
          id="uvod"
          className="grid gap-10 md:grid-cols-[minmax(0,1.6fr),minmax(0,1.2fr)] items-center"
        >
          <div className="space-y-5">
            <p
              className={cn(
                "text-xs tracking-[0.2em] uppercase",
                isDark ? "text-indigo-300" : "text-indigo-500"
              )}
            >
              Ahoj, jsem Jirka
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Tvořím čisté, rychlé a promyšlené weby a aplikace.
            </h1>
            <p
              className={cn(
                "text-sm md:text-base max-w-xl",
                isDark ? "text-slate-300" : "text-slate-600"
              )}
            >
              Specializuji se na React / Next.js, headless CMS (Sanity) a moderní frontend.
              Pomůžu ti s prezentací, která vypadá profesionálně, je rychlá a snadno se spravuje.
            </p>

            <div className="flex flex-wrap gap-3 text-sm">
              <a
                href="#kontakt"
                onClick={handleSmoothScroll}
                className={cn(
                  "inline-flex items-center rounded-full px-5 py-2 font-medium shadow-sm",
                  isDark
                    ? "bg-indigo-500 text-white hover:bg-indigo-400"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                )}
              >
                Spolupracujme
              </a>
              <a
                href="#portfolio"
                onClick={handleSmoothScroll}
                className={cn(
                  "inline-flex items-center rounded-full px-5 py-2 border text-sm",
                  isDark
                    ? "border-slate-700 text-slate-100 hover:bg-slate-900"
                    : "border-slate-300 text-slate-800 hover:bg-slate-100"
                )}
              >
                Zobrazit projekty
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 text-xs md:text-sm">
              <div
                className={cn(
                  "rounded-2xl p-4 border",
                  isDark ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
                )}
              >
                <p className="font-semibold">Moderní stack</p>
                <p className={cn(isDark ? "text-slate-300" : "text-slate-500")}>
                  Next.js, TypeScript, Tailwind, Sanity – vše připravené pro škálování.
                </p>
              </div>
              <div
                className={cn(
                  "rounded-2xl p-4 border",
                  isDark ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white"
                )}
              >
                <p className="font-semibold">Byznysový pohled</p>
                <p className={cn(isDark ? "text-slate-300" : "text-slate-500")}>
                  Nejen kód, ale i praktický přístup – co ti reálně přinese výsledky.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className={cn(
                "rounded-3xl p-5 md:p-6 border shadow-xl",
                isDark
                  ? "border-slate-800 bg-slate-900/70 shadow-black/60"
                  : "border-slate-200 bg-white shadow-slate-900/5"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-slate-400">Náhled projektu</span>
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
                  • Live preview
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-800/10 bg-slate-950/80">
                <Image
                  src="https://placehold.co/800x480/020617/ffffff?text=Portfolio+Preview"
                  alt="Ukázka portfolia"
                  width={800}
                  height={480}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* O mně */}
        <section
          id="o-mne"
          className="grid md:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)] gap-10 items-center"
        >
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold">O mně</h2>
            <p
              className={cn(
                "text-sm md:text-base",
                isDark ? "text-slate-300" : "text-slate-600"
              )}
            >
              Jmenuji se Jiří Veselý. Spojuji technickou stránku vývoje s praktickým pohledem na to,
              co dává byznysově smysl. Myslím na výkon, bezpečnost i budoucí rozšiřování.
            </p>
            <p
              className={cn(
                "text-sm md:text-base",
                isDark ? "text-slate-300" : "text-slate-600"
              )}
            >
              Mám zkušenosti s návrhem architektury, integrací třetích stran, hostováním i nasazováním.
              Umím pomoct jak s novým projektem, tak s refaktoringem stávajícího řešení.
            </p>
          </div>
          <div className="flex justify-center">
            <div
              className={cn(
                "rounded-3xl p-5 border w-full max-w-sm text-sm",
                isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
              )}
            >
              <p className="text-xs text-slate-400 mb-2">Rychlý přehled</p>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Stack</span>
                  <span className="text-slate-400">React, Next.js, Node.js</span>
                </li>
                <li className="flex justify-between">
                  <span>Frontend</span>
                  <span className="text-slate-400">TypeScript, Tailwind</span>
                </li>
                <li className="flex justify-between">
                  <span>CMS</span>
                  <span className="text-slate-400">Sanity, Strapi, další</span>
                </li>
                <li className="flex justify-between">
                  <span>Forma spolupráce</span>
                  <span className="text-slate-400">Projektově / dlouhodobě</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Dovednosti */}
        <section id="dovednosti" className="space-y-4">
          <h2 className="text-xl font-semibold">Dovednosti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skills.length === 0 && !loading && (
              <p
                className={cn(
                  "text-sm col-span-full",
                  isDark ? "text-slate-400" : "text-slate-500"
                )}
              >
                Zatím nemáš ve studiu žádné dovednosti – přidej dokumenty typu{" "}
                <strong>skill</strong>.
              </p>
            )}
            {skills.map((skill) => (
              <div
                key={skill._id}
                className={cn(
                  "rounded-2xl px-3 py-2 text-xs flex items-center gap-2 border",
                  isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
                )}
              >
                <span className="text-lg">
                  {(skill as any).emoji || (skill as any).icon || "💡"}
                </span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="space-y-4">
          <h2 className="text-xl font-semibold">Vybrané projekty</h2>
          {projects.length === 0 && !loading && (
            <p
              className={cn(
                "text-sm",
                isDark ? "text-slate-400" : "text-slate-500"
              )}
            >
              Zatím nemáš ve studiu žádné projekty – přidej dokumenty typu{" "}
              <strong>project</strong>.
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <article
                key={p._id}
                className={cn(
                  "rounded-2xl overflow-hidden border flex flex-col",
                  isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
                )}
              >
                {p.imageUrl && (
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col gap-2">
                  <Link href={`/projekty/${p.slug?.current || ""}`}>
                    <h3
                      className={cn(
                        "text-sm font-semibold",
                        isDark
                          ? "text-slate-50 hover:text-indigo-300"
                          : "text-slate-900 hover:text-indigo-600"
                      )}
                    >
                      {p.title}
                    </h3>
                  </Link>
                  {p.description && (
                    <p
                      className={cn(
                        "text-xs",
                        isDark ? "text-slate-300" : "text-slate-600"
                      )}
                    >
                      {p.description}
                    </p>
                  )}
                  <Link
                    href={`/projekty/${p.slug?.current || ""}`}
                    className={cn(
                      "mt-1 text-xs font-medium inline-flex items-center gap-1",
                      isDark ? "text-indigo-300" : "text-indigo-600"
                    )}
                  >
                    Detail projektu <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Služby */}
        <section id="sluzby" className="space-y-4">
          <h2 className="text-xl font-semibold">Služby</h2>
          {services.length === 0 && !loading && (
            <p
              className={cn(
                "text-sm",
                isDark ? "text-slate-400" : "text-slate-500"
              )}
            >
              Přidej dokumenty typu <strong>service</strong> a zobrazí se tady jako
              nabídka služeb.
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s) => (
              <article
                key={s._id}
                className={cn(
                  "rounded-2xl p-4 space-y-2 border",
                  isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{(s as any).icon || "🛠️"}</span>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                </div>
                {(s as any).shortDescription && (
                  <p
                    className={cn(
                      "text-xs",
                      isDark ? "text-slate-300" : "text-slate-600"
                    )}
                  >
                    {(s as any).shortDescription}
                  </p>
                )}
                {(s as any).description && !(s as any).shortDescription && (
                  <p
                    className={cn(
                      "text-xs",
                      isDark ? "text-slate-300" : "text-slate-600"
                    )}
                  >
                    {(s as any).description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Reference */}
        <section id="reference" className="space-y-4">
          <h2 className="text-xl font-semibold">Reference</h2>
          {references.length === 0 && !loading && (
            <p
              className={cn(
                "text-sm",
                isDark ? "text-slate-400" : "text-slate-500"
              )}
            >
              Až přidáš do studia dokumenty typu <strong>reference</strong>, zobrazí se
              tady doporučení a testimonialy.
            </p>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            {references.map((r) => (
              <figure
                key={r._id}
                className={cn(
                  "rounded-2xl p-4 border space-y-2",
                  isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
                )}
              >
                <blockquote
                  className={cn(
                    "text-sm",
                    isDark ? "text-slate-200" : "text-slate-700"
                  )}
                >
                  „{(r as any).quote || (r as any).text}“
                </blockquote>
                <figcaption
                  className={cn(
                    "text-xs",
                    isDark ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  {r.name}
                  {(r as any).company && <> · {(r as any).company}</>}
                  {(r as any).role && <> – {(r as any).role}</>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Kontakt */}
        <section id="kontakt" className="space-y-4">
          <h2 className="text-xl font-semibold">Ozvi se</h2>
          <p
            className={cn(
              "text-sm max-w-xl",
              isDark ? "text-slate-300" : "text-slate-600"
            )}
          >
            Máš projekt, který bys chtěl konzultovat nebo rozjet? Nech mi na sebe kontakt a
            krátce popiš, o co jde. Ozvu se ti s návrhem dalšího postupu.
          </p>
          <div
            className={cn(
              "max-w-xl rounded-3xl p-5 border",
              isDark ? "border-slate-800 bg-slate-900/70" : "border-slate-200 bg-white"
            )}
          >
            <form className="space-y-3 text-sm">
              <div className="space-y-1">
                <label
                  className={cn(
                    "block text-xs font-medium",
                    isDark ? "text-slate-300" : "text-slate-600"
                  )}
                >
                  Jméno
                </label>
                <input
                  type="text"
                  required
                  className={cn(
                    "w-full rounded-xl px-3 py-2 border text-sm outline-none",
                    isDark
                      ? "border-slate-700 bg-slate-950/60 text-slate-50 placeholder:text-slate-500 focus:border-indigo-400"
                      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500"
                  )}
                  placeholder="Jak ti mám říkat?"
                />
              </div>
              <div className="space-y-1">
                <label
                  className={cn(
                    "block text-xs font-medium",
                    isDark ? "text-slate-300" : "text-slate-600"
                  )}
                >
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  className={cn(
                    "w-full rounded-xl px-3 py-2 border text-sm outline-none",
                    isDark
                      ? "border-slate-700 bg-slate-950/60 text-slate-50 placeholder:text-slate-500 focus:border-indigo-400"
                      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500"
                  )}
                  placeholder="kam ti mám napsat zpět?"
                />
              </div>
              <div className="space-y-1">
                <label
                  className={cn(
                    "block text-xs font-medium",
                    isDark ? "text-slate-300" : "text-slate-600"
                  )}
                >
                  Zpráva
                </label>
                <textarea
                  required
                  rows={4}
                  className={cn(
                    "w-full rounded-xl px-3 py-2 border text-sm resize-none outline-none",
                    isDark
                      ? "border-slate-700 bg-slate-950/60 text-slate-50 placeholder:text-slate-500 focus:border-indigo-400"
                      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500"
                  )}
                  placeholder="Stručně popiš projekt nebo otázku."
                />
              </div>
              <button
                type="submit"
                className={cn(
                  "mt-2 w-full rounded-full py-2.5 text-sm font-medium shadow-sm",
                  isDark
                    ? "bg-indigo-500 text-white hover:bg-indigo-400"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                )}
              >
                Odeslat zprávu
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
