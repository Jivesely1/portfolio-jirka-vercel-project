"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent-state");

    if (!stored) {
      setVisible(true);
    }
  }, []);

  const save = (acceptedAll: boolean) => {
    const payload = {
      necessary: true,
      analytics: acceptedAll ? true : analytics,
      marketing: acceptedAll ? true : marketing,
    };

    localStorage.setItem("cookie-consent-state", JSON.stringify(payload));
    setVisible(false);
    setSettingsOpen(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* ===== BOTTOM COOKIE BAR ===== */}
      <div
        className="
          fixed bottom-0 left-0 right-0 z-[9999]
          bg-white/90 dark:bg-brand-bgDark/90
          backdrop-blur-xl
          border-t border-black/10 dark:border-white/10
          shadow-xl
          p-6
        "
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-brand-text dark:text-brand-textDark leading-relaxed md:max-w-3xl">
            Tento web používá cookies pro analýzu návštěvnosti a personalizaci.
            Můžeš zvolit své preference nebo povolit vše.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => save(true)}
              className="
                px-5 py-2 rounded-xl font-semibold text-sm
                bg-brand-accent text-white
                hover:bg-brand-accentHover transition
              "
            >
              Souhlasím
            </button>

            <button
              onClick={() => save(false)}
              className="
                px-5 py-2 rounded-xl font-semibold text-sm
                bg-black/5 dark:bg-white/10
                text-brand-text dark:text-brand-textDark
                hover:bg-black/10 dark:hover:bg-white/20
                transition
              "
            >
              Odmítnout
            </button>

            <button
              onClick={() => setSettingsOpen(true)}
              className="
                text-sm text-brand-textMuted dark:text-brand-textMutedDark
                hover:text-brand-accent transition
              "
            >
              Nastavení
            </button>
          </div>
        </div>
      </div>

      {/* ===== SETTINGS MODAL ===== */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSettingsOpen(false)}
          />

          {/* modal card */}
          <div
            className="
              relative z-[10001]
              w-[90%] max-w-lg p-8 rounded-2xl
              bg-white dark:bg-brand-bgDark
              border border-black/10 dark:border-white/10
              shadow-2xl
              animate-fadeInUp
            "
          >
            <h2 className="text-xl font-bold mb-4 text-brand-text dark:text-white">
              Nastavení cookies
            </h2>

            {/* Necessary */}
            <div className="mb-6">
              <h3 className="font-semibold text-brand-text dark:text-white">
                Nutné cookies (vždy aktivní)
              </h3>
              <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                Tyto cookies jsou nezbytné pro fungování webu.
              </p>
            </div>

            {/* Analytics */}
            <div className="mb-6">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-semibold text-brand-text dark:text-white">
                    Analytické cookies
                  </span>
                  <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                    Pomáhají nám zlepšovat web.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="w-5 h-5"
                />
              </label>
            </div>

            {/* Marketing */}
            <div className="mb-8">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="font-semibold text-brand-text dark:text-white">
                    Marketingové cookies
                  </span>
                  <p className="text-sm text-brand-textMuted dark:text-brand-textMutedDark">
                    Slouží k personalizaci reklamy.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="w-5 h-5"
                />
              </label>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSettingsOpen(false)}
                className="
                  px-4 py-2 rounded-xl text-sm
                  bg-black/5 dark:bg-white/10
                  text-brand-text dark:text-brand-textDark
                  hover:bg-black/10 dark:hover:bg-white/20
                "
              >
                Zpět
              </button>

              <button
                onClick={() => save(false)}
                className="
                  px-4 py-2 rounded-xl text-sm
                  bg-brand-accent text-white
                  hover:bg-brand-accentHover
                "
              >
                Uložit nastavení
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
