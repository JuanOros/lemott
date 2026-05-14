interface Props {
  gasto: number;
  cliques: number;
  impressoes: number;
  ctr: string;
  campanhas: number;
  anuncios: number;
}

export default function MetricsGrid({ gasto, cliques, impressoes, ctr, campanhas, anuncios }: Props) {
  const metricas = [
    { label: "Gasto total", valor: `R$ ${gasto.toFixed(2)}`, cor: "text-red-400" },
    { label: "Cliques", valor: cliques.toLocaleString("pt-BR"), cor: "text-blue-400" },
    { label: "Impressões", valor: impressoes.toLocaleString("pt-BR"), cor: "text-purple-400" },
    { label: "CTR médio", valor: `${ctr}%`, cor: "text-yellow-400" },
    { label: "Campanhas ativas", valor: campanhas, cor: "text-green-400" },
    { label: "Anúncios", valor: anuncios, cor: "text-zinc-300" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {metricas.map((m) => (
        <div key={m.label} className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-zinc-500 text-xs mb-1">{m.label}</p>
          <p className={`text-xl font-bold ${m.cor}`}>{m.valor}</p>
        </div>
      ))}
    </div>
  );
}
