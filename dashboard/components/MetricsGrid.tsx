interface Props {
  gasto: number;
  cliques: number;
  impressoes: number;
  ctr: string;
  conversoes: number;
  roas: string;
  campanhas: number;
}

export default function MetricsGrid({ gasto, cliques, impressoes, ctr, conversoes, roas, campanhas }: Props) {
  const metricas = [
    { label: "Gasto total", valor: `R$ ${gasto.toFixed(2)}`, cor: "text-white", sub: "últimos 7 dias" },
    { label: "ROAS médio", valor: `${roas}x`, cor: parseFloat(roas) >= 3 ? "text-green-400" : "text-red-400", sub: "retorno por real gasto" },
    { label: "Conversões", valor: conversoes.toString(), cor: conversoes > 0 ? "text-green-400" : "text-zinc-500", sub: "vendas registradas" },
    { label: "CTR médio", valor: `${ctr}%`, cor: parseFloat(ctr) >= 2 ? "text-green-400" : parseFloat(ctr) >= 1 ? "text-yellow-400" : "text-red-400", sub: "taxa de clique" },
    { label: "Cliques", valor: cliques.toLocaleString("pt-BR"), cor: "text-blue-400", sub: "total de cliques" },
    { label: "Impressões", valor: impressoes.toLocaleString("pt-BR"), cor: "text-purple-400", sub: `${campanhas} campanhas` },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {metricas.map((m) => (
        <div key={m.label} className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-zinc-500 text-xs mb-2">{m.label}</p>
          <p className={`text-xl font-bold ${m.cor}`}>{m.valor}</p>
          <p className="text-zinc-600 text-xs mt-1">{m.sub}</p>
        </div>
      ))}
    </div>
  );
}
