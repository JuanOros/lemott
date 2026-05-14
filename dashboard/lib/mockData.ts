// Dados fictícios realistas para testar o dashboard sem token da Meta
// Substitua por dados reais quando o token estiver configurado

export const mockInsights = [
  {
    campaign_name: "Copa 2026 - Camisa Verde",
    adset_name: "Homens 25-40 Brasil",
    ad_name: "Mockup campo de futebol",
    impressions: "14820",
    clicks: "412",
    spend: "87.50",
    ctr: "2.78",
    cpc: "0.21",
    conversions: "6",
    cost_per_conversion: "14.58",
    roas: "8.90",
  },
  {
    campaign_name: "Estampa - Resenha no Bar",
    adset_name: "Público frio amplo",
    ad_name: "Mockup bar boteco",
    impressions: "9340",
    clicks: "187",
    spend: "42.30",
    ctr: "2.00",
    cpc: "0.23",
    conversions: "2",
    cost_per_conversion: "21.15",
    roas: "6.14",
  },
  {
    campaign_name: "Linha Infantil - Body Copa",
    adset_name: "Mães 28-45 Brasil",
    ad_name: "Mockup bebê uniforme",
    impressions: "6100",
    clicks: "58",
    spend: "31.00",
    ctr: "0.95",
    cpc: "0.53",
    conversions: "0",
    cost_per_conversion: "0",
    roas: "0",
  },
  {
    campaign_name: "Moletom - Dias de Jogo",
    adset_name: "Homens 18-35 Sul/Sudeste",
    ad_name: "Mockup sofá com pipoca",
    impressions: "11200",
    clicks: "334",
    spend: "65.80",
    ctr: "2.98",
    cpc: "0.20",
    conversions: "4",
    cost_per_conversion: "16.45",
    roas: "7.88",
  },
  {
    campaign_name: "Estampa - Vuvuzela FC",
    adset_name: "Público frio amplo",
    ad_name: "Carrossel estampas",
    impressions: "4890",
    clicks: "41",
    spend: "28.90",
    ctr: "0.84",
    cpc: "0.70",
    conversions: "0",
    cost_per_conversion: "0",
    roas: "0",
  },
];

export const mockCampaigns = [
  { id: "c1", name: "Copa 2026 - Camisa Verde", status: "ACTIVE", objective: "OUTCOME_SALES" },
  { id: "c2", name: "Estampa - Resenha no Bar", status: "ACTIVE", objective: "OUTCOME_SALES" },
  { id: "c3", name: "Linha Infantil - Body Copa", status: "PAUSED", objective: "OUTCOME_SALES" },
  { id: "c4", name: "Moletom - Dias de Jogo", status: "ACTIVE", objective: "OUTCOME_SALES" },
  { id: "c5", name: "Estampa - Vuvuzela FC", status: "ACTIVE", objective: "OUTCOME_SALES" },
];

export const mockCatalog = [
  {
    stamp: "Copa 2026 - Bandeira",
    products: [
      { type: "Camiseta", sku: "CAM-COPA-001", customMockup: true },
      { type: "Moletom", sku: "MOL-COPA-001", customMockup: false },
      { type: "Cropped", sku: "CRP-COPA-001", customMockup: false },
      { type: "Body Infantil", sku: "BOD-COPA-001", customMockup: false },
    ],
  },
  {
    stamp: "Resenha no Bar",
    products: [
      { type: "Camiseta", sku: "CAM-RES-001", customMockup: true },
      { type: "Moletom", sku: "MOL-RES-001", customMockup: true },
      { type: "Cropped", sku: "CRP-RES-001", customMockup: false },
    ],
  },
  {
    stamp: "Vuvuzela FC",
    products: [
      { type: "Camiseta", sku: "CAM-VUV-001", customMockup: false },
      { type: "Moletom", sku: "MOL-VUV-001", customMockup: false },
    ],
  },
  {
    stamp: "Dias de Jogo",
    products: [
      { type: "Camiseta", sku: "CAM-DIA-001", customMockup: true },
      { type: "Moletom", sku: "MOL-DIA-001", customMockup: true },
      { type: "Cropped", sku: "CRP-DIA-001", customMockup: false },
      { type: "Body Infantil", sku: "BOD-DIA-001", customMockup: false },
    ],
  },
];

export const mockReport = {
  coletado_em: new Date().toISOString(),
  campanhas: mockCampaigns,
  conjuntos_de_anuncios: [],
  anuncios: [],
  insights_7_dias: mockInsights,
};
