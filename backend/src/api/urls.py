
from django.urls import include, path
from django.views.generic import TemplateView
from rest_framework import routers
from rest_framework.schemas import get_schema_view

from api.views import authviews, viewsets

router = routers.DefaultRouter()

router.register(r"client", viewsets.ClientViewSet, "client")
router.register(r"product", viewsets.ProductViewSet, "product")
router.register(r"inventory", viewsets.InventoryViewSet, "inventory")
router.register(r"order", viewsets.OrderViewSet, "order")
router.register(r"productorder", viewsets.ProductOrderViewSet, "productorder")

urlpatterns = [
    path("auth/", include("knox.urls")),
    path("auth/changepassword/", authviews.ChangePasswordView.as_view()),
    path('', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
    path('openapi/', get_schema_view(
        title="Inventory Control API",
        description="API for inventory control…",
        version="0.1.0"
    ), name='openapi-schema'),
]


urlpatterns += router.urls
