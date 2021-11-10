from rest_framework import permissions


class IsUser(permissions.IsAuthenticated):
    """
    Permission only for User Model
    Allowed for own user profile
    """

    def has_object_permission(self, request, view, obj):
        return bool(obj == request.user)


class IsSellerAndOrderIsOpenForOrder(permissions.IsAuthenticated):
    """
    Permission only for Order Model
    Allow safe methods for authenticated users
    Allow not safe methods if is onwer AND order is open
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        return (obj.seller == request.user and obj.opened)


class IsSellerAndOrderIsOpenForProductOrder(permissions.IsAuthenticated):
    """
    Permission only for ProductOrder Model
    Allow safe methods for authenticated users
    Allow not safe methods if is onwer AND order is open
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        return (obj.seller == request.user and obj.order.opened)
