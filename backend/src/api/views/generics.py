from django.conf import settings
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView


class GetConfig(APIView):
    """
    View to retrieve configurations
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        """
        Return a object with the config attributes.
        """
        return Response({"price_threshold": settings.PRICE_THRESHOLD}, status=status.HTTP_200_OK)
