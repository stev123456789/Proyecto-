from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Empleado
from .serializers import EmpleadoSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['cargo', 'estado']
    search_fields = ['nombre', 'apellido', 'numero_documento', 'correo']
    ordering_fields = ['nombre', 'apellido', 'cargo', 'fecha_ingreso']
    ordering = ['nombre', 'apellido']
