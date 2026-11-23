import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroScreen({ ribbonCount, onStart }) {
  return (
    <section className="flex min-h-[calc(100dvh-160px)] flex-col justify-between px-5 pb-10 pt-14 sm:px-8">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center">
        {/* Açılışta Çizilerek Beliren Mor Kurdele */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.75, 1.35], opacity: [0.55, 0] }}
            transition={{
              duration: 1.4,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-ribbon/40 bg-lavender/60"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full border border-ribbon/25 bg-lavender/70"
          >
            <svg
              viewBox="0 0 120 150"
              className="h-14 w-14 overflow-visible"
              role="img"
              aria-label="Kadına yönelik şiddete karşı mor farkındalık kurdelesi"
            >
              <motion.path
                d="M35 46 C35 20 85 20 85 46 C85 68 62 94 40 132 L25 123 C45 89 67 66 67 48 C67 36 53 36 53 48"
                stroke="#5B21B6"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, fill: 'rgba(76, 29, 149, 0)' }}
                animate={{ pathLength: 1, fill: '#4C1D95' }}
                transition={{
                  pathLength: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                  fill: { duration: 0.45, delay: 0.65 },
                }}
              />
              <motion.path
                d="M85 46 C85 20 35 20 35 46 C35 68 58 94 80 132 L95 123 C75 89 53 66 53 48 C53 36 67 36 67 48"
                stroke="#5B21B6"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, fill: 'rgba(91, 33, 182, 0)' }}
                animate={{ pathLength: 1, fill: '#5B21B6' }}
                transition={{
                  pathLength: {
                    duration: 0.85,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  },
                  fill: { duration: 0.45, delay: 0.72 },
                }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 inline-flex items-center gap-2 self-start"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-ribbon"
            aria-hidden="true"
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ribbon">
            25 Kasım · Kadına Yönelik Şiddete Karşı Mücadele Günü
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[2.55rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[3.35rem]"
        >
          Bildiğini Sandığın Gerçekler.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-[1.075rem]"
        >
          4 kısa soru. 30 saniye. Önce tahmin et, sonra Türkiye ve dünya
          verileriyle yüzleş.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9"
        >
          <button
            type="button"
            onClick={onStart}
            className="group inline-flex min-h-[54px] w-full items-center justify-between rounded-xl bg-ribbon px-6 text-base font-semibold text-canvas transition-colors hover:bg-[#4C1D95] active:scale-[0.99] sm:w-auto sm:min-w-[240px]"
          >
            <span>Teste Başla</span>
            <ArrowRight
              className="ml-4 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <div className="mt-6 flex items-center gap-2.5 border-t border-hairline pt-5 text-sm text-muted">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ribbon opacity-45" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ribbon" />
            </span>
            <p className="leading-snug">
              Şu ana kadar{' '}
              <strong className="tabular-nums font-semibold text-ink">
                {ribbonCount !== null
                  ? ribbonCount.toLocaleString('tr-TR')
                  : '—'}
              </strong>{' '}
              kişi mor kurdele bıraktı.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}