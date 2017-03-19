from django.db import models


class TourismPoint(models.Model):
    name = models.CharField('観光ポイント名', max_length=32)
    lat = models.DecimalField(max_digits=12, decimal_places=8)
    lng = models.DecimalField(max_digits=12, decimal_places=8)

    def __str__(self):
        return self.name


class TourismCategory(models.Model):
    name = models.CharField('カテゴリ名', max_length=32)
    tourism_point = models.ForeignKey(TourismPoint, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
