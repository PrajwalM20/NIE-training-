from rest_framework import viewsets, filters, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Trainer
from .serializer import TrainerSerializer

class TrainerViewSet(viewsets.ModelViewSet):
    """
    Provides list/create/retrieve/update/destroy for Trainer
    Supports search and filtering via query params:
      - /api/trainer/?search=python
      - /api/trainer/?place=mangalore
    """
    queryset = Trainer.objects.all()
    serializer_class = TrainerSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["place", "is_active"] if hasattr(Trainer, "is_active") else ["place"]
    search_fields = ["name", "email", "place", "technology1", "technology2"]
    ordering_fields = ["created_at"] if hasattr(Trainer, "created_at") else ["name"]

    # override destroy to return 204 No Content
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
