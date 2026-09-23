export type Language = 'en' | 'ml';

export interface Translations {
  appName: string;
  appSubtitle: string;
  export: string;
  refresh: string;
  language: string;
  
  // Spices
  spices: {
    small_cardamom: string;
    black_pepper: string;
    nutmeg: string;
    cloves: string;
  };

  // Scopes / Places
  scopes: {
    all: string;
    idukki: string;
    bodinayakanur: string;
    kerala: string;
    india: string;
    world: string;
  };

  // Frequencies
  frequencies: {
    daily: string;
    monthly: string;
    annual: string;
  };

  // Ranges
  ranges: {
    '1Y': string;
    '3Y': string;
    '5Y': string;
    'ALL': string;
  };

  // Navigation Tabs
  tabs: {
    dailyAuction: string;
    dailyMarket: string;
    overview: string;
    prices: string;
    weather: string;
    production: string;
    trade: string;
    extrapolations: string;
    provenance: string;
  };

  // Daily Auction Landing Tab
  dailyAuctionTab: {
    heroTitle: string;
    heroSubtitle: string;
    marketHeroTitle: string;
    marketHeroSubtitle: string;
    sessionBadge: string;
    marketSessionBadge: string;
    dayAvgPrice: string;
    dayPeakPrice: string;
    dayFloorPrice: string;
    dayTotalVolume: string;
    dayTradedVolume: string;
    soldVolume: string;
    clearance: string;
    lots: string;
    priceSpread: string;
    auctioneerCardsTitle: string;
    marketCentersTitle: string;
    priceCorridor: string;
    tableTitle: string;
    marketTableTitle: string;
    toggleLatest: string;
    toggleLatestMarket: string;
    toggleRecent: string;
    vsPrevDay: string;
    noAuctionsFound: string;
    noMarketFound: string;
    columnAuctioneer: string;
    columnMarketCenter: string;
  };

  // Overview Tab
  overview: {
    activeFilters: string;
    place: string;
    freq: string;
    range: string;
    avgPrice: string;
    perKg: string;
    priceSpread: string;
    volumeTurnover: string;
    tonnes: string;
    soldVolume: string;
    clearanceRate: string;
    rainfallStatus: string;
    rainfallMmTotal: string;
    vsNormal: string;
    regionalShare: string;
    ofKerala: string;
    harvestEstimate: string;
    priceTrajectoryTitle: string;
    priceTrajectorySubtitle: string;
    recentAuctionsTitle: string;
    recentAuctionsSubtitle: string;
    verifiedData: string;
    swipePrompt: string;
    priceModeAvg: string;
    priceModeMax: string;
    priceModeMin: string;
    priceModeAll: string;
    maxPriceCardTitle: string;
    minPriceCardTitle: string;
    searchAuctioneer: string;
    page: string;
    of: string;
    first: string;
    prev: string;
    next: string;
    last: string;
    totalAuctionsCount: string;
  };

  // Table Columns
  table: {
    date: string;
    auctioneer: string;
    marketHub: string;
    arrivalsKg: string;
    soldKg: string;
    minPrice: string;
    maxPrice: string;
    avgPrice: string;
    status: string;
  };

  // Prices Tab
  prices: {
    periodPeak: string;
    periodPeakSub: string;
    periodFloor: string;
    periodFloorSub: string;
    avgPriceTitle: string;
    avgPriceSub: string;
    totalCleared: string;
    totalClearedSub: string;
    chartTitle: string;
    chartSubtitle: string;
  };

  // Weather Tab
  weather: {
    climatologyTitle: string;
    extremeEventsTitle: string;
    tempRegimeTitle: string;
    rainVsNormTitle: string;
    rainVsNormSubtitle: string;
    anomalyTitle: string;
    anomalySubtitle: string;
    tempBandsTitle: string;
    tempBandsSubtitle: string;
    soilMoistureTitle: string;
    soilMoistureSubtitle: string;
  };

  // Production Tab
  production: {
    title: string;
    subtitle: string;
    metricProduction: string;
    metricArea: string;
    metricYield: string;
    hierarchyTitle: string;
    hierarchySubtitle: string;
  };

  // Trade Tab
  trade: {
    exportCorridors: string;
    perCapita: string;
    unitValue: string;
    annualFlowsTitle: string;
    annualFlowsSubtitle: string;
    consumptionTitle: string;
    consumptionSubtitle: string;
  };

