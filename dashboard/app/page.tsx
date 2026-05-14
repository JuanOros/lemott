import { readFileSync, existsSync } from "fs";
import { join } from "path";
import MetricsGrid from "@/components/MetricsGrid";
import AnalysisPanel from "@/components/AnalysisPanel";
import CampaignTable from "@/components/CampaignTable";
import { mockReport } from "@/lib/mockData";

interface Insight {
  campaign_name?: string;
  adset_name?: string;
  spend?: string;
  clicks?: string;
  impressions?: string;
  ctr?: string;
  cpc?: string;
  conversions?: string;
  roas?: string;
}

function getReportData() {
  const reportPath = join(process.cwd(), "..", "analysis", "reports", "latest.json");
  if (!existsSync(reportPath)) return null;
  const raw = readFileSync(reportPath, "utf-8");
  return JSON.parse(raw);
}

export default function Home() {
  const report = getReportData();
  const usingMock = !report;

  const dados = report?.dados ?? mockReport;
  const analise =
    report?.analise ??
    `**Modo demonstração** — dados fictícios para visualização do painel.

Quando o token da Meta estiver configurado, este painel mostrará dados reais das suas campanhas.

**O que você verá aqui:**
- Performance real de cada campanha por estampa
- Qual tipo de peça (camisa, moletom, cropped) está convertendo mais
- CTR, ROAS e CPA atualizados dos últimos 7 dias
- Recomendações concretas de o que escalar ou pausar

**Para ativar:** preencha o arquivo .env com seu ACCESS_TOKEN e AD_ACCOUNT_ID, depois rode:
cd analysis && python3.12 analyze.py`;

  const insights: Insight[] = dados.insights_7_dias || [];

  const totalGasto = insights.reduce((sum, i) => sum + parseFloat(i.spend || "0"), 0);
  const totalCliques = insights.reduce((sum, i) => sum + parseInt(i.clicks || "0"), 0);
  const totalImpressoes = insights.reduce((sum, i) => sum + parseInt(i.impressions || "0"), 0);
  const totalConversoes = insights.reduce((sum, i) => sum + parseInt(i.conversions || "0"), 0);
  const ctrMedio = totalImpressoes > 0 ? ((totalCliques / totalImpressoes) * 100).toFixed(2) : "0";
  const roasMedio =
    insights.filter((i) => parseFloat(i.roas || "0") > 0).length > 0
      ? (
          insights.reduce((sum, i) => sum + parseFloat(i.roas || "0"), 0) /
          insights.filter((i) => parseFloat(i.roas || "0") > 0).length
        ).toFixed(2)
      : "0";

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Painel de Performance</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Últimos 7 dias ·{" "}
            {usingMock ? (
              <span className="text-yellow-400">modo demonstração</span>
            ) : (
              <span className="text-green-400">
                Atualizado em {new Date(dados.coletado_em).toLocaleString("pt-BR")}
              </span>
            )}
          </p>
        </div>
        {usingMock && (
          <div className="bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs px-3 py-1.5 rounded-lg">
            Configure o .env para dados reais
          </div>
        )}
      </div>

      {/* Métricas */}
      <MetricsGrid
        gasto={totalGasto}
        cliques={totalCliques}
        impressoes={totalImpressoes}
        ctr={ctrMedio}
        conversoes={totalConversoes}
        roas={roasMedio}
        campanhas={dados.campanhas?.length || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <AnalysisPanel analise={analise} />
        <CampaignTable insights={insights} />
      </div>
    </div>
  );
}
