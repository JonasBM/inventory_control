from decimal import Decimal

from api import models, serializers
from django.conf import settings
from django.contrib.auth.models import User
from django.test import TestCase


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
            ['name', 'unitary_price', 'multiplier', 'allow_oversell']))


class ProductOrderSerializerTestCase(TestCase):
    """Test module for ProductOrderSerializer serializer"""

    def setUp(self):
        """Create productorder relationship for test"""
        seller = User.objects.create_user(
            "test_user", email=None, password=None)
        client_vader = models.Client.objects.create(name='Darth Vader')
        self.product_millenium_no_oversell = models.Product.objects.create(
            name='Millenium Falcon', unitary_price=100, multiplier=2, allow_oversell=False)
        self.product_millenium_oversell = models.Product.objects.create(
            name='Millenium Falcon Oversell', unitary_price=100, multiplier=2, allow_oversell=True)
        order = models.Order.objects.create(
            seller=seller, client=client_vader)
        models.Inventory.objects.create(
            product=self.product_millenium_no_oversell, quantity=10)

        self.serializer_data_not_allow_oversell = {
            'product': self.product_millenium_no_oversell.id,
            'order': order.id,
            'unitary_price_sell': 100,
            'quantity': 10
        }

        self.serializer_data_allow_oversell = {
            'product': self.product_millenium_oversell.id,
            'order': order.id,
            'unitary_price_sell': 100,
            'quantity': 10
        }

    def test_contains_expected_fields(self):
        """Test expected fields"""
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_not_allow_oversell)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(set(serializer.data.keys()), set(
            ['product', 'order', 'unitary_price_sell', 'quantity', 'rentability']))

    def test_wrong_multiplier(self):
        """Test wrong multiplier for the order"""
        self.serializer_data_not_allow_oversell["quantity"] = 9
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_not_allow_oversell)
        self.assertEqual(serializer.is_valid(), False)
        self.assertEqual(set(serializer.errors.keys()), set(['quantity']))

    def test_correct_multiplier(self):
        """Test correct multiplier for the order"""
        self.serializer_data_not_allow_oversell["quantity"] = 10
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_not_allow_oversell)
        self.assertEqual(serializer.is_valid(), True)

    def test_wrong_inventory(self):
        """Test wrong Inventory for the order"""
        self.serializer_data_not_allow_oversell["quantity"] = 12
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_not_allow_oversell)
        self.assertEqual(serializer.is_valid(), False)
        self.assertEqual(set(serializer.errors.keys()), set(['quantity']))

    def test_correct_inventory(self):
        """Test correct Inventory for the order"""
        self.serializer_data_not_allow_oversell["quantity"] = 10
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_not_allow_oversell)
        self.assertEqual(serializer.is_valid(), True)

    def test_wrong_inventory_but_allow_oversell(self):
        """Test wrong Inventory for the order, but allowing oversell"""
        self.serializer_data_allow_oversell["quantity"] = 12
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_allow_oversell)
        self.assertEqual(serializer.is_valid(), True)

    def test_wrong_price(self):
        """Test wrong price for the order"""
        unitary_price = self.product_millenium_oversell.unitary_price
        self.serializer_data_allow_oversell["unitary_price_sell"] = '{0:.2f}'.format(
            unitary_price * settings.PRICE_THRESHOLD * Decimal(0.90)
        )
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_allow_oversell)
        self.assertEqual(serializer.is_valid(), False)
        self.assertEqual(set(serializer.errors.keys()),
                         set(['unitary_price_sell']))

    def test_correct_price(self):
        """Test correct price for the order"""
        unitary_price = self.product_millenium_oversell.unitary_price
        self.serializer_data_allow_oversell["unitary_price_sell"] = '{0:.2f}'.format(
            unitary_price * settings.PRICE_THRESHOLD
        )
        serializer = serializers.ProductOrderSerializer(
            data=self.serializer_data_allow_oversell)
        self.assertEqual(serializer.is_valid(), True)

    # def test_calculated_rentability(self):
    #     """Test calculated rentability on productorder create"""
    #     serializer = serializers.ProductOrderSerializer(
    #         data=self.serializer_data_not_allow_oversell)
    #     if serializer.is_valid():
    #         # instance = serializer.save()
    #         print(serializer.data)
    #     #self.assertEqual(serializer.is_valid(), True)
