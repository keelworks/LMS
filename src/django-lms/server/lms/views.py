from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LmsSerializer
from .models import Lms

# by default class LmsView provides implementation for CRUD operations 
class LmsView(viewsets.ModelViewSet):
    serializer_class = LmsSerializer
    queryset = Lms.objects.all()
