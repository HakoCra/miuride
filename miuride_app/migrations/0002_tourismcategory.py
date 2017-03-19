# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-19 10:56
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('miuride_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TourismCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32, verbose_name='カテゴリ名')),
                ('tourism_point', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='miuride_app.TourismPoint')),
            ],
        ),
    ]
