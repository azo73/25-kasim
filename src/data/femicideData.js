const envCount = Number(import.meta.env.VITE_FEMICIDE_YTD_COUNT);
const envDate = import.meta.env.VITE_FEMICIDE_UPDATED_AT?.trim();

// 2026 yılı kadın cinayeti izleme verisi (istenirse .env veya bu dosya üzerinden anlık güncellenir)
export const FEMICIDE_YTD_DATA = {
  year: 2026,
  count: Number.isFinite(envCount) && envCount > 0 ? Math.round(envCount) : 268,
  asOfLabel: envDate || 'Kasım 2026 itibarıyla izleme verisi',
  sourceNote:
    'Bağımsız kadın cinayetlerini izleme ve veri platformlarının kayıtlarına dayalı takip verisi.',
};
