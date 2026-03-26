"use client";
/**
 * WineSheet — professional A4 wine technical sheet.
 * Adapted from wine-fiches for Next.js.
 */
import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { t } from '../../lib/translations';

export default function WineSheet({ wine, index = 0, totalCount = 1, agencyName = '', agencyLogo = '', compact = false, lang, coordonnees = '' }) {
  if (!wine) return null;

  const scale = compact ? 0.82 : 1;
  const p = (v) => Math.round(v * scale);
  const wc = wine.color || '#722F37';
  const labels = t(lang || wine.lang || 'FR');

  /* ── Remove near-white background from bottle image via canvas ── */
  const [blendedImage, setBlendedImage] = useState('');

  useEffect(() => {
    if (!wine.image) { setBlendedImage(''); return; }
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const id = ctx.getImageData(0, 0, c.width, c.height);
      const d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        if (lum > 250) {
          d[i + 3] = 0;
        } else if (lum > 232) {
          d[i + 3] = Math.round(255 * (250 - lum) / 18);
        }
      }
      ctx.putImageData(id, 0, 0);
      const w = c.width, h = c.height;
      let top = 0, bottom = h - 1, left = 0, right = w - 1;
      const isRowTransparent = (y) => {
        for (let x = 0; x < w; x++) { if (d[(y * w + x) * 4 + 3] > 10) return false; } return true;
      };
      const isColTransparent = (x) => {
        for (let y = top; y <= bottom; y++) { if (d[(y * w + x) * 4 + 3] > 10) return false; } return true;
      };
      while (top < bottom && isRowTransparent(top)) top++;
      while (bottom > top && isRowTransparent(bottom)) bottom--;
      while (left < right && isColTransparent(left)) left++;
      while (right > left && isColTransparent(right)) right--;
      const cropW = right - left + 1, cropH = bottom - top + 1;
      if (cropW > 0 && cropH > 0 && (top > 0 || left > 0 || cropW < w || cropH < h)) {
        const cropped = ctx.getImageData(left, top, cropW, cropH);
        c.width = cropW;
        c.height = cropH;
        ctx.putImageData(cropped, 0, 0);
      }
      setBlendedImage(c.toDataURL('image/png'));
    };
    img.src = wine.image;
  }, [wine.image]);

  /* ── Auto-scale: shrink body content if it overflows the A4 page ── */
  const bodyRef = useRef(null);
  const contentRef = useRef(null);
  const [bodyScale, setBodyScale] = useState(1);

  useLayoutEffect(() => {
    if (compact || !bodyRef.current || !contentRef.current) return;
    const recalc = () => {
      if (!bodyRef.current || !contentRef.current) return;
      const availableH = bodyRef.current.clientHeight;
      const contentH = contentRef.current.scrollHeight;
      if (contentH > availableH + 5 && availableH > 0) {
        setBodyScale(Math.max(0.72, availableH / contentH));
      } else {
        setBodyScale(1);
      }
    };
    recalc();
    const t = setTimeout(recalc, 150);
    const t2 = setTimeout(recalc, 500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [wine, compact, lang, blendedImage, coordonnees]);

  const sectionHeading = {
    fontSize: p(13),
    fontWeight: 700,
    color: '#1a1a1a',
    margin: '0 0 10px 0',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingBottom: p(6),
    borderBottom: `2px solid ${wc}`,
  };

  return (
    <div
      className="wine-sheet"
      style={{
        width: compact ? '100%' : 794,
        height: compact ? 'auto' : 1180,
        maxHeight: compact ? 'none' : 1180,
        margin: '0 auto',
        background: '#FFFDF7',
        overflow: 'hidden',
        boxShadow: '0 2px 20px rgba(0,0,0,0.10)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSize: p(14),
        color: '#333',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        lineHeight: 1.5,
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: `linear-gradient(135deg, ${wc} 0%, ${wc}CC 100%)`,
          padding: `${p(24)}px ${p(48)}px ${p(20)}px`,
          color: 'white',
          position: 'relative',
        }}
      >
        {agencyLogo && (
          <div style={{ position: 'absolute', top: p(20), right: p(32) }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agencyLogo}
              alt=""
              style={{ maxHeight: p(44), maxWidth: p(90), objectFit: 'contain', opacity: 0.9 }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}

        <div style={{ fontSize: p(10), letterSpacing: 5, textTransform: 'uppercase', opacity: 0.6, marginBottom: p(8) }}>
          {labels.ficheTechnique}
        </div>

        <h1 style={{
          fontSize: p(32),
          fontWeight: 700,
          margin: '0 0 4px 0',
          fontFamily: 'Georgia, "Times New Roman", serif',
          lineHeight: 1.15,
        }}>
          {wine.domaine}
        </h1>

        <h2 style={{
          fontSize: p(20),
          fontWeight: 400,
          margin: '0 0 14px 0',
          fontFamily: 'Georgia, "Times New Roman", serif',
          opacity: 0.92,
        }}>
          {wine.name} {wine.vintage && wine.vintage !== 'NM' ? wine.vintage : ''}
        </h2>

        <div style={{ display: 'flex', gap: 20, fontSize: p(12.5), opacity: 0.8, flexWrap: 'wrap', alignItems: 'center' }}>
          {wine.region && (
            <span>{wine.region}{wine.country && !wine.region.toLowerCase().includes(wine.country.toLowerCase()) ? `, ${wine.country}` : ''}</span>
          )}
          {wine.grape && (
            <>
              <span style={{ opacity: 0.5 }}>•</span>
              <span>{wine.grape}</span>
            </>
          )}
        </div>
      </div>

      {/* BODY */}
      <div ref={bodyRef} style={{
        flex: 1,
        padding: `${p(28)}px ${p(48)}px ${p(20)}px`,
        overflow: 'hidden',
      }}>
        <div ref={contentRef} style={{
          ...(bodyScale < 1 ? {
            transform: `scale(${bodyScale})`,
            transformOrigin: 'top left',
            width: `${100 / bodyScale}%`,
          } : {}),
        }}>

        {/* LE DOMAINE + image + quick stats */}
        <div style={{ display: 'flex', gap: p(30), marginBottom: p(26), alignItems: 'stretch', position: 'relative' }}>
          {wine.image && (
            <div style={{
              width: p(175),
              minWidth: p(175),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              marginTop: p(-10),
              marginBottom: p(10),
              zIndex: 2,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blendedImage || wine.image}
                alt={wine.name}
                style={{
                  height: p(240),
                  maxWidth: p(155),
                  objectFit: 'contain',
                  filter: 'drop-shadow(6px 8px 18px rgba(0,0,0,0.30))',
                }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}

          <div style={{ flex: 1 }}>
            {wine.domaineDesc && (
              <>
                <h3 style={{
                  fontSize: p(13),
                  fontWeight: 700,
                  color: wc,
                  margin: '0 0 10px 0',
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                }}>
                  {labels.leDomaine}
                </h3>
                <p style={{
                  fontSize: p(12.5),
                  lineHeight: 1.65,
                  color: '#3a3a3a',
                  margin: '0 0 14px 0',
                  textAlign: 'justify',
                }}>
                  {wine.domaineDesc}
                </p>
              </>
            )}

            <div style={{
              padding: `${p(10)}px ${p(16)}px`,
              border: '1px solid #ddd5c8',
              fontSize: p(11),
              lineHeight: 1.9,
              color: '#444',
            }}>
              <div>
                {[
                  wine.type && <><strong style={{ color: wc }}>{labels.type}</strong> {wine.type}</>,
                  wine.alcohol && <><strong style={{ color: wc }}>{labels.alcool}</strong> {wine.alcohol}</>,
                  wine.temperature && <><strong style={{ color: wc }}>{labels.temperature}</strong> {wine.temperature}</>,
                  wine.garde && <><strong style={{ color: wc }}>{labels.garde}</strong> {wine.garde.charAt(0).toUpperCase() + wine.garde.slice(1)}</>,
                ].filter(Boolean).map((item, i, arr) => (
                  <span key={i}>{item}{i < arr.length - 1 ? <span style={{ margin: `0 ${p(10)}px`, opacity: 0.35 }}>·</span> : ''}</span>
                ))}
              </div>
              {wine.colisage && (() => {
                // Sépare les infos palette sur une 2e ligne
                const text = wine.colisage;
                const paletteMatch = text.match(/^(.*?\.)\s*(\d+\s*cartons?\s*par\s*palette.*)$/i);
                if (paletteMatch) {
                  return (
                    <div style={{ marginTop: p(4) }}>
                      <div><strong style={{ color: wc }}>Colis.</strong> {paletteMatch[1]}</div>
                      <div style={{ marginTop: p(2) }}>{paletteMatch[2]}</div>
                    </div>
                  );
                }
                return <div style={{ marginTop: p(4) }}><strong style={{ color: wc }}>Colis.</strong> {text}</div>;
              })()}
            </div>
          </div>
        </div>

        {/* VINIFICATION / ÉLEVAGE (si fourni par l'utilisateur) */}
        {wine.vinificationUser && (
          <div style={{ marginBottom: p(22) }}>
            <h3 style={sectionHeading}>
              {labels.vinificationElevage || 'Vinification & Élevage'}
            </h3>
            <p style={{ fontSize: p(12.5), lineHeight: 1.75, color: '#444', paddingLeft: p(17) }}>
              {wine.vinificationUser}
            </p>
          </div>
        )}

        {/* NOTES DE DÉGUSTATION */}
        {(wine.oeil || wine.nez || wine.bouche) && (
          <div style={{ marginBottom: p(22) }}>
            <h3 style={sectionHeading}>
              {labels.notesDegustation}
            </h3>

            <div style={{ display: 'grid', gap: p(10), paddingLeft: p(17) }}>
              {[
                { label: labels.oeil, text: wine.oeil },
                { label: labels.nez, text: wine.nez },
                { label: labels.bouche, text: wine.bouche },
              ]
                .filter((n) => n.text)
                .map((note) => (
                  <div key={note.label}>
                    <div style={{ fontSize: p(13), fontWeight: 700, color: wc, marginBottom: p(4) }}>{note.label}</div>
                    <div style={{ fontSize: p(12.5), lineHeight: 1.85, color: '#444' }}>{note.text}</div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ACCORDS METS-VINS & SERVICE */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: p(36) }}>
          {wine.accords && wine.accords.length > 0 && (
            <div>
              <h3 style={sectionHeading}>
                {labels.accordsMetsVins}
              </h3>
              <div style={{ display: 'grid', gap: p(14) }}>
                {wine.accords.slice(0, 3).map((accord, i) => (
                  <div key={i} style={{
                    fontSize: p(12.5),
                    lineHeight: 1.8,
                    color: '#444',
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ color: wc, fontSize: 7, marginTop: 7, flexShrink: 0 }}>●</span>
                    <span>{accord}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(wine.momentService || wine.carafage) && (
            <div>
              <h3 style={sectionHeading}>
                {labels.service}
              </h3>
              <div style={{ display: 'grid', gap: p(10), fontSize: p(11.5), color: '#444', lineHeight: 1.6 }}>
                {wine.momentService && (
                  <div><strong>{labels.momentServiceLabel}</strong> {wine.momentService}</div>
                )}
                {wine.carafage && (
                  <div><strong>{labels.carafageLabel}</strong> {wine.carafage}</div>
                )}
              </div>
            </div>
          )}
        </div>

        </div>
      </div>

      {/* BANDEAU COORDONNÉES IMPORTATEUR — fixé en bas, pleine largeur */}
      {coordonnees && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          background: wc,
          padding: `${p(14)}px ${p(24)}px`,
          textAlign: 'center',
          fontSize: p(11.5),
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.5,
          zIndex: 10,
        }}>
          {(() => {
            // Split par tiret cadratin ou double tiret
            const parts = coordonnees.split(/\s*[—–]\s*/).map(s => s.trim()).filter(Boolean);
            // Ligne 1 : nom entreprise, nom personne, site web (pas de +33, pas de @, pas de numéro de rue)
            const line1 = [];
            const line2 = [];
            for (const part of parts) {
              const isPhone = /^\+?\d[\d\s.()-]{6,}/.test(part);
              const isEmail = /@/.test(part) && !part.startsWith('http') && !part.startsWith('www');
              const isAddress = /\d{4,5}\s/.test(part) || /rue |imp\.|avenue |boulevard |allée |chemin |place /i.test(part);
              if (isPhone || isEmail || isAddress) {
                line2.push(part);
              } else {
                line1.push(part);
              }
            }
            return (
              <>
                {line1.length > 0 && <div>{line1.join(' — ')}</div>}
                {line2.length > 0 && <div style={{ marginTop: p(2), opacity: 0.85 }}>{line2.join(' — ')}</div>}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