  // Chatbot
  chatbot: {
    triggerButton: string;
    headerTitle: string;
    headerSubtitle: string;
    inputPlaceholder: string;
    quickPrompts: string;
    relatedSection: string;
    viewSection: string;
    thinking: string;
  };

  // Footer
  footer: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Cardo Board',
    appSubtitle: 'Global Spice Intelligence & Market Extrapolations • Western Ghats & Global',
    export: 'Export',
    refresh: 'Refresh',
    language: 'Language',

    spices: {
      small_cardamom: 'Small Cardamom',
      black_pepper: 'Black Pepper',
      nutmeg: 'Nutmeg',
      cloves: 'Cloves',
    },

    scopes: {
      all: 'All',
      idukki: 'Idukki',
      bodinayakanur: 'Bodinayakanur',
      kerala: 'Kerala',
      india: 'India',
      world: 'World',
    },

    frequencies: {
      daily: 'Daily',
      monthly: 'Monthly',
      annual: 'Annual',
    },

    ranges: {
      '1Y': '1Y',
      '3Y': '3Y',
      '5Y': '5Y',
      'ALL': 'Max (10Y)',
    },

    tabs: {
      dailyAuction: 'Daily Auction Price',
      dailyMarket: 'Daily Market Price',
      overview: 'Executive Overview',
      prices: 'Price Dynamics',
      weather: 'Monsoon & Climate',
      production: 'Cultivation & Yield',
      trade: 'Trade Flows',
      extrapolations: 'Scenario Models',
      provenance: 'Data Provenance',
    },

    dailyAuctionTab: {
      heroTitle: 'Daily Small Cardamom E-Auction Realizations',
      heroSubtitle: 'Official certified auction results directly from Spices Board of India auction centers',
      marketHeroTitle: 'Daily Market Realizations',
      marketHeroSubtitle: 'Official domestic terminal & spot market price realisations directly from Spices Board of India',
      sessionBadge: 'Latest E-Auction Session',
      marketSessionBadge: 'Latest Market Session',
      dayAvgPrice: 'Day Weighted Average',
      dayPeakPrice: 'Day Peak Price (Max)',
      dayFloorPrice: 'Day Floor Price (Min)',
      dayTotalVolume: 'Total Arrivals & Sold',
      dayTradedVolume: 'Total Volume Traded',
      soldVolume: 'Sold Volume',
      clearance: 'Clearance Rate',
      lots: 'Lots',
      priceSpread: 'Price Spectrum',
      auctioneerCardsTitle: 'Participating Licensed Auction Houses',
      marketCentersTitle: 'Active Trading Centers & Spot Markets',
      priceCorridor: 'Price Corridor',
      tableTitle: 'ARCHIVE - DAILY AUCTION PRICE OF SMALL CARDAMOM',
      marketTableTitle: 'ARCHIVE - DAILY SPOT MARKET PRICES',
      toggleLatest: "Today's Auctions Only",
      toggleLatestMarket: "Today's Records Only",
      toggleRecent: 'Recent Sessions (Past 7 Days)',
      vsPrevDay: 'vs previous session',
      noAuctionsFound: 'No auction records found for this date.',
      noMarketFound: 'No market records found for this date.',
      columnAuctioneer: 'Auctioneer',
      columnMarketCenter: 'Trading Center / Market Hub',
    },

    overview: {
      activeFilters: 'Active Filters:',
      place: 'Place',
      freq: 'Freq',
      range: 'Range',
      avgPrice: 'Average Price',
      perKg: '/ kg',
      priceSpread: 'Price Range',
      volumeTurnover: 'Volume Traded',
      tonnes: 'Tonnes',
      soldVolume: 'Sold',
      clearanceRate: 'Clearance Rate',
      rainfallStatus: 'Rainfall Status',
      rainfallMmTotal: 'mm total',
      vsNormal: 'vs Normal',
      regionalShare: 'Regional Share',
      ofKerala: 'of Kerala',
      harvestEstimate: 'Harvest',
      priceTrajectoryTitle: 'Price Trajectory & Auction Volumes',
      priceTrajectorySubtitle: 'Historical price envelope and market arrivals',
      recentAuctionsTitle: 'Recent Verified Auctions',
      recentAuctionsSubtitle: 'Official auction realizations from Spices Board of India',
      verifiedData: 'Verified Data',
      swipePrompt: 'Swipe horizontally to navigate full timeline',
      priceModeAvg: 'Average Price',
      priceModeMax: 'Maximum Price',
      priceModeMin: 'Minimum Price',
      priceModeAll: 'Price Envelope',
      maxPriceCardTitle: 'Period Peak Price',
      minPriceCardTitle: 'Period Floor Price',
      searchAuctioneer: 'Search auctioneer or market...',
      page: 'Page',
      of: 'of',
      first: 'First',
      prev: 'Previous',
      next: 'Next',
      last: 'Last',
      totalAuctionsCount: 'verified auctions',
    },

