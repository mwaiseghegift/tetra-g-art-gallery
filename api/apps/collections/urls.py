from django.urls import path

from . import views

urlpatterns = [
    path('', views.collection_list, name='collection-list'),
    path('<slug:slug>/', views.collection_detail, name='collection-detail'),
    path('<slug:slug>/artworks/', views.collection_artworks, name='collection-artworks'),
]
