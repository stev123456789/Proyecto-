from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Huesped
from .serializers import HuespedSerializer

class HuespedViewSet(viewsets.ModelViewSet):
    queryset = Huesped.objects.all()
    serializer_class = HuespedSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['tipo_documento', 'pais']
    search_fields = ['nombre', 'apellido', 'numero_documento', 'correo']
    ordering_fields = ['nombre', 'apellido', 'creado']
    ordering = ['nombre', 'apellido']
