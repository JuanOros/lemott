# Le Mott — Dashboard

Painel de performance e gestao de campanhas da Le Mott.

## Rodar o dashboard

```bash
cd /home/juan/Desktop/LEMOTT/dashboard
npm run dev
```

Acesse: http://localhost:3000

## Proxima sessao com Claude Code

Abra o terminal na raiz do projeto e inicie o Claude Code:

```bash
cd /home/juan/Desktop/LEMOTT
claude
```

O Claude ja tem todo o contexto da Le Mott (CLAUDE.md) e sabe exatamente onde parou.

**O que ainda falta:**
- Configurar o token da Meta no `.env` (copiar de `.env.example`)
- Rodar `python3.12 analyze.py` para puxar dados reais
- Fazer merge dos PRs no GitHub

## Estrutura

```
app/
  page.tsx          <- Performance (metricas)
  studio/           <- Estudio de Criativos
  campaigns/        <- Criador de Campanhas
  catalog/          <- Catalogo por estampa
  assistant/        <- Assistente (prompts prontos)
```
