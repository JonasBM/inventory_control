# Generated by Django 3.2.9 on 2021-11-06 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20211106_1009'),
    ]

    operations = [
        migrations.AddField(
            model_name='productorder',
            name='rentability',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=5),
            preserve_default=False,
        ),
    ]
