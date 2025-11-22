"use client"

import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ContactForm from "../components/ContactForm"
import ProjectCard from "../components/ProjectCard"
import {
  getProjects,
  getServices,
  getReferences,
  getSkills,
} from "../lib/sanity.queries"
import type {
  SanityProject,
  SanityService,
  SanityReference,
  SanitySkill,
} from "../lib/types"

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<SanityProject[]>([])
  const [services, setServices] = useState<SanityService[]>([])
  const [references, setReferences] = useState<SanityReference[]>([])
  const [skills, setSkills] = useState<SanitySkill[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [p, s, r, sk] = await Promise.all([
          getProjects(),
          getServices(),
          getReferences(),
          getSkills(),
        ])
        setProjects(p)
        setServices(s)
        setReferences(r)
        setSkills(sk)
      } catch (e) {
        console.error("Chyba při načítání dat ze Sanity:", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Header />

      <main className="mx-auto max-w-6xl px-4 pt-12 pb-24 space-y-24">

        {/* HERO */}
        <section
          id="uvod"
          className="flex flex-col-reverse gap-12 md:flex-row md:items-center"
        >
          <div className="flex-1 space-y-6">
            <p className="text-sm font-medium tracking-[0.2em] text-[#445B8C] uppercase">
              Ahoj, jsem Jirka
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Tvořím moderní weby a aplikace,
              <span className="block text-[#445B8C]">které posunou tvůj projekt.</span>
            </h1>

            <p className="max-w-xl text-slate-600 text-base leading-relaxed">
              Specializuji se na React / Next.js, headless CMS Sanity a tvorbu
              digitálních řešení. Dodám ti profesionální prezentaci, kterou si
              zvládneš snadno spravovat.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#kontakt"
                className="rounded-full bg-[#445B8C] text-white px-6 py-3 text-sm font-medium shadow hover:bg-[#3b507b] transition"
              >
                Domluvit konzultaci
              </a>

              <a
                href="#portfolio"
                className="rounded-full border border-[#445B8C] text-[#445B8C] px-6 py-3 text-sm font-medium hover:bg-[#445B8C]/10 transition"
              >
                Zobrazit projekty
              </a>
            </div>
          </div>

          {/* Hero Card */}
          <div className="flex-1">
            <div className="relative mx-auto max-w-xs">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#445B8C] to-[#8BA3C9] opacity-20 blur-xl" />
              <div className="relative rounded-3xl bg-white border border-slate-200 p-6 shadow-xl space-y-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Technologie
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Next.js</span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">React</span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">TypeScript</span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Sanity</span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* O mně */}
        <section id="o-mne" className="space-y-4">
          <h2 className="text-3xl font-semibold">O mně</h2>
          <p className="max-w-3xl text-slate-600 leading-relaxed">
            Jsem Jiří Veselý — vývojář, který spojuje technické znalosti s
            praktickým přístupem. Pomáhám firmám i jednotlivcům vytvářet moderní
            webové projekty, které dobře fungují i vypadají.
          </p>
        </section>

        {/* Dovednosti */}
        <section id="dovednosti" className="space-y-6">
          <h2 className="text-3xl font-semibold">Dovednosti</h2>

          {skills.length === 0 && !loading && (
            <p className="text-slate-500 text-sm">Přidej dokumenty typu "skill".</p>
          )}

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill._id}
                className="px-4 py-2 rounded-full border border-slate-300 bg-white text-sm flex items-center gap-2 shadow-sm"
              >
                <span className="text-lg">{skill.emoji || "💡"}</span>
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* Projekty */}
        <section id="portfolio" className="space-y-6">
          <h2 className="text-3xl font-semibold">Projekty</h2>

          {projects.length === 0 && !loading && (
            <p className="text-slate-500 text-sm">Přidej dokumenty typu "project".</p>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>

        {/* Služby */}
        <section id="sluzby" className="space-y-6">
          <h2 className="text-3xl font-semibold">Služby</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{(service as any).icon || "🛠️"}</span>
                  <h3 className="text-lg font-semibold">
                    {service.title}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm mt-2">
                  {service.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Reference */}
        <section id="reference" className="space-y-6">
          <h2 className="text-3xl font-semibold">Reference</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {references.map((ref) => (
              <figure
                key={ref._id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <blockquote className="text-slate-700 italic leading-relaxed">
                  „{ref.quote}“
                </blockquote>
                <figcaption className="mt-3 text-sm text-slate-600">
                  <strong>{ref.name}</strong>
                  {ref.company && <> · {ref.company}</>}
                  {ref.role && <> – {ref.role}</>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Kontakt */}
        <section id="kontakt" className="space-y-6">
          <h2 className="text-3xl font-semibold">Kontakt</h2>
          <p className="max-w-xl text-slate-600">
            Zanech mi zprávu — rád ti pomůžu rozjet nebo zmodernizovat tvůj digitální projekt.
          </p>

          <ContactForm />
        </section>
      </main>

      <Footer />
    </div>
  )
}

