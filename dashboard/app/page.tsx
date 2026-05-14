import { readFileSync, existsSync } from "fs";
import { join } from "path";
import MetricsGrid from "@/components/MetricsGrid";
import AnalysisPanel from "@/components/AnalysisPanel";
import CampaignTable from "@/components/CampaignTable";

interface Insight {
  campaign_name?: string;
  adset_name?: string;
  spend?: string;
  clicks?: string;
  impressions?: string;
  ctr?: string;
  cpc?: string;
  conversions?: string;
}

function getReportData() {
  const reportPath = join(process.cwd(), "..", "analysis", "reports", "latest.json");
  if (!existsSync(reportPath)) return null;
  const raw = readFileSync(reportPath, "utf-8");
  return JSON.parse(raw);
}

export default function Home() {
  const report = getReportData();

  if (!report) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Le Mott — Painel de Anúncios</h1>
          <p className="text-zinc-400 mb-6">Nenhum relatório encontrado ainda.</p>
          <code className="bg-zinc-800 px-4 py-2 rounded text-green-400 text-sm">
            cd analysis && python3.12 analyze.py
          </code>
          <p className="text-zinc-500 text-sm mt-4">
            Rode o script acima para gerar o primeiro relatório.
          </p>
        </div>
      </main>
    );
  }

  const { dados, analise } = report;
  const insights: Insight[] = dados.insights_7_dias || [];

  const totalGasto = insights.reduce(
    (sum: number, i: Insight) => sum + parseFloat(i.spend || "0"),
    0
  );
  const totalCliques = insights.reduce(
    (sum: number, i: Insight) => sum + parseInt(i.clicks || "0"),
    0
  );
  const totalImpressoes = insights.reduce(
    (sum: number, i: Insight) => sum + parseInt(i.impressions || "0"),
    0
  );
  const ctrMedio =
    totalImpressoes > 0
      ? ((totalCliques / totalImpressoes) * 100).toFixed(2)
      : "0";

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Le Mott</h1>
          <p className="text-zinc-400 mt-1">
            Painel de performance · Últimos 7 dias ·{" "}
            <span className="text-zinc-500 text-sm">
              Atualizado em{" "}
              {new Date(dados.coletado_em).toLocaleString("pt-BR")}
            </span>
          </p>
        </div>

        {/* Métricas principais */}
        <MetricsGrid
          gasto={totalGasto}
          cliques={totalCliques}
          impressoes={totalImpressoes}
          ctr={ctrMedio}
          campanhas={dados.campanhas?.length || 0}
          anuncios={dados.anuncios?.length || 0}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Análise do Claude */}
          <AnalysisPanel analise={analise} />

          {/* Tabela de campanhas */}
          <CampaignTable insights={insights} />
        </div>
      </div>
    </main>
  );
}
