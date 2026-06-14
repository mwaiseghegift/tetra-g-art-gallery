from django.urls import path

from . import views

urlpatterns = [
    path('', views.artwork_list, name='artwork-list'),
    path('<str:artwork_id>/', views.artwork_detail, name='artwork-detail'),
]
