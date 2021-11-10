from api import models, serializers
from api.views.permissions import (IsSellerAndOrderIsOpenForOrder,
                                   IsSellerAndOrderIsOpenForProductOrder,
                                   IsUser)
from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    CRUD view for User Model
    Allowed for own user profile or admin for all profiles
    """
    permission_classes = [
        permissions.IsAdminUser | IsUser,
    ]
    serializer_class = serializers.UserProfileSerializer

    def get_queryset(self):
        """
        Sort User model
        Remove superuser if the request user is not a superuser
        """
        queryset = User.objects.order_by(
            "first_name",
            "last_name",
            "username",
        )
        if self.request.user.is_superuser:
            return queryset.all()
        elif self.request.user.is_staff:
            return queryset.filter(is_superuser=False).all()
        else:
            return User.objects.filter(id=self.request.user.id).all()

    def create(self, request, *args, **kwargs):
        """
        Allow creation just for Admin users
        """
        if self.request.user.is_staff:
            password = None
            if "password" in request.data.keys():
                password = request.data.pop("password")
            response = super(UserProfileViewSet, self).create(
                request, *args, **kwargs)
            if password:
                user = User.objects.filter(id=response.data["id"]).first()
                if user:
                    user.set_password(password)
                    user.save()
                    return response
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

    def update(self, request, *args, **kwargs):
        """
        Allow update of own user, excluding fields: is_superuser, is_staff,
        is_active, groups, user_permissions and password;
        Allow update of any user for Admin users
        """
        if not self.request.user.is_staff:
            request.data.pop("is_superuser")
            request.data.pop("is_staff")
            request.data.pop("is_active")
            request.data.pop("groups")
            request.data.pop("user_permissions")
        else:
            password = None
            if "password" in request.data.keys():
                password = request.data.pop("password")
            if password:
                user = User.objects.filter(id=request.data["id"]).first()
                if user:
                    user.set_password(password)
                    user.save()
        return super(UserProfileViewSet, self).update(request, *args, **kwargs)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Retrieve and List view for limited User Model
    Allowed for authenticated users
    """
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        """
        Remove superuser if the request user is not a superuser
        """
        queryset = User.objects.order_by(
            "first_name",
            "last_name",
            "username",
        )
        if self.request.user.is_superuser:
            return queryset.all()
        else:
            return queryset.filter(is_superuser=False).all()


class ClientViewSet(viewsets.ModelViewSet):
    """
    CRUD view for Client Model
    Allowed for authenticated users
    """
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.ClientSerializer

    def get_queryset(self):
        queryset = models.Client.objects

        # Filter client by name proximity (search)
        # unaccented, ignore case
        name = self.request.query_params.get("name", None)
        if name:
            queryset = queryset.filter(name__unaccent__icontains=name)

        return queryset.all()


class ProductViewSet(viewsets.ModelViewSet):
    """
    CRUD view for Product Model
    Allowed for authenticated users
    """
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.ProductSerializer

    def get_queryset(self):
        queryset = models.Product.objects

        # Filter product by name proximity (search)
        # unaccented, ignore case
        name = self.request.query_params.get("name", None)
        if name:
            queryset = queryset.filter(name__unaccent__icontains=name)

        return queryset.all()


class InventoryViewSet(viewsets.ModelViewSet):
    """
    CRUD view for Inventory Model
    Allowed for authenticated users
    """
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = serializers.InventorySerializer

    def get_queryset(self):
        queryset = models.Inventory.objects

        # Filter inventory of a determined product, by product id
        product_id = self.request.query_params.get("product_id", None)
        if product_id:
            queryset = queryset.filter(product__id=product_id)

        return queryset.all()


class OrderViewSet(viewsets.ModelViewSet):
    """
    CRUD view for Order Model
    Allow create, list, reatrive for authenticated users
    Allow delete and update for authenticated users, only if the order is still open and is seller
    Allow delete and update for admin users, even if order is not open and not seller
    """
    permission_classes = [permissions.IsAdminUser |
                          IsSellerAndOrderIsOpenForOrder, ]
    serializer_class = serializers.OrderSerializer

    def get_queryset(self):
        queryset = models.Order.objects

        # Filter order of a determined seller, by seller id
        seller_id = self.request.query_params.get("seller_id", None)
        if seller_id:
            queryset = queryset.filter(seller__id=seller_id)

        # Filter order of a determined client, by client id
        client_id = self.request.query_params.get("client_id", None)
        if client_id:
            queryset = queryset.filter(client__id=client_id)

        # Filter order of a determined product, by product id
        product_id = self.request.query_params.get("product_id", None)
        if product_id:
            queryset = queryset.distinct().filter(product_order__product__id=product_id)

        return queryset.all()


class ProductOrderViewSet(viewsets.ModelViewSet):
    """
    CRUD view for ProductOrder Model
    Allow create, list, reatrive for authenticated users
    Allow delete and update for authenticated users, only if the order is still open and is seller
    Allow delete and update for admin users, even if order is not open and not seller
    """
    permission_classes = [permissions.IsAdminUser |
                          IsSellerAndOrderIsOpenForProductOrder, ]
    serializer_class = serializers.ProductOrderSerializer

    def get_queryset(self):
        queryset = models.ProductOrder.objects

        # Filter productorder of a determined order, by order id
        order_id = self.request.query_params.get("order_id", None)
        if order_id:
            queryset = queryset.filter(order__id=order_id)

        # Filter productorder of a determined product, by product id
        product_id = self.request.query_params.get("product_id", None)
        if product_id:
            queryset = queryset.filter(product__id=product_id)

        return queryset.all()
