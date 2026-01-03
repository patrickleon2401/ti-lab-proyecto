from django.contrib import admin
from .models import *

# Registra los modelos
admin.site.register(Usuario)
admin.site.register(Manual)
admin.site.register(Laboratorio)
admin.site.register(Componente)
admin.site.register(Curso)
admin.site.register(Material)
