from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrainerViewSet, trainer_stats

router = DefaultRouter()
router.register("trainer", TrainerViewSet)

urlpatterns = [
    path("", include(router.urls)),      # /api/trainer/
    path("stats/", trainer_stats),       # /api/stats/
]
