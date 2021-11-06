from rest_framework import permissions, viewsets
from api import models, serializers
from api.views.permissions import IsSellerAndOrderIsOpenForOrder, IsSellerAndOrderIsOpenForProductOrder


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
