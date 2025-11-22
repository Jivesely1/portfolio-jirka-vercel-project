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

// Navigace
const NAV_LINKS = [
  { href: "#uvod", label: "Úvod" },
  { href: "#o-mne", label: "O mně" },
  { href: "#dovednosti", label: "Dovednosti" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#sluzby", label: "Služby" },
  { href: "#reference", label: "Reference" },
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

  // Načtení dat ze Sanity
  useEffect(() => {
    async function load() {
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
    }
    load();
  }, []);

  // Smooth scroll
  const handleSmoothScroll = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const targetId = e.currentTarget.getAttribute("href")?.replace("#", "");
      const el = targetId ? document.getElementById(targetId) : null;
      if (el) {
        e.preventDefault();
        window.scrollTo({
          top: el.offsetTop - SCROLL_OFFSET,
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
      let currentId = "";
      const y = window.scrollY + SCROLL_OFFSET + 10;

      sections.forEach((el) => {
        if (y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
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
    <div className="font-sans bg-slate-950 text-slate-100">
      {/* LOADER */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 flex items-center justify-center bg-slate-950 z-[100] text-white text-4xl font-extrabold"
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

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">
          <a
            href="#uvod"
            onClick={handleSmoothScroll}
            className="text-2xl font-extrabold text-indigo-400"
          >
            &lt;JirkaVeselý /&gt;
          </a>

          {/* Mobilní — burger */}
          <button
            onClick={() => setIsMenuOpen((p) => !p)}
            className="md:hidden text-3xl p-2 text-indigo-300"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop navigace */}
          <nav className="hidden md:flex gap-6 text-sm items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSmoothScroll}
                className={`transition ${
                  activeSection === link.href.slice(1)
                    ? "text-indigo-400 font-semibold"
                    : "text-slate-300 hover:text-indigo-300"
                }`}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#kontakt"
              onClick={handleSmoothScroll}
              className="px-5 py-2 rounded-full bg-indigo-500 text-slate-950 font-semibold hover:bg-indigo-400 transition"
            >
              Spolupracujme
            </a>
          </nav>
        </div>

        {/* Mobilní menu */}
        <nav
          style={mobileMenuStyles}
          className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden transition-all duration-300"
        >
          <div className="flex flex-col p-4 gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSmoothScroll}
                className={`block py-2 rounded-lg ${
                  activeSection === link.href.slice(1)
                    ? "text-indigo-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* ÚVOD */}
      <motion.section
        id="uvod"
        className="min-h-[75vh] flex items-center bg-gradient-to-br from-indigo-900/20 to-slate-950 py-20"
        variants={fadeInVariants}
        initial="initial"
        whileInView="animate"
      >
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Váš{" "}
              <span className="text-indigo-400">
                Full-Stack
              </span>{" "}
              partner pro inovace
            </h1>

            <p className="text-slate-300 text-lg">
              Přeměňuji nápady na výkonné webové aplikace s elegantním kódem a moderním UX.
            </p>

            <a
              href="#kontakt"
              onClick={handleSmoothScroll}
              className="inline-block px-8 py-3 bg-indigo-500 text-slate-950 rounded-full font-bold hover:bg-indigo-400 transition"
            >
              Mám zájem o web
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <Image
              src="https://placehold.co/600x480/4f46e5/ffffff?text=Notebook"
              alt="Notebook"
              width={600}
              height={480}
              className="rounded-3xl shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* O MNĚ */}
      <motion.section
        id="o-mne"
        className="py-20 bg-slate-900"
        variants={fadeInVariants}
        initial="initial"
        whileInView="animate"
      >
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-3xl font-bold text-indigo-400">Kdo jsem?</h3>
            <p className="text-slate-300 text-lg">
              Specializuji se na kompletní vývoj webových aplikací — Next.js frontend,
              Node.js backend, API a integrace.
            </p>
            <p className="text-slate-400 text-sm">
              Každý projekt je příležitostí použít moderní nástroje a maximální výkon.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Image
              src="https://placehold.co/200x200/4f46e5/ffffff?text=Jirka"
              alt="Jirka Veselý"
              width={200}
              height={200}
              className="rounded-full mx-auto border-4 border-indigo-400 shadow-xl"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* DOVEDNOSTI */}
      <section id="dovednosti" className="py-20 bg-slate-950 text-center">
        <h3 className="text-3xl font-bold text-indigo-400 mb-10">Tech Stack 🛠️</h3>

        <div className="flex flex-wrap justify-center gap-3">
          {skills.length === 0 ? (
            <p className="text-slate-400">Načítám...</p>
          ) : (
            skills.map((skill) => (
              <motion.div
                key={skill._id}
                whileHover={{ scale: 1.1 }}
                className="px-5 py-2 border border-indigo-400 rounded-full bg-slate-900 shadow-md text-indigo-300 font-semibold"
              >
                {skill.icon ?? "💡"} {skill.name}
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 bg-slate-900">
        <h3 className="text-3xl font-bold text-center text-indigo-400 mb-10">
          Vybrané projekty 🏆
        </h3>

        {projects.length === 0 ? (
          <p className="text-center text-slate-400">Načítám...</p>
        ) : (
          <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {projects.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-2xl bg-slate-800 border border-slate-700 shadow-xl overflow-hidden"
              >
                {p.imageUrl && (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                  />
                )}

                <div className="p-6">
                  <Link href={`/projekty/${p.slug.current}`}>
                    <h4 className="text-xl text-indigo-300 font-bold hover:underline">
                      {p.title}
                    </h4>
                  </Link>

                  <p className="text-slate-400 mt-2">{p.description}</p>

                  <Link
                    className="inline-flex items-center text-indigo-300 font-semibold mt-4"
                    href={`/projekty/${p.slug.current}`}
                  >
                    Zobrazit více →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* SLUŽBY */}
      <section id="sluzby" className="py-20 bg-slate-950">
        <h3 className="text-3xl font-bold text-center text-indigo-400 mb-10">
          Co nabízím?
        </h3>

        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <motion.div
              key={s._id}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl bg-slate-900 border border-indigo-500 shadow-xl"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h4 className="text-xl text-indigo-300 font-bold mb-3">{s.title}</h4>
              <p className="text-slate-400">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REFERENCE */}
      <section id="reference" className="py-20 bg-slate-900">
        <h3 className="text-3xl font-bold text-center text-indigo-400 mb-10">
          Co říkají klienti 🗣️
        </h3>

        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {references.map((r) => (
            <motion.div
              key={r._id}
              whileHover={{ y: -6 }}
              className="p-6 bg-slate-950 border border-slate-800 rounded-xl shadow-lg"
            >
              <p className="italic text-slate-300 mb-4 text-lg">“{r.text}”</p>

              <h4 className="font-bold text-indigo-300">{r.name}</h4>
              <p className="text-sm text-slate-400">{r.company}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="py-20 bg-indigo-600 text-center text-white">
        <div className="max-w-3xl mx-auto bg-white text-slate-900 p-10 rounded-3xl shadow-2xl">
          <h3 className="text-3xl font-bold mb-5 text-indigo-600">
            Pojďme spolu pracovat!
          </h3>

          <p className="text-slate-600 mb-8">
            napiš mi a do 24 hodin ti odpovím.
          </p>

          <form className="space-y-4">
            <input type="text" required placeholder="Jméno" className="w-full border p-3 rounded-lg" />
            <input type="email" required placeholder="Email" className="w-full border p-3 rounded-lg" />
            <textarea required placeholder="Zpráva" rows={5} className="w-full border p-3 rounded-lg" />
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700">
              Odeslat
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
