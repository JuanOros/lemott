"use client";

import { useState, useRef } from "react";

export default function StudioPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [stampName, setStampName] = useState("");
  const [productType, setProductType] = useState("camiseta");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setPreview(URL.createObjectURL(file));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  const instrucao = stampName
    ? `Analise este mockup da estampa "${stampName}" (${productType}) da Le Mott. Sugira 3 copies prontos para anunciar no Meta, o público ideal e o melhor formato (imagem ou carrossel). Considere a identidade da marca: humor brasileiro, futebol, cultura latina, tom descontraído.`
    : `Analise este mockup (${productType}) da Le Mott. Sugira 3 copies prontos para anunciar no Meta, o público ideal e o melhor formato de anuncio.`;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Estudio de Criativos</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Visualize o mockup e gere copies diretamente no Claude Code — sem custo extra
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload para preview */}
        <div className="flex flex-col gap-4">
          <div
            className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center cursor-pointer hover:border-zinc-500 transition-colors relative"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
          >
            {preview ? (
              <img src={preview} alt="mockup" className="max-h-64 mx-auto rounded-lg object-contain" />
            ) : (
              <div className="text-zinc-500">
                <p className="text-4xl mb-3">🖼️</p>
                <p className="font-medium text-zinc-300">Arraste o mockup aqui para visualizar</p>
                <p className="text-sm mt-1">ou clique para selecionar</p>
                <p className="text-xs mt-3 text-zinc-600">PNG, JPG ou WEBP</p>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </div>

          {/* Campos */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Nome da estampa (opcional)</label>
              <input
                type="text"
                placeholder="Ex: Copa 2026 - Bandeira"
                value={stampName}
                onChange={(e) => setStampName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1 block">Tipo de produto</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-500"
              >
                <option value="camiseta">Camiseta</option>
                <option value="moletom">Moletom</option>
                <option value="cropped">Cropped</option>
                <option value="body infantil">Body Infantil</option>
              </select>
            </div>
          </div>
        </div>

        {/* Instrucoes Claude Code */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 flex flex-col gap-5">
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 mb-1">Como gerar copies</h3>
            <p className="text-xs text-zinc-500">
              O Claude Code analisa diretamente — sem custo de API
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className="text-zinc-500 font-mono text-xs mt-0.5">1</span>
              <p className="text-sm text-zinc-300">
                Salve o mockup na pasta <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-xs text-zinc-200">mockups/</code> na raiz do projeto
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-zinc-500 font-mono text-xs mt-0.5">2</span>
              <p className="text-sm text-zinc-300">
                Abra o terminal com Claude Code rodando
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-zinc-500 font-mono text-xs mt-0.5">3</span>
              <p className="text-sm text-zinc-300">
                Cole o texto abaixo no chat do Claude
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-700 rounded-lg p-4">
            <p className="text-xs text-zinc-500 mb-2 font-medium">COPIE E COLE NO CLAUDE CODE:</p>
            <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">{instrucao}</p>
          </div>

          <p className="text-xs text-zinc-600">
            Dica: salve os mockups em subpastas por linha — <code className="bg-zinc-800 px-1 rounded">mockups/copa-2026/</code>, <code className="bg-zinc-800 px-1 rounded">mockups/brasil/</code> etc.
          </p>
        </div>
      </div>
    </div>
  );
}
