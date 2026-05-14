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

interface Props {
  insights: Insight[];
}

export default function CampaignTable({ insights }: Props) {
  if (!insights.length) {
    return (
      <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 flex items-center justify-center">
        <p className="text-zinc-500 text-sm">Nenhum insight disponível.</p>
      </div>
    );
  }

  // Ordena por gasto decrescente
  const ordenado = [...insights].sort(
    (a, b) => parseFloat(b.spend || "0") - parseFloat(a.spend || "0")
  );

  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
        Campanhas · últimos 7 dias
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-zinc-500 border-b border-zinc-800">
              <th className="pb-2 pr-4">Campanha</th>
              <th className="pb-2 pr-4 text-right">Gasto</th>
              <th className="pb-2 pr-4 text-right">Cliques</th>
              <th className="pb-2 text-right">CTR</th>
            </tr>
          </thead>
          <tbody>
            {ordenado.map((insight, i) => {
              const ctr = parseFloat(insight.ctr || "0");
              const ctrColor =
                ctr > 2 ? "text-green-400" : ctr > 1 ? "text-yellow-400" : "text-red-400";

              return (
                <tr
                  key={i}
                  className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800 transition-colors"
                >
                  <td className="py-2 pr-4 text-zinc-300 max-w-[180px] truncate">
                    {insight.campaign_name || "—"}
                  </td>
                  <td className="py-2 pr-4 text-right text-white">
                    R$ {parseFloat(insight.spend || "0").toFixed(2)}
                  </td>
                  <td className="py-2 pr-4 text-right text-zinc-300">
                    {parseInt(insight.clicks || "0").toLocaleString("pt-BR")}
                  </td>
                  <td className={`py-2 text-right font-medium ${ctrColor}`}>
                    {ctr.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
