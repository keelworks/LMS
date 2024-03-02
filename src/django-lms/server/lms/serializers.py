# convert model instances to JSON so that the frontend can work with the
# recieved data 

from rest_framework import serializers
from .models import Lms

class LmsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lms
        fields = ('id', 'title', 'description', 'completed')
        