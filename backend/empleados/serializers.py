from rest_framework import serializers
from .models import Empleado

class EmpleadoSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = Empleado
        fields = ['id', 'nombre', 'apellido', 'nombre_completo', 'cargo', 'telefono', 
                  'correo', 'numero_documento', 'fecha_ingreso', 'salario', 'estado', 
                  'creado', 'actualizado']
        read_only_fields = ['id', 'creado', 'actualizado']
    
    def get_nombre_completo(self, obj):
        return obj.nombre_completo()
