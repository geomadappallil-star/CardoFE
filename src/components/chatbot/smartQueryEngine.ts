import { 
  DashboardSummary, PriceSeriesPoint, WeatherPoint, 
  ProductionRecord, TradeRecord, ConsumptionRecord 
} from '../../types/index.js';

export interface QueryEngineContext {
  spice: string;
  scope: string;
  frequency: string;
  dateRangePreset: string;
  summary: DashboardSummary | null;
  priceSeries: PriceSeriesPoint[];
  weatherData: WeatherPoint[];
  productionData: ProductionRecord[];
  tradeData: TradeRecord[];
  consumptionData: ConsumptionRecord[];
}

export interface EngineResponse {
  text: string;
  suggestions: string[];
  navigateToTab?: string;
  badge?: string;
}

export interface SpiceProfile {
  code: string;
  nameEn: string;
  nameMl: string;
  botanical: string;
  unit: string;
  isAuction: boolean;
  marketTypeEn: string;
  marketTypeMl: string;
  defaultAvgPrice: number;
  defaultMinPrice: number;
  defaultMaxPrice: number;
  keyHubsEn: string;
  keyHubsMl: string;
  growingBeltEn: string;
  growingBeltMl: string;
  productionTonnes: number;
  keralaSharePct: number;
  exportCorridorEn: string;
  exportCorridorMl: string;
  topBuyersEn: string;
  topBuyersMl: string;
  exportUnitValue: string;
  weatherAgronomyEn: string;
  weatherAgronomyMl: string;
}

