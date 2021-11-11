from api import models
from django.test import TestCase

from . import factory


class ClientTestCase(TestCase):
    """Test module for Client model"""

    def setUp(self):
        """Create client for test"""
        self.client = factory.ClientFactory.create()

    def test_object_print(self):
        """Get client to test object print"""
        self.assertEqual(
            str(self.client),
            f'{str(self.client.id)} - {self.client.name}'
        )


class ProductTestCase(TestCase):
    """Test module for Product model"""

    def setUp(self):
        """Create User, clients and products for test"""

        self.products = factory.ProducFactory.create_batch(3)
        self.clients = factory.ClientFactory.create_batch(2)
        self.sellers = factory.SellerFactory.create_batch(2)

    def test_object_print(self):
        """Get product to test object print"""
        self.assertEqual(str(self.products[0]),
                         f'{str(self.products[0].id)} - {self.products[0].name}')

    def test_no_inventory(self):
        """Get products, without create inventory, to test empty inventory"""
        self.assertEqual(self.products[0].remain, 0)
        self.assertEqual(self.products[1].remain, 0)
        self.assertEqual(self.products[2].remain, 0)

    def test_add_inventory(self):
        """Get products, create inventory, test the remain, without orders"""
        factory.InventoryFactory.create(
            product=self.products[0], quantity=self.products[0].multiplier)
        factory.InventoryFactory.create(
            product=self.products[1], quantity=self.products[1].multiplier*2)
        self.assertEqual(self.products[0].remain, self.products[0].multiplier)
        self.assertEqual(
            self.products[1].remain,
            self.products[1].multiplier*2
        )
        self.assertEqual(self.products[2].remain, 0)

        factory.InventoryFactory.create(
            product=self.products[0], quantity=self.products[0].multiplier)
        self.assertEqual(
            self.products[0].remain,
            self.products[0].multiplier*2
        )

    def test_remain(self):
        """Get products, create inventory and orders, test the remain subtraction orders from inventory"""
        factory.InventoryFactory.create(
            product=self.products[0], quantity=self.products[0].multiplier*2)
        factory.InventoryFactory.create(
            product=self.products[1], quantity=self.products[1].multiplier*3)
        factory.InventoryFactory.create(
            product=self.products[2], quantity=self.products[2].multiplier)

        order0 = models.Order.objects.create(
            seller=self.sellers[0], client=self.clients[0])
        order1 = models.Order.objects.create(
            seller=self.sellers[0], client=self.clients[1])

        factory.ProductOrderFactory.create(
            order=order0,
            product=self.products[0],
            unitary_price_sell=self.products[0].unitary_price,
            quantity=self.products[0].multiplier
        )
        factory.ProductOrderFactory.create(
            order=order0,
            product=self.products[1],
            unitary_price_sell=self.products[1].unitary_price,
            quantity=self.products[1].multiplier
        )
        factory.ProductOrderFactory.create(
            order=order0,
            product=self.products[2],
            unitary_price_sell=self.products[2].unitary_price,
            quantity=self.products[2].multiplier*2
        )

        self.assertEqual(self.products[0].remain, self.products[0].multiplier)
        self.assertEqual(self.products[1].remain,
                         self.products[1].multiplier*2)
        self.assertEqual(self.products[2].remain,
                         self.products[2].multiplier*(-1))

        factory.ProductOrderFactory.create(
            order=order1,
            product=self.products[1],
            unitary_price_sell=self.products[1].unitary_price,
            quantity=self.products[1].multiplier
        )
        self.assertEqual(self.products[0].remain, self.products[0].multiplier)
        self.assertEqual(self.products[1].remain, self.products[1].multiplier)
        self.assertEqual(
            self.products[2].remain,
            self.products[2].multiplier*(-1)
        )


class InventoryTestCase(TestCase):
    """Test module for Inventory model"""

    def setUp(self):
        """Create inventory for test"""
        self.products = factory.ProducFactory.create_batch(3)
        self.inventory = factory.InventoryFactory.create(
            product=self.products[0], quantity=self.products[0].multiplier*2)

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
        self.products = factory.ProducFactory.create_batch(3)
        self.clients = factory.ClientFactory.create_batch(2)
        self.sellers = factory.SellerFactory.create_batch(2)

        self.order0 = models.Order.objects.create(
            seller=self.sellers[0], client=self.clients[0])
        self.order1 = models.Order.objects.create(
            seller=self.sellers[0], client=self.clients[1])

    def test_object_print(self):
        """Get order to test object print"""
        self.assertEqual(
            str(self.order0), f'{str(self.order0.date)} - {self.order0.seller}')

    def test_total_price(self):
        """Test total property print"""

        factory.ProductOrderFactory.create(
            order=self.order0,
            product=self.products[0],
            unitary_price_sell=self.products[0].unitary_price,
            quantity=self.products[0].multiplier
        )
        self.assertEqual(
            self.order0.total,
            self.products[0].unitary_price*self.products[0].multiplier
        )

        factory.ProductOrderFactory.create(
            order=self.order0,
            product=self.products[1],
            unitary_price_sell=self.products[1].unitary_price,
            quantity=self.products[1].multiplier
        )
        self.assertEqual(
            self.order0.total,
            self.products[0].unitary_price*self.products[0].multiplier +
            self.products[1].unitary_price*self.products[1].multiplier
        )


class ProductOrderTestCase(TestCase):
    """Test module for ProductOrder model"""

    def setUp(self):
        """Create productorder relationship for test"""
        self.products = factory.ProducFactory.create_batch(3)
        self.clients = factory.ClientFactory.create_batch(2)
        self.sellers = factory.SellerFactory.create_batch(2)

        self.order0 = models.Order.objects.create(
            seller=self.sellers[0], client=self.clients[0])

        self.productorder0 = factory.ProductOrderFactory.create(
            order=self.order0,
            product=self.products[0],
            unitary_price_sell=self.products[0].unitary_price,
            quantity=self.products[0].multiplier
        )

    def test_object_print(self):
        """Get productorder to test object print"""
        self.assertEqual(str(self.productorder0),
                         f'{str(self.productorder0.order)} - {self.productorder0.product}')
