from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Trainer
from .serializers import TrainerSerializer

class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer

    # Enable filtering + searching
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

    # Filters from Search page (exact match)
    filterset_fields = ["name", "place", "technology1", "technology2"]

    # Partial search (contains)
    search_fields = ["name", "place", "technology1", "technology2"]
