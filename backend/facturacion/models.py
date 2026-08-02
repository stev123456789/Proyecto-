from django.db import models
from reservas.models import Reserva

class Factura(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('pagada', 'Pagada'),
        ('cancelada', 'Cancelada'),
    ]
    
    METODO_PAGO_CHOICES = [
        ('efectivo', 'Efectivo'),
        ('tarjeta_credito', 'Tarjeta de Crédito'),
        ('tarjeta_debito', 'Tarjeta de Débito'),
        ('transferencia', 'Transferencia Bancaria'),
        ('otro', 'Otro'),
    ]
    
    reserva = models.OneToOneField(Reserva, on_delete=models.PROTECT, related_name='factura')
    numero_factura = models.CharField(max_length=20, unique=True)
    fecha_emision = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateField(blank=True, null=True)
    
    # Cálculo de costos
    numero_noches = models.IntegerField()
    precio_noche = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal_hospedaje = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Servicios adicionales
    servicios_adicionales = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    descripcion_servicios = models.TextField(blank=True, null=True)
    
    # Impuestos
    porcentaje_impuesto = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # Por ejemplo: 19
    monto_impuesto = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Total
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Estado y pago
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    metodo_pago = models.CharField(max_length=20, choices=METODO_PAGO_CHOICES, blank=True, null=True)
    fecha_pago = models.DateTimeField(blank=True, null=True)
    referencia_pago = models.CharField(max_length=50, blank=True, null=True)
    
    observaciones = models.TextField(blank=True, null=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-fecha_emision']
        verbose_name = 'Factura'
        verbose_name_plural = 'Facturas'
    
    def __str__(self):
        return f"Factura {self.numero_factura}"
    
    def calcular_total(self):
        """Calcula el total de la factura"""
        self.monto_impuesto = (self.subtotal_hospedaje + self.servicios_adicionales) * (self.porcentaje_impuesto / 100)
        self.total = self.subtotal_hospedaje + self.servicios_adicionales + self.monto_impuesto
        return self.total
    
    def marcar_como_pagada(self, metodo_pago, referencia=''):
        """Marca la factura como pagada"""
        from django.utils import timezone
        self.estado = 'pagada'
        self.metodo_pago = metodo_pago
        self.fecha_pago = timezone.now()
        self.referencia_pago = referencia
        self.save()
