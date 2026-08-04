from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Reserva
from .serializers import ReservaSerializer

class ReservaViewSet(viewsets.ModelViewSet):
    serializer_class = ReservaSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['estado', 'habitacion', 'huesped']
    search_fields = ['huesped__nombre', 'huesped__apellido', 'habitacion__numero']
    ordering_fields = ['fecha_ingreso', 'fecha_salida', 'creado']
    ordering = ['-fecha_ingreso']

    def get_queryset(self):
        queryset = Reserva.objects.all()
        if self.request.query_params.get('sin_factura') in ['1', 'true', 'True']:
            queryset = queryset.filter(factura__isnull=True)
        return queryset
    
    @action(detail=True, methods=['post'])
    def hacer_checkin(self, request, pk=None):
        """Realizar check-in de la reserva"""
        reserva = self.get_object()
        reserva.hacer_checkin()
        serializer = self.get_serializer(reserva)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def hacer_checkout(self, request, pk=None):
        """Realizar check-out de la reserva"""
        reserva = self.get_object()
        reserva.hacer_checkout()
        serializer = self.get_serializer(reserva)
        return Response(serializer.data)
