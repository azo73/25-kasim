import { motion, AnimatePresence } from 'framer-motion';

export default function PurpleRibbonSvg({ isFilled, rippleKey }) {
  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <AnimatePresence>
        {isFilled && (
          <>
            <motion.span
              key={`ripple-1-${rippleKey}`}
              initial={{ scale: 0.65, opacity: 0.6 }}
              animate={{ scale: 1.65, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute inset-3 rounded-full border border-ribbon/40 bg-lavender/50"
            />
            <motion.span
              key={`ripple-2-${rippleKey}`}
              initial={{ scale: 0.65, opacity: 0.45 }}
              animate={{ scale: 1.95, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.35,
                delay: 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pointer-events-none absolute inset-3 rounded-full border border-ribbon/25"
            />
          </>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          backgroundColor: isFilled ? '#EDE9FE' : '#FAF8F5',
          borderColor: isFilled ? '#5B21B6' : '#E3DDD3',
          scale: isFilled ? [1, 1.04, 1] : 1,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex h-36 w-36 items-center justify-center rounded-full border"
      >
        <svg
          viewBox="0 0 120 150"
          className="h-24 w-24 overflow-visible"
          role="img"
          aria-label={
            isFilled ? 'Doldurulmuş mor farkındalık kurdelesi' : 'Mor kurdele'
          }
        >
          <motion.path
            d="M35 46 C35 20 85 20 85 46 C85 68 62 94 40 132 L25 123 C45 89 67 66 67 48 C67 36 53 36 53 48"
            stroke="#5B21B6"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              fill: isFilled ? '#4C1D95' : 'rgba(91, 33, 182, 0)',
            }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M85 46 C85 20 35 20 35 46 C35 68 58 94 80 132 L95 123 C75 89 53 66 53 48 C53 36 67 36 67 48"
            stroke="#5B21B6"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              fill: isFilled ? '#5B21B6' : 'rgba(91, 33, 182, 0)',
            }}
            transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
