"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

import {
  getProjects,
  getServices,
  getReferences,
  getSkills,
} from "../lib/sanity";
import type {
  SanityProject,
  SanityService,
  SanityReference,
  SanitySkill,
} from "../lib/types";

const fadeInSection: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState<SanityProject[]>([]);
  const [services, setServices] = useState<SanityService[]>([]);
  const [references, setReferences] = useState<SanityReference[]>([]);
  const [skills, setSkills] = useState<SanitySkill[]>([]);

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

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text dark:bg-brand-bgDark dark:text-brand-textDark">

      {/* LOADING SCREEN */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 text-white text-3xl md:text-4xl font-extrabold">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Jirka Veselý 💻
          </motion.span>
        </div>
      )}

      <main>

        {/* ÚVOD */}
        <motion.section
          id="uvod"
          className="min-h-[70vh] flex items-center py-28 sm:py-32 md:py-40
          bg-gradient-to-b from-brand-bg via-brand-surface to-brand-bg
          dark:bg-gradient-to-b dark:from-brand-bgDark dark:via-brand-surfaceDark dark:to-brand-bgDark"
          variants={fadeInSection}
          initial="initial"
          whileInView="animate"
        >
          <div className="max-w-6xl mx-auto px-8 sm:px-10 grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-12">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                Ahoj, jsem Jirka
              </p>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Váš{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  full-stack partner
                </span>{" "}
                pro moderní weby a aplikace
              </h1>

              <p className="text-sm sm:text-base text-brand-textMuted dark:text-brand-textMutedDark leading-loose">
                Stavím weby v Next.js, napojuji je na Sanity CMS a řeším i nasazení,
                infrastrukturu a dlouhodobý rozvoj.  
                Dělám moderní design, nasazení, integrace a správu.
              </p>

              <div className="flex flex-wrap gap-5 text-sm">
                <a
                  href="#kontakt"
                  className="inline-flex items-center rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-500 transition"
                >
                  Mám zájem o web
                </a>

                <a
                  href="#portfolio"
                  className="inline-flex items-center rounded-full border border-brand-border dark:border-brand-borderDark
                  px-8 py-3 text-brand-text dark:text-brand-textDark
                  hover:border-indigo-500 hover:text-indigo-500 transition"
                >
                  Zobrazit projekty
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center pt-8"
            >
              <Image
                src="/code-laptop.jpg"
                alt="Notebook s kódem"
                width={640}
                height={460}
                className="w-full max-w-xs sm:max-w-md rounded-3xl shadow-2xl border border-white/10 dark:border-slate-800"
              />
            </motion.div>
          </div>
        </motion.section>


        {/* O MNĚ */}
        <motion.section
          id="o-mne"
          className="py-28 sm:py-32 md:py-40 bg-brand-surface dark:bg-brand-surfaceDark"
          variants={fadeInSection}
          initial="initial"
          whileInView="animate"
        >
          <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-3 gap-12 items-center">
            
            <div className="md:col-span-2 space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                Kdo jsem a jak pracuji?
              </h2>

              <p className="text-sm sm:text-base text-brand-textMuted dark:text-brand-textMutedDark leading-loose">
                Jmenuji se Jiří Veselý. Spojuji moderní frontend (React / Next.js)
                s rozumnou architekturou, integracemi a DevOpsem.
              </p>

              <p className="text-sm sm:text-base text-brand-textMuted dark:text-brand-textMutedDark leading-loose">
                Místo “na koleni” raději stavím řešení, která můžeš rozvíjet —
                Sanity jako headless CMS, nasazení na Vercel a čistý škálovatelný kód.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Image
                src="/jirka.png"
                alt="Jirka Veselý"
                width={260}
                height={260}
                className="rounded-full mx-auto border-4 border-indigo-500 shadow-xl object-cover"
              />
            </motion.div>

          </div>
        </motion.section>


        {/* DOVEDNOSTI */}
        <section
          id="dovednosti"
          className="py-28 sm:py-32 md:py-40 text-center bg-brand-bg dark:bg-brand-bgDark"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-12">
            Tech stack & dovednosti 🛠️
          </h2>

          <div className="flex flex-wrap justify-center gap-4 px-6 sm:px-10 max-w-4xl mx-auto">
            {skills.length === 0 ? (
              <p className="text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Načítám dovednosti…
              </p>
            ) : (
              skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 rounded-full border text-sm font-semibold
                  flex items-center gap-2 shadow-sm
                  border-brand-accent/60 bg-brand-surface text-brand-text
                  dark:bg-brand-surfaceDark dark:text-brand-textDark"
                >
                  <span className="text-xl">
                    {(skill as any).emoji ?? "💡"}
                  </span>
                  <span>{skill.name}</span>
                </motion.div>
              ))
            )}
          </div>
        </section>


        {/* PORTFOLIO */}
        <section
          id="portfolio"
          className="py-28 sm:py-32 md:py-40 bg-brand-surface dark:bg-brand-surfaceDark"
        >
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-16">
              Vybrané projekty 🏆
            </h2>

            {projects.length === 0 ? (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Načítám projekty…
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {projects.map((p) => {
                  const href = p.slug?.current ? `/projekty/${p.slug.current}` : "#";
                  return (
                    <motion.article
                      key={p._id}
                      whileHover={{ scale: 1.03, y: -4 }}
                      className="rounded-2xl border shadow-card overflow-hidden
                      bg-brand-bg dark:bg-brand-surfaceDark border-brand-border dark:border-brand-borderDark"
                    >
                      {p.imageUrl && (
                        <Image
                          src={p.imageUrl}
                          alt={p.title}
                          width={1200}
                          height={800}
                          className="w-full h-52 object-cover"
                        />
                      )}

                      <div className="p-6 space-y-3">
                        <Link href={href}>
                          <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 hover:underline">
                            {p.title}
                          </h3>
                        </Link>

                        {p.description && (
                          <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark leading-relaxed line-clamp-3">
                            {p.description}
                          </p>
                        )}

                        <Link
                          href={href}
                          className="inline-flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-300"
                        >
                          Zobrazit více →
                        </Link>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </section>


        {/* SLUŽBY */}
        <section
          id="sluzby"
          className="py-28 sm:py-32 md:py-40 bg-brand-bg dark:bg-brand-bgDark"
        >
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-16">
              S čím ti můžu pomoct?
            </h2>

            {services.length === 0 ? (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Načítám služby…
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {services.map((s) => (
                  <motion.article
                    key={s._id}
                    className="p-8 rounded-2xl border shadow-xl bg-brand-surface dark:bg-brand-surfaceDark border-brand-border dark:border-brand-borderDark space-y-4"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{(s as any).icon ?? "🛠️"}</span>
                      <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                        {s.title}
                      </h3>
                    </div>

                    <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark leading-relaxed">
                      {(s as any).shortDescription || s.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>


        {/* REFERENCE */}
        <section
          id="reference"
          className="py-28 sm:py-32 md:py-40 bg-brand-surface dark:bg-brand-surfaceDark"
        >
          <div className="max-w-6xl mx-auto px-8">

            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-16">
              Co o mně říkají klienti 🗣️
            </h2>

            {references.length === 0 ? (
              <p className="text-center text-brand-textMuted dark:text-brand-textMutedDark text-sm">
                Načítám reference…
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {references.map((r) => (
                  <motion.figure
                    key={r._id}
                    whileHover={{ y: -4 }}
                    className="p-8 rounded-2xl border shadow-md bg-brand-bg dark:bg-brand-surfaceDark border-brand-border dark:border-brand-borderDark space-y-4"
                  >
                    <blockquote className="text-sm md:text-base text-slate-700 dark:text-slate-200 italic leading-relaxed">
                      „{(r as any).text ?? (r as any).quote ?? ""}“
                    </blockquote>

                    <figcaption className="text-xs sm:text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                      <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                        {r.name}
                      </span>
                      {(r as any).company && <> · {(r as any).company}</>}
                      {(r as any).role && <> – {(r as any).role}</>}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            )}
          </div>
        </section>


        {/* KONTAKT */}
        <section
          id="kontakt"
          className="py-28 sm:py-32 md:py-40 bg-gradient-to-br from-indigo-600 to-indigo-800 text-center text-white"
        >
          <div className="max-w-3xl mx-auto px-8">

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 sm:p-12 border border-white/20 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Pojďme to probrat</h2>

              <p className="text-sm sm:text-base text-indigo-100 mb-8 leading-relaxed">
                Napiš mi pár vět o projektu a do 24 hodin se ti ozvu.
              </p>

              <form className="space-y-5 text-left">
                <input
                  type="text"
                  placeholder="Jméno *"
                  required
                  className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-white"
                />

                <input
                  type="email"
                  placeholder="E-mail *"
                  required
                  className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-white"
                />

                <textarea
                  placeholder="Stručně popiš svůj projekt *"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-sm outline-none focus:border-white resize-none"
                />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-white text-indigo-700 font-semibold py-3 text-sm hover:bg-indigo-50"
                >
                  Odeslat zprávu
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
