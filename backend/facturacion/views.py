from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import Factura
from .serializers import FacturaSerializer

class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['estado', 'metodo_pago']
    search_fields = ['numero_factura', 'reserva__huesped__nombre', 'reserva__huesped__apellido']
    ordering_fields = ['fecha_emision', 'total', 'estado']
    ordering = ['-fecha_emision']
    
    @action(detail=True, methods=['post'])
    def marcar_como_pagada(self, request, pk=None):
        """Marcar factura como pagada"""
        factura = self.get_object()
        metodo_pago = request.data.get('metodo_pago', '')
        referencia = request.data.get('referencia', '')
        factura.marcar_como_pagada(metodo_pago, referencia)
        serializer = self.get_serializer(factura)
        return Response(serializer.data)