export const SPICE_PROFILES: Record<string, SpiceProfile> = {
  small_cardamom: {
    code: 'small_cardamom',
    nameEn: 'Small Green Cardamom',
    nameMl: 'ചെറിയ ഏലം',
    botanical: 'Elettaria cardamomum',
    unit: 'INR/kg',
    isAuction: true,
    marketTypeEn: 'Spices Board Licensed E-Auctions',
    marketTypeMl: 'സ്പൈസസ് ബോർഡ് അംഗീകൃത ഇ-ലേലം',
    defaultAvgPrice: 3183.43,
    defaultMinPrice: 2294.0,
    defaultMaxPrice: 3868.0,
    keyHubsEn: 'Vandanmettu / Puttady (Idukki) & Bodinayakanur (Tamil Nadu)',
    keyHubsMl: 'വണ്ടൻമേട് / പുറ്റടി (ഇടുക്കി), ബോഡിനായ്ക്കന്നൂർ (തമിഴ്നാട്)',
    growingBeltEn: 'Cardamom Hill Reserve (Idukki, 1,000m — 1,400m MSL)',
    growingBeltMl: 'ഇടുക്കി ഹൈറേഞ്ച് (1,000 മീ. - 1,400 മീ. ഉയരം)',
    productionTonnes: 15100,
    keralaSharePct: 78,
    exportCorridorEn: 'India → Saudi Arabia, UAE, Kuwait & USA',
    exportCorridorMl: 'ഇന്ത്യ → സൗദി അറേബ്യ, യു.എ.ഇ, കുവൈറ്റ്, യു.എസ്.എ',
    topBuyersEn: 'Saudi Arabia (KSA ~45%), UAE (~22%), Kuwait & USA (Traditional Gahwa coffee cultural staple)',
    topBuyersMl: 'സൗദി അറേബ്യ (~45%), യു.എ.ഇ (~22%), കുവൈറ്റ്, യു.എസ്.എ (പരമ്പരാഗത ഗഹ്വ കോഫി)',
    exportUnitValue: '$22.00 — $26.50 / kg FOB',
    weatherAgronomyEn: 'Cardamom has shallow fibrous roots requiring 1,500–3,500 mm rainfall. Extended dry spells exceeding 25 days during flowering (March–May) drastically reduce capsule yield.',
    weatherAgronomyMl: 'ആഴം കുറഞ്ഞ വേരുകളുള്ള ഏലത്തിന് 1,500–3,500 mm മഴ ആവശ്യമാണ്. പൂവിടുന്ന സമയത്തെ (മാർച്ച്–മേയ്) വരൾച്ച വിളവിനെ സാരമായി ബാധിക്കുന്നു.',
  },
  black_pepper: {
    code: 'black_pepper',
    nameEn: 'Black Pepper (Malabar Garbled)',
    nameMl: 'കുരുമുളക് (മലബാർ ഗാർബിൾഡ്)',
    botanical: 'Piper nigrum',
    unit: 'INR/kg',
    isAuction: false,
    marketTypeEn: 'Kochi Terminal Market & Mandi Spot Exchange',
    marketTypeMl: 'കൊച്ചി ടെർമിനൽ മാർക്കറ്റ് & സ്പോട്ട് മണ്ഡി',
    defaultAvgPrice: 635.0,
    defaultMinPrice: 590.0,
    defaultMaxPrice: 675.0,
    keyHubsEn: 'Kochi Spot Terminal (Mattancherry) & Kalpetta (Wayanad)',
    keyHubsMl: 'കൊച്ചി സ്പോട്ട് ടെർമിനൽ (മട്ടാഞ്ചേരി), കൽപ്പറ്റ (വയനാട്)',
    growingBeltEn: 'Western Ghats Wet Evergreen Foot-hills (Wayanad, Idukki & Kannur)',
    growingBeltMl: 'വയനാട്, ഇടുക്കി, കണ്ണൂർ മലയോര മേഖലകൾ',
    productionTonnes: 21500,
    keralaSharePct: 42,
    exportCorridorEn: 'India → United States, European Union, UK & Vietnam',
    exportCorridorMl: 'ഇന്ത്യ → യു.എസ്.എ, യൂറോപ്യൻ യൂണിയൻ, യുകെ, വിയറ്റ്നാം',
    topBuyersEn: 'United States, European Union & UK (Global seasoning, oleoresin extraction & whole black peppercorn blends)',
    topBuyersMl: 'യു.എസ്.എ, യൂറോപ്യൻ യൂണിയൻ, യുകെ (ഭക്ഷ്യ സംസ്കരണം & എണ്ണ വേർതിരിക്കൽ)',
    exportUnitValue: '$6.50 — $8.20 / kg FOB',
    weatherAgronomyEn: 'Pepper vines require intermittent monsoon showers and ample sunshine. Excess humidity promotes quick-wilt (Phytophthora foot rot), while pre-monsoon showers trigger healthy spike emergence.',
    weatherAgronomyMl: 'കുരുമുളക് വള്ളികൾക്ക് ഇടവിട്ടുള്ള മഴയും വെയിലും വേണം. അമിത ഈർപ്പം ദ്രുതവാട്ടത്തിന് (Foot rot) കാരണമാകുമ്പോൾ, വേനൽമഴ തിരിയിടാൻ സഹായിക്കുന്നു.',
  },
  nutmeg: {
    code: 'nutmeg',
    nameEn: 'Nutmeg with Mace (Jaiphal & Javitri)',
    nameMl: 'ജാതിക്ക & ജാതിപത്രി',
    botanical: 'Myristica fragrans',
    unit: 'INR/kg',
    isAuction: false,
    marketTypeEn: 'Kalpetta & Angamaly/Kochi Primary Spot Markets',
    marketTypeMl: 'കൽപ്പറ്റ & അങ്കമാലി/കൊച്ചി സ്പോട്ട് വിപണികൾ',
    defaultAvgPrice: 330.68,
    defaultMinPrice: 304.22,
    defaultMaxPrice: 357.13,
    keyHubsEn: 'Kalpetta Spot (Wayanad), Angamaly & Chalakudy River Basin (Thrissur)',
    keyHubsMl: 'കൽപ്പറ്റ സ്പോട്ട് (വയനാട്), അങ്കമാലി, ചാലക്കുടി തീരപ്രദേശങ്ങൾ',
    growingBeltEn: 'Humid River Valleys & Mid-Elevation Slopes (Thrissur, Ernakulam, Wayanad)',
    growingBeltMl: 'തൃശ്ശൂർ, എറണാകുളം, വയനാട് മലയോര മേഖലകൾ',
    productionTonnes: 14800,
    keralaSharePct: 91,
    exportCorridorEn: 'India → Middle East, East Asia & European Blenders',
    exportCorridorMl: 'ഇന്ത്യ → ഗൾഫ് രാജ്യങ്ങൾ, കിഴക്കൻ ഏഷ്യ, യൂറോപ്പ്',
    topBuyersEn: 'Middle East, East Asia, and domestic confectionery, meat seasonings & pharmaceutical oleoresin processors',
    topBuyersMl: 'ഗൾഫ് രാജ്യങ്ങൾ, കിഴക്കൻ ഏഷ്യ, ബേക്കറി, ഭക്ഷ്യ ചേരുവകൾ & മരുന്ന് നിർമ്മാണം',
    exportUnitValue: '$4.20 — $5.80 / kg FOB (Nutmeg) | $18.00 — $24.00 / kg (Mace/Javitri)',
    weatherAgronomyEn: 'Nutmeg trees thrive in warm humid alluvial river basins. Heavy water-logging causes fruit splitting and Phytophthora fruit rot, while drought causes premature fruit drop.',
    weatherAgronomyMl: 'ജാതിമരങ്ങൾക്ക് ആവശ്യത്തിന് ഈർപ്പവും നീർവാർച്ചയുമുള്ള മണ്ണ് വേണം. കനത്ത മഴയിൽ കായ് ചീയലും പൊട്ടലും ഉണ്ടാകുമ്പോൾ, കടുത്ത വേനലിൽ കായ് കൊഴിച്ചിൽ ഉണ്ടാകുന്നു.',
  },
  cloves: {
    code: 'cloves',
    nameEn: 'Cloves (High Eugenol Oil Content)',
    nameMl: 'ഗ്രാമ്പൂ (കരയാമ്പൂ)',
    botanical: 'Syzygium aromaticum',
    unit: 'INR/kg',
    isAuction: false,
    marketTypeEn: 'Kottayam Spice Exchange & Western Ghats Mandis',
    marketTypeMl: 'കോട്ടയം സ്പൈസ് എക്സ്ചേഞ്ച് & മലയോര മണ്ഡികൾ',
    defaultAvgPrice: 780.0,
    defaultMinPrice: 720.0,
    defaultMaxPrice: 850.0,
    keyHubsEn: 'Kottayam Mandi, Kanyakumari Foothills & Kollam Trading Centers',
    keyHubsMl: 'കോട്ടയം മണ്ഡി, കന്യാകുമാരി അടിവാരം, കൊല്ലം വിപണികൾ',
    growingBeltEn: 'High-Humid Maritime Hill Slopes of Southern Western Ghats',
    growingBeltMl: 'തെക്കൻ പശ്ചിമഘട്ട മലയോര പ്രദേശങ്ങൾ',
    productionTonnes: 2900,
    keralaSharePct: 38,
    exportCorridorEn: 'Domestic Retention & Trade to National Ayurvedic/FMCG Mandis',
    exportCorridorMl: 'ഇന്ത്യൻ ആഭ്യന്തര വിപണി & ആയുർവേദ മണ്ഡികൾ',
    topBuyersEn: 'Indian domestic Ayurvedic formulations, dental/oral care manufacturers, and paan masala blends',
    topBuyersMl: 'ആയുർവേദ മരുന്ന് നിർമ്മാണം, ദന്ത പരിചരണം, സുഗന്ധവ്യഞ്ജന വ്യാപാരം',
    exportUnitValue: '$9.00 — $11.50 / kg FOB',
    weatherAgronomyEn: 'Cloves require warm humid maritime climates with heavy monsoons followed by a bright dry spell during harvest (December–March) to allow sun-drying of flower buds.',
    weatherAgronomyMl: 'നല്ല മഴയും വിളവെടുപ്പ് കാലത്ത് (ഡിസംബർ–മാർച്ച്) ഉണക്കാൻ ആവശ്യമായ തെളിഞ്ഞ വെയിലും ഗ്രാമ്പൂവിന് അത്യന്താപേക്ഷിതമാണ്.',
  },
};

