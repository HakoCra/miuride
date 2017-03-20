from django.contrib import admin

from .models import TourismPoint
from .models import TourismCategory

# Register your models here.
admin.site.register(TourismPoint)
admin.site.register(TourismCategory)
