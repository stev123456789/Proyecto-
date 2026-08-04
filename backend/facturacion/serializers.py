from rest_framework import serializers
from .models import Factura
from reservas.serializers import ReservaSerializer

class FacturaSerializer(serializers.ModelSerializer):
    reserva_detalle = ReservaSerializer(source='reserva', read_only=True)
    
    class Meta:
        model = Factura
        fields = ['id', 'reserva', 'reserva_detalle', 'numero_factura', 'fecha_emision', 
                  'fecha_vencimiento', 'numero_noches', 'precio_noche', 'subtotal_hospedaje', 
                  'servicios_adicionales', 'descripcion_servicios', 'porcentaje_impuesto', 
                  'monto_impuesto', 'total', 'estado', 'metodo_pago', 'fecha_pago', 
                  'referencia_pago', 'observaciones', 'creado', 'actualizado']
        read_only_fields = ['id', 'fecha_emision', 'creado', 'actualizado']

    def validate(self, attrs):
        subtotal = attrs.get('subtotal_hospedaje', 0)
        servicios = attrs.get('servicios_adicionales', 0)
        porcentaje = attrs.get('porcentaje_impuesto', 0)
        monto_impuesto = (subtotal + servicios) * (porcentaje / 100)
        total = subtotal + servicios + monto_impuesto
        attrs['monto_impuesto'] = monto_impuesto
        attrs['total'] = total
        return attrs
