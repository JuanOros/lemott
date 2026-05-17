import { mockCatalog } from "@/lib/mockData";

export default function CatalogPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Organizador de Catálogo</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Seus produtos agrupados por estampa — veja o que tem mockup personalizado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCatalog.map((stamp) => {
          const comMockup = stamp.products.filter((p) => p.customMockup).length;
          const total = stamp.products.length;

          return (
            <div key={stamp.stamp} className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
              {/* Header da estampa */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white">{stamp.stamp}</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">{total} produtos</p>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${
                      comMockup === total
                        ? "border-green-500/40 text-green-400 bg-green-400/10"
                        : comMockup > 0
                        ? "border-yellow-500/40 text-yellow-400 bg-yellow-400/10"
                        : "border-zinc-700 text-zinc-500 bg-zinc-800"
                    }`}
                  >
                    {comMockup}/{total} mockups próprios
                  </span>
                </div>
              </div>

              {/* Lista de produtos */}
              <div className="flex flex-col gap-2">
                {stamp.products.map((product) => (
                  <div
                    key={product.type}
                    className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {product.type === "Camiseta" ? "👕" :
                         product.type === "Moletom" ? "🧥" :
                         product.type === "Cropped" ? "✂️" : "👶"}
                      </span>
                      <span className="text-sm text-zinc-300">{product.type}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        product.customMockup
                          ? "bg-green-400/10 text-green-400"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                    >
                      {product.customMockup ? "mockup próprio" : "mockup padrão"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Ação */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex gap-2">
                <button className="text-xs text-zinc-400 hover:text-white transition-colors">
                  Ver produtos →
                </button>
                <span className="text-zinc-700">·</span>
                <button className="text-xs text-zinc-400 hover:text-white transition-colors">
                  Criar campanha →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-zinc-900 rounded-xl border border-zinc-800 p-4 text-sm text-zinc-400">
        <p className="font-medium text-zinc-300 mb-1">Quando conectado à Meta</p>
        <p>Esta seção listará todas as estampas do seu catálogo real, com performance individual de cada produto por estampa.</p>
      </div>
    </div>
  );
}
