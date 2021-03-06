# Generated by Django 3.1.6 on 2021-02-16 04:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0008_auto_20210216_0415'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='project',
            index=models.Index(fields=['id'], name='project_pro_id_b481b4_idx'),
        ),
        migrations.AddIndex(
            model_name='projectdeliverable',
            index=models.Index(fields=['project_id'], name='project_pro_project_ab4f38_idx'),
        ),
        migrations.AddIndex(
            model_name='projectdeliverable',
            index=models.Index(fields=['id'], name='project_pro_id_6a7333_idx'),
        ),
        migrations.AddIndex(
            model_name='worker',
            index=models.Index(fields=['id'], name='project_wor_id_6adab3_idx'),
        ),
    ]
