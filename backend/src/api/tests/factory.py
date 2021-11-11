import factory
from django.contrib.auth.models import User
from api import models


class SellerFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: 'username%s' % n)
    first_name = factory.Sequence(lambda n: 'firstname%s' % n)
    last_name = factory.Sequence(lambda n: 'lastname%s' % n)
    email = factory.LazyAttribute(lambda o: '%s@example.org' % o.username)
    password = factory.PostGenerationMethodCall(
        'set_password', str(factory.Sequence(lambda n: 'password%s' % n)))


class ClientFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Client

    name = factory.Sequence(lambda n: 'name%s' % n)


class ProducFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Product

    name = factory.Sequence(lambda n: 'name%s' % n)
    unitary_price = factory.Sequence(lambda n: n*100)
    multiplier = factory.Sequence(lambda n: n)
    allow_oversell = True


class InventoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Inventory

    product = factory.SubFactory(ProducFactory)
    quantity = factory.Sequence(lambda n: n*10)


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.Order

    seller = factory.SubFactory(SellerFactory)
    client = factory.SubFactory(ClientFactory)
    opened = True


class ProductOrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = models.ProductOrder

    product = factory.SubFactory(ProducFactory)
    order = factory.SubFactory(OrderFactory)
    unitary_price_sell = factory.Sequence(lambda n: n*100)
    quantity = factory.Sequence(lambda n: n*10)
