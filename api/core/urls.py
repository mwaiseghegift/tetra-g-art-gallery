from django.urls import path

from . import views

urlpatterns = [
    path('uploads/signature/', views.upload_signature_view, name='upload-signature'),
]
