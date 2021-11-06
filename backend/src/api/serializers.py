from django.contrib.auth.models import User
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from api import models
from django.db import transaction
from django.conf import settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "first_name",
            "last_name",
        )
        read_only_fields = (
            "id",
            "first_name",
            "last_name",
        )


class UserDetailsSerializer(serializers.ModelSerializer):
    last_login = serializers.DateTimeField(
        read_only=True, format="%Y-%m-%dT%H:%M")
    date_joined = serializers.DateTimeField(
        read_only=True, format="%Y-%m-%dT%H:%M")

    class Meta:
        model = User
        exclude = ("password",)
        read_only_fields = (
            "last_login",
            "date_joined",
            "is_superuser",
            "groups",
            "user_permissions",
        )


class ChangePasswordSerializer(serializers.Serializer):
    model = User
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Client
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = "__all__"


class InventorySerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")

    class Meta:
        model = models.Inventory
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(format="%Y-%m-%dT%H:%M")

    class Meta:
        model = models.Order
        fields = "__all__"


class ProductOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ProductOrder
        fields = "__all__"

    @transaction.atomic
    def create(self, validated_data):
        product = models.Product.objects.get(pk=validated_data["product"])
        rentability = validated_data["unitary_price_sell"] / \
            product["unitary_price"]
        validated_data["rentability"] = rentability
        return models.Product.objects.create(**validated_data)

    def validate_multiplier(self, data):
        """Check if the quantity is a multiple of the product multiplier"""
        product_id = self.initial_data['product']
        try:
            product = models.Product.objects.get(pk=product_id)
        except models.Product.DoesNotExist:
            raise serializers.ValidationError(
                {"product_id": _(f'Product (pk={product_id}) not found.')})
        multiplier = product.multiplier
        if data["quantity"] % multiplier != 0:
            raise serializers.ValidationError(
                {"quantity": _(f'Quantity must be a multiple of {multiplier}.')})

    def validate_inventory(self, data):
        """Check if the product has inventory for the order"""
        product_id = self.initial_data['product']
        try:
            product = models.Product.objects.get(pk=product_id)
        except models.Product.DoesNotExist:
            raise serializers.ValidationError(
                {"product_id": _(f'Product (pk={product_id}) not found.')})

        if (not product.allow_oversell) and (product.remain < data["quantity"]):
            raise serializers.ValidationError(
                {"quantity": _(f'Quantity must be less than the inventory ({product.remain}).')})

    def validate_price(self, data):
        """Check if the product has rentability above the threshold"""
        product_id = self.initial_data['product']
        try:
            product = models.Product.objects.get(pk=product_id)
        except models.Product.DoesNotExist:
            raise serializers.ValidationError(
                {"product_id": _(f'Product (pk={product_id}) not found.')})

        if (settings.PRICE_THRESHOLD > data["unitary_price_sell"]/product.unitary_price):
            raise serializers.ValidationError(
                {"unitary_price_sell": _(f'Price must be above {product.unitary_price*settings.PRICE_THRESHOLD}.')})

    def validate(self, data):
        self.validate_multiplier(data)
        self.validate_inventory(data)
        self.validate_price(data)
        return data
