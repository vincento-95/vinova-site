"use client";
/**
 * WineSheet — professional A4 wine technical sheet.
 * Adapted from wine-fiches for Next.js.
 */
import { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { t } from '../../lib/translations';

export default function WineSheet({ wine, index = 0, totalCount = 1, agencyName = '', agencyLogo = '', compact = false, lang }) {
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
        setBodyScale(Math.max(0.85, availableH / contentH));
      } else {
        setBodyScale(1);
      }
    };
    recalc();
    const t = setTimeout(recalc, 150);
    return () => clearTimeout(t);
  }, [wine, compact, lang, blendedImage]);

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
          {wine.vintage && <span>{wine.vintage}</span>}
        </div>
      </div>

      {/* BODY */}
      <div ref={bodyRef} style={{
        flex: 1,
        padding: `${p(20)}px ${p(48)}px ${p(20)}px`,
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
              alignItems: 'flex-end',
              justifyContent: 'center',
              position: 'relative',
              marginTop: p(-50),
              zIndex: 2,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blendedImage || wine.image}
                alt={wine.name}
                style={{
                  height: p(260),
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
              display: 'flex',
              gap: p(24),
              padding: `${p(10)}px ${p(20)}px`,
              border: '1px solid #ddd5c8',
              fontSize: p(12.5),
              flexWrap: 'wrap',
            }}>
              {wine.type && (
                <div><strong style={{ color: wc }}>{labels.type}</strong> {wine.type}</div>
              )}
              {wine.alcohol && (
                <div><strong style={{ color: wc }}>{labels.alcool}</strong> {wine.alcohol}</div>
              )}
              {wine.temperature && (
                <div><strong style={{ color: wc }}>{labels.temperature}</strong> {wine.temperature}</div>
              )}
              {wine.garde && (
                <div><strong style={{ color: wc }}>{labels.garde}</strong> {wine.garde}</div>
              )}
            </div>
          </div>
        </div>

        {/* NOTES DE DÉGUSTATION */}
        {(wine.oeil || wine.nez || wine.bouche) && (
          <div style={{ marginBottom: p(22) }}>
            <h3 style={sectionHeading}>
              {labels.notesDegustation}
            </h3>

            <div style={{ display: 'grid', gap: p(14) }}>
              {[
                { label: labels.oeil, letter: labels.oeilLetter, text: wine.oeil },
                { label: labels.nez, letter: labels.nezLetter, text: wine.nez },
                { label: labels.bouche, letter: labels.boucheLetter, text: wine.bouche },
              ]
                .filter((n) => n.text)
                .map((note) => (
                  <div key={note.label} style={{ display: 'flex', gap: p(14) }}>
                    <div style={{
                      width: `${p(38)}px`,
                      minWidth: `${p(38)}px`,
                      height: `${p(38)}px`,
                      borderRadius: '50%',
                      background: `${wc}12`,
                      border: `1px solid ${wc}20`,
                      fontSize: `${p(14)}px`,
                      fontWeight: 800,
                      lineHeight: `${p(38)}px`,
                      textAlign: 'center',
                      color: wc,
                      marginTop: `${p(2)}px`,
                      overflow: 'hidden',
                    }}>
                      {note.letter}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: p(13), fontWeight: 700, color: '#1a1a1a', marginBottom: 3 }}>
                        {note.label}
                      </div>
                      <div style={{ fontSize: p(12.5), lineHeight: 1.85, color: '#444' }}>
                        {note.text}
                      </div>
                    </div>
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

      {/* FOOTER */}
      <div style={{
        padding: `${p(14)}px ${p(48)}px`,
        borderTop: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: p(11),
        color: '#aaa',
      }}>
        <span>{totalCount > 1 ? `${labels.fiche} ${index + 1}/${totalCount}` : ''}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {agencyName && <span>{agencyName}</span>}
          {agencyLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={agencyLogo}
              alt=""
              style={{ maxHeight: 20, maxWidth: 48, objectFit: 'contain' }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
