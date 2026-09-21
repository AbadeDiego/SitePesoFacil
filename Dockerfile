# Landing page estática — servida por nginx
FROM nginx:1.27-alpine

# Configuração enxuta com gzip e cache para arquivos estáticos
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Conteúdo do site
COPY . /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O- http://127.0.0.1/ || exit 1
