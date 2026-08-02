from django.db import models

class Empleado(models.Model):
    CARGO_CHOICES = [
        ('recepcionista', 'Recepcionista'),
        ('administrador', 'Administrador'),
        ('limpieza', 'Personal de Limpieza'),
        ('seguridad', 'Seguridad'),
        ('mantenimiento', 'Mantenimiento'),
    ]
    
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    cargo = models.CharField(max_length=20, choices=CARGO_CHOICES)
    telefono = models.CharField(max_length=15)
    correo = models.EmailField()
    numero_documento = models.CharField(max_length=20, unique=True)
    fecha_ingreso = models.DateField()
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.BooleanField(default=True)  # Activo/Inactivo
    creado = models.DateTimeField(auto_now_add=True)
    actualizado = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['nombre', 'apellido']
        verbose_name = 'Empleado'
        verbose_name_plural = 'Empleados'
    
    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.cargo}"
    
    def nombre_completo(self):
        return f"{self.nombre} {self.apellido}"
