# Peso Fácil — landing page estática

Site 100% estático (HTML/CSS/JS puro, sem backend) pronto para publicar no
Coolify.

## Estrutura

```
index.html              página única
privacidade.html        política de privacidade
css/style.css           todo o estilo
js/main.js              menu mobile, carrossel, animações e Google Analytics
images/                 veja IMAGENS-NECESSARIAS.md
favicon.ico             ícone da aba do navegador (já incluído)
Dockerfile + nginx.conf build usado pelo Coolify
```

## Antes de publicar

1. As fotos e os ícones já estão no projeto (veja `IMAGENS-NECESSARIAS.md`
   para o mapa de qual arquivo é qual). Só falta uma logo oficial, se você
   tiver uma — por enquanto o menu usa um wordmark simples em texto.
2. Confira o número de WhatsApp e o texto pré-preenchido em `index.html`
   (busque por `wa.me/5587988758805` — aparece em 8 botões).

## Deploy no Coolify

Suba esta pasta para um repositório Git (GitHub, GitLab, etc.) e no Coolify:

1. **New Resource → Application → escolha o repositório.**
2. **Build Pack: Dockerfile** (o Coolify vai detectar o `Dockerfile` automaticamente).
3. **Porta exposta:** 80.
4. Configure o domínio `pesofacil.pro` na aba de domínios do recurso — o
   Coolify cuida do certificado SSL (Let's Encrypt) automaticamente.
5. Deploy.

Alternativa mais simples (sem Dockerfile): no Coolify, escolha o tipo de
recurso **"Static Site"** (build pack Nixpacks) apontando para a raiz do
repositório — ele detecta o `index.html` e serve com nginx automaticamente,
sem precisar do `Dockerfile`/`nginx.conf` incluídos aqui. Os dois caminhos
funcionam; o Dockerfile dá mais controle (cache, gzip, headers).

## Atualizações futuras

Qualquer alteração de texto, imagem ou link é só editar `index.html` (ou os
arquivos em `css/`/`js/`), commitar e fazer um novo deploy no Coolify — não
há build step, nem dependências para instalar.
