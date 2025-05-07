#!/bin/bash
set -e

# ╭───────────────────────────── CONFIGURACIÓN ─────────────────────────────╮
REPO_URL="https://github.com/Aley-r-t/solucionesennube.git"
DOMAIN="algo.com"
APP_NAME="miapp"

BASE_PATH="/var/www/$DOMAIN"                 # donde vivirá el repo
REPO_DIR="$BASE_PATH/solucionesennube"       # carpeta del repo clonado
COMPOSE_DIR="$REPO_DIR/pc2"                  # contiene docker-compose.yml
# ╰──────────────────────────────────────────────────────────────────────────╯

echo "🔧  Despliegue de $DOMAIN iniciado…"

# 1. Clonar o actualizar el repositorio
if [ ! -d "$REPO_DIR" ]; then
  echo "📁 Clonando $REPO_URL en $BASE_PATH…"
  sudo mkdir -p "$BASE_PATH"
  sudo chown "$(whoami)":"$(whoami)" "$BASE_PATH"
  git clone "$REPO_URL" "$REPO_DIR"
else
  echo "🔄  Actualizando repositorio…"
  git -C "$REPO_DIR" pull
fi

# 2. Levantar la pila Docker
echo "🐳  Levantando servicios Docker (db, backend, frontend)…"
cd "$COMPOSE_DIR"
docker-compose down
docker-compose up -d --build

# 3. Esperar a que backend y frontend respondan
echo "⏳  Esperando a que los contenedores arranquen…"
sleep 8

# Esta parte del script esta por mejorar
#curl -s --head http://localhost:8000/api/login | grep -qE '^HTTP/1.1 (200|401|405)' \
#  && echo " Backend responde en :8000" \
#  || { echo " Backend no responde correctamente"; exit 1; }
# Esta parte del script esta por mejorar
#curl -sf http://localhost:4000/ >/dev/null \
#  && echo "  Frontend responde en :4000" \
#  || { echo "  Frontend no responde en :4000"; exit 1; }

# 4. Configurar (o sobrescribir) el VirtualHost de Apache
APACHE_CONF="/etc/apache2/sites-available/${APP_NAME}.conf"
echo "🛠  Creando/actualizando $APACHE_CONF"
sudo tee "$APACHE_CONF" > /dev/null <<EOF
<VirtualHost *:80>
    ServerName $DOMAIN
    Redirect permanent / https://$DOMAIN/
</VirtualHost>

<VirtualHost *:443>
    ServerName $DOMAIN

    ProxyPreserveHost On

    # ► API → backend (gunicorn :8000)
    ProxyPass        /api/ http://localhost:8000/api/
    ProxyPassReverse /api/ http://localhost:8000/api/

    # ► Frontend → contenedor :4000
    ProxyPass        /  http://localhost:4000/
    ProxyPassReverse /  http://localhost:4000/

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/$DOMAIN/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/$DOMAIN/privkey.pem

    ErrorLog  \${APACHE_LOG_DIR}/${APP_NAME}_error.log
    CustomLog \${APACHE_LOG_DIR}/${APP_NAME}_access.log combined
</VirtualHost>
EOF

# 5. Habilitar módulos y dejar solo este vHost activo
echo "🔩  Habilitando módulos proxy/ssl y vHost $APP_NAME"
sudo a2enmod proxy proxy_http rewrite ssl

for OLD in $(ls /etc/apache2/sites-enabled | grep -E "${DOMAIN}|000-default"); do
  [ "$OLD" != "${APP_NAME}.conf" ] && sudo a2dissite "$OLD"
done
sudo a2ensite "$APP_NAME"

# 6. Comprobar sintaxis y recargar Apache
sudo apachectl configtest
sudo systemctl reload apache2
echo "✅  Apache recargado y proxy configurado."

# 7. Comprobación final
echo "🔍  Probando frontend a través de Apache…"
if curl -sf https://$DOMAIN/ >/dev/null; then
  echo "🎉  Despliegue COMPLETO: https://$DOMAIN"
else
  echo "⚠️  Algo no respondió en HTTPS; revisa /var/log/apache2/${APP_NAME}_error.log"
fi