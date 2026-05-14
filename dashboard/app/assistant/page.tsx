"use client";

const EXEMPLOS = [
  { texto: "Que estampa nova eu deveria criar para a Copa 2026?", comando: 'Que estampa nova eu deveria criar para a Copa 2026? Considere a identidade da Le Mott: humor brasileiro, futebol raiz, cultura latina.' },
  { texto: "Como melhorar meu ROAS?", comando: 'Como posso melhorar meu ROAS nas campanhas da Le Mott? Contexto: produto print on demand, R$10/dia, público frio no Meta.' },
  { texto: "Crie 3 copies para estampa de torcida no bar", comando: 'Crie 3 copies prontos para anunciar uma estampa de torcida no bar. Tom descontraído, humor brasileiro, para Meta Ads (feed e stories).' },
  { texto: "Qual público testar para a linha infantil?", comando: 'Qual segmentação de público devo testar no Meta para a linha infantil da Le Mott (body infantil, camiseta kids)?' },
  { texto: "Quando devo escalar uma campanha?", comando: 'Quais são os critérios para eu saber quando escalar uma campanha no Meta? Meu orçamento inicial é R$10/dia.' },
];

export default function AssistantPage() {
  function copiar(texto: string) {
    navigator.clipboard.writeText(texto);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Assistente de Decisao</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Use o Claude Code diretamente no terminal — mais rapido e sem custo extra
        </p>
      </div>

      {/* Como usar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-zinc-300 mb-4">Como funciona</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <span className="bg-zinc-800 text-zinc-400 text-xs font-mono px-2 py-0.5 rounded mt-0.5">1</span>
            <p className="text-sm text-zinc-300">
              O terminal onde voce rodou <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-xs">npm run dev</code> ja esta com o Claude Code aberto
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-zinc-800 text-zinc-400 text-xs font-mono px-2 py-0.5 rounded mt-0.5">2</span>
            <p className="text-sm text-zinc-300">
              Copie qualquer exemplo abaixo e cole direto no chat do Claude
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-zinc-800 text-zinc-400 text-xs font-mono px-2 py-0.5 rounded mt-0.5">3</span>
            <p className="text-sm text-zinc-300">
              O Claude tem todo o contexto da Le Mott e responde com base nos seus dados reais
            </p>
          </div>
        </div>
      </div>

      {/* Exemplos */}
      <div>
        <p className="text-xs text-zinc-500 mb-3 font-medium">EXEMPLOS — CLIQUE PARA COPIAR</p>
        <div className="flex flex-col gap-3">
          {EXEMPLOS.map((ex) => (
            <button
              key={ex.texto}
              onClick={() => copiar(ex.comando)}
              className="text-left px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors group"
            >
              <span className="block font-medium mb-1">{ex.texto}</span>
              <span className="text-xs text-zinc-600 group-hover:text-zinc-500 transition-colors">
                Clique para copiar o prompt completo
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
        <p className="text-xs text-zinc-500">
          Dica: voce tambem pode mandar uma imagem diretamente no Claude Code.
          Salve o mockup em <code className="bg-zinc-800 px-1 rounded">mockups/</code> e diga: "Analise este mockup e sugira copies"
        </p>
      </div>
    </div>
  );
}
