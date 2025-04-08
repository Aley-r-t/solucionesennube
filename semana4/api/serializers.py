from rest_framework import serializers
from .models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'stock', 'estado']
        # También puedes usar fields = '__all__' para incluir todos los campos
        read_only_fields = ['id']  # El ID es solo lectura ya que es autoincremental