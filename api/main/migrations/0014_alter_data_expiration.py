# Generated by Django 5.0.3 on 2024-04-05 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_alter_data_expiration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='data',
            name='expiration',
            field=models.BigIntegerField(),
        ),
    ]
