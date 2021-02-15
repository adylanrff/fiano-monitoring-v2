from django.db import models
from apps.project.constants import DeliverableStatusEnum

# Create your models here.
class Project(models.Model):
    project_name = models.CharField(max_length=64, null=True)
    project_status = models.CharField(max_length=64, null=True)
    timeline_start_date = models.DateField(null=True)
    timeline_end_date = models.DateField(null=True)
    actual_start_date = models.DateField(null=True)
    actual_end_date = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.project_name
    
    @property
    def deliverable_count(self):
        self.project_deliverable_set.count()

class Worker(models.Model):
    worker_name = models.CharField(max_length=64, null=True)
    worker_type = models.CharField(max_length=64, null=True)
    salary = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.worker_name

class ProjectDeliverable(models.Model):
    project_id = models.ForeignKey(to=Project, related_name="deliverables", on_delete=models.CASCADE)
    section = models.CharField(max_length=64, null=True)
    item = models.CharField(max_length=64, null=True)
    subitem = models.CharField(max_length=64, null=True)
    deliverable_status = models.CharField(max_length=64, null=True, choices=DeliverableStatusEnum.choices())
    price = models.IntegerField(null=True)
    quantity = models.IntegerField(null=True)
    unit = models.CharField(max_length=32, null=True)
    workers = models.ManyToManyField(Worker)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}-{}-{}'.format(self.section, self.item, self.subitem)

class ProjectDeliverableSchedule(models.Model):
    project_deliverable = models.ForeignKey(ProjectDeliverable, related_name="schedule", on_delete=models.CASCADE)
    schedule_type = models.CharField(max_length=64, null=True, choices=DeliverableStatusEnum.choices())
    timeline_start_date = models.DateField(null=True)
    timeline_end_date = models.DateField(null=True)
    actual_start_date = models.DateField(null=True)
    actual_end_date = models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Schedule: {}'.format(self.project_deliverable)
