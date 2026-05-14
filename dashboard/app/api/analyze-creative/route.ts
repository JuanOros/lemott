import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("image") as File | null;
  const stampName = formData.get("stampName") as string ?? "";
  const productType = formData.get("productType") as string ?? "camiseta";

  if (!file) {
    return NextResponse.json({ error: "Nenhuma imagem enviada." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const mediaType = (file.type as "image/jpeg" | "image/png" | "image/webp" | "image/gif") || "image/jpeg";

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1200,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: { type: "base64", media_type: mediaType, data: base64 },
          },
          {
            type: "text",
            text: `Você é o diretor criativo da Le Mott — uma marca brasileira de roupas com alma francesa.

O nome "Lemott" vem do francês "mots" (palavras). A marca traduz sentimentos e cultura em forma de roupa.
Identidade: minimalismo, humor brasileiro, futebol, bar, churrasco, Copa do Mundo, cultura popular.
Tom: descontraído, emocional, próximo — conversa entre amigos, nunca corporativo.

Esta é uma imagem de mockup de ${productType} com a estampa "${stampName || "sem nome definido"}".

Analise a imagem e crie 3 opções de copy para anúncio no Instagram/Meta. Cada copy deve ter:
- **Gancho** (1 linha que para o scroll — pode ser emoji, pergunta, frase impactante)
- **Corpo** (2-3 linhas que conectam emocionalmente)
- **CTA** (chamada para ação simples e direta)

Depois sugira:
- **Público ideal** para este criativo (faixa etária, interesses)
- **Formato recomendado** (imagem estática, carrossel ou vídeo)
- **Uma ideia de estampa complementar** que poderia ser testada junto

Responda em português, no tom da marca.`,
          },
        ],
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  return NextResponse.json({ result: text });
}
