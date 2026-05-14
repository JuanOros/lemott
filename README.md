# Le Mott — Sistema de Gestao de Anuncios

Painel integrado com Meta Ads para gerenciar campanhas, criativos e performance da Le Mott.

## Como iniciar o Claude na proxima sessao

```bash
cd /home/juan/Desktop/LEMOTT
claude
```

O Claude le o `CLAUDE.md` automaticamente e retoma de onde parou, sem precisar reexplicar o projeto.

## O que esta pronto

- Dashboard Next.js com 5 secoes funcionais
- Dados mock para testar sem token da Meta
- Pasta `mockups/` para organizar imagens por linha

## O que ainda falta

1. **Token da Meta** — Meta Business Suite → Usuarios do sistema → Gerar token
2. **Preencher o `.env`** — copiar `.env.example` e colocar os dados reais
3. **Fazer merge dos PRs** no GitHub (feature/dashboard-completo, depois chore/remover-anthropic-gratuito)
4. **Rodar o script de analise:**
   ```bash
   cd analysis && python3.12 analyze.py
   ```

## Rodar o dashboard agora (sem token)

```bash
cd dashboard && npm run dev
# Acesse http://localhost:3000
```

## Analisar um mockup

1. Salve a imagem em `mockups/`
2. Abra o Claude Code e diga: "Analisa o mockup em mockups/nome.png e sugere copies para Meta Ads"

## Documentacao

- `GUIA.md` — instrucoes de uso completas
- `CLAUDE.md` — contexto tecnico e status do projeto
