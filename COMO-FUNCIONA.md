# Como funciona a conexão — Le Mott + Claude + Meta

Este arquivo explica, em linguagem simples, como as peças do sistema se encaixam, o que é possível fazer, onde estão os limites e o que você precisa saber antes de usar.

---

## O que é cada peça do sistema

### 1. Meta Ads (a plataforma)
É onde seus anúncios de fato existem e rodam. Tudo que você anuncia — campanhas, públicos, criativos, gastos — fica armazenado nos servidores da Meta. Você normalmente acessa pelo navegador, no Gerenciador de Anúncios.

### 2. Meta Ads CLI (`meta ads`)
É uma ferramenta de linha de comando instalada no seu computador que permite conversar com a Meta via terminal — sem abrir o navegador. Ela usa a **API de Marketing da Meta**, que é a mesma tecnologia que agências profissionais usam para automatizar campanhas.

Para funcionar, ela precisa de um **token de acesso** — uma chave secreta que prova que você tem permissão para mexer na sua conta.

### 3. O script Python (`analyze.py`)
É um arquivo que roda no seu computador e faz duas coisas:
- Chama a Meta CLI para buscar os dados das suas campanhas (gastos, impressões, cliques, conversões)
- Manda esses dados para o Claude, que analisa e gera um relatório

O resultado é salvo em `analysis/reports/latest.json` e o dashboard lê esse arquivo para exibir as métricas.

### 4. O dashboard (Next.js)
É o painel visual que você abre no navegador em `http://localhost:3000`. Ele roda **no seu computador**, não na internet. Ninguém de fora consegue acessar — é só para você.

### 5. O Claude (você está lendo isso graças a ele)
Claude é o modelo de inteligência artificial da Anthropic. Ele aparece de duas formas nesse sistema:
- **Via Claude Code** (terminal): você conversa diretamente, pede análises, pede para criar campanhas, escrever copies, etc.
- **Via API** (dashboard): o Estúdio de Criativos e o Assistente chamam o Claude automaticamente pela interface visual

---

## Como as peças se conversam

```
Você (terminal ou dashboard)
        |
        v
   Claude Code / Dashboard
        |
        |--- API Anthropic ---> Claude analisa e responde
        |
        |--- Meta CLI ---------> Meta API -> seus dados de campanha
        |
        v
   analysis/reports/latest.json  <-- dados salvos localmente
        |
        v
   Dashboard lê e exibe as métricas
```

---

## O que voce pode fazer aqui que nao da para fazer no Gerenciador de Anuncios padrao

| Funcionalidade | Gerenciador Meta (navegador) | Esse sistema com Claude |
|---|---|---|
| Ver metricas | Sim | Sim, com resumo em portugues claro |
| Criar campanha manualmente | Sim | Sim, gerando os comandos prontos |
| Analisar se campanha esta boa ou ruim | Nao (so dados brutos) | Sim — Claude interpreta e recomenda |
| Sugerir copy baseado no mockup | Nao | Sim — Claude analisa a imagem |
| Receber alerta "pause essa campanha" | Nao | Sim, com explicacao do motivo |
| Agrupar produtos por estampa | Nao | Sim |
| Saber qual produto converte mais | Dificil (requer filtros manuais) | Sim, automaticamente |
| Sugerir novas ideias de estampa | Nao | Sim |
| Decidir quando escalar orcamento | Nao | Sim, com criterio claro |

---

## A diferenca entre criar um anuncio la e criar aqui

### Criando no Gerenciador de Anuncios (navegador da Meta)
- Interface visual, botoes, formularios
- Voce decide tudo manualmente: publico, orcamento, criativo, posicionamento
- Nao ha nenhuma analise automatica — e voce quem julga se esta bom
- Mais facil para iniciantes, mas mais lento e sem inteligencia por tras

### Criando com o Claude aqui
- Voce faz uma pergunta ou da um contexto ("quero anunciar essa estampa de Copa")
- Claude analisa o historico de performance das suas outras campanhas
- Sugere o publico, o orcamento inicial, o formato e o copy baseado no que ja funcionou
- Gera os comandos CLI prontos — voce so cola no terminal e confirma
- O anuncio e criado diretamente via API, sem abrir o navegador

**O resultado final e o mesmo** (um anuncio na Meta), mas aqui voce tem um especialista te orientando em cada decisao, em vez de fazer no escuro.

---

