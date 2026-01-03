from django.urls import path
from . import views

urlpatterns = [
    # Endpoints públicos existentes
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
    
    # Admin CRUD endpoints
    path("admin/laboratorios", views.admin_laboratorio_create),
    path("admin/laboratorios/<int:id>", views.admin_laboratorio_update),
    path("admin/laboratorios/delete/<int:id>", views.admin_laboratorio_delete),
    
    path("admin/cursos", views.admin_curso_create),
    path("admin/cursos/<int:id>", views.admin_curso_update),
    path("admin/cursos/delete/<int:id>", views.admin_curso_delete),
    
    path("admin/componentes", views.admin_componente_create),
    path("admin/componentes/<int:id>", views.admin_componente_update),
    path("admin/componentes/delete/<int:id>", views.admin_componente_delete),
    
    path("admin/materiales", views.admin_material_create),
    path("admin/materiales/<int:id>", views.admin_material_update),
    path("admin/materiales/delete/<int:id>", views.admin_material_delete),
]