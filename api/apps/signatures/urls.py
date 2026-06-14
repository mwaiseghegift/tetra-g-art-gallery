from django.urls import path

from . import views

urlpatterns = [
    path('', views.signature_list, name='signature-list'),
    path('<uuid:unique_id>/', views.signature_detail, name='signature-detail'),
]
