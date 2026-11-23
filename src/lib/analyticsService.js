import { QUESTIONS } from '../data/questions';
import { isSupabaseConfigured, supabase } from './supabase';

const RIBBON_FLAG_KEY = 'ataturk_25kasim_ribbon_left_v2';
const SESSION_ID_KEY = 'ataturk_25kasim_session_id_v2';
const DEMO_STORE_KEY = 'ataturk_25kasim_demo_store_v2';
const DEMO_EVENT_NAME = 'ataturk-25kasim-demo-update';

function createInitialDemoStore() {
  return {
    ribbons: 164,
    responses: {
      1: { q1_10: 54, q1_3: 82 },
      2: { q2_street: 46, q2_home: 92 },
      3: { q3_12: 58, q3_44: 74 },
      4: { q4_love: 31, q4_iso: 103 },
      5: { q5_no: 42, q5_yes: 88 },
      6: { q6_proc: 35, q6_dep: 96 },
      7: { q7_no: 39, q7_yes: 91 },
      8: { q8_minor: 24, q8_blame: 108 },
      9: { q9_trust: 49, q9_digital: 87 },
      10: { q10_effort: 44, q10_crime: 86 },
      11: { q11_65: 38, q11_35: 68, q11_11: 36 },
      12: { q12_reveal: 51, q12_hidden: 84 },
    },
    locations: {
      yemekhane: 58,
      kutuphane: 46,
      kantin: 34,
      genel: 26,
    },
  };
}

function readDemoStore() {
  try {
    const raw = window.localStorage.getItem(DEMO_STORE_KEY);
    if (!raw) {
      const seed = createInitialDemoStore();
      window.localStorage.setItem(DEMO_STORE_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return createInitialDemoStore();
  }
}

function writeDemoStore(store) {
  try {
    window.localStorage.setItem(DEMO_STORE_KEY, JSON.stringify(store));
    window.dispatchEvent(
      new CustomEvent(DEMO_EVENT_NAME, { detail: { ribbons: store.ribbons } })
    );
  } catch {
    // localStorage kapalıysa sessizce devam et
  }
}

export function getLocationTag() {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('loc');
    if (!raw) return 'genel';
    const cleaned = raw
      .toLocaleLowerCase('tr-TR')
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9_-]/g, '')
      .slice(0, 40);
    return cleaned || 'genel';
  } catch {
    return 'genel';
  }
}

export function getOrCreateSessionId() {
  try {
    const existing = window.localStorage.getItem(SESSION_ID_KEY);
    if (existing && existing.length >= 8) return existing;
    const generated =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `ata-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(SESSION_ID_KEY, generated);
    return generated;
  } catch {
    return `ata-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function hasLeftRibbon() {
  try {
    return window.localStorage.getItem(RIBBON_FLAG_KEY) === 'true';
  } catch {
    return false;
  }
}

function markRibbonLeft() {
  try {
    window.localStorage.setItem(RIBBON_FLAG_KEY, 'true');
  } catch {
    // yoksay
  }
}

export async function fetchRibbonCount() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { count, error } = await supabase
        .from('purple_ribbons')
        .select('id', { count: 'exact', head: true });
      if (!error && typeof count === 'number') {
        return count;
      }
    } catch {
      // fallback aşağıda
    }
  }
  return readDemoStore().ribbons;
}

export async function recordQuestionResponse({
  questionId,
  selectedOptionId,
  isCorrect,
  locationTag,
}) {
  const sessionId = getOrCreateSessionId();

  if (isSupabaseConfigured && supabase) {
    try {
      const { error: insertError } = await supabase
        .from('question_responses')
        .insert({
          session_id: sessionId,
          question_id: questionId,
          selected_option_id: selectedOptionId,
          is_correct: isCorrect,
          location_tag: locationTag,
        });

      if (!insertError) {
        const { data, error: selectError } = await supabase
          .from('question_responses')
          .select('selected_option_id')
          .eq('question_id', questionId);

        if (!selectError && Array.isArray(data) && data.length > 0) {
          const sameCount = data.filter(
            (row) => row.selected_option_id === selectedOptionId
          ).length;
          return {
            sameGuessPercentage: Math.round((sameCount / data.length) * 100),
            totalVotes: data.length,
          };
        }
      }
    } catch {
      // demo fallback
    }
  }

  const store = readDemoStore();
  if (!store.responses[questionId]) {
    store.responses[questionId] = {};
  }
  store.responses[questionId][selectedOptionId] =
    (store.responses[questionId][selectedOptionId] || 0) + 1;
  writeDemoStore(store);

  const counts = Object.values(store.responses[questionId]);
  const total = counts.reduce((sum, n) => sum + n, 0);
  const selected = store.responses[questionId][selectedOptionId] || 1;
  return {
    sameGuessPercentage: total > 0 ? Math.round((selected / total) * 100) : 100,
    totalVotes: total,
  };
}

