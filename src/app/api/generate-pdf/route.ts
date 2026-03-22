import { NextResponse } from 'next/server'
import puppeteerCore from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

export const maxDuration = 30 // Vercel serverless timeout

async function getBrowser() {
  const isLocal = process.env.NODE_ENV === 'development'

  if (isLocal) {
    // Local dev: use installed Chrome
    const puppeteer = await import('puppeteer-core')
    return puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox'],
      executablePath:
        process.platform === 'win32'
          ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
          : '/usr/bin/google-chrome',
    })
  }

  // Vercel: use @sparticuz/chromium
  return puppeteerCore.launch({
    args: chromium.args,
    defaultViewport: { width: 794, height: 1123 },
    executablePath: await chromium.executablePath(),
    headless: true as any,
  })
}

function buildHTML(wine: any, labels: any, agencyName: string, agencyLogo: string) {
  const wc = wine.color || '#722F37'

  const noteHTML = (letter: string, label: string, text: string) => {
    if (!text) return ''
    return `
      <div style="margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
          <div style="display: inline-block; width: 32px; height: 32px; min-width: 32px; border-radius: 50%; text-align: center; line-height: 32px; font-size: 13px; font-weight: 800; color: ${wc}; background: ${wc}12; border: 1px solid ${wc}20;">${letter}</div>
          <div style="font-size: 13px; font-weight: 700; color: #1a1a1a;">${label}</div>
        </div>
        <div style="margin-left: 42px; font-size: 12.5px; line-height: 1.85; color: #444;">${text}</div>
      </div>`
  }

  const accordsHTML = (wine.accords || []).slice(0, 3).map((a: string) =>
    `<div style="font-size: 12.5px; line-height: 1.8; color: #444; display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px;">
      <span style="color: ${wc}; font-size: 7px; margin-top: 7px; flex-shrink: 0;">●</span>
      <span>${a}</span>
    </div>`
  ).join('')

  const statItem = (label: string, value: string) => {
    if (!value) return ''
    return `<div><strong style="color: ${wc};">${label}</strong> ${value}</div>`
  }

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 794px; height: 1123px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px; color: #333; line-height: 1.5;
    background: #FFFDF7;
  }
  .sheet { width: 794px; height: 1123px; display: flex; flex-direction: column; overflow: hidden; }
  .header { background: linear-gradient(135deg, ${wc} 0%, ${wc}CC 100%); padding: 24px 48px 20px; color: white; position: relative; }
  .body { flex: 1; padding: 20px 48px; overflow: hidden; }
  .footer { padding: 14px 48px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #aaa; }
  .section-heading { font-size: 13px; font-weight: 700; color: #1a1a1a; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 2px; padding-bottom: 6px; border-bottom: 2px solid ${wc}; }
</style>
</head>
<body>
<div class="sheet">
  <!-- HEADER -->
  <div class="header">
    ${agencyLogo ? `<div style="position: absolute; top: 20px; right: 32px;"><img src="${agencyLogo}" style="max-height: 44px; max-width: 90px; object-fit: contain; opacity: 0.9;" /></div>` : ''}
    <div style="font-size: 10px; letter-spacing: 5px; text-transform: uppercase; opacity: 0.6; margin-bottom: 8px;">${labels.ficheTechnique}</div>
    <h1 style="font-size: 32px; font-weight: 700; margin: 0 0 4px 0; font-family: Georgia, serif; line-height: 1.15;">${wine.domaine || ''}</h1>
    <h2 style="font-size: 20px; font-weight: 400; margin: 0 0 14px 0; font-family: Georgia, serif; opacity: 0.92;">${wine.name || ''} ${wine.vintage && wine.vintage !== 'NM' ? wine.vintage : ''}</h2>
    <div style="display: flex; gap: 20px; font-size: 12.5px; opacity: 0.8; flex-wrap: wrap; align-items: center;">
      ${wine.region ? `<span>${wine.region}${wine.country && !wine.region.toLowerCase().includes(wine.country.toLowerCase()) ? `, ${wine.country}` : ''}</span>` : ''}
      ${wine.grape ? `<span style="opacity:0.5;">•</span><span>${wine.grape}</span>` : ''}
    </div>
  </div>

  <!-- BODY -->
  <div class="body">
    <!-- Domaine + stats -->
    <div style="display: flex; gap: 30px; margin-bottom: 26px; align-items: stretch;">
      ${wine.image ? `
        <div style="width: 175px; min-width: 175px; display: flex; align-items: flex-end; justify-content: center; margin-top: -50px; z-index: 2;">
          <img src="${wine.image}" style="height: 260px; max-width: 155px; object-fit: contain; filter: drop-shadow(6px 8px 18px rgba(0,0,0,0.30));" />
        </div>` : ''}
      <div style="flex: 1;">
        ${wine.domaineDesc ? `
          <h3 style="font-size: 13px; font-weight: 700; color: ${wc}; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 2px;">${labels.leDomaine}</h3>
          <p style="font-size: 12.5px; line-height: 1.65; color: #3a3a3a; margin: 0 0 14px 0; text-align: justify;">${wine.domaineDesc}</p>` : ''}
        <div style="display: flex; gap: 24px; padding: 10px 20px; border: 1px solid #ddd5c8; font-size: 12.5px; flex-wrap: wrap;">
          ${statItem(labels.type, wine.type)}
          ${statItem(labels.alcool, wine.alcohol)}
          ${statItem(labels.temperature, wine.temperature)}
          ${statItem(labels.garde, wine.garde)}
        </div>
      </div>
    </div>

    <!-- Notes de dégustation -->
    ${(wine.oeil || wine.nez || wine.bouche) ? `
      <div style="margin-bottom: 22px;">
        <h3 class="section-heading">${labels.notesDegustation}</h3>
        ${noteHTML(labels.oeilLetter, labels.oeil, wine.oeil)}
        ${noteHTML(labels.nezLetter, labels.nez, wine.nez)}
        ${noteHTML(labels.boucheLetter, labels.bouche, wine.bouche)}
      </div>` : ''}

    <!-- Accords + Service -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 36px;">
      ${wine.accords && wine.accords.length > 0 ? `
        <div>
          <h3 class="section-heading">${labels.accordsMetsVins}</h3>
          ${accordsHTML}
        </div>` : ''}
      ${(wine.momentService || wine.carafage) ? `
        <div>
          <h3 class="section-heading">${labels.service}</h3>
          <div style="display: grid; gap: 10px; font-size: 11.5px; color: #444; line-height: 1.6;">
            ${wine.momentService ? `<div><strong>${labels.momentServiceLabel}</strong> ${wine.momentService}</div>` : ''}
            ${wine.carafage ? `<div><strong>${labels.carafageLabel}</strong> ${wine.carafage}</div>` : ''}
          </div>
        </div>` : ''}
    </div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <span></span>
    <div style="display: flex; align-items: center; gap: 8px;">
      ${agencyName ? `<span>${agencyName}</span>` : ''}
      ${agencyLogo ? `<img src="${agencyLogo}" style="max-height: 20px; max-width: 48px; object-fit: contain;" />` : ''}
    </div>
  </div>
</div>
</body>
</html>`
}

// Translation function (mirrors translations.js)
function getLabels(langCode: string) {
  const translations: Record<string, any> = {
    FR: { ficheTechnique:'Fiche technique', leDomaine:'Le domaine', notesDegustation:'Notes de dégustation', accordsMetsVins:'Accords mets-vins', service:'Service', oeil:'Oeil', nez:'Nez', bouche:'Bouche', oeilLetter:'O', nezLetter:'N', boucheLetter:'B', type:'Type', alcool:'Alcool', temperature:'Temp.', garde:'Garde', momentServiceLabel:'Moment de service :', carafageLabel:'Carafage :' },
    EN: { ficheTechnique:'Technical Sheet', leDomaine:'The Estate', notesDegustation:'Tasting Notes', accordsMetsVins:'Food Pairing', service:'Service', oeil:'Eye', nez:'Nose', bouche:'Palate', oeilLetter:'E', nezLetter:'N', boucheLetter:'P', type:'Type', alcool:'Alcohol', temperature:'Temp.', garde:'Ageing', momentServiceLabel:'When to serve:', carafageLabel:'Decanting:' },
    IT: { ficheTechnique:'Scheda tecnica', leDomaine:'La tenuta', notesDegustation:'Note di degustazione', accordsMetsVins:'Abbinamenti', service:'Servizio', oeil:'Occhio', nez:'Naso', bouche:'Bocca', oeilLetter:'O', nezLetter:'N', boucheLetter:'B', type:'Tipo', alcool:'Alcol', temperature:'Temp.', garde:'Invecchiamento', momentServiceLabel:'Momento di servizio:', carafageLabel:'Decantazione:' },
    ES: { ficheTechnique:'Ficha técnica', leDomaine:'La bodega', notesDegustation:'Notas de cata', accordsMetsVins:'Maridaje', service:'Servicio', oeil:'Vista', nez:'Nariz', bouche:'Boca', oeilLetter:'V', nezLetter:'N', boucheLetter:'B', type:'Tipo', alcool:'Alcohol', temperature:'Temp.', garde:'Guarda', momentServiceLabel:'Momento de servicio:', carafageLabel:'Decantación:' },
  }
  return translations[langCode] || translations.FR
}

export async function POST(request: Request) {
  let browser = null

  try {
    const body = await request.json()
    const { wine, agencyName = '', agencyLogo = '', lang = 'FR' } = body

    if (!wine) {
      return NextResponse.json({ error: 'Données du vin manquantes' }, { status: 400 })
    }

    const labels = getLabels(lang)
    const html = buildHTML(wine, labels, agencyName, agencyLogo)

    browser = await getBrowser()
    const page = await browser.newPage()

    await page.setContent(html, { waitUntil: 'networkidle0' })

    // Wait for images to load
    if (wine.image || agencyLogo) {
      await page.evaluate(() => {
        return Promise.all(
          Array.from(document.querySelectorAll('img')).map(
            (img) => img.complete ? Promise.resolve() : new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; })
          )
        )
      })
    }

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    })

    await browser.close()
    browser = null

    // Build filename
    const parts = [wine.domaine, wine.name, wine.vintage]
      .filter(Boolean)
      .map((s: string) => s.toString().trim().toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/(^-|-$)/g, ''))
      .filter(Boolean)
    const filename = parts.length > 0 ? `${parts.join('-')}.pdf` : 'fiche-vin.pdf'

    return new NextResponse(new Uint8Array(pdfBuffer) as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (err: any) {
    console.error('PDF generation error:', err)
    return NextResponse.json({ error: err.message || 'Erreur génération PDF' }, { status: 500 })
  } finally {
    if (browser) {
      try { await browser.close() } catch {}
    }
  }
}
