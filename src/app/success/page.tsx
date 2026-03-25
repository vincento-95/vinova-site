"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic import to avoid SSR issues with html2canvas
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

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "generating" | "ready" | "error">("loading");
  const [wine, setWine] = useState<WineData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [downloading, setDownloading] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  const isDirect = searchParams.get("direct") === "true";

  // Generate wine data
  useEffect(() => {
    // Mode direct : données déjà dans localStorage
    if (isDirect) {
      const stored = localStorage.getItem("fichevin_wine_data");
      if (stored) {
        const wineData = JSON.parse(stored);
        localStorage.removeItem("fichevin_wine_data");

        const bottleImage = localStorage.getItem("vinova_bottle_image");
        if (bottleImage) {
          wineData.bottleImage = bottleImage;
          localStorage.removeItem("vinova_bottle_image");
        }

        // Ajouter image au wine data
        wineData.image = wineData.bottleImage || wineData.image || '';

        setWine(wineData);
        setStatus("ready");
        return;
      }
    }

    // Mode Stripe : vérifier le paiement
    if (!sessionId && !isDirect) {
      setStatus("error");
      setErrorMsg("Aucune session trouvée.");
      return;
    }

    if (sessionId) {
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
    }
  }, [sessionId, isDirect]);

  // Download PDF using Puppeteer API (server-side)
  const handleDownload = useCallback(async () => {
    if (!wine) return;
    setDownloading(true);

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wine,
          agencyName: "",
          agencyLogo: "",
          lang: wine.lang || "FR",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur PDF");
      }

      // Download the PDF blob
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const parts = [wine.domaine, wine.name, wine.vintage]
        .filter(Boolean)
        .map((s) => String(s).trim().toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/(^-|-$)/g, ""))
        .filter(Boolean);
      a.download = parts.length > 0 ? `${parts.join("-")}.pdf` : "fiche-vin.pdf";
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF export error:", err);
      // Fallback to html2canvas
      try {
        const { exportSingleWinePDF } = await import("@/lib/pdfExport");
        const el = sheetRef.current?.querySelector(".wine-sheet");
        if (el instanceof HTMLElement) {
          await exportSingleWinePDF(el, wine);
        }
      } catch {
        alert("Erreur lors de l'export PDF. Veuillez réessayer.");
      }
    } finally {
      setDownloading(false);
    }
  }, [wine]);

  // Error state
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg px-6">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-6">!</div>
          <h1 className="text-2xl font-bold text-text mb-4 font-serif">
            Une erreur est survenue
          </h1>
          <p className="text-text-secondary mb-8">{errorMsg}</p>
          <Link
            href="/"
            className="inline-block bg-wine hover:bg-wine-dark text-white px-6 py-3 rounded-[var(--radius)] font-medium transition-colors"
          >
            Retour &agrave; l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  // Loading / generating state
  if (status === "loading" || status === "generating") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 border-4 border-wine/20 border-t-wine rounded-full animate-spin mx-auto mb-8" />
          <h1 className="text-2xl font-bold text-text mb-4 font-serif">
            {status === "generating"
              ? "Notre IA analyse votre vin..."
              : "Vérification du paiement..."}
          </h1>
          <p className="text-text-secondary">
            {status === "generating"
              ? "Recherche des informations, rédaction des notes de dégustation et mise en forme de la fiche. Cela peut prendre 30 à 60 secondes."
              : "Un instant..."}
          </p>
        </div>
      </div>
    );
  }

  // Ready state — show WineSheet + download button
  return (
    <div className="min-h-screen bg-[#f0ece4] py-8 px-4">
      {/* Top bar */}
      <div className="max-w-[850px] mx-auto mb-6">
        <Link
          href="/#generer"
          className="text-wine hover:text-wine-dark font-medium transition-colors text-sm"
        >
          &larr; Générer une autre fiche
        </Link>
      </div>

      {/* Wine Sheet */}
      <div ref={sheetRef} className="max-w-[850px] mx-auto">
        <WineSheet wine={wine} lang={wine?.lang || "FR"} />
      </div>

      {/* Bottom download button */}
      <div className="max-w-[850px] mx-auto mt-6 text-center">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-wine hover:bg-wine-dark text-white px-8 py-4 rounded-[var(--radius)] font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[var(--shadow-card)]"
        >
          {downloading ? "Export en cours..." : "Télécharger le PDF"}
        </button>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-bg">
          <p className="text-text-secondary">Chargement...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