    table: {
      date: 'Date',
      auctioneer: 'Auctioneer',
      marketHub: 'Market Hub',
      arrivalsKg: 'Arrivals (kg)',
      soldKg: 'Sold (kg)',
      minPrice: 'Min (₹)',
      maxPrice: 'Max (₹)',
      avgPrice: 'Avg Price (₹)',
      status: 'Status',
    },

    prices: {
      periodPeak: 'Period Peak',
      periodPeakSub: 'Highest auction price realized',
      periodFloor: 'Period Floor',
      periodFloorSub: 'Lowest band during harvest peaks',
      avgPriceTitle: 'Average Price',
      avgPriceSub: 'Average market realization',
      totalCleared: 'Total Cleared Volume',
      totalClearedSub: 'Cumulative auction sales',
      chartTitle: 'Price Trends & Auction Volumes',
      chartSubtitle: 'Historical price range and market arrivals over time',
    },

    weather: {
      climatologyTitle: 'Climatology & Rainfall',
      extremeEventsTitle: 'Extreme Weather Events',
      tempRegimeTitle: 'Temperature Range',
      rainVsNormTitle: 'Precipitation vs Normal Baseline',
      rainVsNormSubtitle: 'Monthly and annual rainfall compared to long-term normal',
      anomalyTitle: 'Rainfall Anomaly (% Deviation)',
      anomalySubtitle: 'Positive indicates excess rainfall; negative indicates dry spells',
      tempBandsTitle: 'Temperature Trends (°C)',
      tempBandsSubtitle: 'Minimum, maximum, and average recorded temperatures',
      soilMoistureTitle: 'Topsoil Moisture Index',
      soilMoistureSubtitle: 'Root-zone moisture levels essential for spice health',
    },

    production: {
      title: 'Agricultural Production & Cultivation',
      subtitle: 'Official government statistics (DES India & FAOSTAT)',
      metricProduction: 'Production (Tonnes)',
      metricArea: 'Harvested Area (ha)',
      metricYield: 'Yield (kg/ha)',
      hierarchyTitle: 'Production Breakdown & Sources',
      hierarchySubtitle: 'All figures source-attributed to official government statistical bodies',
    },

    trade: {
      exportCorridors: 'Primary Export Corridors',
      perCapita: 'High Consumption Markets',
      unitValue: 'Export Realization Value',
      annualFlowsTitle: 'Export Volumes by Destination Country',
      annualFlowsSubtitle: 'Direct spice trade flows verified via UN Comtrade',
      consumptionTitle: 'Food Supply & Consumption Trends',
      consumptionSubtitle: 'Per-capita food consumption estimates from FAOSTAT',
    },

    chatbot: {
      triggerButton: 'Ask Spice AI',
      headerTitle: 'Spice Intelligence Assistant',
      headerSubtitle: 'Live Data Grounded',
      inputPlaceholder: 'Ask about prices, weather, floods, exports...',
      quickPrompts: 'Suggested Questions:',
      relatedSection: 'Related Dashboard Section:',
      viewSection: 'View',
      thinking: 'Analyzing market data...',
    },

