import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Share2, Phone } from 'lucide-react';
import PurpleRibbonSvg from './PurpleRibbonSvg';
import { hasLeftRibbon, leavePurpleRibbon } from '../lib/analyticsService';

export default function SolidarityBanner({
  ribbonCount,
  onRibbonCountChange,
  locationTag,
}) {
  const [supported, setSupported] = useState(() => hasLeftRibbon());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const [shareFeedback, setShareFeedback] = useState('');

  const handleSupportClick = async () => {
    if (supported || isSubmitting) return;
    setIsSubmitting(true);
    setSupported(true);
    setRippleKey((prev) => prev + 1);

    const { totalRibbons } = await leavePurpleRibbon({ locationTag });
    onRibbonCountChange(totalRibbons);
    setIsSubmitting(false);
  };

  const handleShare = async () => {
    const cleanUrl = `${window.location.origin}${window.location.pathname}`;
    const shareData = {
      title: 'Mor Ses — Kadına Yönelik Şiddete Karşı Farkındalık',
      text: 'Sessiz kalma. Gerçeklerle yüzleş ve mor kurdele bırakarak destek ol.',
      url: cleanUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch (error) {
      if (error?.name === 'AbortError') return;
    }

    try {
      await navigator.clipboard.writeText(cleanUrl);
      setShareFeedback('Bağlantı kopyalandı');
      window.setTimeout(() => setShareFeedback(''), 2500);
    } catch {
      setShareFeedback('Adres çubuğundan kopyalayabilirsin');
      window.setTimeout(() => setShareFeedback(''), 2800);
    }
  };

  const displayCount =
    typeof ribbonCount === 'number' ? ribbonCount.toLocaleString('tr-TR') : '0';

  return (
    <header className="mx-auto w-full max-w-xl px-5 pb-8 pt-12 sm:px-8">
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-ribbon">
          <span
            className="h-1.5 w-1.5 rounded-full bg-ribbon"
            aria-hidden="true"
          />
          Mor Ses · Farkındalık Alanı
        </span>

        <h1 className="mt-3 font-serif text-[2.2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink sm:text-[2.85rem]">
          Fark Et. Sessiz Kalma.
        </h1>

        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-[0.98rem]">
          Kadına yönelik şiddet yalnızca fiziksel değildir. Mor kurdeleye
          dokunarak desteğini göster, ardından gerçek verilerle yüzleş.
        </p>

        <button
          type="button"
          onClick={handleSupportClick}
          disabled={supported || isSubmitting}
          aria-label={
            supported
              ? 'Desteğin kaydedildi'
              : 'Mor kurdeleye dokun ve desteğini göster'
          }
          className={`mt-6 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ribbon focus-visible:ring-offset-4 focus-visible:ring-offset-canvas ${
            supported
              ? 'cursor-default'
              : 'cursor-pointer transition-transform hover:scale-[1.03] active:scale-95'
          }`}
        >
          <PurpleRibbonSvg isFilled={supported} rippleKey={rippleKey} />
        </button>

        {!supported ? (
          <div className="mt-3 flex flex-col items-center">
            <button
              type="button"
              onClick={handleSupportClick}
              disabled={isSubmitting}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-ribbon px-6 text-sm font-semibold text-canvas transition-colors hover:bg-[#4C1D95] active:scale-[0.99]"
            >
              Mor Kurdeleye Dokun — Desteğini Göster
            </button>
            <p className="mt-3 text-xs text-muted">
              Şu ana kadar{' '}
              <strong className="tabular-nums font-semibold text-ink">
                {displayCount}
              </strong>{' '}
              kişi kadına yönelik şiddete karşı mor kurdele bıraktı.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 w-full rounded-2xl border border-ribbon/30 bg-lavender/65 p-5 text-left"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ribbon text-canvas">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">
                    Desteğin eklendi — sessiz kalmıyoruz.
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Seninle birlikte şu an{' '}
                    <strong className="tabular-nums font-bold text-ribbon">
                      {displayCount}
                    </strong>{' '}
                    kişi kadına yönelik şiddete karşı mor kurdele bıraktı.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-ribbon/15 pt-3.5">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex min-h-[42px] flex-1 items-center justify-center gap-1.5 rounded-lg bg-ribbon px-3.5 text-xs font-semibold text-canvas transition-colors hover:bg-[#4C1D95]"
                >
                  {shareFeedback ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{shareFeedback}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Arkadaşına Gönder</span>
                    </>
                  )}
                </button>

                <a
                  href="tel:183"
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-ribbon/30 bg-canvas px-3.5 text-xs font-semibold text-ribbon transition-colors hover:bg-surface"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>ALO 183</span>
                </a>

                <a
                  href="tel:112"
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-crimson/30 bg-canvas px-3.5 text-xs font-semibold text-crimson transition-colors hover:bg-surface"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>112</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </header>
  );
}
