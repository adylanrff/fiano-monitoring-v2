from django.contrib import admin
from apps.project.models import Project
from apps.project.models import ProjectDeliverable
from apps.project.models import ProjectDeliverableSchedule
from apps.project.models import Worker

class ProjectAdmin(admin.ModelAdmin):
    pass

class ProjectDeliverableAdmin(admin.ModelAdmin):
    pass

class ProjectDeliverableScheduleAdmin(admin.ModelAdmin):
    pass

class WorkerAdmin(admin.ModelAdmin):
    pass


admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectDeliverable, ProjectDeliverableAdmin)
admin.site.register(ProjectDeliverableSchedule, ProjectDeliverableScheduleAdmin)
admin.site.register(Worker, WorkerAdmin)