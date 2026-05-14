"use client";

import { useState, useRef } from "react";

export default function StudioPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [stampName, setStampName] = useState("");
  const [productType, setProductType] = useState("camiseta");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult("");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  async function handleAnalyze() {
    if (!image) return;
    setLoading(true);
    setResult("");

    const form = new FormData();
    form.append("image", image);
    form.append("stampName", stampName);
    form.append("productType", productType);

    try {
      const res = await fetch("/api/analyze-creative", { method: "POST", body: form });
      const data = await res.json();
      setResult(data.result || data.error || "Erro inesperado.");
    } catch {
      setResult("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  const linhas = result.split("\n");

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Estúdio de Criativos</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Envie o mockup → Claude analisa e sugere 3 copies prontos para anunciar
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload */}
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
                <p className="font-medium text-zinc-300">Arraste o mockup aqui</p>
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
              <label className="text-xs text-zinc-400 mb-1 block">Nome da estampa</label>
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
            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="bg-white text-zinc-950 font-semibold py-2.5 rounded-lg text-sm hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Analisando..." : "✨ Gerar copies com Claude"}
            </button>
          </div>
        </div>

        {/* Resultado */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 min-h-[400px]">
          <h3 className="text-sm font-semibold text-zinc-400 mb-4">Sugestões do Claude</h3>
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-600 text-sm text-center">
              <p className="text-3xl mb-3">🤖</p>
              <p>Envie um mockup e clique em</p>
              <p>"Gerar copies" para começar</p>
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center h-64 text-zinc-400 text-sm">
              <div className="w-6 h-6 border-2 border-zinc-600 border-t-white rounded-full animate-spin mb-3" />
              <p>Claude está analisando sua estampa...</p>
            </div>
          )}
          {result && (
            <div className="text-sm text-zinc-300 space-y-1.5 overflow-y-auto max-h-[480px]">
              {linhas.map((linha, i) => {
                if (linha.startsWith("**") || linha.startsWith("##")) {
                  return (
                    <p key={i} className="font-bold text-white mt-4 first:mt-0">
                      {linha.replace(/\*\*/g, "").replace(/^##\s*/, "")}
                    </p>
                  );
                }
                if (linha.trim() === "") return <div key={i} className="h-2" />;
                return <p key={i}>{linha}</p>;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
