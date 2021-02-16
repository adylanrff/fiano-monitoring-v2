import functools
from apps.project.models import Worker
from apps.project.models import Project
from apps.project.models import ProjectDeliverable
from apps.project.models import ProjectDeliverableSchedule
from rest_framework import serializers


class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ['id', 'worker_name', 'worker_type', 'salary']


class ProjectDeliverableScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectDeliverableSchedule
        fields = [
            'id',
            'project_deliverable',
            'schedule_type', 
            'timeline_start_date', 
            'timeline_end_date',
            'actual_start_date', 
            'actual_end_date',
            'end_realization',
            'start_realization',
        ]

class ProjectDeliverableSerializer(serializers.ModelSerializer):
    workers = WorkerSerializer(many=True, required=False)
    schedule = ProjectDeliverableScheduleSerializer(many=True)
    current_schedule = ProjectDeliverableScheduleSerializer(read_only=True)
    class Meta:
        model = ProjectDeliverable
        fields = [
            'project_id',
            'id',
            'section', 
            'item',
            'subitem',
            'deliverable_status',
            'price',
            'quantity',
            'unit',
            'workers',
            'schedule',
            'current_schedule',
        ]

class ProjectSummarySerializer(serializers.ModelSerializer):
    deliverable_count = serializers.SerializerMethodField()
    
    fields = [
        'project_name',
        'project_status',
        'timeline_start_date',
        'timeline_end_date',
        'actual_start_date',
        'actual_end_date',
        'deliverable_count',
    ]

    def get_deliverable_count(self, obj):
        return len(obj.deliverables)


class ProjectSerializer(serializers.ModelSerializer):
    deliverables = ProjectDeliverableSerializer(many=True, required=False)
    deliverable_count = serializers.SerializerMethodField()
    project_value = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id',
            'project_name', 
            'project_status', 
            'timeline_start_date', 
            'timeline_end_date',
            'actual_start_date', 
            'actual_end_date',
            'deliverables',
            'deliverable_count',
            'project_value',
            'progress',
        ]

    def get_deliverable_count(self, obj):
        return obj.deliverables.count()

    def get_project_value(self, obj):
        return functools.reduce(lambda a,b: a+b, map(lambda x: x.price * x.quantity, obj.deliverables.all()), 0)

    def get_progress(self, obj):
        deliverable_count = obj.deliverables.count() 
        project_value = self.get_project_value(obj)
        percentage_done = 8

        deliverable_progresses = 0
        for deliverable in obj.deliverables.all():
            deliverable_progresses += deliverable.progress
            
        return deliverable_progresses / max(deliverable_count, 1)

    def create(self, validated_data):
        deliverables = validated_data.pop('deliverables') if 'deliverables' in validated_data else []
        project = Project.objects.create(**validated_data)
        for deliverable in deliverables:
            schedules = deliverable.pop('schedule')
            workers = deliverable.pop('workers')
            new_deliverable = ProjectDeliverable.objects.create(project_id=project, **deliverable)
            for schedule in schedules:
                ProjectDeliverableSchedule.objects.create(project_deliverable=new_deliverable, **schedule)
            new_workers = []
            for worker in workers:
                new_workers.append(Worker.objects.get_or_create(worker)[0])
            new_deliverable.workers.add(*new_workers)
        
        return project

