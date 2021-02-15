from django.urls import path, include
from apps.user.views import UserViewSet
from apps.user.views import GroupViewSet
from apps.user.views import GetUserByTokenView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)

url_patterns = [
    include('', router.urls),
    path('/detail_by_token', GetUserByTokenView.as_view())
]
