from django.contrib import admin 
from django.urls import path
from .views import listCreateTrainersView,RetrieveUpdateDestroyView

urlpatterns=[
    path('trainer/',listCreateTrainersView.as_view(),name='list-create-trainer'),
    path('trainer/<int:pk>',RetrieveUpdateDestroyView.as_view(),name='retrieve-update-delete')
    
]