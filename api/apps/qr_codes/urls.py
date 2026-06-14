from django.urls import path

from . import views

urlpatterns = [
    path('', views.qr_code_list, name='qr-code-list'),
    path('<uuid:unique_id>/', views.qr_code_detail, name='qr-code-detail'),
]
