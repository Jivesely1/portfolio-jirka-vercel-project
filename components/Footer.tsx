export default function Footer() {
  return (
    <footer className="py-10 border-t border-white/10 bg-slate-950 text-center text-slate-400 text-sm">
      © {new Date().getFullYear()} <span className="text-indigo-400">Jirka Veselý</span> — Všechna práva vyhrazena.
    </footer>
  )
}
