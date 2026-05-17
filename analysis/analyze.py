"""
Le Mott — Script de análise de anúncios
Puxa dados da Meta via CLI e gera um relatório com recomendações do Claude.
"""

import subprocess
import json
import os
import sys
from datetime import datetime
from dotenv import load_dotenv

# Carrega variáveis do .env na raiz do projeto
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
AD_ACCOUNT_ID = os.getenv("AD_ACCOUNT_ID")
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")


def run_meta(args: list[str]) -> dict | list | None:
    """Roda um comando da Meta Ads CLI e retorna o resultado como JSON."""
    cmd = ["meta", "--output", "json", "ads"] + args
    env = os.environ.copy()
    env["ACCESS_TOKEN"] = ACCESS_TOKEN
    env["AD_ACCOUNT_ID"] = AD_ACCOUNT_ID

    result = subprocess.run(cmd, capture_output=True, text=True, env=env)

    if result.returncode != 0:
        print(f"Erro ao rodar: {' '.join(cmd)}")
        print(result.stderr)
        return None

    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError:
        print(f"Resposta inesperada: {result.stdout[:200]}")
        return None


def coletar_dados() -> dict:
    """Coleta campanhas, conjuntos de anúncios e insights dos últimos 7 dias."""
    print("Coletando dados da Meta...")

    campanhas = run_meta(["campaign", "list"]) or []
    conjuntos = run_meta(["adset", "list"]) or []
    anuncios = run_meta(["ad", "list"]) or []
    insights_raw = run_meta([
        "insights", "get",
        "--date-preset", "last_7d",
        "--fields", "campaign_name,adset_name,ad_name,impressions,clicks,spend,ctr,cpc,actions,action_values,purchase_roas"
    ]) or {}
    insights = insights_raw.get("data", []) if isinstance(insights_raw, dict) else insights_raw

    return {
        "coletado_em": datetime.now().isoformat(),
        "campanhas": campanhas,
        "conjuntos_de_anuncios": conjuntos,
        "anuncios": anuncios,
        "insights_7_dias": insights,
    }


def analisar_com_claude(dados: dict) -> str:
    """Envia os dados para o Claude e pede uma análise de performance."""
    try:
        import anthropic
    except ImportError:
        return "Instale o SDK: pip install anthropic"

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    prompt = f"""Você é um analista de performance e diretor criativo da Le Mott, uma marca brasileira de camisetas focada em futebol, Copa do Mundo e cultura popular brasileira.

Analise os dados abaixo dos últimos 7 dias de anúncios e responda em português, de forma clara e direta:

1. **Resumo geral** — como está a performance?
2. **O que está funcionando** — criativos, campanhas ou públicos com melhor resultado
3. **O que está ruim** — o que pausar ou ajustar
4. **3 ações concretas** para melhorar resultado esta semana
5. **Sugestão criativa** — baseado no que converte, que tipo de estampa ou copy testar a seguir?

Dados:
{json.dumps(dados, ensure_ascii=False, indent=2)}
"""

    message = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1500,
        messages=[{"role": "user", "content": prompt}]
    )

    return message.content[0].text


def salvar_relatorio(dados: dict, analise: str):
    """Salva os dados brutos e a análise em arquivos JSON e TXT."""
    os.makedirs("reports", exist_ok=True)
    data_hoje = datetime.now().strftime("%Y-%m-%d_%H-%M")

    # Dados brutos
    caminho_json = f"reports/dados_{data_hoje}.json"
    with open(caminho_json, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)

    # Análise do Claude
    caminho_txt = f"reports/analise_{data_hoje}.txt"
    with open(caminho_txt, "w", encoding="utf-8") as f:
        f.write(f"Le Mott — Análise de Performance\n")
        f.write(f"Gerado em: {datetime.now().strftime('%d/%m/%Y %H:%M')}\n")
        f.write("=" * 60 + "\n\n")
        f.write(analise)

    # Também salva o mais recente para o dashboard ler
    with open("reports/latest.json", "w", encoding="utf-8") as f:
        json.dump({"dados": dados, "analise": analise}, f, ensure_ascii=False, indent=2)

    print(f"\nRelatório salvo em: {caminho_txt}")
    print(f"Dados brutos em: {caminho_json}")


def main():
    if not ACCESS_TOKEN or ACCESS_TOKEN == "seu_token_aqui":
        print("Configure o ACCESS_TOKEN no arquivo .env")
        sys.exit(1)

    if not AD_ACCOUNT_ID or AD_ACCOUNT_ID == "act_seu_id_aqui":
        print("Configure o AD_ACCOUNT_ID no arquivo .env")
        sys.exit(1)

    dados = coletar_dados()

    print(f"\nCampanhas encontradas: {len(dados['campanhas'])}")
    print(f"Conjuntos de anúncios: {len(dados['conjuntos_de_anuncios'])}")
    print(f"Anúncios: {len(dados['anuncios'])}")
    print(f"Linhas de insights: {len(dados['insights_7_dias'])}")

    if ANTHROPIC_API_KEY and ANTHROPIC_API_KEY != "sua_chave_anthropic_aqui":
        print("\nAnalisando com Claude...")
        analise = analisar_com_claude(dados)
        print("\n" + "=" * 60)
        print(analise)
        print("=" * 60)
    else:
        analise = "Dados coletados. Abra o Claude Code e diga: analisa os dados de anuncios."
        print("\n✅ Dados salvos. No Claude Code, diga: 'analisa os dados de anuncios'")

    salvar_relatorio(dados, analise)


if __name__ == "__main__":
    main()
