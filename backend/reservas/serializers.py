from rest_framework import serializers
from .models import Reserva
from habitaciones.serializers import HabitacionSerializer
from huespedes.serializers import HuespedSerializer

class ReservaSerializer(serializers.ModelSerializer):
    habitacion_detalle = HabitacionSerializer(source='habitacion', read_only=True)
    huesped_detalle = HuespedSerializer(source='huesped', read_only=True)
    
    class Meta:
        model = Reserva
        fields = ['id', 'habitacion', 'habitacion_detalle', 'huesped', 'huesped_detalle', 
                  'fecha_ingreso', 'fecha_salida', 'numero_noches', 'estado', 'precio_noche', 
                  'precio_total', 'numero_personas', 'observaciones', 'creado', 'actualizado']
        read_only_fields = ['id', 'numero_noches', 'precio_total', 'creado', 'actualizado']
