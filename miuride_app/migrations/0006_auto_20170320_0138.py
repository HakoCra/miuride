# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-03-20 01:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miuride_app', '0005_auto_20170319_2156'),
    ]

    operations = [
        migrations.AddField(
            model_name='tourismpoint',
            name='description',
            field=models.TextField(default='', max_length=256, verbose_name='詳細説明'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='uuid',
            name='uuid',
            field=models.CharField(default='d8907a35-1390-4e67-94a4-ab2ce1d782aa', max_length=36),
        ),
    ]
