from django.contrib.auth.models import User
from django.db import models
from django.db.models import F, Sum
from django.utils import timezone


class Client(models.Model):
    """
    Client Model
    Defines the attributes of a client
    """
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        ordering = ["name", "id"]

    def __str__(self):
        return (f'{str(self.id)} - {self.name}')


class Product(models.Model):
    """
    Product Model
    Defines the attributes of a product
    """
    name = models.CharField(max_length=255, unique=True)
    image = models.ImageField(upload_to='images', blank=True)
    unitary_price = models.DecimalField(max_digits=11, decimal_places=2)
    multiplier = models.PositiveSmallIntegerField(default=1, blank=True)
    allow_oversell = models.BooleanField(default=True, blank=True)

    class Meta:
        ordering = ["name", "id"]

    def __str__(self):
        return (f'{str(self.id)} - {self.name}')

    @property
    def remain(self):
        """Return the remain inventory"""
        inventory = self.inventory.aggregate(
            amount=Sum('quantity'))['amount'] or 0
        sells = self.product_order.aggregate(
            amount=Sum('quantity'))['amount'] or 0
        return (inventory - sells)


class Inventory(models.Model):
    """
    Inventory Model
    Defines the attributes of a inventory
    """
    product = models.ForeignKey(
        Product, related_name="inventory", on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    date = models.DateTimeField(default=timezone.now, blank=True)

    class Meta:
        ordering = ["date", "product", "id"]

    def __str__(self):
        return (f'{str(self.date)} - {self.product} - {self.quantity}')


class Order(models.Model):
    """
    Order Model
    Defines the attributes of a order
    """
    seller = models.ForeignKey(
        User, related_name="orders", on_delete=models.CASCADE)
    client = models.ForeignKey(
        Client, related_name="orders", on_delete=models.CASCADE)
    products = models.ManyToManyField(
        Product, related_name='orders', through='ProductOrder')
    date = models.DateTimeField(default=timezone.now, blank=True)
    opened = models.BooleanField(default=True, blank=True)

    class Meta:
        ordering = ["date", "seller", "client", "id"]

    def __str__(self):
        return (f'{str(self.date)} - {self.seller}')

    @property
    def total(self):
        """Return the total price of the order"""
        sells = self.product_order.aggregate(
            amount=Sum(F('quantity') * F('unitary_price_sell')))['amount'] or 0
        return (sells)


class ProductOrder(models.Model):
    """
    ProductOrder Model
    Defines the attributes of a relationship between products and orders
    """
    product = models.ForeignKey(
        Product, related_name='product_order', on_delete=models.CASCADE)
    order = models.ForeignKey(
        Order, related_name='product_order', on_delete=models.CASCADE)
    unitary_price_sell = models.DecimalField(max_digits=11, decimal_places=2)
    quantity = models.PositiveIntegerField()
    rentability = models.DecimalField(
        max_digits=5, decimal_places=2, blank=True, null=True)

    class Meta:
        ordering = ["order", "product", "id"]
        models.UniqueConstraint(
            fields=['order', 'product'], name='unique_product')

    def __str__(self):
        return (f'{str(self.order)} - {self.product}')
