from rest_framework import serializers

from .models import TourismPoint
from .models import TourismCategory


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourismCategory
        fields = ('name', )


class TourismPointSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)

    class Meta:
        model = TourismPoint
        fields = ('id', 'name', 'lat', 'lng', 'categories')
