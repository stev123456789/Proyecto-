from rest_framework import serializers
from .models import Habitacion

class HabitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habitacion
        fields = ['id', 'numero', 'tipo', 'precio', 'estado', 'capacidad', 'descripcion', 'amenidades', 'creado', 'actualizado']
        read_only_fields = ['id', 'creado', 'actualizado']
