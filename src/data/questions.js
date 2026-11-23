export const QUESTIONS = [
  // 1. FİZİKSEL ŞİDDET (2 Soru)
  {
    id: 1,
    category: 'Fiziksel Şiddet',
    question:
      'Dünya Sağlık Örgütü verilerine göre dünyada her 3 kadından kaçı hayatı boyunca en az bir kez fiziksel veya cinsel şiddete maruz kalıyor?',
    options: [
      { id: 'q1_10', label: "10 kadından 1'i" },
      { id: 'q1_3', label: "Her 3 kadından 1'i" },
    ],
    correctOptionId: 'q1_3',
    statHighlight: { prefix: '%', value: 33, suffix: " · Her 3 Kadından 1'i" },
    realityTitle: "Dünyada Her 3 Kadından 1'i",
    realityDescription:
      'Dünya Sağlık Örgütü (DSÖ) verilerine göre küresel ölçekte kadınların yaklaşık üçte biri yaşamı boyunca fiziksel veya cinsel şiddete uğruyor. Bu, münferit değil küresel bir halk sağlığı sorunudur.',
    matchCopy: 'Gerçeğin boyutunun farkındasın; tablo sanılandan çok daha yaygın.',
    mismatchCopy:
      'Şiddet çoğu zaman gizli yaşandığı için daha nadir sanılıyor; oysa her 3 kadından 1’i hayatında en az bir kez maruz kalıyor.',
  },
  {
    id: 2,
    category: 'Fiziksel Şiddet',
    question:
      'Kadın cinayetlerinin büyük çoğunluğu sence nerede ve kim tarafından işleniyor?',
    options: [
      { id: 'q2_street', label: 'Sokakta, tanımadığı kişilerce' },
      { id: 'q2_home', label: 'Kendi evinde, eşi veya tanıdığı biri tarafından' },
    ],
    correctOptionId: 'q2_home',
    statHighlight: null,
    realityTitle: 'En Büyük Risk Çoğu Zaman Kendi Evi',
    realityDescription:
      'DSÖ ve Türkiye izleme raporları, kadın cinayetlerinin çok büyük bölümünün kadınların kendi evinde, eş/eski eş, partner veya yakın aile bireyleri tarafından ve en sık ayrılma aşamasında işlendiğini gösteriyor.',
    matchCopy:
      'Doğru tespit: En güvenli olması gereken yaşam alanı, verilerde en yüksek riskin oluştuğu yer olarak öne çıkıyor.',
    mismatchCopy:
      'Yaygın algı tehdidin dışarıdan geldiği yönünde; ancak veriler riskin çoğunlukla en yakın çevreden doğduğunu gösteriyor.',
  },

  // 2. PSİKOLOJİK / DUYGUSAL ŞİDDET (2 Soru)
  {
    id: 3,
    category: 'Psikolojik Şiddet',
    question:
      "Türkiye'de kadınların yaklaşık yüzde kaçı hayatı boyunca en az bir kez duygusal veya psikolojik şiddete maruz kalıyor?",
    options: [
      { id: 'q3_12', label: '%12 civarı' },
      { id: 'q3_44', label: '%44 civarı' },
    ],
    correctOptionId: 'q3_44',
    statHighlight: { prefix: '%', value: 44, suffix: ' Duygusal Şiddet' },
    realityTitle: '%44 Duygusal Şiddet',
    realityDescription:
      "Hacettepe Üniversitesi Nüfus Etütleri Enstitüsü'nün Türkiye geneli araştırmasına göre kadınların %44'ü hakaret, küçümseme, korkutma veya tehdit gibi duygusal şiddet biçimlerini yaşıyor. Şiddet sadece fiziksel iz bırakmaz.",
    matchCopy:
      'Görünmeyen yaraların yaygınlığını biliyorsun. Psikolojik şiddet en sık yaşanan ama en az konuşulan türdür.',
    mismatchCopy:
      'Duygusal şiddet çoğu zaman normalleştirildiği için olduğundan az tahmin ediliyor; oysa neredeyse her 2 kadından 1’ini etkiliyor.',
  },
  {
    id: 4,
    category: 'Psikolojik Şiddet',
    question:
      'Partnerin "Seni çok sevdiğim için kimseyle görüşmeni istemiyorum" diyerek kişiyi arkadaşlarından ve ailesinden uzaklaştırması nedir?',
    options: [
      { id: 'q4_love', label: 'Aşırı sevgi ve kıskançlık' },
      { id: 'q4_iso', label: 'Sosyal izolasyon (Psikolojik şiddet)' },
    ],
    correctOptionId: 'q4_iso',
    statHighlight: null,
    realityTitle: 'Kıskançlık Değil, Kontrol ve İzolasyon',
    realityDescription:
      'Kişiyi ailesinden, arkadaşlarından veya destek çevresinden koparmak psikolojik şiddetin en yaygın ilk adımıdır. Sevgi kısıtlamaz; yalnızlaştırma, şiddeti görünmez ve çıkılmaz hale getirir.',
    matchCopy:
      'Net bir farkındalık: İzolasyonu erken tanımak, şiddet döngüsünü büyümeden durdurmanın en kritik adımıdır.',
    mismatchCopy:
      'Romantikleştirilen kıskançlık çoğu zaman kontrol ve yalnızlaştırmanın maskesidir; psikolojik şiddet kapsamındadır.',
  },

  // 3. EKONOMİK ŞİDDET (2 Soru)
  {
    id: 5,
    category: 'Ekonomik Şiddet',
    question:
      'Kadının çalışmasının engellenmesi veya kazandığı paranın kontrolünün elinden alınması yasalarımıza göre şiddet sayılır mı?',
    options: [
      { id: 'q5_no', label: 'Hayır, aile içi ekonomik tercihtir' },
      { id: 'q5_yes', label: 'Evet, açıkça ekonomik şiddettir' },
    ],
    correctOptionId: 'q5_yes',
    statHighlight: null,
    realityTitle: 'Ekonomik Kısıtlama Bir Şiddet Türüdür',
    realityDescription:
      '6284 Sayılı Kanun kapsamında çalışmaya engel olmak, maaşa veya kartlara el koymak, zorla borçlandırmak ya da temel ihtiyaçlar için para vermemek açıkça ekonomik şiddet olarak tanımlanır.',
    matchCopy:
      'Doğru: Ekonomik kaynakların bir baskı aracına dönüştürülmesi hukuken de şiddet sayılır.',
    mismatchCopy:
      'Birçok kişi sadece fiziksel müdahaleyi şiddet sanıyor; oysa ekonomik özgürlüğü kısıtlamak 6284 Sayılı Kanun’da doğrudan şiddet tanımına girer.',
  },
  {
    id: 6,
    category: 'Ekonomik Şiddet',
    question:
      'Saha araştırmalarına göre şiddet yaşayan kadınların o ortamdan ayrılmasını zorlaştıran en büyük engellerden biri nedir?',
    options: [
      { id: 'q6_proc', label: 'Sadece resmi prosedürlerin bilinmemesi' },
      { id: 'q6_dep', label: 'Ekonomik bağımlılık ve barınma kaygısı' },
    ],
    correctOptionId: 'q6_dep',
    statHighlight: null,
    realityTitle: 'Ekonomik Özgürlük, Yaşam Güvencesidir',
    realityDescription:
      'Hacettepe Nüfus Etütleri araştırmaları, eğitimden ve çalışma hayatından uzaklaştırılan kadınların şiddet ortamından çıkma imkanının ciddi oranda azaldığını gösteriyor. ŞÖNİM ve barolar bu süreçte ücretsiz destek sunar.',
    matchCopy:
      'Gerçeği yakaladın: Ekonomik bağımlılık, şiddet gören kadınların en büyük çıkmazlarından biridir.',
    mismatchCopy:
      'Kadınların çoğu şiddete katlandığı için değil, ekonomik bağımsızlığı elinden alındığı ve gidecek güvenli yeri olmadığı için ayrılamıyor.',
  },

  // 4. CİNSEL ŞİDDET (2 Soru)
  {
    id: 7,
    category: 'Cinsel Şiddet',
    question:
      'Evlilik veya düzenli bir ilişki içinde rıza olmadan zorla cinsel ilişkiye girmek Türk Ceza Kanunu’na göre suç mudur?',
    options: [
      { id: 'q7_no', label: 'Hayır, evlilik birliği içinde suç sayılmaz' },
      { id: 'q7_yes', label: 'Evet, açıkça suçtur ve cezası vardır' },
    ],
    correctOptionId: 'q7_yes',
    statHighlight: null,
    realityTitle: 'Evlilikte de Rıza Zorunludur',
    realityDescription:
      'Türk Ceza Kanunu (Madde 102) evlilik içi cinsel saldırıyı açıkça suç olarak düzenler. Evlilik ya da partnerlik, hiçbir koşulda rızanın yerini tutmaz.',
    matchCopy:
      'Doğru bilgi: Rıza her koşulda ve her ilişki biçiminde vazgeçilmez sınırdır.',
    mismatchCopy:
      'Toplumda yanlış bilinen bir kalıp: Türk Ceza Kanunu’na göre eşe karşı rıza dışı cinsel davranış da cinsel saldırı suçudur.',
  },
  {
    id: 8,
    category: 'Cinsel Şiddet',
    question:
      'Cinsel şiddet veya tacize uğrayan kadınların büyük bölümü neden resmi makamlara başvurmaktan çekiniyor?',
    options: [
      { id: 'q8_minor', label: 'Olayı yeterince önemli görmediği için' },
      { id: 'q8_blame', label: 'Suçlanma, damgalanma ve inanılmama korkusuyla' },
    ],
    correctOptionId: 'q8_blame',
    statHighlight: null,
    realityTitle: 'Utanç Mağdurun Değil, Failindir',
    realityDescription:
      '"O saatte orada ne işi vardı?" gibi mağduru suçlayan toplumsal tutumlar cinsel şiddetin gizli kalmasına yol açar. Yargılamadan inanmak ve destek mekanizmalarına yönlendirmek hayati önem taşır.',
    matchCopy:
      'Mağdur suçlayıcılık, şiddetin görünmez kalmasının en büyük sebebidir. Bu dili değiştirmek hepimizin elinde.',
    mismatchCopy:
      'Başvuruların düşük kalmasının temel nedeni olayın önemsizliği değil; damgalanma ve suçlanma korkusudur.',
  },

  // 5. DİJİTAL ŞİDDET VE ISRARLI TAKİP (2 Soru)
  {
    id: 9,
    category: 'Dijital Şiddet',
    question:
      'Partnerin telefon şifresini zorla istemesi, sürekli konum paylaşmaya mecbur bırakması veya sosyal medya hesaplarını denetlemesi nedir?',
    options: [
      { id: 'q9_trust', label: 'İlişkide normal bir güven göstergesi' },
      { id: 'q9_digital', label: 'Dijital şiddet ve mahremiyet ihlali' },
    ],
    correctOptionId: 'q9_digital',
    statHighlight: null,
    realityTitle: 'Dijital Gözetim de Şiddettir',
    realityDescription:
      'Özellikle gençler arasında "güven" adı altında normalleştirilen şifre zorlaması, canlı konum kontrolü, mesaj denetimi ve izinsiz görüntü paylaşımı dijital şiddet kapsamındadır.',
    matchCopy:
      'Dijital sınırlar da kişisel güvenliktir; güven gözetimle değil saygıyla kurulur.',
    mismatchCopy:
      'Rıza dışı şifre, konum veya mesaj kontrolü güven testi değil; teknolojinin baskı aracına çevrildiği dijital şiddettir.',
  },
  {
    id: 10,
    category: 'Israrlı Takip',
    question:
      'Ayrılık sonrası sürekli aramak, mesaj yağmuruna tutmak veya okul/iş çıkışında izinsiz beklemek hukuken nasıl değerlendirilir?',
    options: [
      { id: 'q10_effort', label: 'Barışma çabası sayılır, cezası yoktur' },
      { id: 'q10_crime', label: 'Israrlı takip suçudur, koruma kararı alınabilir' },
    ],
    correctOptionId: 'q10_crime',
    statHighlight: null,
    realityTitle: 'Israrlı Takip Ceza Kanunu’nda Suçtur',
    realityDescription:
      'TCK Madde 123/A uyarınca fiziksel ya da dijital yollarla ısrarlı takip bağımsız bir suçtur. 6284 Sayılı Kanun kapsamında en yakın karakoldan veya savcılıktan hızla uzaklaştırma kararı talep edilebilir.',
    matchCopy:
      'Doğru: İstenmeyen ısrar romantizm değil, yasal yaptırımı olan ciddi bir güvenlik tehdididir.',
    mismatchCopy:
      'Ayrılık sonrası takıntılı takip "barışma çabası" değildir; hukuken suçtur ve ağır şiddet vakalarının erken uyarı işaretidir.',
  },

  // 6. KURUMSAL BAŞVURU VE TANIK SORUMLULUĞU (2 Soru)
  {
    id: 11,
    category: 'Görünmeyen Gerçek',
    question:
      'Şiddete uğrayan kadınların sence yüzde kaçı polise veya bir kuruma başvurabiliyor?',
    options: [
      { id: 'q11_65', label: '%65 civarı' },
      { id: 'q11_35', label: '%35 civarı' },
      { id: 'q11_11', label: '%11 civarı' },
    ],
    correctOptionId: 'q11_11',
    statHighlight: { prefix: '%', value: 89, suffix: "'u Başvuramıyor" },
    realityTitle: "%89'u Başvuramıyor",
    realityDescription:
      "Hacettepe Üniversitesi Nüfus Etütleri Enstitüsü'nün saha araştırmasına göre şiddete maruz kalan kadınların yalnızca yaklaşık %11'i bir kuruma başvurabiliyor. Duyduklarımız, buzdağının sadece görünen kısmı.",
    matchCopy:
      'Tahminin gerçek oranla örtüştü. Buna rağmen toplumda pek çok kişi başvuru oranının çok daha yüksek olduğunu düşünüyor.',
    mismatchCopy:
      'Çoğu kişi adalete erişimin daha yüksek olduğunu varsayıyor; oysa her 10 kadından yaklaşık 9’u sessiz kalmak zorunda bırakılıyor.',
  },
  {
    id: 12,
    category: 'Tanık Sorumluluğu',
    question:
      "Yan daireden veya sokaktan şiddet sesi duyduğunda 112 ya da ALO 183'ü ararsan kimliğin karşı tarafa açıklanır mı?",
    options: [
      { id: 'q12_reveal', label: 'Evet, ihbarcının adı paylaşılır' },
      { id: 'q12_hidden', label: 'Hayır, ihbarcının kimliği gizli tutulabilir' },
    ],
    correctOptionId: 'q12_hidden',
    statHighlight: null,
    realityTitle: 'Gizli İhbarla Bir Hayat Kurtarabilirsin',
    realityDescription:
      '112 Acil veya ALO 183 arandığında ihbarcının kimlik bilgileri gizli tutulabilir. "Aile içi mesele" deyip müdahale etmemek şiddeti büyütür; tek bir telefon önlenebilir bir trajediyi durdurur.',
    matchCopy:
      'Doğru bilgi: Tanık olduğumuzda güvenli bir şekilde 112 veya ALO 183’ü aramak bir insanın hayatını değiştirebilir.',
    mismatchCopy:
      'Çoğu kişi başına iş açılacağından çekinip aramıyor; oysa 112 ve ALO 183’te kimlik bilgilerinin gizli tutulmasını talep edebilirsin.',
  },
];

// Farklı şiddet kategorilerinden dengeli ve rastgele 4 soru seçer
export function pickRandomQuestions(count = 4, excludeIds = []) {
  const available = QUESTIONS.filter((q) => !excludeIds.includes(q.id));
  const pool = available.length >= count ? available : [...QUESTIONS];

  // Fisher-Yates karıştırma
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Önce farklı kategorilerden seçmeye çalış
  const picked = [];
  const usedCategories = new Set();

  for (const item of shuffled) {
    if (picked.length >= count) break;
    if (!usedCategories.has(item.category)) {
      picked.push(item);
      usedCategories.add(item.category);
    }
  }

  // Eksik kaldıysa kalanlardan tamamla
  for (const item of shuffled) {
    if (picked.length >= count) break;
    if (!picked.some((p) => p.id === item.id)) {
      picked.push(item);
    }
  }

  return picked;
}
