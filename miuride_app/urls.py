from django.conf.urls import url, include

from . import views
from .views import router

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'post_location', views.post_location, name='post_location'),
    url(r'^register_tourism_point/$', views.register_tourism_point, name='register_tourism_point'),
    url(r'^api/v1/', include(router.urls))
]
