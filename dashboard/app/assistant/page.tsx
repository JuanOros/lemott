"use client";

import { useState } from "react";

const SUGESTOES_RAPIDAS = [
  "Que estampa nova eu deveria criar para a Copa 2026?",
  "Como estão minhas campanhas esta semana? O que devo pausar?",
  "Crie 3 copies para uma estampa de torcida no bar",
  "Qual público devo testar para a linha infantil?",
  "Me dê uma análise do meu ROAS e o que fazer para melhorar",
];

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg = { role: "user" as const, text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.result || data.error }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Erro ao conectar com o assistente." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Assistente de Decisão</h2>
        <p className="text-zinc-400 text-sm mt-1">
          Pergunte sobre suas campanhas, peça copies, ideias de estampa ou análise de performance
        </p>
      </div>

      {/* Sugestões rápidas */}
      {messages.length === 0 && (
        <div className="mb-6">
          <p className="text-xs text-zinc-500 mb-3 font-medium">SUGESTÕES RÁPIDAS</p>
          <div className="flex flex-col gap-2">
            {SUGESTOES_RAPIDAS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-left px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Histórico de mensagens */}
      {messages.length > 0 && (
        <div className="flex flex-col gap-4 mb-6 max-h-[500px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-white text-zinc-950"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-300"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
                <span className="text-sm text-zinc-500">Pensando...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 sticky bottom-0 bg-zinc-950 pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
          placeholder="Pergunte sobre suas campanhas, peça copies, ideias..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
          disabled={loading}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || loading}
          className="bg-white text-zinc-950 font-semibold px-5 py-3 rounded-xl text-sm hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
