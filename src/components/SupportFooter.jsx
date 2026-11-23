import { useState } from 'react';
import { Phone, ShieldAlert, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SupportFooter() {
  const [showKadesInfo, setShowKadesInfo] = useState(false);

  return (
    <footer className="border-t border-hairline bg-surface/80">
      <div className="mx-auto w-full max-w-lg px-5 py-7 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Acil Destek Hatları — 7/24 Ücretsiz
        </p>

        <div className="mt-3.5 grid grid-cols-2 gap-2.5">
          <a
            href="tel:112"
            className="flex min-h-[52px] items-center justify-between rounded-xl border border-hairline bg-canvas px-4 py-2.5 transition-colors hover:border-crimson/50"
          >
            <div>
              <div className="tabular-nums text-base font-bold text-crimson">
                112
              </div>
              <div className="text-[11px] text-muted">Acil Çağrı</div>
            </div>
            <Phone className="h-4 w-4 text-crimson" aria-hidden="true" />
          </a>

          <a
            href="tel:183"
            className="flex min-h-[52px] items-center justify-between rounded-xl border border-hairline bg-canvas px-4 py-2.5 transition-colors hover:border-ribbon/50"
          >
            <div>
              <div className="tabular-nums text-base font-bold text-ribbon">
                ALO 183
              </div>
              <div className="text-[11px] text-muted">Sosyal Destek</div>
            </div>
            <Phone className="h-4 w-4 text-ribbon" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-2.5 rounded-xl border border-hairline bg-canvas">
          <button
            type="button"
            onClick={() => setShowKadesInfo((prev) => !prev)}
            aria-expanded={showKadesInfo}
            className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-2.5 text-left"
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert
                className="h-4 w-4 shrink-0 text-ribbon"
                aria-hidden="true"
              />
              <div>
                <span className="text-sm font-semibold text-ink">KADES</span>
                <span className="ml-2 text-xs text-muted">
                  Kadın Destek Uygulaması
                </span>
              </div>
            </div>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${
                showKadesInfo ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          <AnimatePresence initial={false}>
            {showKadesInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <p className="border-t border-hairline px-4 py-3 text-xs leading-relaxed text-muted">
                  Emniyet Genel Müdürlüğü tarafından geliştirilen resmi mobil
                  uygulamadır. Acil durumlarda telefonun konum bilgisini açarak
                  tek dokunuşla en yakın polis veya jandarma ekibine ulaşmanızı
                  sağlar. App Store ve Google Play üzerinden ücretsiz
                  indirilebilir.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-6 border-t border-hairline pt-4 text-center text-[11px] leading-relaxed text-muted/85">
          Mor Ses — Toplumsal Farkındalık Projesi | Tamamen Anonimdir, Kişisel
          Veri Toplanmaz.
        </p>
      </div>
    </footer>
  );
}