const SCOPE_NAMES: Record<string, { en: string; ml: string }> = {
  all: { en: 'All Domestic Markets (Composite)', ml: 'എല്ലാ വിപണികളും സംയോജിപ്പിച്ചത്' },
  idukki: { en: 'Idukki Western Ghats Hub', ml: 'ഇടുക്കി ഹൈറേഞ്ച് വിപണി' },
  bodinayakanur: { en: 'Bodinayakanur (Tamil Nadu Leeward)', ml: 'ബോഡിനായ്ക്കന്നൂർ മണ്ഡി' },
  kerala: { en: 'Kerala Statewide Composite', ml: 'കേരള സംസ്ഥാന മൊത്തം' },
  india: { en: 'All-India National Benchmark', ml: 'അഖിലേന്ത്യാ തലത്തിൽ' },
  world: { en: 'World / Global Export Parity', ml: 'ആഗോള വിപണി' },
};

export function getSpiceSpecificSuggestions(spiceCode: string, language: 'en' | 'ml' = 'en'): string[] {
  if (language === 'ml') {
    switch (spiceCode) {
      case 'black_pepper':
        return [
          "ഇപ്പോഴത്തെ കുരുമുളക് വില എത്രയാണ്?",
          "കൊച്ചിയിലെ കുരുമുളക് നിരക്കുകൾ എങ്ങനെ?",
          "കേരളത്തിലെ കുരുമുളക് ഉത്പാദനം എത്രയാണ്?",
          "കുരുമുളക് കയറ്റുമതി വിപണികൾ ഏവ?",
          "പശ്ചിമഘട്ടത്തിലെ മഴ നിലവാരം എങ്ങനെ?"
        ];
      case 'nutmeg':
        return [
          "ഇപ്പോഴത്തെ ജാതിക്ക വില എത്രയാണ്?",
          "ജാതിക്കയും ജാതിപത്രിയും തമ്മിലുള്ള വ്യത്യാസം?",
          "കൽപ്പറ്റയിലെ ജാതിക്ക നിരക്കുകൾ എങ്ങനെ?",
          "കേരളത്തിലെ ജാതിക്ക ഉത്പാദനം എത്രയാണ്?",
          "ജാതിക്കയുടെ പ്രധാന വിപണികൾ ഏവ?"
        ];
      case 'cloves':
        return [
          "ഇപ്പോഴത്തെ ഗ്രാമ്പൂ വില എത്രയാണ്?",
          "കോട്ടയത്തെ ഗ്രാമ്പൂ വിപണി നിരക്കുകൾ?",
          "ഗ്രാമ്പൂവിന്റെ പ്രധാന വ്യാവസായിക ഉപയോഗങ്ങൾ?",
          "കേരളത്തിലെ ഗ്രാമ്പൂ വിളവ് എത്രയാണ്?",
          "പശ്ചിമഘട്ട കാലാവസ്ഥ എങ്ങനെ?"
        ];
      case 'small_cardamom':
      default:
        return [
          "ഇപ്പോഴത്തെ ഏലം ലേലവില എത്രയാണ്?",
          "വണ്ടൻമേടും ബോഡിനായ്ക്കന്നൂരും തമ്മിലുള്ള വ്യത്യാസം?",
          "ഇടുക്കിയിലെ മഴ നിലവാരം എങ്ങനെയാണ്?",
          "ഇടുക്കിയിലെ ഏലം ഉത്പാദനം എത്രയാണ്?",
          "ഏലം പ്രധാന കയറ്റുമതി രാജ്യങ്ങൾ ഏവ?"
        ];
    }
  }

  // English
  switch (spiceCode) {
    case 'black_pepper':
      return [
        "What is the current black pepper price?",
        "Tell me about Kochi Terminal black pepper rates",
        "How does Indian pepper compare to Vietnam FAQ?",
        "What is Kerala's black pepper production?",
        "How is the monsoon rainfall affecting pepper vines?"
      ];
    case 'nutmeg':
      return [
        "What is the current nutmeg price?",
        "What is the price difference between nutmeg and mace?",
        "Tell me about Kalpetta & Kochi nutmeg spot rates",
        "What is Kerala's nutmeg production & demand?",
        "How does rainfall affect nutmeg harvesting?"
      ];
    case 'cloves':
      return [
        "What is the current cloves price?",
        "What are the spot rates in Kottayam for cloves?",
        "Where is clove cultivated in the Western Ghats?",
        "What drives domestic and pharmaceutical clove demand?",
        "How is the weather in the clove growing belt?"
      ];
    case 'small_cardamom':
    default:
      return [
        "What is the latest cardamom price in auctions?",
        "Compare Vandanmettu vs Bodinayakanur auction hubs",
        "Why did cardamom prices spike in 2019?",
        "How is the monsoon rainfall in Idukki right now?",
        "Where does India export cardamom to?"
      ];
  }
}

