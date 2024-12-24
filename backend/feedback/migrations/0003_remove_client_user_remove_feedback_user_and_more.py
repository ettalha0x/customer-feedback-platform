# Generated by Django 5.1.4 on 2024-12-23 21:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("feedback", "0002_client"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="client",
            name="user",
        ),
        migrations.RemoveField(
            model_name="feedback",
            name="user",
        ),
        migrations.AddField(
            model_name="feedback",
            name="client",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                to="feedback.client",
            ),
        ),
    ]