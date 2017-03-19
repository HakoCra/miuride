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


class TourismPointViewSet(viewsets.ModelViewSet):
    serializer_class = TourismPointSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = TourismPoint.objects.all()
    filter_backends = (DjangoFilterBackend,)

router = routers.DefaultRouter()
router.register(r'tourism_point', TourismPointViewSet, base_name='tourism_point')
