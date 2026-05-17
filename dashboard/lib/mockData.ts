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

const BASE_MOCKUP = "/home/juan/Desktop/LeMotts/MOCKUP INSTAGRAM";

const DEFAULT_PRODUCTS = [
  { type: "Camiseta" },
  { type: "Moletom" },
  { type: "Cropped" },
  { type: "Body Infantil" },
];

const ALL_STAMPS = [
  // PETS NA COPA
  { name: "Pets na Copa - Arara Azul",   mockupFile: `${BASE_MOCKUP}/PETS NA COPA/AraraAzul.jpg` },
  { name: "Pets na Copa - Betta",        mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Betta.jpg` },
  { name: "Pets na Copa - Bulldog",      mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Bulldog.jpg` },
  { name: "Pets na Copa - Calopsita",    mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Calopsita.jpg` },
  { name: "Pets na Copa - Gato Filhote", mockupFile: `${BASE_MOCKUP}/PETS NA COPA/GatoFilhote.jpg` },
  { name: "Pets na Copa - Gato Preto",   mockupFile: `${BASE_MOCKUP}/PETS NA COPA/GatoPreto.jpg` },
  { name: "Pets na Copa - Golden",       mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Goldesn.jpg` },
  { name: "Pets na Copa - Kinguio",      mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Kinguio.jpg` },
  { name: "Pets na Copa - Labrador",     mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Labrador.jpg` },
  { name: "Pets na Copa - Pinscher",     mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Pinscher.jpg` },
  { name: "Pets na Copa - Poodle",       mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Poodle.jpg` },
  { name: "Pets na Copa - Shih Tzu",     mockupFile: `${BASE_MOCKUP}/PETS NA COPA/ShihTzu.jpg` },
  { name: "Pets na Copa - Spitz",        mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Spitz.jpg` },
  { name: "Pets na Copa - Yorkshire",    mockupFile: `${BASE_MOCKUP}/PETS NA COPA/Yorkshire.jpg` },
  // RITMO COPA
  { name: "Ritmo Copa 1",  mockupFile: `${BASE_MOCKUP}/RITMO COPA/1.png` },
  { name: "Ritmo Copa 2",  mockupFile: `${BASE_MOCKUP}/RITMO COPA/2.jpg` },
  { name: "Ritmo Copa 3",  mockupFile: `${BASE_MOCKUP}/RITMO COPA/3.jpg` },
  { name: "Ritmo Copa 4",  mockupFile: `${BASE_MOCKUP}/RITMO COPA/4.png` },
  { name: "Ritmo Copa 5",  mockupFile: `${BASE_MOCKUP}/RITMO COPA/5.png` },
  { name: "Ritmo Copa 6",  mockupFile: `${BASE_MOCKUP}/RITMO COPA/6.png` },
  { name: "Ritmo Copa 7",  mockupFile: `${BASE_MOCKUP}/RITMO COPA/7.png` },
  { name: "Ritmo Copa 8",  mockupFile: `${BASE_MOCKUP}/RITMO COPA/8.png` },
  { name: "Ritmo Copa 9",  mockupFile: `${BASE_MOCKUP}/RITMO COPA/9.png` },
  { name: "Ritmo Copa 10", mockupFile: `${BASE_MOCKUP}/RITMO COPA/10.png` },
  { name: "Ritmo Copa 11", mockupFile: `${BASE_MOCKUP}/RITMO COPA/11.png` },
  { name: "Ritmo Copa 12", mockupFile: `${BASE_MOCKUP}/RITMO COPA/12.jpg` },
  // SELEÇÃO
  { name: "Seleção 1",  mockupFile: `${BASE_MOCKUP}/SELEÇÃO/1.png` },
  { name: "Seleção 2",  mockupFile: `${BASE_MOCKUP}/SELEÇÃO/2.png` },
  { name: "Seleção 3",  mockupFile: `${BASE_MOCKUP}/SELEÇÃO/3.jpg` },
  { name: "Seleção 4",  mockupFile: `${BASE_MOCKUP}/SELEÇÃO/4.png` },
  { name: "Seleção 5",  mockupFile: `${BASE_MOCKUP}/SELEÇÃO/5.png` },
  { name: "Seleção 6",  mockupFile: `${BASE_MOCKUP}/SELEÇÃO/6.png` },
  { name: "Seleção 7",  mockupFile: `${BASE_MOCKUP}/SELEÇÃO/7.png` },
  { name: "Seleção 8",  mockupFile: `${BASE_MOCKUP}/SELEÇÃO/8.jpg` },
  { name: "Seleção 9",  mockupFile: `${BASE_MOCKUP}/SELEÇÃO/9.png` },
  { name: "Seleção 10", mockupFile: `${BASE_MOCKUP}/SELEÇÃO/10.jpg` },
  // IDENTIDADE
  { name: "Identidade 2", mockupFile: `${BASE_MOCKUP}/IDENTIDADE/2.jpg` },
  { name: "Identidade 3", mockupFile: `${BASE_MOCKUP}/IDENTIDADE/3.png` },
  { name: "Identidade 4", mockupFile: `${BASE_MOCKUP}/IDENTIDADE/4.jpg` },
  { name: "Identidade 5", mockupFile: `${BASE_MOCKUP}/IDENTIDADE/5.jpg` },
  { name: "Identidade 6", mockupFile: `${BASE_MOCKUP}/IDENTIDADE/6.jpg` },
  { name: "Identidade 7", mockupFile: `${BASE_MOCKUP}/IDENTIDADE/7.jpg` },
  { name: "Identidade 8", mockupFile: `${BASE_MOCKUP}/IDENTIDADE/8.jpg` },
].map((s) => ({ ...s, customMockup: true, products: DEFAULT_PRODUCTS }));

export const mockCategories = [
  { name: "Copa do Mundo", stamps: ALL_STAMPS },
  { name: "Brasil",        stamps: ALL_STAMPS },
];

export const mockCatalog = mockCategories.flatMap((cat) =>
  cat.stamps.map((s) => ({
    stamp: s.name,
    products: s.products.map((p) => ({ ...p, customMockup: s.customMockup })),
  }))
);

export const mockReport = {
  coletado_em: new Date().toISOString(),
  campanhas: mockCampaigns,
  conjuntos_de_anuncios: [],
  anuncios: [],
  insights_7_dias: mockInsights,
};
