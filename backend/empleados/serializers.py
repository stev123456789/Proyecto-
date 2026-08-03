from rest_framework import serializers
from .models import Empleado

# Importa las clases necesarias de Django REST Framework para crear serializers
# Importa las clases necesarias de Django REST Framework para crear serializers
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
# Importa el modelo Empleado desde el archivo models.py de la misma aplicación
# Serializer encargado de transformar los datos del modelo Empleado
# a formato JSON para enviarlos mediante la API REST
 # Campo calculado que permite obtener el nombre completo del empleado