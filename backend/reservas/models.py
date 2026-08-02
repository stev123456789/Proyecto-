from django.db import models
from django.utils import timezone
from datetime import timedelta
from habitaciones.models import Habitacion
from huespedes.models import Huesped

class Reserva(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('activa', 'Activa (Check-in realizado)'),
        ('completada', 'Completada (Check-out realizado)'),
        ('cancelada', 'Cancelada'),
    ]
    
    habitacion = models.ForeignKey(Habitacion, on_delete=models.PROTECT, related_name='reservas')
    huesped = models.ForeignKey(Huesped, on_delete=models.PROTECT, related_name='reservas')
    fecha_ingreso = models.DateField()
    fecha_salida = models.DateField()
    numero_noches = models.IntegerField(blank=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    precio_noche = models.DecimalField(max_digits=10, decimal_places=2)
    precio_total = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    numero_personas = models.IntegerField()
    observaciones = models.TextField(blank=True, null=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-fecha_ingreso']
        verbose_name = 'Reserva'
        verbose_name_plural = 'Reservas'
    
    def __str__(self):
        return f"Reserva {self.id} - {self.huesped} - Habitación {self.habitacion.numero}"
    
    def save(self, *args, **kwargs):
        # Calcular número de noches
        self.numero_noches = (self.fecha_salida - self.fecha_ingreso).days
        # Calcular precio total
        self.precio_total = self.numero_noches * self.precio_noche
        # Actualizar estado de la habitación
        if self.estado in ['confirmada', 'activa']:
            self.habitacion.estado = 'reservada' if self.estado == 'confirmada' else 'ocupada'
            self.habitacion.save()
        super().save(*args, **kwargs)
    
    def hacer_checkin(self):
        """Realizar check-in de la reserva"""
        self.estado = 'activa'
        self.habitacion.estado = 'ocupada'
        self.habitacion.save()
        self.save()
    
    def hacer_checkout(self):
        """Realizar check-out de la reserva"""
        self.estado = 'completada'
        self.habitacion.estado = 'disponible'
        self.habitacion.save()
        self.save()
