"use client";

import { useState } from "react";
import { mockCatalog } from "@/lib/mockData";

const PRODUCT_TYPES = ["Camiseta", "Moletom", "Cropped", "Body Infantil"];

export default function CampaignsPage() {
  const [stampId, setStampId] = useState("");
  const [budget, setBudget] = useState("10");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["Camiseta"]);
  const [generated, setGenerated] = useState(false);

  const stamp = mockCatalog.find((s) => s.stamp === stampId);
  const availableTypes = stamp?.products.map((p) => p.type) ?? PRODUCT_TYPES;

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  const campaignName = stampId
    ? `Le Mott - ${stampId} - ${selectedTypes.join("+")} - R$${budget}/dia`
    : "";

  const cliCommands = stampId
    ? `# 1. Criar a campanha
meta ads campaign create \\
  --name "${campaignName}" \\
  --objective OUTCOME_SALES \\
  --status PAUSED

# 2. Criar o conjunto de anúncios (substituir CAMPAIGN_ID pelo ID retornado acima)
meta ads adset create \\
  --name "${stampId} - Público frio" \\
  --campaign-id CAMPAIGN_ID \\
  --daily-budget ${parseInt(budget) * 100} \\
  --billing-event IMPRESSIONS \\
  --optimization-goal OFFSITE_CONVERSIONS \\
  --status PAUSED

# 3. Criar o criativo (substituir PAGE_ID e usar o mockup da estampa)
meta ads creative create \\
  --name "${stampId} - Criativo" \\
  --page-id PAGE_ID \\
  --image ./mockups/${stampId.toLowerCase().replace(/ /g, "_")}.jpg

# 4. Criar o anúncio (substituir ADSET_ID e CREATIVE_ID)
meta ads ad create \\
  --name "${stampId} - Anúncio 1" \\
  --adset-id ADSET_ID \\
  --creative-id CREATIVE_ID \\
  --status PAUSED

# 5. Ativar quando estiver tudo conferido
# meta ads campaign update CAMPAIGN_ID --status ACTIVE`
    : "";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Criador de Campanhas</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Configure sua campanha — o sistema gera os comandos prontos para rodar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 flex flex-col gap-5">

          {/* Estampa */}
          <div>
            <label className="text-xs text-zinc-400 mb-1.5 block font-medium">Selecionar estampa</label>
            <select
              value={stampId}
              onChange={(e) => { setStampId(e.target.value); setSelectedTypes(["Camiseta"]); setGenerated(false); }}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
            >
              <option value="">— escolha uma estampa —</option>
              {mockCatalog.map((s) => (
                <option key={s.stamp} value={s.stamp}>{s.stamp}</option>
              ))}
            </select>
            <p className="text-xs text-zinc-600 mt-1">Quando conectado à Meta, listará seu catálogo real.</p>
          </div>

          {/* Tipos de produto */}
          <div>
            <label className="text-xs text-zinc-400 mb-1.5 block font-medium">Produtos a incluir</label>
            <div className="flex flex-wrap gap-2">
              {availableTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    selectedTypes.includes(type)
                      ? "bg-white text-zinc-950 border-white"
                      : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {selectedTypes.length > 1 && (
              <p className="text-xs text-yellow-400 mt-2">
                💡 Dica: começar só com Camiseta ajuda a identificar o que converte antes de ampliar.
              </p>
            )}
          </div>

          {/* Orçamento */}
          <div>
            <label className="text-xs text-zinc-400 mb-1.5 block font-medium">
              Orçamento diário: <span className="text-white">R$ {budget}</span>
            </label>
            <input
              type="range" min="10" max="200" step="5"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full accent-white"
            />
            <div className="flex justify-between text-xs text-zinc-600 mt-1">
              <span>R$ 10</span><span>R$ 200</span>
            </div>
          </div>

          {/* Recomendação */}
          <div className="bg-zinc-800 rounded-lg p-3 text-xs text-zinc-300">
            <p className="font-medium text-white mb-1">Recomendação do sistema</p>
            {!stampId
              ? "Selecione uma estampa para receber a recomendação."
              : selectedTypes.length === 1 && selectedTypes[0] === "Camiseta"
              ? "✅ Ótima escolha — começar com camiseta isola a variável e facilita a análise."
              : "⚠️ Com vários tipos de produto fica difícil saber qual item está convertendo. Considere começar só com camisetas."}
          </div>

          <button
            disabled={!stampId || selectedTypes.length === 0}
            onClick={() => setGenerated(true)}
            className="bg-white text-zinc-950 font-semibold py-2.5 rounded-lg text-sm hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            🚀 Gerar comandos da campanha
          </button>
        </div>

        {/* Comandos gerados */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h3 className="text-sm font-semibold text-zinc-400 mb-4">Comandos gerados</h3>
          {!generated || !stampId ? (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-600 text-sm text-center">
              <p className="text-3xl mb-3">🖥️</p>
              <p>Configure a campanha e clique</p>
              <p>em "Gerar comandos"</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-zinc-500 mb-3">
                Copie e rode no terminal quando o token estiver configurado:
              </p>
              <pre className="bg-zinc-950 rounded-lg p-4 text-xs text-green-400 overflow-x-auto whitespace-pre-wrap leading-relaxed border border-zinc-800">
                {cliCommands}
              </pre>
              <p className="text-xs text-zinc-600 mt-3">
                A campanha começa pausada. Ative manualmente após revisar tudo.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
