from django.conf.urls import url, include

from . import views
from .views import router

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/v1/', include(router.urls))
]
