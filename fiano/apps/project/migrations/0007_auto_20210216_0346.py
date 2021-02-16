# Generated by Django 3.1.6 on 2021-02-16 03:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0006_project_progress'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='progress',
        ),
        migrations.AlterField(
            model_name='project',
            name='project_status',
            field=models.CharField(choices=[('Persiapan', 'PERSIAPAN'), ('On Progress', 'ON_PROGRESS'), ('Done', 'DONE')], max_length=64, null=True),
        ),
    ]