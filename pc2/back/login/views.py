from django.shortcuts import render
from django.db.models import Q
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter
from .models import Producto, Cliente
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import ProductoSerializer, ClienteSerializer, RegisterSerializer


class ProductoListView(ListAPIView):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        queryset = Producto.objects.all()
        search = self.request.GET.get('search')
        if search:
            terms = search.split()
            query = Q()
            for term in terms:
                query |= Q(nombre__icontains=term) | Q(descripcion__icontains=term)
            queryset = queryset.filter(query)
        return queryset

class ClienteListView(ListAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    search_fields = ['nombre', 'descripcion']  
    filter_backends = [SearchFilter]

    permission_classes = [IsAuthenticated]

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Crear token JWT inmediatamente
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Usuario registrado correctamente",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




