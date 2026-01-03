from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.conf import settings
from .models import *  # Asegúrate de importar el modelo Laboratorio
from django.shortcuts import get_object_or_404
import ftplib
import os
import tempfile
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json

@csrf_exempt  # Permite solicitudes POST sin token CSRF (solo para desarrollo)
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return JsonResponse({'error': 'Email y contraseña son requeridos.'}, status=400)

            try:
                usuario = Usuario.objects.get(email=email)
                if usuario.password == password:
                    return JsonResponse({
                        'message': 'Login exitoso',
                        'nombre': usuario.nombre,
                        'rol': usuario.rol,
                        'admin': getattr(usuario, 'admin', False)
                    })
                else:
                    return JsonResponse({'error': 'Contraseña incorrecta'}, status=401)
            except Usuario.DoesNotExist:
                return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato JSON inválido'}, status=400)
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)

def acceder_ftp_sin_contraseña(nombre_archivo):
    ftp_host = '192.168.51.68'
    directorio_especifico = '/prueba/'

    # Conectar al servidor FTP
    ftp = ftplib.FTP(ftp_host)

    try:
        ftp.login()

        ftp.cwd(directorio_especifico)
        print(f"Accedido al directorio: {directorio_especifico}")

        # Crear un archivo temporal para descargar el archivo desde el FTP
        with tempfile.NamedTemporaryFile(delete=False) as archivo_temporal:
            # Obtener el archivo del FTP
            ftp.retrbinary(f"RETR {nombre_archivo}", archivo_temporal.write)

            # Ruta del archivo temporal (el archivo aún está en el servidor en memoria)
            archivo_temporal.close()  # Cerramos el archivo para poder usarlo después
            print(f"Archivo descargado temporalmente: {archivo_temporal.name}")
        
        ftp.quit()
        return archivo_temporal.name

    except ftplib.all_errors as e:
        print(f"Error de conexión: {e}")
        return None

# Vista para descargar el archivo
def descargar_pdf(request, nombre_archivo):
    archivo_temporal = acceder_ftp_sin_contraseña(nombre_archivo)

    if archivo_temporal and os.path.exists(archivo_temporal):
        with open(archivo_temporal, 'rb') as archivo:
            response = HttpResponse(archivo.read(), content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="{nombre_archivo}"'
        
        # Eliminar el archivo temporal después de que se haya enviado al usuario
        os.remove(archivo_temporal)
        
        return response
    else:
        return JsonResponse({'error': 'El archivo no se pudo descargar o no existe.'}, status=404)


def obtener_laboratorios(request):
    if request.method == 'GET':
        # Obtener todos los laboratorios
        laboratorios = Laboratorio.objects.all().values('id', 'nombre','titulo', 'foto1', 'foto2', 'foto3', 'descripcion')

        # Devolver los laboratorios en formato JSON
        return JsonResponse(list(laboratorios), safe=False)

    # Si el método no es GET, devolver un error
    return JsonResponse({'error': 'Método no permitido'}, status=405)

def obtener_laboratorio1(request, id):
    if request.method == 'GET':
        # Obtener el laboratorio específico por su id
        laboratorio = get_object_or_404(Laboratorio, id=id)

        # Crear un diccionario con los detalles del laboratorio
        laboratorio_data = {
            'id': laboratorio.id,
            'nombre': laboratorio.nombre,
            'titulo': laboratorio.titulo,
            'descripcion': laboratorio.descripcion,
            'foto1': laboratorio.foto1,
            'foto2': laboratorio.foto2,
            'foto3': laboratorio.foto3,
        }
        

        return JsonResponse(laboratorio_data)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

def obtener_cursos(request):        
    if request.method == 'GET':
        # Obtener todos los cursos
        cursos = Curso.objects.all().values('id', 'nombre', 'nivel_curso', 'foto1', 'foto2', 'descripcion')

        # Devolver los cursos en formato JSON
        return JsonResponse(list(cursos), safe=False)

    # Si el método no es GET, devolver un error
    return JsonResponse({'error': 'Método no permitido'}, status=405)


def obtener_materiales(request):
    if request.method == 'GET':
        # Obtener todos los materiales junto con la información del curso
        materiales = Material.objects.select_related('curso').all().values(
            'id', 'nombre', 'url', 'curso__id', 'curso__nombre'
        )

        # Devolver los materiales con la información del curso en formato JSON
        return JsonResponse(list(materiales), safe=False)

    return JsonResponse({'error': 'Método no permitido'}, status=405)



def obtener_componentes(request):
    if request.method == 'GET':
        # Obtener todos los componentes junto con los manuales asociados
        componentes = Componente.objects.all().prefetch_related('manual_set')  # Esto carga todos los manuales relacionados

        # Convertir la lista de componentes en un formato adecuado
        componentes_data = []
        for componente in componentes:
            # Agrupar los manuales por componente
            manuals = []
            for manual in componente.manual_set.all():  # Usamos `manual_set.all()` para acceder a los manuales relacionados
                manuals.append({
                    'id': manual.id,
                    'url': manual.url,
                    'nombre': manual.nombre if hasattr(manual, 'nombre') else 'Manual desconocido',  # Agregar un valor por defecto si no existe el campo
                })

            # Crear la estructura final para cada componente
            componente_data = {
                'id': componente.id,
                'nombre': componente.nombre,
                'foto1': componente.foto1,
                'foto2': componente.foto2,
                'foto3': componente.foto3,
                'descripcion': componente.descripcion,
                
                'manuals': manuals,  # Incluir los manuales asociados
            }

            # Añadir el componente con los manuales a la lista final
            componentes_data.append(componente_data)

        return JsonResponse(componentes_data, safe=False)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

def obtener_componente1(request, id):
    if request.method == 'GET':
        # Buscar el componente por su id
        componente = get_object_or_404(Componente, id=id)

        # Obtener los manuales relacionados al componente
        manuals = []
        for manual in componente.manual_set.all():  # Usamos `manual_set.all()` para acceder a los manuales relacionados
            manuals.append({
                'id': manual.id,
                'url': manual.url,
                'nombre': manual.nombre if hasattr(manual, 'nombre') else 'Manual desconocido',  # Valor por defecto si no existe el campo
            })

        # Crear la estructura final para el componente
        componente_data = {
            'id': componente.id,
            'nombre': componente.nombre,
            'foto1': componente.foto1,
            'foto2': componente.foto2,
            'foto3': componente.foto3,
            'descripcion': componente.descripcion,
            'manuals': manuals,  # Incluir los manuales asociados
        }

        # Devolver la respuesta en formato JSON
        return JsonResponse(componente_data)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt  # Si no estás usando CSRF token
@require_POST# Asegura que solo aceptes POST
def obtener_materiales_por_curso(request):
    if request.method == 'POST':
        try:
            # Decodificar los datos JSON del cuerpo de la solicitud
            data = json.loads(request.body)
            curso_id = data.get('curso_id')

            if not curso_id:
                return JsonResponse({'error': 'curso_id es necesario'}, status=400)

            # Obtener materiales para el curso específico
            materiales = Material.objects.filter(curso_id=curso_id)
            material_data = []
            for material in materiales:
                material_data.append({
                    'id': material.id,
                    'nombre': material.nombre,
                    'url': material.url,
                    'curso__id': material.curso.id,
                    'curso__nombre': material.curso.nombre,
                })
            return JsonResponse(material_data, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Formato JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)