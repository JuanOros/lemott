# CLAUDE.md — Memória do Projeto Le Mott

Este arquivo é lido automaticamente pelo Claude Code a cada sessão.
Contém tudo que é necessário para continuar o desenvolvimento sem perder contexto.

---

## 1. Quem é o dono

**Juan** — iniciante em programação, dono da Le Mott.
Tem afinidade com TypeScript, Next.js, Docker e Python, mas ainda está aprendendo.
Tem suporte esporádico do irmão (nível intermediário).

**Como trabalhar com ele:**
- Explicar passos de forma clara e sequencial
- Confirmar pré-requisitos antes de avançar
- Preferir soluções simples que ele consiga entender e rodar sozinho
- Não usar jargão sem explicar

---

## 2. A marca — Le Mott

Loja de camisetas e produtos com forte identidade cultural, emocional e visual.

**Foco:** Copa do Mundo, futebol, cultura brasileira, frases de torcida, humor cotidiano.

**Proposta:** não é só camisa de futebol — é identificação, nostalgia, resenha, personalidade e cultura popular.

**Identidade visual:**
- Minimalismo
- Humor brasileiro
- Estética de bar, rua, futebol raiz
- Churrasco, sofá vendo jogo, torcida
- Animais e elementos brasileiros (orelhão, churrasqueira, chinelo, vuvuzela, futebol de rua)
- Referências culturais sutis, memes e frases populares ligadas ao futebol

**Linhas de produto:**
- Copa do Mundo
- Brasil / identidade brasileira
- Frases de torcida
- Humor cotidiano
- Cultura latina
- Animais em contexto futebolístico
- Lifestyle de assistir jogo com amigos

**Tom de comunicação:** descontraído, emocional, próximo, simples — conversa entre amigos, sem aparência corporativa.

---

## 3. Modelo de negócio

**Plataforma:** Reserva Ink (print on demand) — produtos só são produzidos quando vendidos.

**Preço base:** R$ 129,90 por peça.

**Fluxo de criação de produto:**
1. Cria estampa com ChatGPT + Canva
2. Aplica numa camiseta, varia cores baseado na cor da roupa
3. Coloca em 1 ou mais categorias
4. **Clona** a mesma estampa para todos os outros produtos: moletom, cropped, body infantil, etc.
5. Isso gera um volume grande de produtos por estampa — é intencional

**Base estratégica:** A camisa é o produto principal. Os outros produtos são derivados.

**Mockups:** A plataforma oferece mockups prontos. Mockups próprios têm mais valor — para alguns produtos ele cria os seus. Mockups personalizados têm prioridade nos anúncios.

---

## 4. Fluxo atual de anúncios

1. Catálogo de produtos está conectado ao Meta via API/tokens
2. Seleciona uma categoria de produtos para anunciar (entra tudo: camisa, moletom, body infantil da mesma estampa)
3. Cria campanha com 3 níveis: campanha → conjunto de anúncios → anúncio
4. Configurações básicas, começa com **R$ 10/dia**
5. Público frio, sem filtros — deixa o Meta otimizar
6. Também impulsa posts no Instagram profissional como estratégia de tráfego

**Formatos usados:** imagem estática ou carrossel. Está tentando fazer vídeos com IA.

**Métricas prioritárias:** ROAS, CPA, CTR, Conversão.

**Lógica atual:** "se tiver vendendo, está bem". Quer evoluir para análise mais profunda.

---

## 5. Dúvidas estratégicas (o sistema deve ajudar a responder)

1. **Organização por estampa vs produto:** faz sentido mostrar todos os produtos de uma estampa no mesmo anúncio? Ou melhor mostrar diferentes estampas na mesma categoria de produto?

2. **Qual item converte:** dentro de uma campanha de categoria, não sabe se é a camisa, o moletom ou o body que está vendendo mais.

3. **Segmentação:** público amplo (inclui infantil e adulto, masculino e feminino). É a melhor estratégia ou deveria segmentar por linha?

4. **Quando escalar:** não tem critério claro. O sistema deve dar esse gatilho com base nos dados.

---

## 6. Objetivo do sistema

Conectar Claude ao ecossistema de anúncios da Meta para atuar como **diretor criativo + analista de performance automatizado** da Le Mott.

**Poderes do sistema:**
- Analisar performance de campanhas por estampa
- Identificar qual tipo de peça converte melhor
- Sugerir copies baseados no histórico de o que converte
- Criar campanhas, conjuntos, criativos e anúncios via Meta Ads CLI
- Gerenciar catálogo e grupos de produtos
- Upload de mockups (imagem ou vídeo) → Claude sugere copy → publica na Meta
- Decidir quando escalar ou pausar em linguagem simples

