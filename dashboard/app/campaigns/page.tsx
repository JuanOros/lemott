"use client";

import { useState } from "react";
import { mockCategories } from "@/lib/mockData";

export default function CampaignsPage() {
  const [categoryName, setCategoryName] = useState("");
  const [selectedStamps, setSelectedStamps] = useState<string[]>([]);
  const [budget, setBudget] = useState("10");
  const [generated, setGenerated] = useState(false);

  const category = mockCategories.find((c) => c.name === categoryName);

  function handleCategoryChange(name: string) {
    setCategoryName(name);
    const cat = mockCategories.find((c) => c.name === name);
    setSelectedStamps(cat ? cat.stamps.map((s) => s.name) : []);
    setGenerated(false);
  }

  function toggleStamp(name: string) {
    setSelectedStamps((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  const activeStamps = category?.stamps.filter((s) =>
    selectedStamps.includes(s.name)
  ) ?? [];

  const campaignName = categoryName
    ? `Le Mott - ${categoryName} - R$${budget}/dia`
    : "";

  function buildCommands() {
    const lines: string[] = [];

    lines.push(`# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# CAMPANHA: ${campaignName}
# ${activeStamps.length} estampa(s) => ${activeStamps.length} anuncio(s)
# Estrategia: 1 campanha . 1 publico amplo . Meta distribui
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

    lines.push(`# PASSO 1 - Criar a campanha
meta ads campaign create \\
  --name "${campaignName}" \\
  --objective OUTCOME_SALES \\
  --status PAUSED
# => Salve o ID retornado como CAMPAIGN_ID
`);

    lines.push(`# PASSO 2 - Criar conjunto de anuncios (publico amplo, Meta otimiza)
meta ads adset create \\
  --name "${categoryName} - Publico Amplo" \\
  --campaign-id CAMPAIGN_ID \\
  --daily-budget ${parseInt(budget) * 100} \\
  --billing-event IMPRESSIONS \\
  --optimization-goal OFFSITE_CONVERSIONS \\
  --targeting '{"geo_locations":{"countries":["BR"]},"age_min":18,"age_max":65}' \\
  --status PAUSED
# => Salve o ID retornado como ADSET_ID
`);

    lines.push(`# PASSO 3 - Criar um criativo e um anuncio para cada estampa`);

    activeStamps.forEach((stamp, i) => {
      const mockupPath = stamp.mockupFile;
      lines.push(`
# Estampa ${i + 1}: ${stamp.name}${stamp.customMockup ? " (mockup proprio)" : " (mockup padrao)"}
meta ads creative create \\
  --name "${stamp.name} - Criativo" \\
  --page-id PAGE_ID \\
  --image ${mockupPath}
# => Salve como CREATIVE_ID_${i + 1}

meta ads ad create \\
  --name "${stamp.name} - Anuncio" \\
  --adset-id ADSET_ID \\
  --creative-id CREATIVE_ID_${i + 1} \\
  --status PAUSED`);
    });

    lines.push(`

# PASSO 4 - Revisar no Gerenciador de Anuncios e ativar
# meta ads campaign update CAMPAIGN_ID --status ACTIVE`);

    return lines.join("\n");
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Criador de Campanhas</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Escolha uma categoria de estampas — o sistema monta a campanha completa com um anuncio por estampa
        </p>
      </div>

      {/* Estrategia */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6 flex gap-4 items-start">
        <span className="text-xl mt-0.5">💡</span>
        <div className="text-sm text-zinc-300 space-y-1">
          <p className="font-semibold text-white">Estrategia: 1 campanha por categoria, Meta distribui</p>
          <p>Uma campanha com publico amplo e varios criativos (um por estampa). O Meta aprende sozinho quem compra camisa, moletom ou body — voce nao precisa decidir isso.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulario */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 flex flex-col gap-5">

          {/* Categoria */}
          <div>
            <label className="text-xs text-zinc-400 mb-1.5 block font-medium">Categoria de estampas</label>
            <select
              value={categoryName}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
            >
              <option value="">— escolha uma categoria —</option>
              {mockCategories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name} ({cat.stamps.length} estampas)
                </option>
              ))}
            </select>
            <p className="text-xs text-zinc-600 mt-1">Quando conectado a Meta, listara suas categorias reais do catalogo.</p>
          </div>

          {/* Estampas */}
          {category && (
            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block font-medium">
                Estampas incluidas ({selectedStamps.length}/{category.stamps.length})
              </label>
              <div className="flex flex-col gap-2">
                {category.stamps.map((stamp) => {
                  const selected = selectedStamps.includes(stamp.name);
                  return (
                    <button
                      key={stamp.name}
                      onClick={() => toggleStamp(stamp.name)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs border transition-colors text-left ${
                        selected
                          ? "bg-zinc-800 border-zinc-600 text-white"
                          : "bg-transparent border-zinc-800 text-zinc-500"
                      }`}
                    >
                      <span>{stamp.name}</span>
                      <span className={stamp.customMockup ? "text-green-400" : "text-zinc-600"}>
                        {stamp.customMockup ? "mockup proprio" : "mockup padrao"}
                      </span>
                    </button>
                  );
                })}
              </div>
              {selectedStamps.length === 0 && (
                <p className="text-xs text-red-400 mt-2">Selecione pelo menos uma estampa.</p>
              )}
            </div>
          )}

          {/* Orcamento */}
          <div>
            <label className="text-xs text-zinc-400 mb-1.5 block font-medium">
              Orcamento diario: <span className="text-white">R$ {budget}</span>
            </label>
            <input
              type="range" min="10" max="200" step="5"
              value={budget}
              onChange={(e) => { setBudget(e.target.value); setGenerated(false); }}
              className="w-full accent-white"
            />
            <div className="flex justify-between text-xs text-zinc-600 mt-1">
              <span>R$ 10</span>
              <span>R$ 200</span>
            </div>
            {activeStamps.length > 1 && (
              <p className="text-xs text-zinc-500 mt-1">
                O Meta distribui o orcamento automaticamente entre os anuncios.
              </p>
            )}
          </div>

          {/* Resumo */}
          {category && selectedStamps.length > 0 && (
            <div className="bg-zinc-800 rounded-lg p-3 text-xs text-zinc-300 space-y-1">
              <p className="font-medium text-white">Resumo</p>
              <p>1 campanha · 1 conjunto · <span className="text-white">{activeStamps.length} anuncios</span></p>
              <p>Publico: Brasil, 18–65 anos, sem filtros</p>
              <p>Objetivo: Vendas (conversao via pixel)</p>
              <p>Orcamento: R$ {budget}/dia distribuido pelo Meta</p>
            </div>
          )}

          <button
            disabled={!categoryName || selectedStamps.length === 0}
            onClick={() => setGenerated(true)}
            className="bg-white text-zinc-950 font-semibold py-2.5 rounded-lg text-sm hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Gerar comandos da campanha
          </button>
        </div>

        {/* Comandos */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h3 className="text-sm font-semibold text-zinc-400 mb-4">Comandos gerados</h3>
          {!generated || !categoryName || selectedStamps.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-600 text-sm text-center">
              <p className="text-3xl mb-3">🖥️</p>
              <p>Configure a campanha e clique</p>
              <p>em "Gerar comandos"</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-zinc-500 mb-3">
                Cole no terminal quando o token estiver configurado:
              </p>
              <pre className="bg-zinc-950 rounded-lg p-4 text-xs text-green-400 overflow-x-auto whitespace-pre-wrap leading-relaxed border border-zinc-800 max-h-[480px] overflow-y-auto">
                {buildCommands()}
              </pre>
              <p className="text-xs text-zinc-600 mt-3">
                Campanha comeca pausada. Revise no Gerenciador antes de ativar.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
