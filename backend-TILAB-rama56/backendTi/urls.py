from django.urls import path
from . import views
urlpatterns = [
    path("obtener_laboratorios", views.obtener_laboratorios),
    path("obtener_cursos", views.obtener_cursos),
    path("obtener_materiales", views.obtener_materiales),
    
    path("obtener_componentes", views.obtener_componentes),
    path("obtener_componente1/<int:id>", views.obtener_componente1),
    path("obtener_laboratorio1/<int:id>", views.obtener_laboratorio1),
    path('descargar_pdf/', views.descargar_pdf),
    path('descargar_pdf/<str:nombre_archivo>', views.descargar_pdf),
    path('obtener_materiales_por_curso/', views.obtener_materiales_por_curso),
    path('login/', views.login_view),
]