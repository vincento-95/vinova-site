import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const A4_W = 210;
const A4_H = 297;

function buildFilename(wine) {
  const parts = [wine.domaine, wine.name, wine.vintage]
    .filter(Boolean)
    .map((s) =>
      s.toString().trim().toLowerCase()
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/(^-|-$)/g, ''),
    )
    .filter(Boolean);
  return parts.length > 0 ? `${parts.join('-')}.pdf` : 'fiche-vin.pdf';
}

async function elementToA4Page(element) {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollY: 0,
    height: element.scrollHeight,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.98);
  const imgRatio = canvas.width / canvas.height;
  const a4Ratio = A4_W / A4_H;

  // Force pleine largeur A4, pas de marge
  const pdfW = A4_W;
  const pdfH = A4_W / imgRatio;

  return { imgData, x: 0, y: 0, pdfW, pdfH };
}

export async function exportSingleWinePDF(element, wine) {
  const filename = buildFilename(wine);
  const { imgData, x, y, pdfW, pdfH } = await elementToA4Page(element);

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  pdf.addImage(imgData, 'JPEG', x, y, pdfW, pdfH);
  pdf.save(filename);
}
