from django.contrib import admin
from .models import Empleado

@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'apellido', 'cargo', 'correo', 'fecha_ingreso', 'estado']
    list_filter = ['cargo', 'estado', 'fecha_ingreso']
    search_fields = ['nombre', 'apellido', 'numero_documento', 'correo']
    readonly_fields = ['creado', 'actualizado']
