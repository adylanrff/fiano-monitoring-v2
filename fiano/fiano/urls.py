from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from apps.user import views as user_views
from apps.project import views as project_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'users', user_views.UserViewSet)
router.register(r'groups', user_views.GroupViewSet)
router.register(r'projects', project_views.ProjectViewSet)
router.register(r'deliverables', project_views.ProjectDeliverableViewSet)
router.register(r'schedules', project_views.ProjectDeliverableScheduleViewSet)
router.register(r'workers', project_views.WorkerViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api/get-user-by-token', user_views.GetUserByTokenView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
