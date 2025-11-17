from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import Trainer
from .serializers import TrainerSerializer


class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all().order_by("id")
    serializer_class = TrainerSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["name", "place", "technology1", "technology2"]
    search_fields = ["name", "place", "technology1", "technology2"]


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def trainer_stats(request):
    trainers = Trainer.objects.all()

    total_trainers = trainers.count()

    technologies = set()
    for t in trainers:
        if t.technology1:
            technologies.add(t.technology1)
        if t.technology2:
            technologies.add(t.technology2)

    total_technologies = len(technologies)

    locations = set(t.place for t in trainers if t.place)
    total_locations = len(locations)

    return Response({
        "total_trainers": total_trainers,
        "total_technologies": total_technologies,
        "total_locations": total_locations
    })
