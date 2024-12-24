# core/admin.py
from django.contrib import admin
from .models import Product, Feedback, Client

admin.site.register(Product)
admin.site.register(Feedback)
admin.site.register(Client)