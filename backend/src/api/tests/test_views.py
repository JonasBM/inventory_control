
from django.contrib.auth.models import User
from django.test import TestCase
from knox.models import AuthToken
from rest_framework import status
from rest_framework.test import APIClient
from api import models


class ChangePasswordViewTestCase(TestCase):
    """Test module for ChangePasswordView view"""

    def setUp(self):
        """Create user and token for test"""
        self.user = User.objects.create_user(
            "test_user", email=None, password="oldpassword")
        # Get token to access through knox
        instance, token = AuthToken.objects.create(self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

    def test_incorrectpassword(self):
        """Test worng password on password change"""
        response = self.client.patch(
            '/auth/changepassword/',
            {'old_password': 'incorrectpassword',
             'new_password': 'newpassword'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_badrequest(self):
        """Test badrequest on password change"""
        response = self.client.patch(
            '/auth/changepassword/',
            {'new_password': 'newpassword'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = self.client.patch(
            '/auth/changepassword/',
            {'old_password': 'oldpassword'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_changepassword(self):
        """Test change password"""
        self.assertEqual(self.client.login(username='test_user',
                         password='oldpassword'), True)
        self.assertEqual(self.client.login(username='test_user',
                         password='newpassword'), False)

        response = self.client.patch(
            '/auth/changepassword/',
            {'old_password': 'oldpassword', 'new_password': 'newpassword'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(self.client.login(username='test_user',
                         password='oldpassword'), False)
        self.assertEqual(self.client.login(username='test_user',
                         password='newpassword'), True)


class ClientViewSetTestCase(TestCase):
    """Test module for ClientViewSet view"""

    def setUp(self):
        """Create user, token and clients for test"""
        self.user = User.objects.create_user(
            "test_user", email=None, password="oldpassword")
        # Get token to access through knox
        instance, token = AuthToken.objects.create(self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        models.Client.objects.create(name='Darth Vader')
        models.Client.objects.create(name='Obi-Wan Kenobi')

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.client.get(
            '/client/',
            {'name': 'Dart'},
            format='json'
        )
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProductViewSetTestCase(TestCase):
    """Test module for ProductViewSet view"""

    def setUp(self):
        """Create user, token and products for test"""
        self.user = User.objects.create_user(
            "test_user", email=None, password="oldpassword")
        # Get token to access through knox
        instance, token = AuthToken.objects.create(self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        models.Product.objects.create(
            name='Millenium Falcon', unitary_price=1501.25)
        models.Product.objects.create(name='X-Wing', unitary_price=32.00)

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.client.get(
            '/product/',
            {'name': 'Falco'},
            format='json'
        )
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class InventoryViewSetTestCase(TestCase):
    """Test module for InventoryViewSet view"""

    def setUp(self):
        """Create user, token, products and inventory for test"""
        self.user = User.objects.create_user(
            "test_user", email=None, password="oldpassword")
        # Get token to access through knox
        instance, token = AuthToken.objects.create(self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        self.product_millenium = models.Product.objects.create(
            name='Millenium Falcon', unitary_price=1501.25)
        product_wing = models.Product.objects.create(
            name='X-Wing', unitary_price=32.00)
        models.Inventory.objects.create(
            product=self.product_millenium, quantity=10)
        models.Inventory.objects.create(
            product=self.product_millenium, quantity=10)
        models.Inventory.objects.create(
            product=product_wing, quantity=10)

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.client.get(
            '/inventory/',
            {'product_id': self.product_millenium.id},
            format='json'
        )
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class OrderViewSetTestCase(TestCase):
    """Test module for OrderViewSet view"""

    def setUp(self):
        """Create user, token, products and orders for test"""
        self.user = User.objects.create_user(
            "test_user", email=None, password="oldpassword")
        # Get token to access through knox
        instance, token = AuthToken.objects.create(self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        self.seller = self.user
        self.client_vader = models.Client.objects.create(name='Darth Vader')
        client_kenobi = models.Client.objects.create(name='Obi-Wan Kenobi')
        self.product_millenium = models.Product.objects.create(
            name='Millenium Falcon', unitary_price=1501.25)
        order1 = models.Order.objects.create(
            seller=self.seller, client=self.client_vader)
        order2 = models.Order.objects.create(
            seller=self.seller, client=client_kenobi)
        models.ProductOrder.objects.create(
            product=self.product_millenium, order=order1, unitary_price_sell=10.00, quantity=10)
        models.ProductOrder.objects.create(
            product=self.product_millenium, order=order2, unitary_price_sell=10.00, quantity=10)

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.client.get(
            '/order/',
            {'seller_id': self.seller.id, 'client_id': self.client_vader.id,
                'product_id': self.product_millenium.id},
            format='json'
        )
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProductOrderViewSetTestCase(TestCase):
    """Test module for ProductOrderViewSet view"""

    def setUp(self):
        """Create user, token, products, orders and productorder relationship for test"""
        self.user = User.objects.create_user(
            "test_user", email=None, password="oldpassword")
        # Get token to access through knox
        instance, token = AuthToken.objects.create(self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        self.seller = self.user
        self.client_vader = models.Client.objects.create(name='Darth Vader')
        client_kenobi = models.Client.objects.create(name='Obi-Wan Kenobi')
        self.product_millenium = models.Product.objects.create(
            name='Millenium Falcon', unitary_price=1501.25)
        self.order1 = models.Order.objects.create(
            seller=self.seller, client=self.client_vader)
        order2 = models.Order.objects.create(
            seller=self.seller, client=client_kenobi)
        models.ProductOrder.objects.create(
            product=self.product_millenium, order=self.order1, unitary_price_sell=10.00, quantity=10)
        models.ProductOrder.objects.create(
            product=self.product_millenium, order=order2, unitary_price_sell=10.00, quantity=10)

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.client.get(
            '/productorder/',
            {'order_id': self.order1.id,
                'product_id': self.product_millenium.id},
            format='json'
        )
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
