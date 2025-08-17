from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def _str_(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.name




from django.db import models

class EmailOTP(models.Model):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def _str_(self):
        return self.email
    



from django.db import models
from django.contrib.auth.models import User
from .models import Product  # adjust if app name differs

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)

    def total_items(self):
        return sum(item.quantity for item in self.items.all())

    def total_price(self):
        return sum(item.subtotal() for item in self.items.all())

    def _str_(self):
        return f"Cart of {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('cart', 'product')

    def subtotal(self):
        return self.quantity * self.product.price

    def _str_(self):
        return f"{self.product.name} x {self.quantity}"





from django.db import models

class ImageUpload(models.Model):
    image = models.ImageField(upload_to='image/')  
    uploaded_at = models.DateTimeField(auto_now_add=True)


# Recipe model
class Recipe(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)
    ingredients = models.JSONField(default=list, blank=True)
    instructions = models.JSONField(default=list, blank=True)
    benefits = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


# Video to display on About page
class AboutVideo(models.Model):
    title = models.CharField(max_length=255,blank=True, null=True)
    description = models.TextField(blank=True, default='', null=True)
    # Either upload a video file or provide a YouTube ID
    video = models.FileField(upload_to='videos/', blank=True, null=True)
    youtube_id = models.CharField(max_length=64, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title or self.youtube_id or f"AboutVideo {self.pk or ''}"

