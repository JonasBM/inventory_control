# Generated by Django 3.2.9 on 2021-11-15 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20211110_0355'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
        migrations.AlterUniqueTogether(
            name='productorder',
            unique_together={('order', 'product')},
        ),
    ]
