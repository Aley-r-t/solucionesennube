from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Producto
from .serializers import ProductoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el modelo Producto.
    Proporciona operaciones CRUD completas.
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    
    @action(detail=False, methods=['get'])
    def productos_disponibles(self, request):
        """
        Endpoint personalizado que devuelve solo productos con estado=True
        """
        productos = Producto.objects.filter(estado=True)
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'])
    def actualizar_stock(self, request, pk=None):
        """
        Endpoint personalizado para actualizar solo el stock de un producto
        """
        producto = self.get_object()
        
        try:
            nuevo_stock = int(request.data.get('stock', 0))
            if nuevo_stock < 0:
                return Response(
                    {'error': 'El stock no puede ser negativo'},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            producto.stock = nuevo_stock
            producto.save()
            
            return Response({'mensaje': f'Stock actualizado a {nuevo_stock}'})
            
        except ValueError:
            return Response(
                {'error': 'El valor de stock debe ser un número entero'},
                status=status.HTTP_400_BAD_REQUEST
            )