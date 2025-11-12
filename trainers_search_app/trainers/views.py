from django.shortcuts import render
from .models import Trainer
from .serializer import TrainerSerializer
from rest_framework import generics
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class listCreateTrainersView(generics.ListCreateAPIView):
    queryset = Trainer.objects.all()
    serializer_class=TrainerSerializer
    permission_classes=[IsAuthenticated]
    
    
    def get_queryset(self):
        queryset = Trainer.objects.all()
        
        name=self.request.query_params.get('name')
        location =self.request.query_params.get('location')
        technology=self.request.query_params.get('technology')
         
        if name:
            queryset = queryset.filter(name_icontains=name)
             
        if location:
            queryset = queryset.filter(place_icontains=location) 
            
        if technology:
            queryset = queryset.filter(
                Q(technology1_icontains=technology) |Q(technology2_icontains=technology)                                   
            )
        return queryset
        
        
class RetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset =Trainer.objects.all()
    serializer_class=TrainerSerializer
    permission_classes=[IsAuthenticated]
    
    
   