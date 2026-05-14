# Guia de uso — Le Mott Ads

Como rodar e usar cada parte do sistema.

---

## Antes de comecar

Voce precisa de um arquivo preenchido:

**`/home/juan/Desktop/LEMOTT/.env`** (para o script Python):
```
ACCESS_TOKEN=seu_token_meta_aqui
AD_ACCOUNT_ID=act_XXXXXXXXX
BUSINESS_ID=XXXXXXXXX
```

> Onde conseguir: Meta Business Suite → Usuarios do sistema → Gerar token
> Permissoes necessarias: `ads_management` e `ads_read`

O dashboard roda **100% de graca** — sem chave Anthropic, sem custo extra.

---

## Como abrir o painel

1. Abra o terminal
2. Navegue ate a pasta do dashboard:
```bash
cd /home/juan/Desktop/LEMOTT/dashboard
```
3. Rode:
```bash
npm run dev
```
4. Abra o navegador em: **http://localhost:3000**

O painel abre com dados de demonstracao ate o token da Meta estar configurado.

---

## As 5 secoes

### Painel de Performance (pagina inicial)
Mostra as metricas dos seus anuncios: ROAS, CPA, CTR, conversoes, gasto total.

**Sem token Meta:** aparece com dados ficticios para voce ver como vai ficar.
**Com token Meta:** rode primeiro o script de analise (veja abaixo) e depois abra o painel.

---

### Estudio de Criativos
Visualize o mockup e gere copies usando o Claude Code diretamente.

**Como usar:**
1. (Opcional) Arraste a foto do mockup para visualizar no painel
2. Preencha o nome da estampa e tipo de produto
3. O painel gera o prompt pronto — copie e cole no Claude Code

**Fluxo recomendado:**
1. Salve o mockup em `mockups/` (ex: `mockups/copa-2026/bandeira.png`)
2. No Claude Code, diga: "Analise este mockup e sugira 3 copies para Meta Ads"
3. O Claude responde com copies, publico ideal e formato recomendado

---

### Campanhas
Monte a estrutura de uma campanha antes de publicar.

**Como usar:**
1. Clique em "Campanhas" na barra lateral
2. Selecione a estampa que quer anunciar
3. Escolha quais produtos incluir (dica: comece so com camiseta)
4. Ajuste o orcamento diario com o slider
5. Clique em "Gerar comandos da campanha"
6. Os comandos da Meta CLI aparecem prontos para copiar e rodar no terminal

> Sem token: os comandos ja sao gerados, mas so funcionam no terminal quando o token estiver configurado.

---

### Catalogo
Visualiza todos os seus produtos agrupados por estampa.

- Verde = tem mockup personalizado
- Amarelo = tem alguns com mockup proprio
- Cinza = so mockup padrao da plataforma

> Sem token Meta: exibe dados ficticios de exemplo.

---

### Assistente de Decisao
Lista de prompts prontos para usar no Claude Code.

**Como usar:**
1. Clique em qualquer exemplo para copiar o prompt
2. Cole no Claude Code (no terminal)
3. O Claude responde com base no contexto completo da Le Mott

---

## Como atualizar os dados do painel (com token Meta)

1. Abra o terminal
2. Rode o script de analise:
```bash
cd /home/juan/Desktop/LEMOTT/analysis
python3.12 analyze.py
```
3. Aguarde terminar — vai aparecer o relatorio no terminal
4. Abra o painel no navegador: **http://localhost:3000**
5. Os dados reais vao aparecer automaticamente

---

## Rodando tudo ao mesmo tempo

Abra **dois terminais**:

**Terminal 1 — Script de analise (quando quiser atualizar):**
```bash
cd /home/juan/Desktop/LEMOTT/analysis && python3.12 analyze.py
```

**Terminal 2 — Dashboard (deixe sempre aberto):**
```bash
cd /home/juan/Desktop/LEMOTT/dashboard && npm run dev
```

---

## Pasta de mockups

Salve seus mockups em:
```
mockups/
  copa-2026/
  brasil/
  humor/
  torcida/
```

Para analisar, diga ao Claude Code:
> "Analise o mockup em mockups/copa-2026/bandeira.png e sugira copies para Meta Ads"

---

## Problemas comuns

| Problema | Solucao |
|---|---|
| `meta: command not found` | Rode: `source ~/.zshrc` |
| `python3.12: command not found` | Rode: `source ~/.zshrc` |
| Painel mostra dados ficticios | Normal — configure o .env e rode o analyze.py |
| Erro "Token invalido" | Gere um novo token no Meta Business Suite |
