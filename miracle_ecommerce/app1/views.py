from rest_framework import viewsets, permissions, filters 
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True).order_by('-created_at')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'created_at']
    permission_classes = [permissions.AllowAny]

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def products_by_category_name(request, category_name):
    try:
        if category_name.lower() == 'all':
            products = Product.objects.filter(is_active=True)
        else:
            category = Category.objects.get(name__iexact=category_name)
            products = Product.objects.filter(category=category, is_active=True)
        
        # Apply search if provided
        search_query = request.GET.get('search', '')
        if search_query:
            products = products.filter(name__icontains=search_query) | products.filter(description__icontains=search_query)
        
        # Apply ordering if provided
        ordering = request.GET.get('ordering', '')
        if ordering in ['price', '-price', 'created_at', '-created_at']:
            products = products.order_by(ordering)
        
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Category.DoesNotExist:
        return Response({'detail': 'Category not found'}, status=status.HTTP_404_NOT_FOUND)





from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import EmailOTP
from .serializers import EmailSerializer, OTPVerifySerializer, RegisterSerializer
from .utils import generate_otp, send_otp_email

@api_view(['POST'])
def send_otp(request):
    serializer = EmailSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        otp = generate_otp()
        EmailOTP.objects.update_or_create(email=email, defaults={'otp': otp, 'is_verified': False})
        send_otp_email(email, otp)
        return Response({'message': 'OTP sent to email.'}, status=200)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def verify_otp(request):
    serializer = OTPVerifySerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        try:
            otp_entry = EmailOTP.objects.get(email=email, otp=otp)
            otp_entry.is_verified = True
            otp_entry.save()
            return Response({'message': 'OTP verified.'}, status=200)
        except EmailOTP.DoesNotExist:
            return Response({'error': 'Invalid OTP'}, status=400)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Cart, CartItem, Product
from .serializers import CartSerializer
import logging

logger = logging.getLogger(__name__)

class CartViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny] 

    def list(self, request):
        logger.info(f"Cart list called. User authenticated: {request.user.is_authenticated}")
        
        if request.user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=request.user)
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        else:
            # Debug session information
            logger.info(f"Session key: {request.session.session_key}")
            logger.info(f"Session data: {dict(request.session)}")
            
            cart = request.session.get('cart', {})
            logger.info(f"Cart from session: {cart}")
            
            # Enhanced session cart with full product details
            cart_items = []
            total_items = 0
            total_price = 0
            
            for product_id, cart_item in cart.items():
                logger.info(f"Processing cart item: {product_id} -> {cart_item}")
                try:
                    product = Product.objects.get(id=int(product_id))
                    item_data = {
                        'id': product_id,
                        'product_id': int(product_id),
                        'product_name': product.name,
                        'quantity': cart_item['quantity'],
                        'price': str(product.price),
                        'image': product.image.url if product.image else '',
                        'description': product.description or ''
                    }
                    cart_items.append(item_data)
                    total_items += cart_item['quantity']
                    total_price += float(product.price) * cart_item['quantity']
                    logger.info(f"Added item to cart_items: {item_data}")
                except Product.DoesNotExist:
                    logger.warning(f"Product {product_id} not found, skipping")
                    continue
            
            response_data = {
                'items': cart_items,
                'total_items': total_items,
                'total_price': total_price
            }
            logger.info(f"Returning response: {response_data}")
            return Response(response_data)

    def create(self, request):
        product_id = request.data.get('product')
        quantity = int(request.data.get('quantity', 1))
        
        logger.info(f"Adding to cart: product_id={product_id}, quantity={quantity}")
        logger.info(f"User authenticated: {request.user.is_authenticated}")

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        if request.user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=request.user)
            cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
            if not created:
                cart_item.quantity += quantity
            else:
                cart_item.quantity = quantity
            cart_item.save()
            logger.info(f"Added to authenticated user cart: {cart_item}")
        else:
            # Ensure session exists
            if not request.session.session_key:
                request.session.create()
                logger.info(f"Created new session: {request.session.session_key}")
            
            logger.info(f"Session key before: {request.session.session_key}")
            logger.info(f"Session data before: {dict(request.session)}")
            
            cart = request.session.get('cart', {})
            logger.info(f"Current cart before update: {cart}")
            
            product_key = str(product_id)

            if product_key in cart:
                cart[product_key]['quantity'] += quantity
                logger.info(f"Updated existing item: {cart[product_key]}")
            else:
                cart[product_key] = {
                    'product_name': product.name,
                    'quantity': quantity,
                    'price': str(product.price)
                }
                logger.info(f"Added new item: {cart[product_key]}")
            
            request.session['cart'] = cart
            request.session.modified = True
            
            # Force save the session
            request.session.save()
            
            logger.info(f"Session data after: {dict(request.session)}")
            logger.info(f"Cart after update: {request.session.get('cart', {})}")

        return Response({'message': 'Item added to cart'}, status=201)

    def update(self, request, pk=None):
        quantity = int(request.data.get('quantity', 1))
        logger.info(f"Updating cart item: pk={pk}, quantity={quantity}")
        
        if request.user.is_authenticated:
            try:
                item = CartItem.objects.get(id=pk, cart__user=request.user)
                item.quantity = quantity
                item.save()
                return Response({'message': 'Item updated'})
            except CartItem.DoesNotExist:
                return Response({'error': 'Cart item not found'}, status=404)
        else:
            product_id = request.data.get('product', pk)
            cart = request.session.get('cart', {})
            product_key = str(product_id)
            
            logger.info(f"Updating session cart item: {product_key}, quantity={quantity}")
            logger.info(f"Current cart: {cart}")
            
            if product_key in cart:
                cart[product_key]['quantity'] = quantity
                request.session['cart'] = cart
                request.session.modified = True
                request.session.save()
                logger.info(f"Updated cart: {cart}")
                return Response({'message': 'Item updated'})
            else:
                return Response({'error': 'Item not found in session cart'}, status=404)

    def destroy(self, request, pk=None):
        logger.info(f"Removing cart item: pk={pk}")
        
        if request.user.is_authenticated:
            try:
                item = CartItem.objects.get(id=pk, cart__user=request.user)
                item.delete()
                return Response({'message': 'Item removed from cart'})
            except CartItem.DoesNotExist:
                return Response({'error': 'Item not found'}, status=404)
        else:
            if request.method == 'DELETE':
                product_id = request.data.get('product', pk)
            else:
                product_id = pk
                
            cart = request.session.get('cart', {})
            product_key = str(product_id)
            
            logger.info(f"Removing from session cart: {product_key}")
            logger.info(f"Current cart: {cart}")
            
            if product_key in cart:
                del cart[product_key]
                request.session['cart'] = cart
                request.session.modified = True
                request.session.save()
                logger.info(f"Cart after removal: {cart}")
                return Response({'message': 'Item removed from cart'})
            else:
                return Response({'error': 'Item not found in session cart'}, status=404)








# views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        'name': user.get_full_name(),
        'email': user.email,
        'username': user.username
    })


from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def user_count(request):
    User = get_user_model()
    total_users = User.objects.count()
    active_users = User.objects.filter(is_active=True).count()
    return Response({
        'total_users': total_users,
        'active_users': active_users
    })


from django.shortcuts import render

def dojo_app(request):
    return render (request,'index.html')



from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ImageUpload
from .serializers import ImageUploadSerializer

@api_view(['GET'])
def get_all_images(request):
    images = ImageUpload.objects.all().order_by('-uploaded_at')
    serializer = ImageUploadSerializer(images, many=True, context={'request': request})
    return Response(serializer.data)

# @api_view(['GET', 'POST'])
# def get_all_images(request):
#     if request.method == 'GET':
#         images = ImageUpload.objects.all().order_by('-uploaded_at')
#         serializer = ImageUploadSerializer(images, many=True, context={'request': request})
#         return Response(serializer.data)
    
#     elif request.method == 'POST':
#         serializer = ImageUploadSerializer(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)