    footer: 'Cardo Board — Global Spice Intelligence Platform • Western Ghats & Global Telemetry',
  },

  ml: {
    appName: 'കാർഡോ ബോർഡ്',
    appSubtitle: 'സുഗന്ധവ്യഞ്ജന വിപണി വിവരങ്ങളും പ്രവചനങ്ങളും • പശ്ചിമഘട്ടവും ആഗോളവും',
    export: 'ഡൗൺലോഡ്',
    refresh: 'പുതുക്കുക',
    language: 'ഭാഷ',

    spices: {
      small_cardamom: 'ഏലം',
      black_pepper: 'കുരുമുളക്',
      nutmeg: 'ജാതിക്ക',
      cloves: 'ഗ്രാമ്പൂ',
    },

    scopes: {
      all: 'എല്ലാം',
      idukki: 'ഇടുക്കി',
      bodinayakanur: 'ബോഡിനായ്ക്കന്നൂർ',
      kerala: 'കേരളം',
      india: 'ഇന്ത്യ',
      world: 'ലോകം',
    },

    frequencies: {
      daily: 'ദിവസേന',
      monthly: 'പ്രതിമാസം',
      annual: 'വാർഷികം',
    },

    ranges: {
      '1Y': '1 വർഷം',
      '3Y': '3 വർഷം',
      '5Y': '5 വർഷം',
      'ALL': 'മുഴുവൻ',
    },

    tabs: {
      dailyAuction: 'ദിവസേനയുള്ള ലേലവില',
      dailyMarket: 'ദിവസേനയുള്ള വിപണി വില',
      overview: 'പൊതുവിവരം',
      prices: 'വില നിലവാരം',
      weather: 'കാലാവസ്ഥ & മഴ',
      production: 'ഉത്പാദനം & വിളവ്',
      trade: 'കയറ്റുമതി & വിപണി',
      extrapolations: 'വില പ്രവചനങ്ങൾ',
      provenance: 'വിവര ഉറവിടങ്ങൾ',
    },

    dailyAuctionTab: {
      heroTitle: 'ചെറിയ ഏലം ദിവസേനയുള്ള ലേല വിവരങ്ങൾ',
      heroSubtitle: 'സ്പൈസസ് ബോർഡ് ഓഫ് ഇന്ത്യ ഔദ്യോഗിക കേന്ദ്രങ്ങളിലെ തത്സമയ ലേല നിരക്കുകൾ',
      marketHeroTitle: 'ദിവസേനയുള്ള വിപണി വിവരങ്ങൾ',
      marketHeroSubtitle: 'സ്പൈസസ് ബോർഡ് ഓഫ് ഇന്ത്യ ഔദ്യോഗിക ടെർമിനൽ & സ്പോട്ട് മാർക്കറ്റ് നിരക്കുകൾ',
      sessionBadge: 'ഏറ്റവും പുതിയ ഇ-ലേലം',
      marketSessionBadge: 'ഏറ്റവും പുതിയ വിപണി വിവരം',
      dayAvgPrice: 'ദിവസത്തെ ശരാശരി വില',
      dayPeakPrice: 'പരമാവധി വില (Peak)',
      dayFloorPrice: 'കുറഞ്ഞ വില (Floor)',
      dayTotalVolume: 'ആകെ വരവും വിറ്റതും',
      dayTradedVolume: 'ആകെ വ്യാപാര അളവ്',
      soldVolume: 'വിറ്റ അളവ്',
      clearance: 'വിൽപന നിരക്ക്',
      lots: 'ലോട്ടുകൾ',
      priceSpread: 'വില വിസ്തൃതി',
      auctioneerCardsTitle: 'ലേലം നടത്തിയ ലൈസൻസുള്ള കമ്പനികൾ',
      marketCentersTitle: 'പ്രവർത്തനക്ഷമമായ വിപണി കേന്ദ്രങ്ങൾ',
      priceCorridor: 'വില നിലവാരം',
      tableTitle: 'ARCHIVE - ചെറിയ ഏലം ദിവസേനയുള്ള ലേലവില',
      marketTableTitle: 'ARCHIVE - ദിവസേനയുള്ള സ്പോട്ട് വിപണി നിരക്കുകൾ',
      toggleLatest: 'ഇന്നത്തെ ലേലങ്ങൾ മാത്രം',
      toggleLatestMarket: 'ഇന്നത്തെ വിവരങ്ങൾ മാത്രം',
      toggleRecent: 'സമീപകാല വിവരങ്ങൾ (കഴിഞ്ഞ 7 ദിവസം)',
      vsPrevDay: 'മുമ്പത്തെ നിരക്കുമായി താരതമ്യം',
      noAuctionsFound: 'ഈ തീയതിയിൽ ലേല വിവരങ്ങൾ ലഭ്യമല്ല.',
      noMarketFound: 'ഈ തീയതിയിൽ വിപണി വിവരങ്ങൾ ലഭ്യമല്ല.',
      columnAuctioneer: 'ലേലം നടത്തുന്നവർ',
      columnMarketCenter: 'വിപണി കേന്ദ്രം',
    },

    overview: {
      activeFilters: 'നിലവിലെ വിവരങ്ങൾ:',
      place: 'സ്ഥലം',
      freq: 'തരം',
      range: 'കാലയളവ്',
      avgPrice: 'ശരാശരി വില',
      perKg: '/ കിലോഗ്രാം',
      priceSpread: 'വില പരിധി',
      volumeTurnover: 'വിറ്റുവരവ്',
      tonnes: 'ടൺ',
      soldVolume: 'വിറ്റത്',
      clearanceRate: 'വിൽപന നിരക്ക്',
      rainfallStatus: 'മഴ നിലവാരം',
      rainfallMmTotal: 'മി.മീ ആകെ',
      vsNormal: 'സാധാരണയുമായി',
      regionalShare: 'ഉത്പാദന വിഹിതം',
      ofKerala: 'കേരളത്തിൽ നിന്ന്',
      harvestEstimate: 'വിളവ്',
      priceTrajectoryTitle: 'വില നിലവാരവും ലേല അളവും',
      priceTrajectorySubtitle: 'വിപണി വില വ്യതിയാനങ്ങളും ലേലത്തിലേക്ക് എത്തിയ അളവും',
      recentAuctionsTitle: 'സമീപകാല ഔദ്യോഗിക ലേലങ്ങൾ',
      recentAuctionsSubtitle: 'സ്പൈസസ് ബോർഡ് ഓഫ് ഇന്ത്യ അംഗീകൃത ലേല വിവരങ്ങൾ',
      verifiedData: 'സ്ഥിരീകരിച്ച വിവരം',
      swipePrompt: 'പൂർണ്ണ വിവരങ്ങൾ കാണാൻ ഇടത്തോട്ടും വലത്തോട്ടും നീക്കുക',
      priceModeAvg: 'ശരാശരി വില',
      priceModeMax: 'പരമാവധി വില',
      priceModeMin: 'കുറഞ്ഞ വില',
      priceModeAll: 'എല്ലാ വിലകളും',
      maxPriceCardTitle: 'പരമാവധി നിരക്ക്',
      minPriceCardTitle: 'കുറഞ്ഞ നിരക്ക്',
      searchAuctioneer: 'ലേല കമ്പനി തിരയുക...',
      page: 'പേജ്',
      of: '/',
      first: 'ആദ്യം',
      prev: 'മുമ്പത്തെത്',
      next: 'അടുത്തത്',
      last: 'അവസാനം',
      totalAuctionsCount: 'ലേല വിവരങ്ങൾ',
    },

    table: {
      date: 'തീയതി',
      auctioneer: 'ലേല കമ്പനി',
      marketHub: 'വിപണി കേന്ദ്രം',
      arrivalsKg: 'വരവ് (കിലോ)',
      soldKg: 'വിറ്റത് (കിലോ)',
      minPrice: 'കുറഞ്ഞത് (₹)',
      maxPrice: 'കൂടിയത് (₹)',
      avgPrice: 'ശരാശരി (₹)',
      status: 'നിലവാരം',
    },

    prices: {
      periodPeak: 'ഏറ്റവും ഉയർന്ന വില',
      periodPeakSub: 'ഈ കാലയളവിൽ ലഭിച്ച ഏറ്റവും കൂടിയ വില',
      periodFloor: 'ഏറ്റവും കുറഞ്ഞ വില',
      periodFloorSub: 'വിളവെടുപ്പ് സമയത്തെ ഏറ്റവും കുറഞ്ഞ നിരക്ക്',
      avgPriceTitle: 'ശരാശരി വില',
      avgPriceSub: 'വിപണി ശരാശരി നിരക്ക്',
      totalCleared: 'ആകെ വിറ്റ അളവ്',
      totalClearedSub: 'ലേലത്തിൽ വിറ്റഴിഞ്ഞ ആകെ സുഗന്ധവ്യഞ്ജനം',
      chartTitle: 'വില നിലവാരവും ലേല അളവും',
      chartSubtitle: 'കാലാകാലങ്ങളിലെ വില വ്യതിയാനങ്ങളും ലേല അളവുകളും',
    },

    weather: {
      climatologyTitle: 'കാലാവസ്ഥയും മഴയും',
      extremeEventsTitle: 'പ്രതികൂല കാലാവസ്ഥകൾ',
      tempRegimeTitle: 'താപനില പരിധി',
      rainVsNormTitle: 'ലഭിച്ച മഴയും സാധാരണ മഴയും',
      rainVsNormSubtitle: 'ദീർഘകാല ശരാശരിയുമായി തുലനം ചെയ്തുള്ള മഴ വിവരങ്ങൾ',
      anomalyTitle: 'മഴ വ്യതിയാന ശതമാനം',
      anomalySubtitle: 'പോസിറ്റീവ് അധിക മഴയെയും, നെഗറ്റീവ് വരൾച്ചയെയും സൂചിപ്പിക്കുന്നു',
      tempBandsTitle: 'താപനില നിലവാരം (°C)',
      tempBandsSubtitle: 'കുറഞ്ഞതും കൂടിയതുമായ ശരാശരി താപനില',
      soilMoistureTitle: 'മണ്ണിലെ ഈർപ്പ നിലവാരം',
      soilMoistureSubtitle: 'ചെടിയുടെ ആരോഗ്യത്തിനും വളർച്ചയ്ക്കും ആവശ്യമായ വേരിലെ ഈർപ്പം',
    },

    production: {
      title: 'കാർഷിക ഉത്പാദനവും വിളവും',
      subtitle: 'കേന്ദ്ര-സംസ്ഥാന കൃഷി വകുപ്പുകളുടെ ഔദ്യോഗിക കണക്കുകൾ',
      metricProduction: 'ഉത്പാദനം (ടൺ)',
      metricArea: 'കൃഷിസ്ഥലം (ഹെക്ടർ)',
      metricYield: 'വിളവ് (കിലോ/ഹെക്ടർ)',
      hierarchyTitle: 'മേഖല തിരിച്ചുള്ള ഉത്പാദനം',
      hierarchySubtitle: 'ഔദ്യോഗിക സ്ഥിതിവിവരക്കണക്കുകൾ പ്രകാരമുള്ള വിവരങ്ങൾ',
    },

    trade: {
      exportCorridors: 'പ്രധാന കയറ്റുമതി രാജ്യങ്ങൾ',
      perCapita: 'കൂടുതൽ ഉപയോഗിക്കുന്ന വിപണികൾ',
      unitValue: 'കയറ്റുമതി നിരക്ക്',
      annualFlowsTitle: 'രാജ്യങ്ങൾ തിരിച്ചുള്ള കയറ്റുമതി',
      annualFlowsSubtitle: 'യു.എൻ കോംട്രേഡ് വഴിയുള്ള അന്താരാഷ്ട്ര വ്യാപാര വിവരങ്ങൾ',
      consumptionTitle: 'ഉപഭോഗ നിലവാര വിവരങ്ങൾ',
      consumptionSubtitle: 'എഫ്.എ.ഒ (FAO) സ്ഥിതിവിവരക്കണക്കുകൾ പ്രകാരമുള്ള ഉപഭോഗം',
    },

    chatbot: {
      triggerButton: 'ചോദിക്കൂ (AI)',
      headerTitle: 'കാർഡോ AI അസിസ്റ്റന്റ്',
      headerSubtitle: 'തത്സമയ വിവരങ്ങൾ അടിസ്ഥാനമാക്കി',
      inputPlaceholder: 'വില, മഴ, ഉത്പാദനം, കയറ്റുമതി എന്നിവ ചോദിക്കൂ...',
      quickPrompts: 'പ്രധാന ചോദ്യങ്ങൾ:',
      relatedSection: 'ബന്ധപ്പെട്ട പേജ്:',
      viewSection: 'കാണുക',
      thinking: 'വിവരങ്ങൾ പരിശോധിക്കുന്നു...',
    },

    footer: 'കാർഡോ ബോർഡ് — ആഗോള സുഗന്ധവ്യഞ്ജന വിവര പ്ലാറ്റ്‌ഫോം • പശ്ചിമഘട്ട തത്സമയ വിവരങ്ങൾ',
  },
};
