from django.contrib import admin

from api import models

admin.site.register(models.Client)
admin.site.register(models.Product)
admin.site.register(models.Inventory)
admin.site.register(models.Order)
admin.site.register(models.ProductOrder)
