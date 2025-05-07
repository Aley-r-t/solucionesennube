from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from login.models import Cliente, Producto

class Command(BaseCommand):
    help = 'Crea datos de prueba para Clientes y Productos'

    def handle(self, *args, **kwargs):
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('✅ Superusuario creado'))
        # Seed de clientes
        clientes = [
            {"nombre": "Juan Pérez", "email": "juan@example.com", "telefono": "999111222"},
            {"nombre": "Lucía Gómez", "email": "lucia@example.com", "telefono": "988777666"},
        ]
        for c in clientes:
            Cliente.objects.get_or_create(**c)

        # Seed de productos
        productos = [
            {"nombre": "Laptop Pro", "descripcion": "Laptop potente para desarrollo", "precio": 3500.00},
            {"nombre": "Smartphone X", "descripcion": "El nuevo flagship killer", "precio": 1800.00},
            {"nombre": "Monitor 4K", "descripcion": "Para edición de video profesional", "precio": 1200.00},
        ]
        for p in productos:
            Producto.objects.get_or_create(**p)

        self.stdout.write(self.style.SUCCESS('✅ Datos de prueba creados correctamente'))
