# Documentación del Proyecto Backend Django - TILAB

## 📋 Descripción General
Proyecto backend Django para el sistema TILAB (Laboratorio de Tecnologías de Información). Gestiona laboratorios, componentes, cursos, materiales y usuarios del sistema.

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios
```
backend-TILAB-rama56/
├── backend/              # Configuración principal de Django
│   ├── settings.py       # Configuración del proyecto
│   ├── urls.py          # URLs principales
│   └── wsgi.py          # Configuración WSGI
├── backendTi/           # Aplicación principal
│   ├── models.py        # Modelos de datos
│   ├── views.py         # Lógica de vistas
│   ├── urls.py          # URLs de la aplicación
│   ├── admin.py         # Configuración de admin
│   └── migrations/      # Migraciones de BD
├── db.sqlite3           # Base de datos SQLite
├── manage.py            # Script de gestión Django
├── requirements.txt     # Dependencias del proyecto
└── data.json           # Datos iniciales
```

## 🗄️ Modelos de Datos

### Usuario
- **Campos**: nombre, apellido, email (único), password, rol
- **Relaciones**: Clase base para Admin

### Laboratorio
- **Campos**: nombre, titulo, foto1, foto2, foto3, descripcion
- **Relaciones**: Uno a muchos con Componente

### Componente
- **Campos**: nombre, foto1, foto2, foto3 (opcional), descripcion (opcional)
- **Relaciones**: 
  - Muchos a uno con Laboratorio
  - Uno a muchos con Manual

### Manual
- **Campos**: nombre (opcional), url
- **Relaciones**: Muchos a uno con Componente

### Curso
- **Campos**: nombre, nivel_curso, foto1, foto2, descripcion
- **Relaciones**: Uno a muchos con Material

### Material
- **Campos**: nombre, url
- **Relaciones**: Muchos a uno con Curso

### Admin
- **Herencia**: Usuario
- **Características**: Rol forzado a 'admin', admin=True

## 🔌 Endpoints API

### Autenticación
- `POST /login/` - Login de usuarios
  - **Body**: {email, password}
  - **Response**: {message, nombre, rol, admin}

### Laboratorios
- `GET /obtener_laboratorios` - Listar todos los laboratorios
- `GET /obtener_laboratorio1/<id>` - Obtener laboratorio específico

### Componentes
- `GET /obtener_componentes` - Listar todos los componentes con manuales
- `GET /obtener_componente1/<id>` - Obtener componente específico con manuales

### Cursos y Materiales
- `GET /obtener_cursos` - Listar todos los cursos
- `GET /obtener_materiales` - Listar todos los materiales con info de curso
- `POST /obtener_materiales_por_curso/` - Obtener materiales por curso
  - **Body**: {curso_id}

### FTP y Descargas
- `GET /descargar_pdf/<nombre_archivo>` - Descargar PDF desde FTP
- **FTP Config**: 192.168.51.68:/prueba/

## ⚙️ Configuración

### Base de Datos
- **Motor**: SQLite3
- **Archivo**: db.sqlite3

### CORS
- **Orígenes permitidos**: 
  - localhost:3000
  - 192.168.50.43:8000/3000
  - 192.168.51.209:8000/3000
  - 192.168.51.63:8000/3000

### Hosts Permitidos
- localhost, 127.0.0.1
- 192.168.50.43, 192.168.51.209, 192.168.51.63
- 0.0.0.0

## 📦 Dependencias

```
asgiref==3.8.1
Django==5.1.3
django-cors-headers==4.6.0
sqlparse==0.5.2
typing_extensions==4.12.2
tzdata==2024.2
```

## 🚀 Instalación y Ejecución

### 1. Entorno Virtual
```bash
# Crear entorno
python -m venv venv

# Activar (Windows)
.\venv\Scripts\activate.bat

# Activar (Linux)
source venv/bin/activate
```

### 2. Instalación de Dependencias
```bash
pip install -r requirements.txt
```

### 3. Migraciones de Base de Datos
```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Ejecución del Servidor
```bash
# Desarrollo local
python manage.py runserver

# Acceso desde red
python manage.py runserver 0.0.0.0:8000
```

### 5. Datos Iniciales
```bash
# Exportar datos
python manage.py dumpdata > data.json

# Importar datos (si existe)
python manage.py loaddata data.json
```

## 👤 Usuario de Prueba
- **Email**: adminTI
- **Password**: 1234

## 🔧 Configuración Adicional

### FTP Integration
El sistema se integra con un servidor FTP para descarga de archivos:
- **Host**: 192.168.51.68
- **Directorio**: /prueba/
- **Método**: Acceso sin contraseña

### Seguridad
- **DEBUG**: True (solo desarrollo)
- **SECRET_KEY**: Exponer en producción
- **CSRF**: Deshabilitado para endpoints específicos (@csrf_exempt)

## 📝 Notas para Futuras Actualizaciones

### Pendientes de Mejora
1. **Autenticación**: Implementar JWT o tokens más seguros
2. **Validación**: Agregar validación de datos en endpoints
3. **Errores**: Mejorar manejo de errores y respuestas HTTP
4. **Testing**: Agregar pruebas unitarias y de integración
5. **Documentación**: Implementar Swagger/OpenAPI
6. **Seguridad**: 
   - Mover SECRET_KEY a variables de entorno
   - Implementar CSRF correctamente
   - Agregar rate limiting
7. **Base de Datos**: Considerar PostgreSQL para producción
8. **Logging**: Implementar sistema de logs
9. **Caching**: Agregar Redis para caché
10. **API REST**: Considerar Django REST Framework

### Nuevas Funcionalidades Sugeridas
1. Sistema de roles y permisos más granular
2. API versioning
3. Paginación en endpoints de listado
4. Búsqueda y filtrado avanzado
5. Sistema de notificaciones
6. Auditoría de cambios
7. Backup y restore de datos
8. Integración con servicios externos
9. Dashboard administrativo
10. Sistema de archivos local (alternativa a FTP)

---

**Última Actualización**: Enero 2026  
**Versión Django**: 5.1.3  
**Estado**: Desarrollo