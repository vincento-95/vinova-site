"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const WineSheet = dynamic(
  () => import("@/components/winesheet/WineSheet"),
  { ssr: false }
);

interface WineData {
  [key: string]: unknown;
  name: string;
  domaine: string;
  lang?: string;
}

export default function GenerationModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"generating" | "ready" | "error" | null>(null);
  const [wine, setWine] = useState<WineData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [downloading, setDownloading] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId) return;

    setStatus("generating");

    fetch("/api/generate-fiche", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Erreur de génération");

        const bottleImage = localStorage.getItem("vinova_bottle_image");
        if (bottleImage) {
          data.wine.bottleImage = bottleImage;
          localStorage.removeItem("vinova_bottle_image");
        }

        setWine(data.wine);
        setStatus("ready");
      })
      .catch((err) => {
        setErrorMsg(err instanceof Error ? err.message : "Erreur inconnue");
        setStatus("error");
      });
  }, [sessionId]);

  const handleDownload = useCallback(async () => {
    if (!sheetRef.current || !wine) return;
    setDownloading(true);

    try {
      const { exportSingleWinePDF } = await import("@/lib/pdfExport");
      const el = sheetRef.current.querySelector(".wine-sheet");
      if (el instanceof HTMLElement) {
        await exportSingleWinePDF(el, wine);
      }
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Erreur lors de l'export PDF. Veuillez réessayer.");
    } finally {
      setDownloading(false);
    }
  }, [wine]);

  function handleClose() {
    setStatus(null);
    setWine(null);
    setErrorMsg("");
    router.replace("/", { scroll: false });
  }

  if (!sessionId || status === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={status === "ready" || status === "error" ? handleClose : undefined} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[900px] max-h-[95vh] mx-4 flex flex-col">
        {/* Error state */}
        {status === "error" && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-5xl mb-4">!</div>
            <h2 className="text-xl font-bold text-text mb-3 font-serif">Une erreur est survenue</h2>
            <p className="text-text-secondary mb-6">{errorMsg}</p>
            <button
              onClick={handleClose}
              className="bg-wine hover:bg-wine-dark text-white px-6 py-3 rounded-[var(--radius)] font-medium transition-colors"
            >
              Fermer
            </button>
          </div>
        )}

        {/* Generating state */}
        {status === "generating" && (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
            <div className="w-16 h-16 border-4 border-wine/20 border-t-wine rounded-full animate-spin mx-auto mb-8" />
            <h2 className="text-2xl font-bold text-text mb-3 font-serif">
              Notre IA analyse votre vin...
            </h2>
            <p className="text-text-secondary">
              Recherche des informations, rédaction des notes de dégustation et mise en forme de la fiche. Cela peut prendre 30 à 60 secondes.
            </p>
          </div>
        )}

        {/* Ready state */}
        {status === "ready" && wine && (
          <>
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white font-medium transition-colors text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Fermer
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="bg-wine hover:bg-wine-dark text-white px-6 py-2.5 rounded-[var(--radius)] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm"
              >
                {downloading ? "Export en cours..." : "Télécharger le PDF"}
              </button>
            </div>

            {/* Wine Sheet (scrollable) */}
            <div ref={sheetRef} className="overflow-y-auto rounded-xl shadow-2xl bg-white">
              <WineSheet wine={wine} lang={wine?.lang || "FR"} />
            </div>

            {/* Bottom download button */}
            <div className="mt-3 text-center">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="bg-wine hover:bg-wine-dark text-white px-8 py-3.5 rounded-[var(--radius)] font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {downloading ? "Export en cours..." : "Télécharger le PDF"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
