# Dockerfile
FROM python:3.13.3-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    build-essential libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*

# Copiar archivos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ejecutar migraciones y collectstatic por defecto en producción
RUN python manage.py collectstatic --noinput

# Puerto expuesto
EXPOSE 8000

# Usar gunicorn en producción
CMD ["gunicorn", "pc2.wsgi:application", "--bind", "0.0.0.0:8000"]
