from decimal import Decimal

from api import models, serializers
from django.conf import settings
from django.test import TestCase

from . import factory


class ClientSerializerTestCase(TestCase):
    """Test module for ProductOrderSerializer serializer"""

    def setUp(self):
        """Create client data for test"""
        self.serializer_data = {
            'name': 'Darth Vader',
        }

    def test_contains_expected_fields(self):
        """Test expected fields"""
        serializer = serializers.ClientSerializer(data=self.serializer_data)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(set(serializer.data.keys()), set(['name']))


class ProductSerializerTestCase(TestCase):
    """Test module for ProductOrderSerializer serializer"""

    def setUp(self):
        """Create product data for test"""
        self.serializer_data = {
            'name': 'Millenium Falcon',
            'unitary_price': 100,
            'multiplier': 2,
            'allow_oversell': True,
        }

    def test_contains_expected_fields(self):
        """Test expected fields"""
        serializer = serializers.ProductSerializer(data=self.serializer_data)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(set(serializer.data.keys()), set(
            ['name', 'unitary_price', 'multiplier', 'allow_oversell', "image"]))


class ProductOrderSerializerTestCase(TestCase):
    """Test module for ProductOrderSerializer serializer"""

    def setUp(self):
        """Create productorder relationship for test"""

        self.product_no_oversell = factory.ProducFactory.create(
            allow_oversell=False)
        self.product_oversell = factory.ProducFactory.create(
            allow_oversell=True)
        self.clients = factory.ClientFactory.create_batch(2)
        self.sellers = factory.SellerFactory.create_batch(2)

        self.order0 = models.Order.objects.create(
            seller=self.sellers[0], client=self.clients[0])

        self.inventory = factory.InventoryFactory.create(
            product=self.product_no_oversell,
            quantity=self.product_no_oversell.multiplier
        )

        self.serializer_data_no_oversell = {
            'product': self.product_no_oversell.id,
            'order': self.order0.id,
            'unitary_price_sell': self.product_no_oversell.unitary_price,
            'quantity': self.product_no_oversell.multiplier
        }

        self.serializer_data_oversell = {
            'product': self.product_oversell.id,
            'order': self.order0.id,
            'unitary_price_sell': self.product_oversell.unitary_price,
            'quantity': self.product_oversell.multiplier
        }

    def test_contains_expected_fields(self):
        """Test expected fields"""
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_no_oversell)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(set(serializer.data.keys()), set(
            ['product', 'order', 'unitary_price_sell', 'quantity', 'rentability']))

    def test_wrong_multiplier(self):
        """Test wrong multiplier for the order"""
        self.serializer_data_no_oversell["quantity"] = self.product_no_oversell.multiplier + 1
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_no_oversell)
        self.assertEqual(serializer.is_valid(), False)
        self.assertEqual(set(serializer.errors.keys()), set(['quantity']))

    def test_correct_multiplier(self):
        """Test correct multiplier for the order"""
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_no_oversell)
        self.assertEqual(serializer.is_valid(), True)

    def test_wrong_inventory(self):
        """Test wrong Inventory for the order"""
        self.serializer_data_no_oversell["quantity"] = self.product_no_oversell.multiplier*2
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_no_oversell)
        self.assertEqual(serializer.is_valid(), False)
        self.assertEqual(set(serializer.errors.keys()), set(['quantity']))

    def test_correct_inventory(self):
        """Test correct Inventory for the order"""
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_no_oversell)
        self.assertEqual(serializer.is_valid(), True)

    def test_wrong_inventory_but_allow_oversell(self):
        """Test wrong Inventory for the order, but allowing oversell"""
        self.serializer_data_oversell["quantity"] = self.product_oversell.multiplier*2
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_oversell)
        self.assertEqual(serializer.is_valid(), True)

    def test_wrong_price(self):
        """Test wrong price for the order"""
        unitary_price = self.product_oversell.unitary_price
        self.serializer_data_oversell["unitary_price_sell"] = '{0:.2f}'.format(
            unitary_price * settings.PRICE_THRESHOLD * Decimal(0.90)
        )
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_oversell)
        self.assertEqual(serializer.is_valid(), False)
        self.assertEqual(set(serializer.errors.keys()),
                         set(['unitary_price_sell']))

    def test_correct_price(self):
        """Test correct price for the order"""
        unitary_price = self.product_oversell.unitary_price
        self.serializer_data_oversell["unitary_price_sell"] = '{0:.2f}'.format(
            unitary_price * settings.PRICE_THRESHOLD
        )
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_oversell)
        self.assertEqual(serializer.is_valid(), True)
