from rest_framework import serializers

from .models import TourismPoint


class TourismPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourismPoint
        fields = '__all__'
