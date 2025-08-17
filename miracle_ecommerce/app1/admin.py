from django.contrib import admin
from .models import Category, Product, EmailOTP, Cart, CartItem, Recipe, AboutVideo

# Inline CartItems in Cart admin
class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0
    readonly_fields = ['subtotal']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name']
    ordering = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'stock', 'is_active', 'created_at']
    list_filter = ['category', 'is_active']
    search_fields = ['name', 'description']
    ordering = ['-created_at']


@admin.register(EmailOTP)
class EmailOTPAdmin(admin.ModelAdmin):
    list_display = ['email', 'otp', 'is_verified', 'created_at']
    search_fields = ['email']
    readonly_fields = ['created_at']


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at', 'total_items', 'total_price']
    inlines = [CartItemInline]
    readonly_fields = ['created_at', 'total_items', 'total_price']


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['cart', 'product', 'quantity', 'subtotal']
    list_filter = ['cart']
    search_fields = ['product__name']



from .models import ImageUpload

admin.site.register(ImageUpload)

# Recipe admin
@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'updated_at']
    search_fields = ['title', 'benefits']

# AboutVideo admin
@admin.register(AboutVideo)
class AboutVideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'youtube_id', 'created_at', 'updated_at']
    search_fields = ['title', 'description', 'youtube_id']