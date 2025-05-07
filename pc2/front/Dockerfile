###############  Etapa 1 : Build  ###############
FROM node:22.14-alpine AS build

# 1. Carpeta de trabajo
WORKDIR /app

# 2. Copia package.json + lock (para cachear npm ci)
COPY package*.json ./

# 3. Instala dependencias con npm ci (más rápido y reproducible)
RUN npm ci

# 4. Copia todo el código fuente y compila
COPY . .
RUN npm run build       

###############  Etapa 2 : Servidor estático ###############
FROM nginx:alpine AS serve

# 5. Copiamos la build al directorio que Nginx sirve por defecto
COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 6. (opcional) Copia una config Nginx propia:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# 7. Exponemos el puerto 80 del contenedor
EXPOSE 80

# 8. Arranque (Nginx ya es el CMD por defecto)
