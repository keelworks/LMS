from django.contrib import admin
from .models import Lms

class LmsAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed")
admin.site.register(Lms, LmsAdmin)
