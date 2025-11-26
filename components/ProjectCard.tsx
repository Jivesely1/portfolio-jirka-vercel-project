"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { SanityProject } from "../lib/sanity";

type Props = {
  project: SanityProject;
};

export default function ProjectCard({ project }: Props) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
    >
      {project.imageUrl && (
        <Image
          src={project.imageUrl}
          width={1200}
          height={800}
          alt={project.title}
          className="w-full object-cover"
        />
      )}

      <div className="p-6">
        <h4 className="text-xl font-bold text-indigo-300 mb-2">
          {project.title}
        </h4>

        <p className="text-slate-400 text-sm mb-4">{project.description}</p>

        {project.slug?.current && (
          <Link
            href={`/projekty/${project.slug.current}`}
            className="text-indigo-400 hover:text-indigo-200 font-semibold"
          >
            Zobrazit více →
          </Link>
        )}
      </div>
    </motion.div>
  );
}
