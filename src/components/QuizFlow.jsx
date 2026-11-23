import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { recordQuestionResponse } from '../lib/analyticsService';
import CountUpNumber from './CountUpNumber';

export default function QuizFlow({ locationTag, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [campusSamePercent, setCampusSamePercent] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const realityRef = useRef(null);

  const question = QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONS.length;
  const isAnswered = selectedOptionId !== null;
  const isCorrect = selectedOptionId === question.correctOptionId;
  const selectedOption = question.options.find(
    (opt) => opt.id === selectedOptionId
  );

  const handleOptionSelect = async (optionId) => {
    if (isAnswered || isSubmitting) return;

    const guessedCorrectly = optionId === question.correctOptionId;
    setSelectedOptionId(optionId);
    setIsSubmitting(true);

    if (guessedCorrectly) {
      setCorrectCount((prev) => prev + 1);
    }

    const result = await recordQuestionResponse({
      questionId: question.id,
      selectedOptionId: optionId,
      isCorrect: guessedCorrectly,
      locationTag,
    });

    setCampusSamePercent(result.sameGuessPercentage);
    setIsSubmitting(false);

    window.setTimeout(() => {
      realityRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }, 180);
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setCampusSamePercent(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(correctCount);
    }
  };

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <section className="mx-auto flex min-h-[calc(100dvh-160px)] w-full max-w-lg flex-col px-5 pb-12 pt-20 sm:px-8">
      <div className="mb-8">
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Tahmin Et & Yüzleş
          </span>
          <span className="tabular-nums text-xs font-semibold text-ink">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
        <div
          className="h-[3px] w-full overflow-hidden rounded-full bg-surface"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
        >
          <motion.div
            className="h-full bg-ribbon"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 flex-col"
        >
          <h2 className="font-serif text-[1.65rem] font-semibold leading-[1.24] tracking-[-0.015em] text-ink sm:text-[1.95rem]">
            {question.question}
          </h2>

          <div className="mt-7 space-y-3" role="radiogroup">
            {question.options.map((option) => {
              const isThisSelected = selectedOptionId === option.id;
              const isThisCorrect = option.id === question.correctOptionId;

              let buttonStyle =
                'border-hairline bg-canvas text-ink hover:border-ribbon/60 hover:bg-surface/60';

              if (isAnswered) {
                if (isThisCorrect) {
                  buttonStyle =
                    'border-ribbon bg-lavender/65 text-ink font-semibold';
                } else if (isThisSelected && !isThisCorrect) {
                  buttonStyle =
                    'border-crimson/50 bg-crimson/[0.05] text-ink';
                } else {
                  buttonStyle =
                    'border-hairline/70 bg-canvas text-muted/60';
                }
              }

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`flex min-h-[54px] w-full items-center justify-between gap-3 rounded-xl border px-5 py-3.5 text-left text-[0.98rem] leading-snug transition-all duration-200 ${buttonStyle} ${
                    !isAnswered ? 'active:scale-[0.99]' : 'cursor-default'
                  }`}
                >
                  <span>{option.label}</span>

                  {isAnswered && isThisCorrect && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ribbon px-2.5 py-0.5 text-[11px] font-semibold text-canvas">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Veri
                    </span>
                  )}

                  {isAnswered && isThisSelected && !isThisCorrect && (
                    <span className="shrink-0 text-[11px] font-medium text-crimson">
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
                ref={realityRef}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 overflow-hidden rounded-xl border border-hairline border-l-[3px] border-l-crimson bg-surface p-5 sm:p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-crimson">
                    Gerçek Veri
                  </span>
                  {selectedOption && (
                    <span className="text-xs text-muted">
                      Tahminin:{' '}
                      <strong className="font-medium text-ink">
                        {selectedOption.label}
                      </strong>
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  {question.statHighlight ? (
                    <h3 className="font-serif text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-crimson sm:text-[2.35rem]">
                      <CountUpNumber
                        value={question.statHighlight.value}
                        prefix={question.statHighlight.prefix}
                        duration={0.9}
                      />
                      <span>{question.statHighlight.suffix}</span>
                    </h3>
                  ) : (
                    <h3 className="font-serif text-[1.65rem] font-bold leading-[1.18] tracking-[-0.015em] text-crimson sm:text-[1.95rem]">
                      {question.realityTitle}
                    </h3>
                  )}
                </div>

                <p className="mt-3 text-sm font-medium leading-relaxed text-ink">
                  {isCorrect ? question.matchCopy : question.mismatchCopy}
                </p>

                <p className="mt-3 border-t border-hairline pt-3 text-sm leading-relaxed text-muted">
                  {question.realityDescription}
                </p>

                <div className="mt-4 rounded-lg bg-canvas/80 px-3.5 py-2.5 text-xs text-muted">
                  {campusSamePercent !== null ? (
                    <span>
                      Katılımcıların{' '}
                      <strong className="font-semibold text-ink">
                        <CountUpNumber
                          value={campusSamePercent}
                          prefix="%"
                          duration={0.65}
                        />
                        &apos;i
                      </strong>{' '}
                      de senin gibi tahmin etti.
                    </span>
                  ) : (
                    <span>Kampüs yanıtları hesaplanıyor...</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="group mt-5 inline-flex min-h-[52px] w-full items-center justify-between rounded-xl bg-ink px-5 text-sm font-semibold text-canvas transition-colors hover:bg-ribbon active:scale-[0.99]"
                >
                  <span>
                    {currentIndex + 1 < totalQuestions
                      ? 'Sonraki Soru'
                      : 'Dayanışmaya Katıl'}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
