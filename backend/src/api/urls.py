
from django.urls import include, path
from rest_framework import routers

from api.views import authviews, generics, viewsets

router = routers.DefaultRouter()

router.register(r"user", viewsets.UserViewSet, "user")
router.register(r"userprofile", viewsets.UserProfileViewSet, "userprofile")
router.register(r"client", viewsets.ClientViewSet, "client")
router.register(r"product", viewsets.ProductViewSet, "product")
router.register(r"inventory", viewsets.InventoryViewSet, "inventory")
router.register(r"order", viewsets.OrderViewSet, "order")
router.register(r"productorder", viewsets.ProductOrderViewSet, "productorder")

urlpatterns = [
    path(
        "auth/changepassword/",
        authviews.ChangePasswordView.as_view(),
        name='changepassword'
    ),
    path("auth/login/", authviews.LoginView.as_view(), name='knox_login'),
    path("auth/", include("knox.urls")),
    path("config/", generics.GetConfig.as_view(), name='config'),
]


urlpatterns += router.urls
