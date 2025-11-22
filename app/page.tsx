'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useMemo, type MouseEvent } from "react";
import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

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
  { href: "#kontakt", label: "Kontakt" },
];

const SCROLL_OFFSET = 120;

const fadeInVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("uvod");

  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [services, setServices] = useState<SanityService[]>([]);
  const [references, setReferences] = useState<SanityReference[]>([]);
  const [skills, setSkills] = useState<SanitySkill[]>([]);

  // Načtení dat z CMS
  useEffect(() => {
    const loadData = async () => {
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
      setLoading(false);
    };
    loadData();
  }, []);

  // Smooth scroll
  const handleSmoothScroll = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const targetId = e.currentTarget.getAttribute("href")?.substring(1);
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - SCROLL_OFFSET, behavior: "smooth" });
        setIsMenuOpen(false);
      }
    },
    []
  );

  // Aktivní sekce podle scrollu
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const onScroll = () => {
      let currentId = "";
      const scrollY = window.scrollY + SCROLL_OFFSET + 10;

      sections.forEach((el) => {
        if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          currentId = el.id;
        }
      });

      setActiveSection(currentId || "uvod");
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Styl mobilního menu
  const mobileMenuStyles = useMemo(
    (): CSSProperties => ({
      height: isMenuOpen ? "auto" : "0",
      opacity: isMenuOpen ? 1 : 0,
      pointerEvents: isMenuOpen ? "auto" : "none",
    }),
    [isMenuOpen]
  );

  return (
    <div className="font-sans text-gray-800 bg-gray-50 relative">
      {/* Loading Overlay */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="fixed inset-0 flex items-center justify-center bg-indigo-700 z-[100] text-white text-4xl font-extrabold"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          >
            Jirka Veselý 💻
          </motion.span>
        </motion.div>
      )}

      {/* Navigace */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-indigo-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 h-16">
          <a
            href="#uvod"
            onClick={handleSmoothScroll}
            className="text-xl sm:text-2xl font-extrabold text-indigo-700"
          >
            &lt;JirkaVeselý /&gt;
          </a>

          {/* Mobilní burger */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden text-3xl p-2 text-gray-700 hover:bg-indigo-100 rounded-lg"
            aria-label="Otevřít menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop menu */}
          <nav className="hidden md:flex gap-6 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSmoothScroll}
                className={`transition-colors hover:text-indigo-600 ${
                  activeSection === link.href.slice(1)
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={handleSmoothScroll}
              className="ml-4 px-5 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700"
            >
              Spolupracujme
            </a>
          </nav>
        </div>

        {/* Mobilní menu */}
        <nav
          style={mobileMenuStyles}
          className="md:hidden bg-white shadow-lg border-t border-indigo-100 overflow-hidden transition-all duration-300"
        >
          <div className="flex flex-col px-4 pt-2 pb-4 gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSmoothScroll}
                className={`block py-2 px-2 rounded-lg ${
                  activeSection === link.href.slice(1)
                    ? "bg-indigo-100 text-indigo-700 font-semibold"
                    : "text-gray-700 hover:bg-indigo-50"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={handleSmoothScroll}
              className="mt-2 block text-center px-4 py-2 bg-indigo-600 text-white rounded-full"
            >
              Mám zájem o web
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Úvod */}
        <motion.section
          id="uvod"
          className="bg-gradient-to-br from-indigo-50 to-white py-16 md:py-24 min-h-[75vh] flex items-center"
          variants={fadeInVariants}
          initial="initial"
          whileInView="animate"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center px-4">
            {/* Text */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
                Váš <span className="text-indigo-600">Full-Stack</span> partner pro inovace
              </h1>
              <p className="text-base sm:text-lg mb-8 text-gray-600">
                Přeměňuji nápady na výkonné webové aplikace s elegantním kódem a skvělým UX.
              </p>
              <a
                href="#kontakt"
                onClick={handleSmoothScroll}
                className="inline-block px-6 sm:px-8 py-3 bg-indigo-600 text-white text-lg font-bold rounded-full shadow-xl hover:bg-indigo-700"
              >
                Mám zájem o web
              </a>
            </div>

            {/* Obrázek */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <Image
                src="https://placehold.co/600x480/4f46e5/ffffff?text=Notebook"
                alt="Notebook s kódem"
                width={600}
                height={480}
                className="w-full h-auto max-w-sm sm:max-w-md rounded-3xl shadow-2xl border-4 border-white"
                priority
              />
            </motion.div>
          </div>
        </motion.section>

        {/* O mně */}
        <motion.section
          id="o-mne"
          className="py-16 md:py-20 bg-white"
          variants={fadeInVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-10 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-indigo-600">
                Kdo jsem a co dělám?
              </h3>
              <p className="text-gray-700 mb-4 text-base sm:text-lg">
                Specializuji se na kompletní vývoj webových aplikací — od Next.js frontendů po
                Node.js backendy.
              </p>
              <p className="text-gray-500 text-sm">
                Každý projekt je pro mě výzvou použít nejnovější a nejefektivnější technologie.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05, rotate: 3 }}>
              <Image
                src="https://placehold.co/200x200/4f46e5/ffffff?text=Jirka+Vesel%C3%BD"
                alt="Jirka Veselý"
                width={200}
                height={200}
                className="rounded-full w-40 h-40 sm:w-48 sm:h-48 object-cover mx-auto border-4 border-indigo-200 shadow-xl"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Dovednosti */}
        <section id="dovednosti" className="py-16 bg-gray-100 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Můj technologický Stack 🛠️</h3>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
            {skills.length === 0 ? (
              <p className="text-gray-500">Načítám dovednosti...</p>
            ) : (
              skills.map((s) => (
                <motion.div
                  key={s._id}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 sm:px-6 py-2 sm:py-3 border-2 border-indigo-400 text-indigo-700 font-bold rounded-full bg-white shadow-lg flex items-center gap-2 text-sm sm:text-base"
                >
                  <span>{s.icon ?? "💡"}</span> {s.name}
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="py-20 md:py-24 bg-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800">
            Vaše projekty, moje řešení 🏆
          </h3>

          {projects.length === 0 ? (
            <p className="text-gray-500">Načítám projekty...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
              {projects.map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ scale: 1.05, translateY: -4 }}
                  className="bg-gray-50 border border-indigo-100 shadow-xl rounded-2xl overflow-hidden group"
                >
                  {p.imageUrl && (
                    <motion.div
                      initial={{ opacity: 0.8 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-90"
                      />
                    </motion.div>
                  )}

                  <div className="p-5 sm:p-6 text-left">
                    <Link href={`/projekty/${p.slug?.current || ""}`}>
                      <h4 className="text-lg sm:text-xl font-bold text-indigo-600 mb-2 hover:underline">
                        {p.title}
                      </h4>
                    </Link>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      {p.description}
                    </p>
                    <Link
                      href={`/projekty/${p.slug?.current || ""}`}
                      className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 text-sm sm:text-base"
                    >
                      Zobrazit více
                      <span className="ml-1 text-lg">→</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Služby */}
        <section id="sluzby" className="py-20 md:py-24 bg-indigo-50 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-gray-800">
            Co pro vás mohu udělat?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto px-4">
            {services.length === 0 ? (
              <p className="text-gray-500">Načítám služby...</p>
            ) : (
              services.map((s) => (
                <motion.div
                  key={s._id}
                  whileHover={{ y: -8 }}
                  className="p-6 sm:p-8 rounded-3xl bg-white shadow-xl border-b-4 border-indigo-500 text-left"
                >
                  <div className="text-3xl sm:text-4xl mb-4">{s.icon}</div>
                  <h4 className="text-lg sm:text-xl font-bold mb-3 text-indigo-700">
                    {s.title}
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base">{s.description}</p>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Reference */}
        <section id="reference" className="py-20 md:py-24 bg-white text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-gray-800">
            Co o mně říkají klienti 🗣️
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
            {references.length === 0 ? (
              <p className="text-gray-500">Načítám reference...</p>
            ) : (
              references.map((r) => (
                <motion.div
                  key={r._id}
                  whileHover={{ y: -6 }}
                  className="p-6 sm:p-8 bg-gray-50 border border-gray-200 rounded-xl shadow-lg text-left"
                >
                  <p className="italic text-gray-700 mb-4 text-sm sm:text-base">“{r.text}”</p>
                  <h4 className="font-bold text-indigo-600 text-sm sm:text-base">{r.name}</h4>
                  <span className="text-xs sm:text-sm text-gray-500">{r.company}</span>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Kontakt */}
        <section id="kontakt" className="py-20 md:py-24 bg-indigo-600 text-white text-center">
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl text-gray-800">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-indigo-700">
              Pojďme to probrat!
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Napište mi a do 24 hodin se ozvu.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Tvé jméno *"
                className="w-full border rounded-lg p-3 text-sm sm:text-base"
                required
              />
              <input
                type="email"
                placeholder="Tvůj e-mail *"
                className="w-full border rounded-lg p-3 text-sm sm:text-base"
                required
              />
              <textarea
                placeholder="Tvá zpráva *"
                rows={5}
                className="w-full border rounded-lg p-3 text-sm sm:text-base"
                required
              ></textarea>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 text-sm sm:text-base">
                Odeslat zprávu
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
