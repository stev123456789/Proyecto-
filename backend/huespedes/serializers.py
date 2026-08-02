from rest_framework import serializers
from .models import Huesped

class HuespedSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = Huesped
        fields = ['id', 'tipo_documento', 'numero_documento', 'nombre', 'apellido', 
                  'nombre_completo', 'telefono', 'correo', 'direccion', 'ciudad', 'pais', 
                  'fecha_nacimiento', 'creado', 'actualizado']
        read_only_fields = ['id', 'creado', 'actualizado']
    
    def get_nombre_completo(self, obj):
        return obj.nombre_completo()
