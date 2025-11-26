export default function ContactSection() {
  return (
    <section
      className="
        w-full py-24
        bg-gradient-to-br 
        from-[#1c1f2b] via-[#181b26] to-[#12141c]
      "
    >
      <div className="max-w-xl mx-auto p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">

        <h2 className="text-center text-3xl font-bold mb-4 text-white">
          Pojďme to probrat
        </h2>
        <p className="text-center text-slate-300 mb-10">
          Napiš mi pár věcí o projektu a ozvu se ti do 24 hodin.
        </p>

        <form className="space-y-5">
          <input placeholder="Jméno*" className="input" />
          <input placeholder="E-mail*" className="input" />
          <textarea placeholder="Stručně popiš svůj projekt*" className="input h-32" />

          <button
            className="
              w-full py-3 rounded-xl 
              bg-brand-accent text-white text-lg font-semibold
              hover:bg-brand-accentHover transition shadow-md
            "
          >
            Odeslat zprávu
          </button>
        </form>
      </div>
    </section>
  );
}
