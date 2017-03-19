from django.db import models


class TourismPoint(models.Model):
    name = models.CharField('観光ポイント名', max_length=32)
    lat = models.DecimalField(max_digits=12, decimal_places=8)
    lng = models.DecimalField(max_digits=12, decimal_places=8)
