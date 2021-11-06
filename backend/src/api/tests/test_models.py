from api import models
from django.contrib.auth.models import User
from django.test import TestCase


class ClientTestCase(TestCase):
    """Test module for Client model"""

    def setUp(self):
        """Create client for test"""
        self.client = models.Client.objects.create(name='Darth Vader')

    def test_object_print(self):
        """Get client to test object print"""
        self.assertEqual(str(self.client),
                         f'{str(self.client.id)} - {self.client.name}')


class ProductTestCase(TestCase):
    """Test module for Product model"""

    def setUp(self):
        """Create User, clients and products for test"""
        self.seller = User.objects.create_user(
            "test_user", email=None, password=None)

        self.client_vader = models.Client.objects.create(name='Darth Vader')
        self.client_kenobi = models.Client.objects.create(
            name='Obi-Wan Kenobi')

        self.product_millenium = models.Product.objects.create(
            name='Millenium Falcon', unitary_price=1501.25)
        self.product_wing = models.Product.objects.create(
            name='X-Wing', unitary_price=32.00)
        self.product_destroyer = models.Product.objects.create(
            name='Super Star Destroyer', unitary_price=99446406.35)

    def test_object_print(self):
        """Get product to test object print"""
        self.assertEqual(str(self.product_millenium),
                         f'{str(self.product_millenium.id)} - {self.product_millenium.name}')

    def test_no_inventory(self):
        """Get products, without create inventory, to test empty inventory"""
        self.assertEqual(self.product_millenium.remain, 0)
        self.assertEqual(self.product_wing.remain, 0)
        self.assertEqual(self.product_destroyer.remain, 0)

    def test_add_inventory(self):
        """Get products, create inventory, test the remain, without orders"""
        models.Inventory.objects.create(
            product=self.product_millenium, quantity=10)
        models.Inventory.objects.create(product=self.product_wing, quantity=99)
        self.assertEqual(self.product_millenium.remain, 10)
        self.assertEqual(self.product_wing.remain, 99)
        self.assertEqual(self.product_destroyer.remain, 0)

        models.Inventory.objects.create(
            product=self.product_millenium, quantity=99)
        self.assertEqual(self.product_millenium.remain, 109)

    def test_remain(self):
        """Get products, create inventory and orders, test the remain subtraction orders from inventory"""
        models.Inventory.objects.create(
            product=self.product_millenium, quantity=10)
        models.Inventory.objects.create(product=self.product_wing, quantity=99)
        models.Inventory.objects.create(
            product=self.product_millenium, quantity=99)

        order1 = models.Order.objects.create(
            seller=self.seller, client=self.client_vader)
        order2 = models.Order.objects.create(
            seller=self.seller, client=self.client_kenobi)

        models.ProductOrder.objects.create(
            product=self.product_millenium, order=order1, unitary_price_sell=10.00, quantity=10)
        models.ProductOrder.objects.create(
            product=self.product_destroyer, order=order1, unitary_price_sell=10.00, quantity=20)
        self.assertEqual(self.product_millenium.remain, 99)
        self.assertEqual(self.product_wing.remain, 99)
        self.assertEqual(self.product_destroyer.remain, -20)

        models.ProductOrder.objects.create(
            product=self.product_wing, order=order2, unitary_price_sell=10.00, quantity=10)
        self.assertEqual(self.product_millenium.remain, 99)
        self.assertEqual(self.product_wing.remain, 89)
        self.assertEqual(self.product_destroyer.remain, -20)


class InventoryTestCase(TestCase):
    """Test module for Inventory model"""

    def setUp(self):
        """Create inventory for test"""
        product_millenium = models.Product.objects.create(
            name='Millenium Falcon', unitary_price=1501.25)
        self.inventory = models.Inventory.objects.create(
            product=product_millenium, quantity=10)

    def test_object_print(self):
        """Get inventory to test object print"""
        self.assertEqual(
            str(self.inventory),
            f'{str(self.inventory.date)} - {self.inventory.product} - {self.inventory.quantity}'
        )


class OrderTestCase(TestCase):
    """Test module for Order model"""

    def setUp(self):
        """Create order and products for test"""
        seller = User.objects.create_user(
            "test_user", email=None, password=None)
        client_vader = models.Client.objects.create(name='Darth Vader')
        self.order = models.Order.objects.create(
            seller=seller, client=client_vader)

        self.product_millenium = models.Product.objects.create(
            name='Millenium Falcon', unitary_price=1501.25)
        self.product_wing = models.Product.objects.create(
            name='X-Wing', unitary_price=32.00)

    def test_object_print(self):
        """Get order to test object print"""
        self.assertEqual(
            str(self.order), f'{str(self.order.date)} - {self.order.seller}')

    def test_total_price(self):
        """Get order to test object print"""

        models.ProductOrder.objects.create(
            product=self.product_millenium, order=self.order, unitary_price_sell=10.00, quantity=10)
        self.assertEqual(self.order.total, 100)

        models.ProductOrder.objects.create(
            product=self.product_wing, order=self.order, unitary_price_sell=20.00, quantity=5)
        self.assertEqual(self.order.total, 200)


class ProductOrderTestCase(TestCase):
    """Test module for ProductOrder model"""

    def setUp(self):
        """Create productorder relationship for test"""
        seller = User.objects.create_user(
            "test_user", email=None, password=None)
        client_vader = models.Client.objects.create(name='Darth Vader')
        product_millenium = models.Product.objects.create(
            name='Millenium Falcon', unitary_price=1501.25)
        order = models.Order.objects.create(seller=seller, client=client_vader)
        self.productorder = models.ProductOrder.objects.create(
            product=product_millenium, order=order, unitary_price_sell=10.00, quantity=10)

    def test_object_print(self):
        """Get productorder to test object print"""
        self.assertEqual(str(self.productorder),
                         f'{str(self.productorder.order)} - {self.productorder.product}')
