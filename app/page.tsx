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
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main className="mx-auto max-w-6xl px-4 pt-12 pb-24 space-y-24">

        {/* Úvod */}
        <section
          id="uvod"
          className="flex flex-col-reverse items-center gap-12 md:flex-row md:items-start"
        >
          <div className="flex-1 space-y-5">
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-400">
              Ahoj, jsem Jirka
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Tvořím weby, aplikace a digitální řešení, která dávají smysl
              <span className="block text-indigo-400">
                a přinášejí výsledky.
              </span>
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-slate-300">
              Specializuji se na React / Next.js, headless CMS (Sanity) a moderní
              frontend. Pomůžu ti s prezentací, která bude vypadat profesionálně a
              zároveň se bude dobře spravovat.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#kontakt"
                className="rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 transition"
              >
                Domluvit konzultaci
              </a>
              <a
                href="#portfolio"
                className="rounded-full border border-indigo-400 px-5 py-2 text-sm font-medium text-indigo-400 hover:border-indigo-300 hover:text-indigo-300 transition"
              >
                Zobrazit projekty
              </a>
            </div>
          </div>
          <div className="flex-1">
            <div className="relative mx-auto max-w-xs">
              <div className="absolute inset-0 -skew-y-3 rounded-3xl bg-indigo-500/30 blur-2xl" />
              <div className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">
                  Technologie
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-slate-800 px-3 py-1">Next.js</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1">React</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1">TypeScript</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1">Sanity</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1">Tailwind</span>
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  Zaměřuji se na rychlé, responzivní weby s čistým UX a snadnou správou obsahu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* O mně */}
        <section id="o-mne" className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">O mně</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-300">
            Jmenuji se Jiří Veselý, rád spojuji technickou stránku vývoje s
            praktickým pohledem na to, co opravdu dává byznysově smysl. Kromě
            programování řeším i infrastrukturní věci kolem hostingu,
            nasazování a automatizace.
          </p>
        </section>

        {/* Dovednosti */}
        <section id="dovednosti" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Dovednosti</h2>
            <p className="text-sm text-slate-400">
              Kombinuji zkušenosti z IT, webového vývoje a reálného provozu firem.
            </p>
          </div>
          {skills.length === 0 && !loading && (
            <p className="text-sm text-slate-400">
              Zatím nemáš ve studiu žádné dovednosti – přidej dokumenty typu&nbsp;
              <strong>skill</strong>.
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill._id}
                className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs"
              >
                {skill.emoji || "💡"}&nbsp;{skill.name}
              </span>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Vybrané projekty</h2>
              <p className="text-sm text-slate-400">
                Ukázky práce, na kterých je vidět přínos – ne jen design.
              </p>
            </div>
          </div>
          {projects.length === 0 && !loading && (
            <p className="text-sm text-slate-400">
              Zatím nemáš ve studiu žádné projekty – přidej dokumenty typu&nbsp;
              <strong>project</strong>.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </section>

        {/* Služby */}
        <section id="sluzby" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Služby</h2>
            <p className="text-sm text-slate-400">
              Přehled toho, co všechno můžu nabídnout pro tvůj projekt.
            </p>
          </div>
          {services.length === 0 && !loading && (
            <p className="text-sm text-slate-400">
              Přidej dokumenty typu&nbsp;<strong>service</strong> a zobrazí se tady
              jako nabídka služeb.
            </p>
          )}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service._id}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-2 shadow hover:border-indigo-500/70 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {(service as any).icon || "🛠️"}
                  </span>
                  <h3 className="text-base font-semibold">{service.title}</h3>
                </div>
                {service.shortDescription && (
                  <p className="text-sm text-slate-300">
                    {service.shortDescription}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Reference */}
        <section id="reference" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Reference</h2>
            <p className="text-sm text-slate-400">
              Doporučení a testimonialy od klientů, se kterými jsem spolupracoval.
            </p>
          </div>
          {references.length === 0 && !loading && (
            <p className="text-sm text-slate-400">
              Až přidáš do studia dokumenty typu&nbsp;<strong>reference</strong>,
              zobrazí se tady doporučení a testimonialy.
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-2">
            {references.map((ref) => (
              <figure
                key={ref._id}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-3 shadow hover:border-indigo-500/70 transition"
              >
                <blockquote className="text-sm italic text-slate-200">
                  „{ref.quote}“
                </blockquote>
                  <figcaption className="text-xs text-slate-400">
                    {ref.name}
                    {ref.company && <> · {ref.company}</>}
                    {ref.role && <> – {ref.role}</>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Kontakt */}
        <section id="kontakt" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Ozvi se</h2>
            <p className="max-w-xl text-sm text-slate-300">
              Máš projekt, který bys chtěl konzultovat nebo rozjet? Nech mi na
              sebe kontakt a krátce popiš, o co jde. Ozvu se ti s návrhem
              dalšího postupu.
            </p>
          </div>
          <ContactForm />
        </section>

      </main>
      <Footer />
    </div>
  )
}
