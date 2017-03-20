from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import routers
import django_filters
from django_filters.rest_framework import DjangoFilterBackend

from .models import TourismPoint
from .models import TourismCategory
from .models import UUID
from .models import Breadcrumb
from miuride_app.utils.geometry import get_distance

from .serializer import TourismPointSerializer


def index(request):
    key = settings.GCP_API_KEY
    return render(request, 'miuride_app/index.html', {'key': key})


def post_location(request):
    if request.method == 'POST':
        if 'uuid' in request.session:
            uuid = UUID.objects.get(uuid=request.session['uuid'])
        else:
            uuid = UUID()
            request.session['uuid'] = uuid
        lat = request.POST['lat']
        lng = request.POST['lng']
        location = Breadcrumb(uuid=uuid, lat=lat, lng=lng)
        location.save()
    return JsonResponse({})


def register_tourism_point(request):
    if request.method == 'POST':
        try:
            name = request.POST['name']
            description = request.POST['description']
            lat = request.POST['lat']
            lng = request.POST['lng']
            categories = request.POST.getlist('category')
            tp = TourismPoint(name=name, description=description, lat=lat, lng=lng)
            tp.save()
            for category in categories:
                tc = TourismCategory(name=category, tourism_point=tp)
                tc.save()
        except:  # 応急処置
            pass
    return render(request, 'miuride_app/register_tourism_point.html')


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
