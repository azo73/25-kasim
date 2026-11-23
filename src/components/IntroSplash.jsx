import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function IntroSplash({ onFinish }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      onFinish();
    }, 3600);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={onFinish}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onFinish();
      }}
      aria-label="Açılış ekranını geç"
      className="fixed inset-0 z-40 flex cursor-pointer flex-col items-center justify-center bg-[#0B0A0F] px-6 text-center text-[#FAF8F5]"
    >
      <div className="relative flex flex-col items-center">
        {/* Arka planda yumuşak mor hale */}
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: [0.85, 1.35], opacity: [0.45, 0] }}
          transition={{ duration: 1.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="pointer-events-none absolute top-4 h-44 w-44 rounded-full border border-[#7C3AED]/50 bg-[#5B21B6]/20"
        />

        {/* Büyük Çizilen Mor Kurdele */}
        <svg
          viewBox="0 0 120 150"
          className="relative h-44 w-44 overflow-visible sm:h-52 sm:w-52"
          role="img"
          aria-label="Kadına yönelik şiddete karşı mor kurdele"
        >
          <motion.path
            d="M35 46 C35 20 85 20 85 46 C85 68 62 94 40 132 L25 123 C45 89 67 66 67 48 C67 36 53 36 53 48"
            stroke="#A78BFA"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, fill: 'rgba(91, 33, 182, 0)' }}
            animate={{ pathLength: 1, fill: '#5B21B6' }}
            transition={{
              pathLength: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
              fill: { duration: 0.65, delay: 0.8 },
            }}
          />
          <motion.path
            d="M85 46 C85 20 35 20 35 46 C35 68 58 94 80 132 L95 123 C75 89 53 66 53 48 C53 36 67 36 67 48"
            stroke="#C4B5FD"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, fill: 'rgba(124, 58, 237, 0)' }}
            animate={{ pathLength: 1, fill: '#7C3AED' }}
            transition={{
              pathLength: {
                duration: 1.05,
                delay: 0.14,
                ease: [0.16, 1, 0.3, 1],
              },
              fill: { duration: 0.65, delay: 0.9 },
            }}
          />
        </svg>

        {/* Vurucu Farkındalık Sözü */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-md font-serif text-2xl font-medium leading-snug tracking-[-0.01em] text-[#FAF8F5] sm:text-3xl"
        >
          “Sessizlik, şiddetin en büyük ortağıdır.”
        </motion.p>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.25 }}
          className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C4B5FD]"
        >
          25 Kasım · Kadına Yönelik Şiddete Karşı Mücadele Günü
        </motion.span>
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.5, delay: 1.7 }}
        className="absolute bottom-8 text-xs tracking-wide text-[#A1A1AA]"
      >
        Devam etmek için dokun
      </motion.span>
    </motion.div>
  );
}