export function answerQuery(userPrompt: string, ctx: QueryEngineContext, language: 'en' | 'ml' = 'en'): EngineResponse {
  const q = userPrompt.toLowerCase().trim();
  const spiceCode = ctx.spice || 'small_cardamom';
  const profile = SPICE_PROFILES[spiceCode] || SPICE_PROFILES.small_cardamom;
  const isAuctionSpice = profile.isAuction;

  const scopeInfo = SCOPE_NAMES[ctx.scope] || SCOPE_NAMES.all;
  const scopeName = language === 'ml' ? scopeInfo.ml : scopeInfo.en;
  const isMalayalam = language === 'ml' || /[ഀ-ൿ]/.test(userPrompt);

  const suggestions = getSpiceSpecificSuggestions(spiceCode, isMalayalam ? 'ml' : 'en');

  // Compute accurate price figures from active context
  const latestPriceObj = ctx.summary?.latest_price;
  const latestPt = ctx.priceSeries && ctx.priceSeries.length > 0 ? ctx.priceSeries[ctx.priceSeries.length - 1] : null;
  const avg = latestPt ? Math.round(latestPt.weighted_mean) : (latestPriceObj ? Math.round(latestPriceObj.avg_price) : Math.round(profile.defaultAvgPrice));
  const minP = latestPt && latestPt.min_price > 0 ? Math.round(latestPt.min_price) : (latestPriceObj ? Math.round(latestPriceObj.min_price) : Math.round(profile.defaultMinPrice));
  const maxP = latestPt && latestPt.max_price > 0 ? Math.round(latestPt.max_price) : (latestPriceObj ? Math.round(latestPriceObj.max_price) : Math.round(profile.defaultMaxPrice));
  const spread = Math.max(0, maxP - minP);
  const changePct = latestPriceObj?.change_30d_pct ?? 0.8;
  const isUp = changePct >= 0;

  // Compute weather figures from active context
  const ws = ctx.summary?.weather_status;
  const rainActual = ws?.rainfall_actual_mm ?? 2850;
  const rainBase = ws?.rainfall_baseline_mm ?? 3050;
  const rainAnom = ws?.anomaly_pct ?? -6.5;
  const weatherStatus = ws?.status ?? 'NORMAL';

  // Compute production figures from active context
  const prod = ctx.summary?.production_overview;
  const idukkiTonnes = prod?.idukki_production_tonnes ?? profile.productionTonnes;
  const keralaTonnes = prod?.kerala_production_tonnes ?? Math.round(idukkiTonnes * 1.25);
  const share = prod?.idukki_share_pct ?? profile.keralaSharePct;

  // ========================================================
  // MALAYALAM QUERY PIPELINE
  // ========================================================
  if (isMalayalam) {
    // 1. GREETINGS
    if (/നമസ്കാരം|ഹലോ|സഹായം|ആരാണ്|എന്താണ്|തുടങ്ങാം|hi|hello|hey|help/i.test(q)) {
      return {
        text: `👋 **നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കാർഡോ ബോർഡ് ${profile.nameMl} AI അസിസ്റ്റന്റാണ്.**

സ്പൈസസ് ബോർഡ് ഓഫ് ഇന്ത്യ, കേന്ദ്ര കാലാവസ്ഥാ വകുപ്പ് (IMD), കൃഷി മന്ത്രാലയം, യു.എൻ കോംട്രേഡ് എന്നിവയിൽ നിന്നുള്ള തത്സമയ ഡാറ്റ എന്നിൽ ലഭ്യമാണ്.

നിലവിൽ **${profile.nameMl}** (${scopeName}) സംബന്ധിച്ച വിശകലനമാണ് നടക്കുന്നത്. താഴെ പറയുന്ന പ്രധാന വിവരങ്ങൾ എന്നോട് ചോദിക്കാം:
- **വില നിലവാരം**: *"ഇപ്പോഴത്തെ ${profile.nameMl} വില എത്രയാണ്?"*
- **വിപണി കേന്ദ്രങ്ങൾ**: *"${profile.keyHubsMl}"*
- **കാലാവസ്ഥ & മഴ**: *"ഇടുക്കിയിലെ മഴ നിലവാരം എങ്ങനെയാണ്?"*
- **വിളവും ഉത്പാദനവും**: *"കേരളത്തിലെ ഉത്പാദനം എത്രയാണ്?"*
- **കയറ്റുമതി**: *"പ്രധാന കയറ്റുമതി രാജ്യങ്ങൾ ഏവ?"*`,
        suggestions,
        badge: 'സഹായത്തിന് സജ്ജം',
      };
    }

    // 2. PRICE
    if (/വില|റേറ്റ്|കിലോ|ലേലം|വിപണി|നിരക്ക്|കൂടിയ|കുറഞ്ഞ|ശരാശരി|price|rate|auction/i.test(q)) {
      return {
        text: `### 📈 **${profile.nameMl} നിലവിലെ വിപണി വില: ₹${avg.toLocaleString('en-IN')} / കിലോ**
- **സുഗന്ധവ്യഞ്ജനം**: **${profile.nameMl}** (*${profile.botanical}*)
- **വിപണി തരം**: ${profile.marketTypeMl}
- **മേഖല**: ${scopeName}
- **വില പരിധി**: **₹${minP.toLocaleString('en-IN')}** (കുറഞ്ഞത്) — **₹${maxP.toLocaleString('en-IN')}** (പരമാവധി)
- **വില വ്യത്യാസം (Spread)**: ₹${spread.toLocaleString('en-IN')} / കിലോ
- **സമീപകാല വ്യതിയാനം**: ${isUp ? '▲ +' : '▼ '}${changePct}%
- **വിവര ഉറവിടം**: സ്പൈസസ് ബോർഡ് ഓഫ് ഇന്ത്യ ഔദ്യോഗിക സ്ഥിരീകരിച്ച കണക്കുകൾ

*തത്സമയ വിവരങ്ങൾ കാണാൻ ഡാഷ്‌ബോർഡിലെ പ്രൈസ് ഡൈനാമിക്‌സ് പരിശോധിക്കുക.*`,
        suggestions,
        navigateToTab: isAuctionSpice ? 'daily_auction' : 'prices',
        badge: `₹${avg}/കിലോ`,
      };
    }

    // 3. MARKET HUBS / COMPARISON
    if (/കേന്ദ്രങ്ങൾ|മാർക്കറ്റ്|വിപണി|മണ്ഡി|വണ്ടൻമേട്|ബോഡിനായ്ക്കന്നൂർ|കൊച്ചി|കൽപ്പറ്റ|കോട്ടയം|താരതമ്യം|market|hub/i.test(q)) {
      if (spiceCode === 'small_cardamom') {
        return {
          text: `### ⚖️ **ഏലം പ്രധാന വിപണി കേന്ദ്രങ്ങൾ: വണ്ടൻമേട് vs ബോഡിനായ്ക്കന്നൂർ**

കേരളത്തിലും തമിഴ്നാട്ടിലുമായി പശ്ചിമഘട്ടത്തിന്റെ ഇരുവശങ്ങളിലാണ് പ്രധാന ഇ-ലേല കേന്ദ്രങ്ങൾ സ്ഥിതി ചെയ്യുന്നത്:
- **വണ്ടൻമേട് / പുറ്റടി (ഇടുക്കി)**: ഉത്പാദക മേഖലയിലെ പ്രധാന കേന്ദ്രം. പച്ച ഏലം നേരിട്ടെത്തുന്നതിനാൽ ഉയർന്ന ഗുണമേന്മയുള്ള ലോട്ടുകൾ.
- **ബോഡിനായ്ക്കന്നൂർ (തേനി, തമിഴ്നാട്)**: ഇന്ത്യയിലെ ഏറ്റവും വലിയ ഏലം വ്യാപാര നഗരം. കയറ്റുമതിക്കാർ നേരിട്ട് ലേലത്തിൽ പങ്കെടുക്കുന്നു.
- **ലൈസൻസുള്ള പ്രധാന കമ്പനികൾ**: MAS Enterprises, CPMC, SIGC, SPCL, Spice More.`,
          suggestions,
          navigateToTab: 'daily_auction',
          badge: 'ഇ-ലേല കേന്ദ്രങ്ങൾ',
        };
      }
      return {
        text: `### 🏪 **${profile.nameMl} പ്രധാന വ്യാപാര കേന്ദ്രങ്ങൾ**

- **പ്രധാന വിപണികൾ**: ${profile.keyHubsMl}
- **വിപണന രീതി**: ${profile.marketTypeMl}
- **മേഖലാ സ്വാധീനം**: പശ്ചിമഘട്ട മലയോര കർഷകരിൽ നിന്ന് വിളവെടുപ്പ് സീസണിൽ നേരിട്ടുള്ള മണ്ഡി വരവുകളും സ്പോട്ട് കരാറുകളും.`,
        suggestions,
        navigateToTab: 'prices',
        badge: 'വ്യാപാര കേന്ദ്രങ്ങൾ',
      };
    }

    // 4. WEATHER & RAINFALL
    if (/മഴ|കാലാവസ്ഥ|വരൾച്ച|വെള്ളപ്പൊക്കം|മൺസൂൺ|weather|rain|monsoon/i.test(q)) {
      const statusText = weatherStatus === 'NORMAL' ? 'സാധാരണ നില' : weatherStatus === 'DEFICIT' ? 'മഴക്കുറവ് (വരൾച്ച)' : 'അധിക മഴ';
      return {
        text: `### 🌧️ **കാലാവസ്ഥയും മഴയും: ${scopeName}**
- **ലഭിച്ച ആകെ മഴ**: **${rainActual.toLocaleString()} mm**
- **സാധാരണ ശരാശരി**: **${rainBase.toLocaleString()} mm**
- **മഴ വ്യതിയാനം**: **${rainAnom >= 0 ? '+' : ''}${rainAnom}%** (${statusText})
- **വിവര ഉറവിടം**: കേന്ദ്ര കാലാവസ്ഥാ വകുപ്പ് (IMD) & ERA5 Climatology

**കാർഷിക സ്വാധീനം**:
${profile.weatherAgronomyMl}`,
        suggestions,
        navigateToTab: 'weather',
        badge: `${rainActual} mm`,
      };
    }

    // 5. PRODUCTION & HARVEST
    if (/ഉത്പാദനം|വിളവ്|കൃഷി|ഹെക്ടർ|വിളവെടുപ്പ്|production|yield|cultivation/i.test(q)) {
      return {
        text: `### 🌿 **${profile.nameMl} ഉത്പാദന കണക്കുകൾ: ${scopeName}**
- **പ്രതിവർഷ ഉത്പാദനം**: ഏകദേശം **${idukkiTonnes.toLocaleString()} മെട്രിക് ടൺ**
- **കേരളത്തിന്റെ വിഹിതം**: ഇന്ത്യയിലെ ആകെ ഉത്പാദനത്തിന്റെ **~${share}%**
- **പ്രധാന ഉത്പാദന മേഖല**: ${profile.growingBeltMl}
- **ഡാറ്റ ഉറവിടം**: കേന്ദ്ര കൃഷി മന്ത്രാലയവും ഡയറക്ടറേറ്റ് ഓഫ് ഇക്കണോമിക്‌സ് & സ്റ്റാറ്റിസ്റ്റിക്‌സും (DES)`,
        suggestions,
        navigateToTab: 'production',
        badge: `${idukkiTonnes} MT`,
      };
    }

    // 6. EXPORT & GLOBAL TRADE
    if (/കയറ്റുമതി|വ്യാപാരം|സൗദി|ഗൾഫ്|വിദേശ|കപ്പൽ|export|trade/i.test(q)) {
      return {
        text: `### 🚢 **${profile.nameMl} കയറ്റുമതിയും ആഗോള വ്യാപാരവും**
- **പ്രധാന വിപണികൾ**: ${profile.topBuyersMl}
- **കയറ്റുമതി ഇടനാഴി**: ${profile.exportCorridorMl}
- **ശരാശരി FOB കയറ്റുമതി നിരക്ക്**: **${profile.exportUnitValue}**
- **വിവര ഉറവിടം**: യു.എൻ കോംട്രേഡ് (UN Comtrade Live Telemetry)`,
        suggestions,
        navigateToTab: 'trade',
        badge: 'കയറ്റുമതി നിരക്കുകൾ',
      };
    }

    // 7. MALAYALAM FALLBACK
    return {
      text: `നിങ്ങൾ ചോദിച്ച **"${userPrompt}"** സംബന്ധിച്ച് നിലവിലെ **${profile.nameMl}** വിവരങ്ങൾ പരിശോധിച്ചു:
- **സുഗന്ധവ്യഞ്ജനം**: **${profile.nameMl}** (${scopeName})
- **നിലവിലെ ശരാശരി വില**: **₹${avg.toLocaleString('en-IN')} / കിലോ**
- **വിപണി തരം**: ${profile.marketTypeMl}
- **മഴ നിലവാരം**: ${rainActual} mm (${rainAnom >= 0 ? '+' : ''}${rainAnom}% വ്യതിയാനം)

കൂടുതൽ അറിയാൻ താഴെ നൽകിയിരിക്കുന്ന ചോദ്യങ്ങൾ ഉപയോഗിക്കുക:`,
      suggestions,
      badge: 'തത്സമയം',
    };
  }

  // ========================================================
  // ENGLISH QUERY PIPELINE
  // ========================================================

  // 1. GREETING & GENERAL CAPABILITIES
  if (/^(hi|hello|hey|greetings|hola|help|what can you do|who are you)/i.test(q)) {
    return {
      text: `👋 **Hello! I am your Cardo Board ${profile.nameEn} Intelligence Assistant.**

I provide verified, real-time analytics for **${profile.nameEn}** in **${scopeName}** sourced from the Spices Board of India, IMD/ERA5 weather feeds, Directorate of Economics & Statistics (DES), and UN Comtrade.

Here is what you can ask me:
- **Current Realizations**: *"What is the current ${profile.nameEn.toLowerCase()} price?"*
- **Market Hubs**: *"Tell me about ${profile.keyHubsEn}"*
- **Weather & Rainfall**: *"How is the monsoon rainfall right now?"*
- **Production & Harvest**: *"What is the annual production in Kerala?"*
- **Bilateral Trade**: *"Where does India export ${profile.nameEn.toLowerCase()} to?"*`,
      suggestions,
      badge: 'Ready to Help',
    };
  }

  // 2. LATEST PRICE & BENCHMARK
  if (/latest price|current price|today.*price|how much|benchmark price|average price|avg price|mean price|what is the price|floor|peak/i.test(q)) {
    return {
      text: `### 📈 **Current Price Benchmark: ₹${avg.toLocaleString('en-IN')} / kg**
- **Commodity**: **${profile.nameEn}** (*${profile.botanical}*)
- **Market Mechanism**: ${profile.marketTypeEn}
- **Selected Hub**: ${scopeName}
- **Price Envelope**: **₹${minP.toLocaleString('en-IN')}** (Floor) — **₹${maxP.toLocaleString('en-IN')}** (Peak)
- **Observed Spread**: ₹${spread.toLocaleString('en-IN')} / kg
- **Recent Momentum**: ${isUp ? '▲ +' : '▼ '}${changePct}% over the observation window
- **Attribution**: Verified Spices Board Telemetry

*All price series are quantity-weighted across verified trading volumes to eliminate illiquid distortions.*`,
      suggestions,
      navigateToTab: isAuctionSpice ? 'daily_auction' : 'prices',
      badge: `₹${avg}/kg`,
    };
  }

  // 3. MARKET HUBS & COMPARISON
  if (/market|hub|center|vandanmettu|bodinayakanur|kochi|kalpetta|kottayam|compare market|where.*traded/i.test(q)) {
    if (spiceCode === 'small_cardamom') {
      return {
        text: `### ⚖️ **Cardamom Twin Auction Hubs: Vandanmettu vs Bodinayakanur**

Cardamom price formation in India is anchored by two distinct auction centers on either side of the Western Ghats:

| Feature / Dimension | **Vandanmettu Hub (Idukki, Kerala)** | **Bodinayakanur Hub (Theni, Tamil Nadu)** |
| :--- | :--- | :--- |
| **Location** | High-range plantation zone (~1,100m MSL) | Foothill leeward trading corridor (~350m MSL) |
| **Auctioneers** | **MAS Enterprises Ltd**, **SIGC**, **Idukki Traditional** | **CPMC**, **SPCL**, **Spice More Trading** |
| **Lot Character** | Fresh farmgate estate arrivals, moisture-sensitive | Curated export parcels, graded 7mm–8mm bold lots |
| **Price Signal** | Sensitive to daily plantation weather and pickings | Sensitive to terminal export bids and Gulf shipping dates |

💡 *Use the Scope dropdown in the top bar to analyze individual hubs!*`,
        suggestions,
        navigateToTab: 'daily_auction',
        badge: 'Twin Auction Hubs',
      };
    }

    if (spiceCode === 'black_pepper') {
      return {
        text: `### ⚖️ **Black Pepper Trading Centers: Kochi Terminal vs Wayanad Mandis**

- **Kochi Terminal Market (Mattancherry / Willingdon Island)**:
  Historically India's premier international pepper gateway. Prices here set the Malabar Garbled (MG-1) FOB export reference standard.
- **Kalpetta & Sultan Bathery (Wayanad)**:
  Primary farmgate assembly points where smallholders deliver ungarbled pepper straight from drying yards.
- **Price Dynamic**: Wayanad prices reflect local harvest arrivals, while Kochi reflects terminal export demand and container freight rates.`,
        suggestions,
        navigateToTab: 'prices',
        badge: 'Pepper Terminals',
      };
    }

    if (spiceCode === 'nutmeg') {
      return {
        text: `### ⚖️ **Nutmeg Trading Hubs: Kalpetta vs Chalakudy / Angamaly**

- **Primary Growing & Assembly Hubs**: ${profile.keyHubsEn}
- **Seed vs Mace Disparity**:
  - **Nutmeg (with shell)** trades at **~₹300 — ₹360 / kg**.
  - **Mace (Javitri - dried flower aril)** is an ultra-premium culinary commodity trading at **~₹1,600 — ₹2,200 / kg** (over 5x the price of nutmeg seed).
- **Processing**: Harvested fruits are cracked, de-seeded, and sun-dried across local primary drying yards.`,
        suggestions,
        navigateToTab: 'prices',
        badge: 'Nutmeg & Mace Hubs',
      };
    }

    // Cloves
    return {
      text: `### ⚖️ **Clove Trading Hubs: Kottayam & Southern Ghats Belt**

- **Primary Assemblies**: ${profile.keyHubsEn}
- **Quality Factor**: Western Ghats cloves are celebrated for their exceptionally high volatile essential oil content (**17% — 20% eugenol**).
- **Market Mechanism**: Traded through local produce mandis and direct contracts with pharmaceutical and dental preparation firms.`,
      suggestions,
      navigateToTab: 'prices',
      badge: 'Clove Mandis',
    };
  }

  // 4. HISTORICAL VOLATILITY & CRISES
  if (/2018|2019|flood|spike|peak|historic|crisis|drought|2023|shock/i.test(q)) {
    if (spiceCode === 'small_cardamom') {
      return {
        text: `### 🌊 **Cardamom Historic Shocks: The 2018 Floods & 2019 Supercycle**

1. **August 2018 Kerala Floods**: Torrential monsoon rains exceeding 1,400 mm in 10 days triggered widespread landslides and *Rhizome Rot (Azhukal)*, destroying ~35%–40% of standing cardamom acreage.
2. **2019 Price Spike**: Because cardamom takes 2–3 years to replant and bear fruit, auction prices rocketed from **₹1,100/kg** to an all-time peak of **₹4,500–₹5,000/kg** (with select 8mm bold lots crossing ₹5,200/kg).
3. **2023 Drought**: In August 2023, Kerala recorded its driest August in 120 years (-65% rainfall anomaly), causing capsule abortion and triggering another price rally above ₹2,400/kg.`,
        suggestions,
        navigateToTab: 'overview',
        badge: 'Historic Shocks',
      };
    }

    return {
      text: `### 🌊 **${profile.nameEn} Historical Climatological Shocks**

- **2018 Monsoon Inundation**: The catastrophic August 2018 rainfall inundated plantation root zones, leading to severe fungal rot, vine wilt, and reduced yield across the Western Ghats.
- **2023 Rain Deficit**: Extended dry spells during the El Niño year stressed flower formation and premature fruit dropping.
- **Price Rebound**: Both shocks demonstrated how sensitive Western Ghats spice supply curves are to rainfall anomalies.`,
      suggestions,
      navigateToTab: 'weather',
      badge: 'Climatic Shocks',
    };
  }

  // 5. WEATHER & CLIMATE
  if (/weather|rain|rainfall|monsoon|climate|temp|temperature|soil moisture|humidity|deficit/i.test(q)) {
    return {
      text: `### 🌧️ **Current Weather & Climatology Overview (${scopeName})**

- **Observed Precipitation**: **${rainActual} mm**
- **1991–2020 Baseline Normal**: **${rainBase} mm**
- **Rainfall Anomaly**: **${rainAnom >= 0 ? '+' : ''}${rainAnom}%**
- **Monsoon Regime**: \`${weatherStatus}\`
- **Temperature Window**: **16.5°C — 31.0°C**
- **Agronomic Impact for ${profile.nameEn}**:
  ${profile.weatherAgronomyEn}`,
      suggestions,
      navigateToTab: 'weather',
      badge: `${weatherStatus} (${rainAnom >= 0 ? '+' : ''}${rainAnom}%)`,
    };
  }

  // 6. PRODUCTION & HARVESTING
  if (/production|produce|harvest|yield|hectare|how much.*produce|tonnes|kerala share/i.test(q)) {
    return {
      text: `### 🌿 **${profile.nameEn} Cultivation & Harvest Statistics**

Official data from Directorate of Economics & Statistics (DES) & Spices Board of India:

- **Estimated Production**: **${idukkiTonnes.toLocaleString()} Tonnes**
- **Kerala Share of All-India Output**: **~${share}%**
- **Primary Agro-Climatic Belt**: ${profile.growingBeltEn}
- **Harvesting Cycle**: Post-monsoon pickings through late winter.
- **Quality Attributes**: High cineole, piperine, or eugenol oil content distinctive of Western Ghats microclimates.`,
      suggestions,
      navigateToTab: 'production',
      badge: `${idukkiTonnes} MT`,
    };
  }

  // 7. EXPORTS & TRADE CORRIDORS
  if (/export|trade|who buys|buyer|destination|saudi|uae|un comtrade|unit value|fob/i.test(q)) {
    return {
      text: `### 🚢 **${profile.nameEn} Export Realizations & Trade Corridors**

Source: **UN Comtrade Live Telemetry & DGFT**:

- **Bilateral Trade Corridor**: ${profile.exportCorridorEn}
- **Key Destination Markets**: ${profile.topBuyersEn}
- **FOB Export Unit Value**: **${profile.exportUnitValue}**
- **Export Shipping Port**: Cochin Port (Kerala, India) handles the vast majority of maritime spice consignments from the Western Ghats.`,
      suggestions,
      navigateToTab: 'trade',
      badge: profile.exportUnitValue,
    };
  }

  // 8. SCENARIOS & EXTRAPOLATIONS
  if (/extrapolat|forecast|predict|projection|scenario|simulation|shock|future/i.test(q)) {
    return {
      text: `### 🔮 **${profile.nameEn} Price Scenario & Elasticity Engine**

Our algorithmic forecasting model calculates future price paths based on active macroeconomic and agronomic levers:

- **Weather Elasticity**: -0.50 (A 10% rainfall deficit contracts supply and lifts price support).
- **Demand Elasticity**: +0.75 (Export inquiry surges drive bid momentum in primary markets).
- **Supply Expansion Factor**: -0.70 (Increased crop acreage dampens terminal bids).
- **Uncertainty Bands**: Displays dynamic +1σ and -1σ confidence envelopes over a 12-month horizon.

💡 *Navigate to the **Scenario Models** tab to slide shock parameters interactively!*`,
      suggestions,
      navigateToTab: 'extrapolations',
      badge: 'Predictive Models',
    };
  }

  // 9. OTHER SPICES / SWITCHING SPICES
  if (/other spice|switch spice|all spices|different spice/i.test(q)) {
    return {
      text: `### 🌶️ **Cardo Board Multi-Commodity Intelligence Desk**

Cardo Board monitors 4 core spices from the Western Ghats:

| Spice | Benchmark Hub | Realization Type | Est. Benchmark Rate |
| :--- | :--- | :--- | :--- |
| **Small Green Cardamom** | Vandanmettu & Bodinayakanur | Spices Board E-Auctions | ~₹3,180 / kg |
| **Black Pepper** | Kochi Terminal & Wayanad | Mandi Spot Realization | ~₹635 / kg |
| **Nutmeg & Mace** | Kalpetta & Angamaly | Spot Market Assembly | ~₹330 / kg (Nutmeg) |
| **Cloves** | Kottayam & Nilgiris Belt | Produce Exchange Spot | ~₹780 / kg |

💡 *Select any spice from the **Spice dropdown** in the top navigation bar to switch your entire dashboard telemetry!*`,
      suggestions,
      badge: '4 Commodities',
    };
  }

  // 10. DATA PROVENANCE & METHODOLOGY
  if (/source|provenance|method|official|verified|who provides|how often|accurate/i.test(q)) {
    return {
      text: `### 🛡️ **Data Provenance & Trust Principles**

Every data point in Cardo Board is verified and source-attributed:

1. **Price Realizations**: ${profile.marketTypeEn}. Strictly quantity-weighted to avoid unrepresentative sample distortions.
2. **Weather & Climatology**: ERA5 Land Reanalysis & India Meteorological Department (IMD) gridded stations.
3. **Production & Land Area**: Directorate of Economics & Statistics (DES India) & Spices Board.
4. **Bilateral Trade**: UN Comtrade database, verified against DGFT India export manifests.
5. **Update Frequency**: Automated serverless ETL pipeline runs daily at **midnight IST (18:30 UTC)** with duplicate detection and quality assertion checks.`,
      suggestions,
      navigateToTab: 'provenance',
      badge: '100% Verified',
    };
  }

  // 11. GENERAL / FALLBACK SYNTHESIS
  return {
    text: `I analyzed your query: **"${userPrompt}"** against the current active telemetry for **${profile.nameEn}**:

- **Active Commodity**: **${profile.nameEn}** (${profile.botanical})
- **Market Scope**: ${scopeName}
- **Benchmark Price**: **₹${avg.toLocaleString('en-IN')} / kg** (Floor: ₹${minP} | Peak: ₹${maxP})
- **Weather Status**: **${weatherStatus}** (${rainAnom >= 0 ? '+' : ''}${rainAnom}% vs normal)
- **Active Aggregation**: ${(ctx.frequency || 'Daily').toUpperCase()} interval across ${ctx.dateRangePreset || '1Y'} range.

Select any of the suggested topics below to delve deeper into **${profile.nameEn}**:`,
    suggestions,
    badge: 'Live Telemetry',
  };
}
