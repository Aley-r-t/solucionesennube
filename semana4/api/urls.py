from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ProductoViewSet

# Crear el router y registrar nuestro viewset
router = DefaultRouter()
router.register(r'productos', ProductoViewSet, basename='producto')

# Las URLs de la API son generadas automáticamente por el router
urlpatterns = [
    path('api/', include(router.urls)),
]