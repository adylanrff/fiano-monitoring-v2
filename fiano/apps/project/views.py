from rest_framework import viewsets
from rest_framework import views
from rest_framework import permissions
from apps.project.serializers import ProjectSerializer
from apps.project.serializers import ProjectSummarySerializer
from apps.project.models import Project

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Project.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectSerializer

# class ProjectSummaryViewSet():
#     queryset = Project.objects.all()
#     serializer_class = ProjectSummarySerializer
#     permission_classes = [permissions.IsAuthenticated]