from django.contrib import admin
from .models import Trainer

@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "place", "phone")
    search_fields = ("name", "email", "place", "technology1", "technology2")
