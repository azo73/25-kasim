import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shuffle } from 'lucide-react';
import { pickRandomQuestions } from '../data/questions';
import { recordQuestionResponse } from '../lib/analyticsService';
import CountUpNumber from './CountUpNumber';

function AwarenessCard({ question, index, locationTag }) {
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [samePercent, setSamePercent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAnswered = selectedOptionId !== null;
  const isCorrect = selectedOptionId === question.correctOptionId;

  const handleSelect = async (optionId) => {
    if (isAnswered || isSubmitting) return;
    setSelectedOptionId(optionId);
    setIsSubmitting(true);

    const res = await recordQuestionResponse({
      questionId: question.id,
      selectedOptionId: optionId,
      isCorrect: optionId === question.correctOptionId,
      locationTag,
    });

    setSamePercent(res.sameGuessPercentage);
    setIsSubmitting(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="rounded-2xl border border-hairline bg-canvas p-5 sm:p-6"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ribbon">
          {question.category}
        </span>
        <span className="tabular-nums text-[11px] font-medium text-muted/75">
          0{index + 1}
        </span>
      </div>

      <h2 className="font-serif text-[1.25rem] font-semibold leading-[1.3] tracking-[-0.01em] text-ink sm:text-[1.4rem]">
        {question.question}
      </h2>

      <div className="mt-4 space-y-2.5" role="radiogroup">
        {question.options.map((option) => {
          const isThisSelected = selectedOptionId === option.id;
          const isThisCorrect = option.id === question.correctOptionId;

          let style =
            'border-hairline bg-canvas text-ink hover:border-ribbon/60 hover:bg-surface/60';

          if (isAnswered) {
            if (isThisCorrect) {
              style = 'border-ribbon bg-lavender/65 text-ink font-semibold';
            } else if (isThisSelected && !isThisCorrect) {
              style = 'border-crimson/50 bg-crimson/[0.05] text-ink';
            } else {
              style = 'border-hairline/70 bg-canvas text-muted/55';
            }
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelect(option.id)}
              className={`flex min-h-[50px] w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm leading-snug transition-all duration-200 ${style} ${
                !isAnswered ? 'active:scale-[0.99]' : 'cursor-default'
              }`}
            >
              <span>{option.label}</span>

              {isAnswered && isThisCorrect && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ribbon px-2 py-0.5 text-[10px] font-semibold text-canvas">
                  <Check className="h-3 w-3" aria-hidden="true" />
                  Gerçek
                </span>
              )}

              {isAnswered && isThisSelected && !isThisCorrect && (
                <span className="shrink-0 text-[10px] font-medium text-crimson">
                  Tahminin
                </span>
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 rounded-xl border border-hairline border-l-[3px] border-l-crimson bg-surface p-4 sm:p-5"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-crimson">
              Gerçek Veri
            </span>

            <div className="mt-1.5">
              {question.statHighlight ? (
                <h3 className="font-serif text-[1.55rem] font-bold leading-tight text-crimson sm:text-[1.8rem]">
                  <CountUpNumber
                    value={question.statHighlight.value}
                    prefix={question.statHighlight.prefix}
                    duration={0.8}
                  />
                  <span>{question.statHighlight.suffix}</span>
                </h3>
              ) : (
                <h3 className="font-serif text-[1.35rem] font-bold leading-snug text-crimson sm:text-[1.55rem]">
                  {question.realityTitle}
                </h3>
              )}
            </div>

            <p className="mt-2.5 text-sm font-medium leading-relaxed text-ink">
              {isCorrect ? question.matchCopy : question.mismatchCopy}
            </p>

            <p className="mt-2.5 border-t border-hairline pt-2.5 text-xs leading-relaxed text-muted sm:text-[0.84rem]">
              {question.realityDescription}
            </p>

            <div className="mt-3 rounded-lg bg-canvas/85 px-3 py-2 text-[11px] text-muted">
              {samePercent !== null ? (
                <span>
                  Katılımcıların{' '}
                  <strong className="font-semibold text-ink">
                    <CountUpNumber value={samePercent} prefix="%" duration={0.55} />
                    &apos;i
                  </strong>{' '}
                  de senin gibi tahmin etti.
                </span>
              ) : (
                <span>Yanıt oranı hesaplanıyor...</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function RandomAwarenessCards({ locationTag }) {
  const [batchNumber, setBatchNumber] = useState(1);
  const [seenIds, setSeenIds] = useState([]);
  const [cards, setCards] = useState(() => pickRandomQuestions(4, []));
  const sectionRef = useRef(null);

  const handleLoadMore = () => {
    const nextSeen = [...new Set([...seenIds, ...cards.map((c) => c.id)])];
    const resetIfDone = nextSeen.length >= 12 ? [] : nextSeen;
    const nextBatch = pickRandomQuestions(4, resetIfDone);
    setSeenIds(resetIfDone);
    setCards(nextBatch);
    setBatchNumber((prev) => prev + 1);

    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-xl border-t border-hairline px-5 pb-14 pt-8 sm:px-8"
    >
      <div className="mb-6 flex items-baseline justify-between gap-3">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Tahmin Et · Yüzleş
          </span>
          <p className="mt-1 text-xs text-muted">
            Farklı şiddet türlerinden senin için rastgele seçilen 4 gerçek.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {cards.map((question, idx) => (
          <AwarenessCard
            key={`${batchNumber}-${question.id}`}
            question={question}
            index={idx}
            locationTag={locationTag}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={handleLoadMore}
          className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-hairline bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:border-ribbon/50 hover:bg-lavender/50 active:scale-[0.99] sm:w-auto sm:min-w-[260px]"
        >
          <Shuffle className="h-4 w-4 text-ribbon" aria-hidden="true" />
          <span>Farklı 4 Gerçek Daha Gör</span>
        </button>
      </div>
    </section>
  );
}
