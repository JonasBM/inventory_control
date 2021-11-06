from api import serializers
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView


class ListUsers(APIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, format=None):
        """
        Return default settings.
        """
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)
        return Response({'some': 'data'})
