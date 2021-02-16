from rest_framework import viewsets
from rest_framework import views
from rest_framework import permissions
from apps.project.serializers import ProjectSerializer
from apps.project.serializers import ProjectSummarySerializer
from apps.project.serializers import ProjectDeliverableScheduleSerializer
from apps.project.serializers import ProjectDeliverableSerializer
from apps.project.serializers import WorkerSerializer
from apps.project.models import Project, ProjectDeliverable, Worker, ProjectDeliverableSchedule

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Project.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Project.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectSerializer

class ProjectDeliverableViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = ProjectDeliverable.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectDeliverableSerializer

class ProjectDeliverableScheduleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = ProjectDeliverableSchedule.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProjectDeliverableScheduleSerializer

class WorkerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Worker.objects.all().order_by('-created_at')
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = WorkerSerializer

# class ProjectSummaryViewSet():
#     queryset = Project.objects.all()
#     serializer_class = ProjectSummarySerializer
#     permission_classes = [permissions.IsAuthenticated]