## Limitacoes — o que esse sistema NAO faz

### Limitacoes tecnicas
- **Nao roda sozinho**: o script de analise precisa ser rodado manualmente por voce (ou agendado). Ele nao atualiza automaticamente de hora em hora.
- **Nao tem acesso em tempo real**: os dados mostrados no dashboard sao do ultimo momento que voce rodou o `analyze.py`. Se voce gastou R$ 50 hoje de manha e atualizou so a noite, o painel mostra os dados da noite.
- **Nao executa acoes sem voce confirmar**: Claude sugere, gera o comando, mas quem clica em "rodar" e voce. Isso e proposital — voce sempre tem controle.
- **Nao acessa a Reserva Ink diretamente**: o sistema so fala com a Meta. Dados de estoque, producao e envio de pedidos nao aparecem aqui.

### Limitacoes do Claude
- **Nao ve o que esta na tela da Meta**: Claude so analisa o que o script coleta e traz. Se um anuncio foi reprovado por violacao de politica, por exemplo, voce precisa ver isso no Gerenciador.
- **Nao tem memoria entre sessoes por padrao**: cada vez que voce abre o Claude Code, ele recomeца. O `CLAUDE.md` resolve isso parcialmente — ele guarda o contexto do projeto, mas nao o historico das suas conversas anteriores.
- **Pode errar em dados financeiros**: Claude e muito bom em analise qualitativa, mas nao substitui uma planilha financeira rigorosa. Use os numeros como orientacao, nao como contabilidade oficial.
- **Nao aprende automaticamente**: Claude nao vai ficar cada vez mais "seu" com o tempo. O que muda e o `CLAUDE.md` — quanto mais voce atualiza esse arquivo com o que funciona na Le Mott, melhor ele te atende.

### Limitacoes da Meta API
- **Rate limits**: a API da Meta tem limites de quantas requisicoes voce pode fazer por hora. Para o volume da Le Mott, isso nao deve ser problema.
- **Token expira**: o token de acesso tem prazo de validade (normalmente 60 dias para tokens de usuario do sistema). Quando expirar, voce precisa gerar um novo no Meta Business Suite.
- **Nem tudo e acessivel via API**: algumas funcoes do Gerenciador (como o Advantage+ Shopping) so ficam disponiveis na interface visual.

---

## O que um leigo precisa saber antes de usar

### 1. O token de acesso e como uma senha — trate como tal
O `ACCESS_TOKEN` que vai no `.env` da acesso total a sua conta de anuncios. Nunca compartilhe esse arquivo. Nunca mande por WhatsApp ou e-mail. O `.gitignore` ja esta configurado para que ele nunca seja enviado ao GitHub — nao force isso.

### 2. O sistema nao gasta dinheiro por conta propria
Nenhuma acao aqui cria anuncio ou gasta orcamento sem voce executar o comando manualmente. Claude sugere, voce decide. Fique tranquilo.

### 3. Os dados mock sao ficticios — e tudo bem
Enquanto o token nao estiver configurado, o dashboard mostra numeros inventados para demonstrar como o sistema funciona. Eles nao representam sua conta real.

### 4. Claude nao e magico — ele e muito bom em padroes
Ele vai ser excelente para analisar o que ja aconteceu, sugerir baseado em boas praticas e te poupar tempo de pensar no zero. Mas copies criativos e decisoes estrategicas ainda precisam do seu olho humano para validar se fazem sentido para a Le Mott.

### 5. A vantagem real nao e a automacao — e a velocidade de decisao
O valor do sistema e que voce para de ficar olhando para numeros sem saber o que fazer. Claude transforma dados em instrucoes claras: "pause X", "escale Y", "teste Z". Isso e o que faz diferenca no dia a dia.

### 6. Voce nao precisa entender o codigo para usar
O dashboard e feito para ser usado sem tocar em codigo. Claude Code (terminal) e para quando voce quer ir mais fundo — analisar mockups, criar campanhas, explorar ideias. Mas as 5 secoes do painel funcionam so clicando.

---

## Resumo em uma frase

O sistema conecta seus dados de anuncio (Meta) com inteligencia artificial (Claude) numa interface simples (dashboard), para que voce tome decisoes melhores e mais rapidas — sem precisar ser especialista em marketing digital.

---

*Para configurar e rodar: veja `GUIA.md`*
*Para entender a arquitetura tecnica: veja `CLAUDE.md`*
