# Generated by Django 3.1.6 on 2021-02-16 03:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0005_auto_20210213_0913'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='progress',
            field=models.IntegerField(null=True),
        ),
    ]
