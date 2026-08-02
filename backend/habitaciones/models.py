from django.db import models

class Habitacion(models.Model):
    TIPO_CHOICES = [
        ('sencilla', 'Sencilla'),
        ('doble', 'Doble'),
        ('suite', 'Suite'),
        ('presidencial', 'Presidencial'),
    ]
    
    ESTADO_CHOICES = [
        ('disponible', 'Disponible'),
        ('ocupada', 'Ocupada'),
        ('reservada', 'Reservada'),
        ('mantenimiento', 'Mantenimiento'),
    ]
    
    numero = models.CharField(max_length=10, unique=True)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='disponible')
    capacidad = models.IntegerField()
    descripcion = models.TextField(blank=True, null=True)
    amenidades = models.TextField(blank=True, null=True)
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['numero']
        verbose_name = 'Habitación'
        verbose_name_plural = 'Habitaciones'
    
    def __str__(self):
        return f"Habitación {self.numero} - {self.tipo}"