export async function leavePurpleRibbon({ locationTag }) {
  if (hasLeftRibbon()) {
    const current = await fetchRibbonCount();
    return { alreadyLeft: true, totalRibbons: current };
  }

  const sessionId = getOrCreateSessionId();

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('purple_ribbons').insert({
        session_id: sessionId,
        location_tag: locationTag,
      });

      if (!error || error.code === '23505') {
        markRibbonLeft();
        const total = await fetchRibbonCount();
        return { alreadyLeft: error?.code === '23505', totalRibbons: total };
      }
    } catch {
      // fallback
    }
  }

  markRibbonLeft();
  const store = readDemoStore();
  store.ribbons += 1;
  store.locations[locationTag] = (store.locations[locationTag] || 0) + 1;
  writeDemoStore(store);
  return { alreadyLeft: false, totalRibbons: store.ribbons };
}

export function subscribeToRibbons(onCountChange) {
  if (isSupabaseConfigured && supabase) {
    const channel = supabase
      .channel('public:purple_ribbons')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'purple_ribbons' },
        async () => {
          const latest = await fetchRibbonCount();
          onCountChange(latest);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }

  const handleCustom = (event) => {
    if (typeof event.detail?.ribbons === 'number') {
      onCountChange(event.detail.ribbons);
    }
  };

  const handleStorage = (event) => {
    if (event.key === DEMO_STORE_KEY) {
      onCountChange(readDemoStore().ribbons);
    }
  };

  window.addEventListener(DEMO_EVENT_NAME, handleCustom);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(DEMO_EVENT_NAME, handleCustom);
    window.removeEventListener('storage', handleStorage);
  };
}

export async function fetchReportData() {
  if (isSupabaseConfigured && supabase) {
    try {
      const [responsesRes, ribbonsRes] = await Promise.all([
        supabase
          .from('question_responses')
          .select('question_id, selected_option_id, location_tag'),
        supabase.from('purple_ribbons').select('id, location_tag'),
      ]);

      if (!responsesRes.error && !ribbonsRes.error) {
        const responses = responsesRes.data || [];
        const ribbons = ribbonsRes.data || [];

        const questionStats = QUESTIONS.map((q) => {
          const qRows = responses.filter((r) => r.question_id === q.id);
          const total = qRows.length;
          return {
            id: q.id,
            category: q.category,
            question: q.question,
            totalVotes: total,
            options: q.options.map((opt) => {
              const count = qRows.filter(
                (r) => r.selected_option_id === opt.id
              ).length;
              return {
                id: opt.id,
                label: opt.label,
                count,
                percentage: total > 0 ? Math.round((count / total) * 100) : 0,
                isCorrect: opt.id === q.correctOptionId,
              };
            }),
          };
        });

        const locMap = {};
        const source = ribbons.length > 0 ? ribbons : responses;
        source.forEach((row) => {
          const key = row.location_tag || 'genel';
          locMap[key] = (locMap[key] || 0) + 1;
        });

        const totalLoc = Object.values(locMap).reduce((s, n) => s + n, 0);
        const locationStats = Object.entries(locMap)
          .map(([tag, count]) => ({
            tag,
            count,
            percentage: totalLoc > 0 ? Math.round((count / totalLoc) * 100) : 0,
          }))
          .sort((a, b) => b.count - a.count);

        return {
          mode: 'supabase',
          totalResponses: responses.length,
          totalRibbons: ribbons.length,
          questionStats,
          locationStats,
          updatedAt: new Date(),
        };
      }
    } catch {
      // demo fallback
    }
  }

  const store = readDemoStore();
  let totalResponses = 0;

  const questionStats = QUESTIONS.map((q) => {
    const qCounts = store.responses[q.id] || {};
    const total = q.options.reduce((sum, opt) => sum + (qCounts[opt.id] || 0), 0);
    totalResponses += total;
    return {
      id: q.id,
      category: q.category,
      question: q.question,
      totalVotes: total,
      options: q.options.map((opt) => {
        const count = qCounts[opt.id] || 0;
        return {
          id: opt.id,
          label: opt.label,
          count,
          percentage: total > 0 ? Math.round((count / total) * 100) : 0,
          isCorrect: opt.id === q.correctOptionId,
        };
      }),
    };
  });

  const totalLoc = Object.values(store.locations).reduce((s, n) => s + n, 0);
  const locationStats = Object.entries(store.locations)
    .map(([tag, count]) => ({
      tag,
      count,
      percentage: totalLoc > 0 ? Math.round((count / totalLoc) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  return {
    mode: 'demo',
    totalResponses,
    totalRibbons: store.ribbons,
    questionStats,
    locationStats,
    updatedAt: new Date(),
  };
}

export function resetDemoData() {
  try {
    window.localStorage.removeItem(RIBBON_FLAG_KEY);
    const seed = createInitialDemoStore();
    writeDemoStore(seed);
  } catch {
    // yoksay
  }
}
