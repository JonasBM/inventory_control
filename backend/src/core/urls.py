from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework.schemas import get_schema_view

urlpatterns = [
    path("api/admin/", admin.site.urls),
    path('api/', include('api.urls')),
    path('api/docs/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
    path('api/openapi/', get_schema_view(
        title="Easy Quote API",
        description="API for easy quote app…",
        version="0.1.0"
    ), name='openapi-schema'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
