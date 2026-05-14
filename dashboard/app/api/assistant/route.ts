import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  const systemPrompt = `Você é o assistente de performance e diretor criativo da Le Mott.

**Sobre a Le Mott:**
- Marca brasileira de roupas inspirada na escrita e elegância francesa
- Nome vem do francês "mots" (palavras) — traduz sentimentos em forma de roupa
- Produtos: camisetas, moletons, croppeds, bodies infantis (print on demand via Reserva Ink)
- Preço: R$ 129,90 por peça
- Foco atual: Copa do Mundo 2026, futebol, cultura brasileira
- Também trabalha com: frases de torcida, humor cotidiano, cultura latina, animais no contexto esportivo
- Tom: descontraído, emocional, próximo — conversa entre amigos, nunca corporativo

**Sobre o negócio:**
- Dono: Juan, iniciante em marketing digital
- Estratégia: testes rápidos com R$ 10/dia, público frio, deixa o Meta otimizar
- Métricas prioritárias: ROAS, CPA, CTR, Conversão
- Dúvida principal: não sabe identificar qual produto/estampa está convertendo melhor

**Seu papel:**
- Analisar performance quando receber dados
- Sugerir copies alinhados à identidade da marca
- Dar ideias de estampas baseadas em Copa/cultura brasileira
- Recomendar quando escalar ou pausar em linguagem simples
- Responder em português, tom descontraído

Seja direto e prático. Use formatação com negrito e listas quando ajudar na clareza.`;

  const previousMessages = (history ?? []).map((m: { role: string; text: string }) => ({
    role: m.role as "user" | "assistant",
    content: m.text,
  }));

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1000,
    system: systemPrompt,
    messages: [...previousMessages, { role: "user", content: message }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  return NextResponse.json({ result: text });
}
