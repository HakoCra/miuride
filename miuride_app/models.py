from django.db import models
import uuid


class TourismPoint(models.Model):
    name = models.CharField('観光ポイント名', max_length=32)
    description = models.TextField('詳細説明', max_length=256)
    lat = models.DecimalField(max_digits=12, decimal_places=8)
    lng = models.DecimalField(max_digits=12, decimal_places=8)

    def __str__(self):
        return self.name

    @property
    def categories(self):
        return TourismCategory.objects.filter(tourism_point=self)


class TourismCategory(models.Model):
    name = models.CharField('カテゴリ名', max_length=32)
    tourism_point = models.ForeignKey(TourismPoint, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class UUID(models.Model):
    uuid = models.CharField(max_length=36, default=str(uuid.uuid4()))


class Breadcrumb(models.Model):
    uuid = models.ForeignKey(UUID)
    created_at = models.DateTimeField(auto_created=True)
    lat = models.DecimalField(max_digits=12, decimal_places=8)
    lng = models.DecimalField(max_digits=12, decimal_places=8)

    def __str__(self):
        return self.uuid + ':' + '{},{}'.format(self.lat, self.lng)