---

## 7. Arquitetura do sistema

```
LEMOTT/
├── CLAUDE.md                  ← este arquivo (memória do projeto)
├── .env.example               ← variáveis necessárias (não commitar .env)
├── .gitignore
├── analysis/
│   ├── analyze.py             ← script Python: puxa dados Meta + analisa com Claude
│   └── reports/               ← relatórios gerados (latest.json lido pelo dashboard)
└── dashboard/                 ← Next.js (TypeScript + Tailwind)
    ├── app/
    │   └── page.tsx           ← página principal do painel
    └── components/
        ├── MetricsGrid.tsx    ← métricas ROAS, CPA, CTR, conversão
        ├── AnalysisPanel.tsx  ← análise gerada pelo Claude
        └── CampaignTable.tsx  ← tabela de campanhas ordenada por gasto
```

**Stack técnica:**
- Python 3.12 — scripts de análise e integração com Meta Ads CLI
- Next.js (TypeScript) + Tailwind — dashboard visual
- Meta Ads CLI (`meta ads`) — interface com a API de Marketing da Meta
- Anthropic SDK (Claude) — análise inteligente dos dados
- Reserva Ink API — catálogo de produtos (a ser integrado)

**Variáveis de ambiente necessárias (.env):**
```
ACCESS_TOKEN=        # token do usuário do sistema Meta
AD_ACCOUNT_ID=       # formato act_XXXXXXXXX
BUSINESS_ID=         # ID do portfólio empresarial Meta
ANTHROPIC_API_KEY=   # chave da API do Claude
```

---

## 8. Visão completa — 5 seções a construir

### Seção 1 — Painel de Performance *(iniciado)*
- Métricas gerais: ROAS, CPA, CTR, conversão, gasto
- Performance agrupada por estampa
- Qual tipo de peça converte mais por estampa
- Alerta: "essa campanha está queimando dinheiro — pause"

### Seção 2 — Estúdio de Criativos *(a construir)*
- Upload de mockup (imagem ou vídeo)
- Claude analisa a imagem + histórico de performance
- Sugere 3 copies prontos
- Publicação direta na Meta via CLI

### Seção 3 — Criador de Campanhas Inteligente *(a construir)*
- Seleção por estampa (não por categoria)
- Montagem automática do grupo de produtos
- Recomendação: "mostre só camisas" ou "mostre tudo"
- Criação de campanha + conjunto + anúncio com um clique
- Padrão: R$ 10/dia, público frio

### Seção 4 — Organizador de Catálogo *(a construir)*
- Visualização de produtos agrupados por estampa
- Indicação de quais têm mockup personalizado vs genérico
- Gerenciamento de grupos de produtos para campanhas

### Seção 5 — Assistente de Decisão Semanal *(a construir)*
- Lê os dados toda semana
- Entrega resumo simples: o que escalar, o que pausar, o que testar
- Sugere conceitos de estampa baseados em Copa/cultura brasileira

---

## 9. Boas práticas de Git (obrigatório)

- **Nunca** commitar direto na `main`
- Branch padrão de trabalho: `develop`
- Branches de feature: `feature/nome-da-feature`
- Branches de correção: `fix/nome-do-bug`
- Branches de configuração: `chore/nome-da-tarefa`
- Ao terminar: PR de `feature/xxx` → `develop`
- `main` só recebe merge de `develop` quando algo está estável e testado
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`

---

## 10. Status atual do projeto

- [x] Meta Ads CLI instalada e funcionando
- [x] Repositório GitHub criado: `JuanOros/lemott`
- [x] Branches `main` e `develop` configuradas
- [x] Script de análise Python (`analysis/analyze.py`)
- [x] Dashboard Next.js com painel de métricas básico
- [ ] Token de acesso da Meta (em andamento — usuário do sistema pendente)
- [ ] Integração .env com dados reais
- [ ] Seção 2: Estúdio de Criativos
- [ ] Seção 3: Criador de Campanhas Inteligente
- [ ] Seção 4: Organizador de Catálogo
- [ ] Seção 5: Assistente de Decisão Semanal

---

## 11. Próximo passo imediato

Configurar o token de acesso da Meta:
1. Criar app no portfólio Meta Business (feito)
2. Gerar token com permissões `ads_management` e `ads_read`
3. Copiar `.env.example` para `.env` e preencher
4. Rodar `cd analysis && python3.12 analyze.py` para testar

---

*Última atualização: 14/05/2026*
