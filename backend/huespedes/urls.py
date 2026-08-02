from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HuespedViewSet

router = DefaultRouter()
router.register(r'huespedes', HuespedViewSet, basename='huesped')

urlpatterns = [
    path('', include(router.urls)),
]