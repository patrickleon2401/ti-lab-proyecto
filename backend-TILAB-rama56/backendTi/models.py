from django.db import models

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    rol = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"



class Laboratorio(models.Model):
    nombre = models.CharField(max_length=100)
    titulo=models.CharField(max_length=100)
    foto1 = models.URLField()
    foto2 = models.URLField()
    foto3 = models.URLField()
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

class Componente(models.Model):
    nombre = models.CharField(max_length=100)
    foto1 = models.URLField()
    foto2 = models.URLField()
    foto3 = models.URLField(null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    laboratorio = models.ForeignKey(Laboratorio, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Manual(models.Model):
    nombre = models.CharField(max_length=100, null=True, blank=True)
    url = models.CharField(max_length=200)
    componente = models.ForeignKey(Componente, on_delete=models.CASCADE)
    def __str__(self):
        return f"Manual {self.id}"

class Curso(models.Model):
    nombre = models.CharField(max_length=100)
    nivel_curso = models.CharField(max_length=50)
    foto1 = models.URLField()
    foto2 = models.URLField()
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

class Material(models.Model):
    nombre = models.CharField(max_length=100)
    url = models.CharField(max_length=200)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Admin(Usuario):
    def __init__(self, *args, **kwargs):
        # Forzar que el campo admin sea True al crear una instancia
        kwargs.setdefault('admin', True)
        kwargs.setdefault('rol', 'admin')
        super().__init__(*args, **kwargs)

    def save(self, *args, **kwargs):
        # Forzar también al guardar (por si acaso)
        self.admin = True
        self.rol = 'admin'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Admin: {self.nombre} {self.apellido}"