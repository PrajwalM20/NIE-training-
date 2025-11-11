from.models import Trainer
from rest_framework import serializers

class TrainerSerilizer(serializers.ModelSerializer):
    class Meta:
        model =Trainer
        field='__all__'