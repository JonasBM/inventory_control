from api import serializers
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from knox.auth import TokenAuthentication
from knox.views import LoginView as KnoxLoginView
from rest_framework import generics, permissions, status
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response


class BasicAuthenticationNoHeader(BasicAuthentication):
    """
    Override BasicAuthentication www-authenticate header
    To avoid login popup on 401
    """

    def authenticate_header(self, request):
        return f'Token realm="{self.www_authenticate_realm}"'


class LoginView(KnoxLoginView):
    """
    Override Knox Login view to allow for basic and token (knox) authentication
    """
    authentication_classes = [BasicAuthenticationNoHeader, TokenAuthentication]


class ChangePasswordView(generics.UpdateAPIView):
    """
    Password change view
    Only allow changing own password
    """
    model = User
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = serializers.ChangePasswordSerializer

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": [_("Incorrect password.")]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                "status": "success",
                "code": status.HTTP_200_OK,
                "message": _("Password updated successfully."),
                "data": [],
            }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
