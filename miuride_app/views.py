from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import routers
import django_filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import TourismPoint

from .serializer import TourismPointSerializer


def index(request):
    return render(request, 'miuride_app/index.html')


class TourismFilter(django_filters.rest_framework.FilterSet):
    category = django_filters.CharFilter(name='tourismcategory__name')
    in_range = django_filters.NumberFilter(name='in_range', method='filter_in_range')
    filter_fields = ('name', 'category', 'in_range')

    def filter_in_range(self, queryset, name, value):
        print(queryset)
        print(name)
        print(value)
        return queryset

    class Meta:
        model = TourismPoint
        fields = ['category', 'name', 'in_range']


class TourismPointViewSet(viewsets.ModelViewSet):
    serializer_class = TourismPointSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = TourismPoint.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filter_class = TourismFilter


router = routers.DefaultRouter()
router.register(r'tourism_point', TourismPointViewSet, base_name='tourism_point')
