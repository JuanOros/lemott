# CLAUDE.md — Memória do Projeto Le Mott

Este arquivo é lido automaticamente pelo Claude Code a cada sessão.
Contém tudo que é necessário para continuar o desenvolvimento sem perder contexto.

> **Regra obrigatória:** a cada alteração de código, atualizar este arquivo se necessário — status, arquitetura, decisões tomadas.

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

**Instagram:** [@lemott.co](https://www.instagram.com/lemott.co/)
**Loja:** [lemott.com.br/lemott](https://www.lemott.com.br/lemott)
**Suporte ao cliente:** WhatsApp pessoal do Juan

### Identidade e origem da marca

> "Inspirada na escrita e na elegância francesa, a Lemott nasceu para traduzir sentimentos em forma de roupa.
> Cada peça carrega o encanto de palavras que são utilizadas no vocabulário de nossas culturas.
> Mais do que vestir, é um convite a viver com aquilo que nos identificamos e fazemos parte.
> Entre o traço da pena e o som das palavras, a Lemott celebra a arte de expressar-se.
> **Lemott — feita de alma, feita de mots.**"

**Origem do nome:** "Le" (artigo francês) + "mots" (francês para "palavras"). A marca é sobre **traduzir sentimentos e cultura em forma de roupa através das palavras**.

**Identidade central:** expressão, identificação cultural, palavras que representam quem somos.

**O futebol/Copa é uma linha de produto** — não a identidade central. A marca pode e deve crescer para outras expressões culturais.

### Identidade visual
- Minimalismo com alma
- Humor brasileiro
- Estética de bar, rua, futebol raiz
- Churrasco, sofá vendo jogo, torcida
- Animais e elementos brasileiros (orelhão, churrasqueira, chinelo, vuvuzela, futebol de rua)
- Referências culturais sutis, memes e frases populares

### Linhas de produto
- Copa do Mundo *(foco atual de anúncios)*
- Brasil / identidade brasileira
- Frases de torcida
- Humor cotidiano
- Cultura latina
- Animais em contexto futebolístico
- Lifestyle de assistir jogo com amigos

### Tom de comunicação
Descontraído, emocional, próximo, simples — conversa entre amigos, sem aparência corporativa. Quando a linha é mais poética (francesa), o tom acompanha: elegante mas acessível.

---

## 3. Modelo de negócio

**Plataforma:** Reserva Ink (print on demand) — produtos só são produzidos quando vendidos.

**Preço base:** R$ 129,90 por peça.

**Fluxo de criação de produto:**
1. Cria estampa com ChatGPT + Canva
2. Aplica numa camiseta, varia cores baseado na cor da roupa
3. Coloca em 1 ou mais categorias
4. **Clona** a mesma estampa para todos os outros produtos: moletom, cropped, body infantil, etc.
5. Isso gera um volume grande de produtos por estampa — é intencional e não vai mudar

**Base estratégica:** A camisa é o produto principal — é nela que faz mockups personalizados. Os outros produtos são derivados.

**Mockups:** A plataforma oferece mockups prontos. Mockups próprios têm mais valor — para alguns produtos ele cria os seus. **Mockups personalizados têm prioridade nos anúncios.**

---

## 4. Fluxo atual de anúncios

1. Catálogo conectado ao Meta via API/tokens (já integrado)
2. Seleciona uma categoria de produtos para anunciar (entra tudo: camisa, moletom, body infantil da mesma estampa)
3. Cria campanha: campanha → conjunto de anúncios → anúncio
4. Configurações básicas, começa com **R$ 10/dia**
5. Público frio, sem filtros — deixa o Meta otimizar
6. Também impulsa posts no Instagram profissional como estratégia de tráfego

**Formatos usados:** imagem estática ou carrossel. Está tentando fazer vídeos com IA.

**Métricas prioritárias:** ROAS, CPA, CTR, Conversão.

**Lógica atual:** "se tiver vendendo, está bem". Quer evoluir para análise mais profunda.

---

## 5. Dúvidas estratégicas (o sistema deve ajudar a responder)

1. **Organização por estampa vs produto:** faz sentido mostrar todos os produtos de uma estampa no mesmo anúncio? Ou melhor mostrar diferentes estampas na mesma categoria de produto?

2. **Qual item converte:** dentro de uma campanha de categoria, não sabe se é a camisa, o moletom ou o body que está vendendo.

3. **Segmentação:** público muito amplo (inclui infantil e adulto, masculino e feminino). É a melhor estratégia ou deveria segmentar?

4. **Quando escalar:** não tem critério claro. O sistema deve dar esse gatilho com base nos dados.

---

## 6. Objetivo do sistema

Conectar Claude ao ecossistema de anúncios da Meta para atuar como **diretor criativo + analista de performance automatizado** da Le Mott.

**Poderes do sistema:**
- Analisar performance de campanhas por estampa
- Identificar qual tipo de peça converte melhor
- Sugerir copies baseados no histórico + identidade da marca
- Upload de mockup → Claude analisa → sugere copy → publica na Meta
- Criar campanhas, conjuntos, criativos e anúncios via Meta Ads CLI
- Gerenciar catálogo e grupos de produtos
- Decidir quando escalar ou pausar em linguagem simples

---

## 7. Arquitetura do sistema

```
LEMOTT/
├── CLAUDE.md                        ← memória permanente (atualizar sempre)
├── .env.example                     ← variáveis necessárias (não commitar .env)
├── .gitignore
├── analysis/
│   ├── analyze.py                   ← puxa dados Meta CLI + analisa com Claude
│   └── reports/                     ← relatórios gerados (latest.json → dashboard)
└── dashboard/                       ← Next.js (TypeScript + Tailwind)
    ├── app/
    │   ├── page.tsx                 ← Seção 1: Painel de Performance
    │   ├── studio/page.tsx          ← Seção 2: Estúdio de Criativos
    │   ├── campaigns/page.tsx       ← Seção 3: Criador de Campanhas
    │   ├── catalog/page.tsx         ← Seção 4: Organizador de Catálogo
    │   ├── assistant/page.tsx       ← Seção 5: Assistente de Decisão
    │   ├── layout.tsx               ← layout com sidebar de navegação
    │   └── api/
    │       ├── analyze-creative/    ← Claude analisa imagem e sugere copies
    │       └── create-campaign/     ← chama Meta CLI para criar campanha
    └── components/
        ├── Sidebar.tsx              ← navegação entre as 5 seções
        ├── MetricsGrid.tsx          ← métricas principais
        ├── AnalysisPanel.tsx        ← análise do Claude
        └── CampaignTable.tsx        ← tabela de campanhas
```

**Stack técnica:**
- Python 3.12 — scripts de análise e integração com Meta Ads CLI
- Next.js (TypeScript) + Tailwind — dashboard visual
- Meta Ads CLI (`meta ads`) — interface com a API de Marketing da Meta
- Anthropic SDK Python + Next.js — análise e sugestões inteligentes
- Reserva Ink (POD) — plataforma de produtos

**Variáveis de ambiente (.env):**
```
ACCESS_TOKEN=        # token do usuário do sistema Meta
AD_ACCOUNT_ID=       # formato act_XXXXXXXXX
BUSINESS_ID=         # ID do portfólio empresarial Meta
```

> Sem necessidade de ANTHROPIC_API_KEY — o Claude Code é usado diretamente no terminal.

---

## 8. Visão completa — 5 seções

### Seção 1 — Painel de Performance *(em construção)*
- Métricas: ROAS, CPA, CTR, conversão, gasto total
- Performance agrupada por estampa
- Qual tipo de peça converte mais por estampa
- Alerta: "essa campanha está queimando dinheiro — pause"

### Seção 2 — Estúdio de Criativos
- Preview do mockup no painel
- Gera prompt pronto para copiar e colar no Claude Code
- Mockups salvos em `mockups/` (pasta na raiz do projeto)
- Claude Code analisa diretamente — sem custo de API

### Seção 3 — Criador de Campanhas Inteligente *(em construção)*
- Seleção por estampa (não por categoria)
- Recomendação: "mostre só camisas" ou "mostre tudo"
- Gera comandos CLI para criar campanha + conjunto + anúncio
- Padrão: R$ 10/dia, público frio

### Seção 4 — Organizador de Catálogo *(em construção)*
- Produtos agrupados por estampa
- Indicação de mockup personalizado vs genérico
- Gerenciamento de grupos de produtos para campanhas

### Seção 5 — Assistente de Decisão
- Lista de prompts prontos para usar no Claude Code
- Clicar copia o prompt para a área de transferência
- O usuário cola direto no terminal do Claude Code — sem API

---

## 9. Boas práticas de Git (obrigatório em toda sessão)

- **Nunca** commitar direto na `main`
- Branch padrão de trabalho: `develop`
- Branches de feature: `feature/nome-da-feature`
- Branches de correção: `fix/nome-do-bug`
- Branches de configuração: `chore/nome-da-tarefa`
- Ao terminar: PR de `feature/xxx` → `develop`
- `main` só recebe merge de `develop` quando algo está estável
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- **Atualizar este CLAUDE.md** se a arquitetura ou status mudarem

---

## 10. Status atual do projeto

- [x] Meta Ads CLI instalada e funcionando (`meta ads --help`)
- [x] Python 3.12 instalado
- [x] Repositório GitHub: `JuanOros/lemott`
- [x] Branches `main` e `develop` configuradas
- [x] Script de análise Python (`analysis/analyze.py`)
- [x] Dashboard Next.js com painel de métricas completo (Seção 1)
- [x] CLAUDE.md com contexto completo (este arquivo)
- [x] GUIA.md com instruções de uso para o dono
- [x] Mock data realista para testar dashboard sem token
- [x] Sidebar de navegação entre as 5 seções
- [x] Seção 2: Estúdio de Criativos (preview + prompt para Claude Code)
- [x] Seção 3: Criador de Campanhas (gera comandos CLI prontos)
- [x] Seção 4: Organizador de Catálogo (produtos por estampa)
- [x] Seção 5: Assistente de Decisão (prompts prontos para Claude Code)
- [x] Pasta `mockups/` para organizar imagens por linha
- [x] Dashboard 100% gratuito — sem dependência de Anthropic API
- [x] Build Next.js 100% sem erros
- [ ] Token de acesso da Meta (usuário do sistema — pendente)
- [ ] `.env` preenchido com dados reais
- [ ] Primeiro teste real com `python3.12 analyze.py`

---

## 11. Próximo passo imediato

1. Gerar token na Meta (permissões `ads_management` e `ads_read`)
2. Copiar `.env.example` → `.env` e preencher com os dados da Meta
3. Rodar: `cd dashboard && npm run dev` → acessar http://localhost:3000
4. Rodar: `cd analysis && python3.12 analyze.py` (quando o token estiver pronto)

O Estúdio e o Assistente funcionam agora mesmo — basta usar o Claude Code no terminal.

---

*Última atualização: 14/05/2026*
