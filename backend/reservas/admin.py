from django.contrib import admin
from .models import Reserva

@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    list_display = ['id', 'huesped', 'habitacion', 'fecha_ingreso', 'fecha_salida', 'estado', 'precio_total']
    list_filter = ['estado', 'fecha_ingreso', 'habitacion']
    search_fields = ['huesped__nombre', 'huesped__apellido', 'habitacion__numero']
    readonly_fields = ['creado', 'actualizado', 'numero_noches', 'precio_total']
