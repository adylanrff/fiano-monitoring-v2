from django.db import models
from apps.project.constants import DeliverableStatusEnum, ProjectStatusEnum

# Create your models here.
class Project(models.Model):
    project_name = models.CharField(max_length=64, null=True)
    project_status = models.CharField(max_length=64, null=True, choices=ProjectStatusEnum.choices())
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
    class Meta:
        indexes = [
            models.Index(fields=['id']),
        ]

class Worker(models.Model):
    worker_name = models.CharField(max_length=64, null=True)
    worker_type = models.CharField(max_length=64, null=True)
    salary = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        indexes = [
            models.Index(fields=['id']),
        ]

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

    class Meta:
        indexes = [
            models.Index(fields=['project_id']),
            models.Index(fields=['id']),
        ]

    def __str__(self):
        return '{}: {}-{}-{}'.format(self.project_id.project_name, self.section, self.item, self.subitem)

    @property
    def progress(self):
        schedules = self.schedule.all()
        if len(schedules) == 0:
            return 0

        start_date = min([schedule.timeline_start_date for schedule in schedules])
        end_date = max([schedule.timeline_end_date for schedule in schedules])
        total_days = abs((end_date - start_date).days)

        schedule_map = {}
        for schedule in schedules:
            start_date = schedule.timeline_start_date
            end_date = schedule.timeline_end_date
            schedule_map[schedule.schedule_type] = abs((end_date - start_date).days)

        return round(schedule_map[self.deliverable_status] / total_days * 100, 2)

    @property
    def current_schedule(self):        
        return self.schedule.filter(schedule_type=self.deliverable_status).first()


class ProjectDeliverableSchedule(models.Model):
    project_deliverable = models.ForeignKey(ProjectDeliverable, related_name="schedule", on_delete=models.CASCADE)
    schedule_type = models.CharField(max_length=64, null=True, choices=DeliverableStatusEnum.choices())
    timeline_start_date = models.DateField(null=True)
    timeline_end_date = models.DateField(null=True)
    actual_start_date = models.DateField(null=True, blank=True)
    actual_end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Schedule: {}'.format(self.project_deliverable)

    class Meta: 
        unique_together = [['project_deliverable', 'schedule_type']]

    @property
    def end_realization(self): 
        if not self.actual_end_date:
            return 0
        return (self.timeline_end_date - self.actual_end_date).days

    @property
    def start_realization(self): 
        if not self.actual_start_date:
            return 0

        return (self.timeline_start_date - self.actual_start_date).days