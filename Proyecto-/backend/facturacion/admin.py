from django.contrib import admin
from .models import Factura

@admin.register(Factura)
class FacturaAdmin(admin.ModelAdmin):
    list_display = ['numero_factura', 'reserva', 'total', 'estado', 'metodo_pago', 'fecha_emision']
    list_filter = ['estado', 'metodo_pago', 'fecha_emision']
    search_fields = ['numero_factura', 'reserva__huesped__nombre', 'reserva__huesped__apellido']
    readonly_fields = ['creado', 'actualizado', 'fecha_emision', 'monto_impuesto', 'total']
