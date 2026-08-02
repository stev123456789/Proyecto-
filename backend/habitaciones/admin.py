from django.contrib import admin
from .models import Habitacion

@admin.register(Habitacion)
class HabitacionAdmin(admin.ModelAdmin):
    list_display = ['numero', 'tipo', 'precio', 'estado', 'capacidad']
    list_filter = ['estado', 'tipo']
    search_fields = ['numero', 'tipo']
    readonly_fields = ['creado', 'actualizado']
