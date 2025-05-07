from django.urls import path
from .views import ClienteListView, ProductoListView,RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    # Login con JWT
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # API protegida: Listar clientes
    path('clientes/', ClienteListView.as_view(), name='clientes'),

    # API pública o protegida (según tu view): Buscar/Listar productos
    path('productos/', ProductoListView.as_view(), name='productos'),

    # Registro de usuarios
    path('register/', RegisterView.as_view(), name='register'),
]
