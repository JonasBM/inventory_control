
from django.test import TestCase
from knox.models import AuthToken
from rest_framework import status
from rest_framework.test import APIClient

from . import factory


def authenticated_client(user=None):
    if not user:
        user = factory.SellerFactory.create(is_staff=True)
    # Get token to access through knox
    instance, token = AuthToken.objects.create(user)
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION='Token ' + token)
    return client


class ChangePasswordViewTestCase(TestCase):
    """Test module for ChangePasswordView view"""

    def setUp(self):
        """Create user and token for test"""
        self.user = factory.SellerFactory.create(
            password="oldpassword", is_staff=True)
        self.authenticated_client = authenticated_client(self.user)

    def test_incorrectpassword(self):
        """Test worng password on password change"""
        response = self.authenticated_client.patch(
            '/api/auth/changepassword/',
            {'old_password': 'incorrectpassword',
             'new_password': 'newpassword'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_badrequest(self):
        """Test badrequest on password change"""
        response = self.authenticated_client.patch(
            '/api/auth/changepassword/',
            {'new_password': 'newpassword'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = self.authenticated_client.patch(
            '/api/auth/changepassword/',
            {'old_password': 'oldpassword'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_changepassword(self):
        """Test change password"""
        self.assertEqual(self.authenticated_client.login(username=self.user.username,
                         password='oldpassword'), True)
        self.assertEqual(self.authenticated_client.login(username=self.user.username,
                         password='newpassword'), False)

        response = self.authenticated_client.patch(
            '/api/auth/changepassword/',
            {'old_password': 'oldpassword', 'new_password': 'newpassword'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(self.authenticated_client.login(username=self.user.username,
                         password='oldpassword'), False)
        self.assertEqual(self.authenticated_client.login(username=self.user.username,
                         password='newpassword'), True)


class ClientViewSetTestCase(TestCase):
    """Test module for ClientViewSet view"""

    def setUp(self):
        """Create clients for test"""
        self.authenticated_client = authenticated_client()
        self.clients = factory.ClientFactory.create_batch(2)

    def test_create(self):
        """Test create object from viewset"""
        response = self.authenticated_client.post(
            '/api/client/', {'name': 'name'},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve(self):
        """Test get objetc from viewset"""
        response = self.authenticated_client.get(
            '/api/client/'+str(self.clients[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update(self):
        """Test update object from viewset"""
        response = self.authenticated_client.patch(
            '/api/client/'+str(self.clients[0].id)+'/', {'name': 'namechange'},
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.authenticated_client.get(
            '/api/client/'+str(self.clients[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.data['name'], 'namechange')

    def test_destroy(self):
        """Test destroy object from viewset"""
        response = self.authenticated_client.delete(
            '/api/client/'+str(self.clients[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.authenticated_client.get(
            '/api/client/'+str(self.clients[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list(self):
        """Test get list from viewset"""
        response = self.authenticated_client.get(
            '/api/client/',
            format='json'
        )
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.authenticated_client.get(
            '/api/client/',
            {'name': self.clients[0].name},
            format='json'
        )
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProductViewSetTestCase(TestCase):
    """Test module for ProductViewSet view"""

    def setUp(self):
        """Create products for test"""
        self.authenticated_client = authenticated_client()
        self.products = factory.ProducFactory.create_batch(2)

    def test_create(self):
        """Test create object from viewset"""
        response = self.authenticated_client.post(
            '/api/product/', {'name': 'name', 'unitary_price': 10},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve(self):
        """Test get objetc from viewset"""
        response = self.authenticated_client.get(
            '/api/product/'+str(self.products[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update(self):
        """Test update object from viewset"""
        response = self.authenticated_client.patch(
            '/api/product/' +
            str(self.products[0].id)+'/', {'name': 'namechange'},
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.authenticated_client.get(
            '/api/product/'+str(self.products[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.data['name'], 'namechange')

    def test_destroy(self):
        """Test destroy object from viewset"""
        response = self.authenticated_client.delete(
            '/api/product/'+str(self.products[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.authenticated_client.get(
            '/api/product/'+str(self.products[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list(self):
        """Test get list from viewset"""
        response = self.authenticated_client.get(
            '/api/product/',
            format='json'
        )
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.authenticated_client.get(
            '/api/product/',
            {'name': self.products[0].name},
            format='json'
        )
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class InventoryViewSetTestCase(TestCase):
    """Test module for InventoryViewSet view"""

    def setUp(self):
        """Create inventory for test"""

        self.authenticated_client = authenticated_client()
        self.products = factory.ProducFactory.create_batch(2)
        self.inventoryEntries0 = factory.InventoryFactory.create_batch(
            2, product=self.products[0]
        )
        self.inventoryEntries1 = factory.InventoryFactory.create_batch(
            2, product=self.products[1]
        )

    def test_create(self):
        """Test create object from viewset"""
        response = self.authenticated_client.post(
            '/api/inventory/', {
                'product': self.products[0].id, 'quantity': 10
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve(self):
        """Test get objetc from viewset"""
        response = self.authenticated_client.get(
            '/api/inventory/'+str(self.inventoryEntries0[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update(self):
        """Test update object from viewset"""
        response = self.authenticated_client.patch(
            '/api/inventory/' +
            str(self.inventoryEntries0[0].id)+'/', {'quantity': 99},
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.authenticated_client.get(
            '/api/inventory/'+str(self.inventoryEntries0[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.data['quantity'], 99)

    def test_destroy(self):
        """Test destroy object from viewset"""
        response = self.authenticated_client.delete(
            '/api/inventory/'+str(self.inventoryEntries0[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.authenticated_client.get(
            '/api/inventory/'+str(self.inventoryEntries0[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list(self):
        """Test get list from viewset"""
        response = self.authenticated_client.get(
            '/api/inventory/',
            format='json'
        )
        self.assertEqual(len(response.data), 4)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.authenticated_client.get(
            '/api/inventory/',
            {'product_id': self.products[0].id},
            format='json'
        )
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class OrderViewSetTestCase(TestCase):
    """Test module for OrderViewSet view"""

    def setUp(self):
        """Create orders for test"""
        self.authenticated_client = authenticated_client()
        self.products = factory.ProducFactory.create_batch(2)
        self.clients = factory.ClientFactory.create_batch(2)
        self.sellers = factory.SellerFactory.create_batch(2)

        self.orders0 = factory.OrderFactory.create_batch(
            2, seller=self.sellers[0], client=self.clients[0]
        )
        self.orders1 = factory.OrderFactory.create_batch(
            2, seller=self.sellers[1], client=self.clients[1]
        )

        self.productorders = factory.ProductOrderFactory.create(
            order=self.orders0[0], product=self.products[0]
        )

        self.productorders = factory.ProductOrderFactory.create(
            order=self.orders0[0], product=self.products[1]
        )

    def test_create(self):
        """Test create object from viewset"""
        response = self.authenticated_client.post(
            '/api/order/', {
                'seller': self.sellers[0].id, 'client': self.clients[0].id
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve(self):
        """Test get objetc from viewset"""
        response = self.authenticated_client.get(
            '/api/order/'+str(self.orders0[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update(self):
        """Test update object from viewset"""
        response = self.authenticated_client.patch(
            '/api/order/' +
            str(self.orders0[0].id)+'/', {'client': self.clients[1].id},
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.authenticated_client.get(
            '/api/order/'+str(self.orders0[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.data['client'], self.clients[1].id)

    def test_destroy(self):
        """Test destroy object from viewset"""
        response = self.authenticated_client.delete(
            '/api/order/'+str(self.orders0[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.authenticated_client.get(
            '/api/order/'+str(self.orders0[0].id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list(self):
        """Test get list from viewset"""
        response = self.authenticated_client.get(
            '/api/order/',
            format='json'
        )
        self.assertEqual(len(response.data), 4)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.authenticated_client.get(
            '/api/order/',
            {'seller_id': self.sellers[0].id, 'client_id': self.clients[0].id,
                'product_id': self.products[0].id},
            format='json'
        )
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProductOrderViewSetTestCase(TestCase):
    """Test module for ProductOrderViewSet view"""

    def setUp(self):
        """Create products, orders and productorder relationship for test"""
        self.authenticated_client = authenticated_client()
        self.products = factory.ProducFactory.create_batch(2)
        self.clients = factory.ClientFactory.create_batch(2)
        self.sellers = factory.SellerFactory.create_batch(2)

        self.orders0 = factory.OrderFactory.create_batch(
            2, seller=self.sellers[0], client=self.clients[0]
        )
        self.orders1 = factory.OrderFactory.create_batch(
            2, seller=self.sellers[1], client=self.clients[1]
        )

        self.productorders0 = factory.ProductOrderFactory.create(
            order=self.orders0[0], product=self.products[0]
        )

        self.productorders1 = factory.ProductOrderFactory.create(
            order=self.orders0[0], product=self.products[1]
        )

    def test_create(self):
        """Test create object from viewset"""
        response = self.authenticated_client.post(
            '/api/productorder/', {
                'product': self.products[0].id,
                'order': self.orders0[0].id,
                'unitary_price_sell': self.products[0].unitary_price,
                'quantity': self.products[0].multiplier
            },
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve(self):
        """Test get objetc from viewset"""
        response = self.authenticated_client.get(
            '/api/productorder/'+str(self.productorders0.id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update(self):
        """Test update object from viewset"""
        response = self.authenticated_client.patch(
            '/api/productorder/' +
            str(self.productorders0.id) +
            '/', {'quantity': self.products[0].multiplier*2},
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.authenticated_client.get(
            '/api/productorder/'+str(self.productorders0.id)+'/',
            format='json'
        )
        self.assertEqual(response.data['quantity'],
                         self.products[0].multiplier*2)

    def test_destroy(self):
        """Test destroy object from viewset"""
        response = self.authenticated_client.delete(
            '/api/productorder/'+str(self.productorders0.id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        response = self.authenticated_client.get(
            '/api/productorder/'+str(self.productorders0.id)+'/',
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list(self):
        """Test get list from viewset"""
        response = self.authenticated_client.get(
            '/api/productorder/',
            format='json'
        )
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_filter_list(self):
        """Test filter in get list from viewset"""
        response = self.authenticated_client.get(
            '/api/productorder/',
            {'order_id': self.orders0[0].id,
                'product_id': self.products[0].id},
            format='json'
        )
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
