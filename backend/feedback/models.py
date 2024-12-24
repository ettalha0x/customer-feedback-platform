from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Feedback(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='feedbacks')
    client = models.ForeignKey('Client', on_delete=models.CASCADE, default=1)  # BEGIN: Added default value
    satisfaction = models.IntegerField()
    improvements = models.TextField(blank=True)
    recommend = models.BooleanField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.satisfaction} by {self.client.first_name} {self.client.last_name}"

class Client(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    products = models.ManyToManyField(Product, related_name='clients')

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.email}"