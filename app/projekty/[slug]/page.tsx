// app/projekty/[slug]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { client } from "../../../lib/sanity.client";
import { groq } from "next-sanity";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react";

const query = groq`
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage{ asset->{ url } },
    shortDescription,
    description,
    url,
    goal,
    workflow[],
    results,
    features[],
    gallery[]{ asset->{ url } },
    client,
    year
  }
`;

type SanityImageRef = {
  asset?: { url?: string };
};

type Project = {
  _id: string;
  title: string;
  slug?: { current?: string };
  mainImage?: SanityImageRef;
  shortDescription?: string;
  description?: string;
  url?: string;
  goal?: string;
  workflow?: string[];
  results?: string;
  features?: string[];
  gallery?: SanityImageRef[];
  client?: string;
  year?: number;
};

type ProjectPageProps = {
  params: { slug: string };
};

export default function ProjectDetailPage({ params }: ProjectPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch<Project | null>(query, { slug: params.slug })
      .then((res) => {
        if (!res) notFound();
        setProject(res);
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-24 text-center text-brand-textMuted dark:text-brand-textMutedDark">
        Načítám projekt...
      </main>
    );
  }

  if (!project) return null;

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 space-y-16 text-brand-text dark:text-brand-textDark">

      {/* ZPĚT */}
      <a
        href="/#portfolio"
        className="flex items-center gap-2 text-brand-accent hover:text-brand-accentHover transition font-medium"
      >
        <ArrowLeft size={18} /> Zpět na portfolio
      </a>

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {project.title}
        </h1>

        {project.shortDescription && (
          <p className="text-lg text-brand-textMuted dark:text-brand-textMutedDark max-w-2xl">
            {project.shortDescription}
          </p>
        )}

        {/* INFO BAR */}
        <div className="flex flex-wrap gap-6 pt-2 text-sm text-brand-textMuted dark:text-brand-textMutedDark">
          {project.client && (
            <p>
              <strong className="text-brand-text dark:text-brand-textDark">Klient:</strong>{" "}
              {project.client}
            </p>
          )}
          {project.year && (
            <p>
              <strong className="text-brand-text dark:text-brand-textDark">Rok:</strong>{" "}
              {project.year}
            </p>
          )}
        </div>

        {/* HERO IMAGE */}
        {project.mainImage?.asset?.url && (
          <div className="rounded-3xl overflow-hidden shadow-card border border-brand-border dark:border-brand-borderDark">
            <Image
              src={project.mainImage.asset.url}
              alt={project.title}
              width={1600}
              height={900}
              className="w-full object-cover"
              priority
            />
          </div>
        )}
      </section>

      {/* PŘEHLED PROJEKTU */}
      {(project.description || project.goal) && (
        <section className="space-y-4">
          <h2 className="text-3xl font-semibold">Přehled projektu</h2>

          {project.description && (
            <p className="text-[15px] text-brand-textMuted dark:text-brand-textMutedDark leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          )}
        </section>
      )}

      {/* CÍL */}
      {project.goal && (
        <section className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark p-8 rounded-2xl shadow-card space-y-3">
          <h2 className="text-2xl font-semibold">Cíl projektu</h2>
          <p className="text-brand-textMuted dark:text-brand-textMutedDark leading-relaxed whitespace-pre-line">
            {project.goal}
          </p>
        </section>
      )}

      {/* WORKFLOW */}
      {project.workflow && project.workflow.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Proces &amp; workflow</h2>

          <ul className="space-y-4">
            {project.workflow.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-accent mt-1" size={20} />
                <span className="text-brand-textMuted dark:text-brand-textMutedDark leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FEATURES */}
      {project.features && project.features.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Co jsem vytvořil / hlavní přínosy</h2>
          <ul className="list-disc list-inside space-y-2 text-brand-textMuted dark:text-brand-textMutedDark">
            {project.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {/* RESULTS */}
      {project.results && (
        <section className="bg-brand-accent/10 border border-brand-accent/40 p-8 rounded-2xl space-y-4">
          <h2 className="text-2xl font-semibold text-brand-text dark:text-brand-textDark">Výsledky</h2>
          <p className="text-brand-textMutedDark whitespace-pre-line">
            {project.results}
          </p>
        </section>
      )}

      {/* GALERIE */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ukázky &amp; galerie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {project.gallery.map((img, index) =>
              img.asset?.url ? (
                <Image
                  key={index}
                  src={img.asset.url}
                  alt={`${project.title} – obrázek ${index + 1}`}
                  width={800}
                  height={600}
                  className="rounded-xl shadow-soft object-cover"
                />
              ) : null
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="flex flex-wrap gap-4 pt-6">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-brand-accent hover:bg-brand-accentHover text-white text-sm flex items-center gap-2 shadow-soft transition"
          >
            <ExternalLink size={18} /> Otevřít projekt
          </a>
        )}

        <a
          href="/#kontakt"
          className="px-6 py-3 rounded-full border border-brand-accent text-brand-accent text-sm hover:bg-brand-accent/10 dark:text-brand-accentHover transition"
        >
          Chci podobný web
        </a>
      </section>
    </main>
  );
}
