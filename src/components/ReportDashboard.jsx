import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft, MapPin, RotateCcw } from 'lucide-react';
import { fetchReportData, resetDemoData } from '../lib/analyticsService';

const LOCATION_LABELS = {
  yemekhane: 'Merkez Yemekhane',
  kutuphane: 'Kütüphane',
  kantin: 'Fakülte Kantinleri',
  genel: 'Genel / Doğrudan Erişim',
};

function formatLocationLabel(tag) {
  return LOCATION_LABELS[tag] || tag.replace(/[-_]/g, ' ');
}

export default function ReportDashboard({ onBackToApp }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadReport = useCallback(async () => {
    setLoading(true);
    const data = await fetchReportData();
    setReport(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  const handleResetDemo = () => {
    resetDemoData();
    loadReport();
  };

  return (
    <div className="min-h-dvh bg-canvas px-5 pb-16 pt-12 text-ink sm:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ribbon">
                Mor Ses · Rapor Ekranı
              </span>
              {report && (
                <span className="rounded-full border border-hairline bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
                  {report.mode === 'supabase' ? 'Canlı Supabase' : 'Yerel Kayıt'}
                </span>
              )}
            </div>
            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.015em] text-ink">
              Katılım ve Farkındalık Özeti
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={loadReport}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg border border-hairline bg-canvas px-3.5 text-xs font-semibold text-ink transition-colors hover:bg-surface"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>Yenile</span>
            </button>

            <button
              type="button"
              onClick={onBackToApp}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-lg bg-ink px-3.5 text-xs font-semibold text-canvas transition-colors hover:bg-ribbon"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Uygulamaya Dön</span>
            </button>
          </div>
        </div>

        {loading && !report ? (
          <div className="py-20 text-center text-sm text-muted">
            İstatistikler yükleniyor...
          </div>
        ) : (
          report && (
            <>
              <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div className="rounded-xl border border-ribbon/25 bg-lavender/45 p-5">
                  <p className="text-xs font-medium text-ribbon">
                    Mor Kurdele Desteği Verenler
                  </p>
                  <p className="tabular-nums mt-2 font-serif text-4xl font-semibold text-ribbon">
                    {report.totalRibbons.toLocaleString('tr-TR')}
                  </p>
                </div>

                <div className="rounded-xl border border-hairline bg-surface/70 p-5">
                  <p className="text-xs font-medium text-muted">
                    Toplam Yanıtlanan Farkındalık Kartı
                  </p>
                  <p className="tabular-nums mt-2 font-serif text-4xl font-semibold text-ink">
                    {report.totalResponses.toLocaleString('tr-TR')}
                  </p>
                </div>
              </div>

              <section className="mt-10">
                <h2 className="font-serif text-xl font-semibold text-ink">
                  Tüm Şiddet Türlerine Göre Tahmin Dağılımı (12 Soru)
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Mor renkli çubuk gerçek veriyle örtüşen doğru yanıtı gösterir.
                </p>

                <div className="mt-5 space-y-4">
                  {report.questionStats.map((q) => (
                    <div
                      key={q.id}
                      className="rounded-xl border border-hairline bg-canvas p-5"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ribbon">
                          {q.category}
                        </span>
                        <span className="tabular-nums text-[11px] font-medium text-muted">
                          {q.totalVotes} yanıt
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold leading-snug text-ink">
                        <span className="mr-1.5 font-serif text-ribbon">
                          {String(q.id).padStart(2, '0')}.
                        </span>
                        {q.question}
                      </h3>

                      <div className="mt-3.5 space-y-2.5">
                        {q.options.map((opt) => (
                          <div key={opt.id}>
                            <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
                              <span
                                className={
                                  opt.isCorrect
                                    ? 'font-semibold text-ribbon'
                                    : 'text-muted'
                                }
                              >
                                {opt.label}
                                {opt.isCorrect && ' (Gerçek Veri)'}
                              </span>
                              <span className="tabular-nums shrink-0 font-semibold text-ink">
                                %{opt.percentage}{' '}
                                <span className="font-normal text-muted">
                                  ({opt.count})
                                </span>
                              </span>
                            </div>

                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${opt.percentage}%` }}
                                transition={{
                                  duration: 0.6,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className={`h-full rounded-full ${
                                  opt.isCorrect ? 'bg-ribbon' : 'bg-ink/30'
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-10">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-ribbon" aria-hidden="true" />
                  <h2 className="font-serif text-xl font-semibold text-ink">
                    Kaynak Noktalara Göre Katılım (`?loc=`)
                  </h2>
                </div>

                <div className="mt-4 rounded-xl border border-hairline bg-canvas p-5">
                  {report.locationStats.length === 0 ? (
                    <p className="text-sm text-muted">
                      Henüz lokasyon verisi oluşmadı.
                    </p>
                  ) : (
                    <div className="space-y-3.5">
                      {report.locationStats.map((loc) => (
                        <div key={loc.tag}>
                          <div className="mb-1 flex items-baseline justify-between text-xs">
                            <span className="font-medium capitalize text-ink">
                              {formatLocationLabel(loc.tag)}{' '}
                              <span className="font-mono text-[11px] text-muted">
                                ({loc.tag})
                              </span>
                            </span>
                            <span className="tabular-nums font-semibold text-ink">
                              %{loc.percentage}{' '}
                              <span className="font-normal text-muted">
                                ({loc.count})
                              </span>
                            </span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${loc.percentage}%` }}
                              transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="h-full rounded-full bg-crimson/85"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4 text-xs text-muted">
                <span>
                  Son güncelleme:{' '}
                  {report.updatedAt.toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>

                {report.mode === 'demo' && (
                  <button
                    type="button"
                    onClick={handleResetDemo}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-crimson"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Yerel verileri sıfırla</span>
                  </button>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
