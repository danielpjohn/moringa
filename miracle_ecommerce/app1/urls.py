from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartViewSet, dojo_app ,CategoryViewSet, ProductViewSet, get_all_images, products_by_category_name, register_user, send_otp, verify_otp,current_user,user_count
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView
)
from django.views.generic import TemplateView

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)


cart_list = CartViewSet.as_view({
    'get': 'list',      # GET cart/ - View cart
    'post': 'create'    # POST cart/ - Add item to cart
})

cart_detail = CartViewSet.as_view({
    'put': 'update',    # PUT cart/<id>/ - Update item quantity
    'delete': 'destroy' # DELETE cart/<id>/ - Remove item from cart
})



urlpatterns = [

    path('', dojo_app),
    path('', TemplateView.as_view(template_name='index.html')),
    # path('home/', TemplateView.as_view(template_name='index.html')),


    path('products-by-category/<str:category_name>/', products_by_category_name, name='products-by-category-name'),

    path('send-otp/', send_otp, name='send_otp'),
    path('verify-otp/', verify_otp, name='verify_otp'),
    path('register/', register_user, name='register_user'),


    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('user/', current_user, name='current_user'),
    path('user-count/', user_count, name='user_count'),

    path('cart/', cart_list, name='cart'),
    path('cart/<int:pk>/', cart_detail, name='cart-item-detail'),

    path('get-all-images/', get_all_images, name='get_all_images'),
    path('', include(router.urls)),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)