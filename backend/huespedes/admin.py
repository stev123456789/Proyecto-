from django.contrib import admin
from .models import Huesped

@admin.register(Huesped)
class HuespedAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'apellido', 'numero_documento', 'telefono', 'correo']
    list_filter = ['tipo_documento', 'pais']
    search_fields = ['nombre', 'apellido', 'numero_documento', 'correo']
    readonly_fields = ['creado', 'actualizado']
