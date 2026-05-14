interface Props {
  analise: string;
}

export default function AnalysisPanel({ analise }: Props) {
  // Converte markdown simples em HTML básico para exibição
  const linhas = analise.split("\n");

  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
        Análise — Claude
      </h2>
      <div className="text-sm text-zinc-300 space-y-2 overflow-y-auto max-h-[420px]">
        {linhas.map((linha, i) => {
          if (linha.startsWith("**") && linha.endsWith("**")) {
            return (
              <p key={i} className="font-bold text-white mt-4">
                {linha.replace(/\*\*/g, "")}
              </p>
            );
          }
          if (linha.startsWith("## ")) {
            return (
              <p key={i} className="font-bold text-yellow-400 mt-4 text-base">
                {linha.replace("## ", "")}
              </p>
            );
          }
          if (linha.trim() === "") return <div key={i} className="h-1" />;
          return <p key={i}>{linha}</p>;
        })}
      </div>
    </div>
  );
}
