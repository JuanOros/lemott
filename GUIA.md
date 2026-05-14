# Guia de uso — Le Mott Ads

Como rodar e usar cada parte do sistema.

---

## Antes de começar

Você precisa de dois arquivos preenchidos:

**1. `/home/juan/Desktop/LEMOTT/.env`** (para o script Python):
```
ACCESS_TOKEN=seu_token_meta_aqui
AD_ACCOUNT_ID=act_XXXXXXXXX
BUSINESS_ID=XXXXXXXXX
ANTHROPIC_API_KEY=sua_chave_anthropic_aqui
```

**2. `/home/juan/Desktop/LEMOTT/dashboard/.env.local`** (para o dashboard):
```
ANTHROPIC_API_KEY=sua_chave_anthropic_aqui
```

> Onde conseguir:
> - **ACCESS_TOKEN e AD_ACCOUNT_ID:** Meta Business Suite → Usuários do sistema → Gerar token
> - **ANTHROPIC_API_KEY:** console.anthropic.com → API Keys → Create Key

---

## Como abrir o painel

1. Abra o terminal
2. Navegue até a pasta do dashboard:
```bash
cd /home/juan/Desktop/LEMOTT/dashboard
```
3. Rode:
```bash
npm run dev
```
4. Abra o navegador em: **http://localhost:3000**

O painel vai abrir com dados de demonstração até o token da Meta estar configurado.

---

## As 5 seções

### 📊 Performance (página inicial)
Mostra as métricas dos seus anúncios: ROAS, CPA, CTR, conversões, gasto total.

**Sem token Meta:** aparece com dados fictícios para você ver como vai ficar.
**Com token Meta:** rode primeiro o script de análise (veja abaixo) e depois abra o painel.

---

### 🎨 Estúdio de Criativos
Use para gerar copies prontos a partir de um mockup.

**Como usar:**
1. Clique em "Estúdio" na barra lateral
2. Arraste a foto do mockup para a área de upload (ou clique para selecionar)
3. Escreva o nome da estampa (ex: "Copa 2026 - Bandeira")
4. Selecione o tipo de produto (camiseta, moletom, etc.)
5. Clique em **"✨ Gerar copies com Claude"**
6. Aguarde alguns segundos — o Claude vai sugerir 3 copies prontos + público ideal + formato recomendado

> **Precisa:** ANTHROPIC_API_KEY no arquivo `dashboard/.env.local`

---

### 🚀 Campanhas
Use para montar a estrutura de uma campanha antes de publicar.

**Como usar:**
1. Clique em "Campanhas" na barra lateral
2. Selecione a estampa que quer anunciar
3. Escolha quais produtos incluir (dica: comece só com camiseta)
4. Ajuste o orçamento diário com o slider
5. Clique em **"🚀 Gerar comandos da campanha"**
6. Os comandos da Meta CLI aparecerão prontos para copiar e rodar no terminal

> **Sem token:** os comandos já são gerados, mas só funcionam no terminal quando o token estiver configurado.

---

### 👕 Catálogo
Visualiza todos os seus produtos agrupados por estampa.

- Verde = tem mockup personalizado
- Amarelo = tem alguns com mockup próprio
- Cinza = só mockup padrão da plataforma

> Sem token Meta: exibe dados fictícios de exemplo.

---

### 🤖 Assistente
Chat direto com o Claude sobre sua loja.

**Exemplos do que você pode perguntar:**
- "Que estampa nova eu deveria criar para a Copa?"
- "Crie 3 copies para uma estampa de torcida no bar"
- "Como melhorar meu ROAS?"
- "Qual público devo testar para a linha infantil?"
- "Analise minhas campanhas e me diga o que pausar"

> **Precisa:** ANTHROPIC_API_KEY no arquivo `dashboard/.env.local`

---

## Como atualizar os dados do painel (com token Meta)

1. Abra o terminal
2. Rode o script de análise:
```bash
cd /home/juan/Desktop/LEMOTT/analysis
python3.12 analyze.py
```
3. Aguarde ele terminar — vai aparecer o relatório no terminal
4. Abra o painel no navegador: **http://localhost:3000**
5. Os dados reais vão aparecer automaticamente

---

## Rodando tudo ao mesmo tempo

Abra **dois terminais**:

**Terminal 1 — Script de análise (quando quiser atualizar):**
```bash
cd /home/juan/Desktop/LEMOTT/analysis && python3.12 analyze.py
```

**Terminal 2 — Dashboard (deixe sempre aberto):**
```bash
cd /home/juan/Desktop/LEMOTT/dashboard && npm run dev
```

---

## Problemas comuns

| Problema | Solução |
|---|---|
| `meta: command not found` | Rode: `source ~/.zshrc` |
| `python3.12: command not found` | Rode: `source ~/.zshrc` |
| Painel mostra dados fictícios | Normal — configure o .env e rode o analyze.py |
| Erro "Token inválido" | Gere um novo token no Meta Business Suite |
| Estúdio não gera copies | Verifique se ANTHROPIC_API_KEY está no `dashboard/.env.local` |
