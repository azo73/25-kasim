import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Check, RotateCcw } from 'lucide-react';
import PurpleRibbonSvg from './PurpleRibbonSvg';
import { hasLeftRibbon, leavePurpleRibbon } from '../lib/analyticsService';

export default function RibbonClosingScreen({
  ribbonCount,
  onRibbonCountChange,
  locationTag,
  onRestart,
}) {
  const [leftRibbon, setLeftRibbon] = useState(() => hasLeftRibbon());
  const [isLeaving, setIsLeaving] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const [shareFeedback, setShareFeedback] = useState('');

  const handleLeaveRibbon = async () => {
    if (leftRibbon || isLeaving) return;
    setIsLeaving(true);
    setLeftRibbon(true);
    setRippleKey((prev) => prev + 1);

    const { totalRibbons } = await leavePurpleRibbon({ locationTag });
    onRibbonCountChange(totalRibbons);
    setIsLeaving(false);
  };

  const handleShare = async () => {
    const cleanUrl = `${window.location.origin}${window.location.pathname}`;
    const shareData = {
      title: '25 Kasım Farkındalık Hareketi — Bildiğini Sandığın Gerçekler',
      text: '4 kısa soru, 30 saniye. Önce tahmin et, sonra gerçek verilerle yüzleş ve mor kurdele bırak.',
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
      window.setTimeout(() => setShareFeedback(''), 2600);
    } catch {
      setShareFeedback('Bağlantıyı adres çubuğundan kopyalayabilirsin');
      window.setTimeout(() => setShareFeedback(''), 3000);
    }
  };

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-160px)] w-full max-w-lg flex-col justify-center px-5 pb-12 pt-20 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ribbon">
          Farkındalık İlk Adımdır
        </span>

        <h2 className="mt-3 font-serif text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] text-ink sm:text-[2.45rem]">
          {leftRibbon
            ? 'Sessizliği Birlikte Bozuyoruz.'
            : 'Şimdi Sıra Sessiz Kalmamakta.'}
        </h2>

        <p className="mt-3.5 max-w-md text-sm leading-relaxed text-muted sm:text-[0.98rem]">
          Rakamların her biri gerçek bir yaşamı temsil ediyor. Gördüğünde,
          duyduğunda ve paylaştığında değişim başlar.
        </p>

        <button
          type="button"
          onClick={handleLeaveRibbon}
          disabled={leftRibbon || isLeaving}
          aria-label={
            leftRibbon
              ? 'Mor kurdele bırakıldı'
              : 'Sessiz kalmadığını göster, mor kurdele bırak'
          }
          className={`mt-7 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ribbon focus-visible:ring-offset-4 focus-visible:ring-offset-canvas ${
            leftRibbon ? 'cursor-default' : 'cursor-pointer transition-transform active:scale-95'
          }`}
        >
          <PurpleRibbonSvg isFilled={leftRibbon} rippleKey={rippleKey} />
        </button>

        <div className="mt-6 w-full">
          {!leftRibbon ? (
            <button
              type="button"
              onClick={handleLeaveRibbon}
              disabled={isLeaving}
              className="inline-flex min-h-[54px] w-full items-center justify-center rounded-xl bg-ribbon px-5 py-3 text-sm font-semibold text-canvas transition-colors hover:bg-[#4C1D95] active:scale-[0.99] sm:text-[0.96rem]"
            >
              Sessiz Kalmadığını Göster — Mor Kurdele Bırak
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border border-ribbon/25 bg-lavender/70 px-5 py-4"
            >
              <p className="text-sm font-medium leading-relaxed text-ink sm:text-[0.98rem]">
                Dayanışmaya katıldın. Şu an{' '}
                <strong className="tabular-nums font-bold text-ribbon">
                  {ribbonCount !== null
                    ? ribbonCount.toLocaleString('tr-TR')
                    : '1'}
                </strong>{' '}
                kişi sessiz kalmıyor.
              </p>
            </motion.div>
          )}

          <button
            type="button"
            onClick={handleShare}
            className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-hairline bg-canvas px-5 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-surface active:scale-[0.99]"
          >
            {shareFeedback ? (
              <>
                <Check className="h-4 w-4 text-ribbon" aria-hidden="true" />
                <span className="text-ribbon">{shareFeedback}</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" aria-hidden="true" />
                <span>Arkadaşına Gönder</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Sorulara tekrar göz at</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
