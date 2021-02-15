# Generated by Django 3.1.6 on 2021-02-13 09:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_auto_20210212_1828'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectdeliverable',
            name='deliverable_status',
            field=models.CharField(choices=[('Gambar Kerja', 'GAMBAR_KERJA'), ('Belanja', 'BELANJA'), ('Sipil', 'SIPIL'), ('Produksi', 'PRODUKSI'), ('Delivery', 'DELIVERY'), ('Setting', 'SETTING'), ('Finishing', 'FINISHING'), ('Done', 'DONE')], max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='projectdeliverable',
            name='project_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='deliverables', to='project.project'),
        ),
        migrations.AlterField(
            model_name='projectdeliverableschedule',
            name='project_deliverable',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='schedule', to='project.projectdeliverable'),
        ),
        migrations.AlterField(
            model_name='projectdeliverableschedule',
            name='schedule_type',
            field=models.CharField(choices=[('Gambar Kerja', 'GAMBAR_KERJA'), ('Belanja', 'BELANJA'), ('Sipil', 'SIPIL'), ('Produksi', 'PRODUKSI'), ('Delivery', 'DELIVERY'), ('Setting', 'SETTING'), ('Finishing', 'FINISHING'), ('Done', 'DONE')], max_length=64, null=True),
        ),
    ]
