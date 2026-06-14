from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import QRCode
from .serializers import QRCodeSerializer


@api_view(['GET', 'POST'])
def qr_code_list(request):
    if request.method == 'POST':
        serializer = QRCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    qr_codes = QRCode.objects.select_related('artwork').all()
    serializer = QRCodeSerializer(qr_codes, many=True)
    return Response(serializer.data)


@api_view(['GET', 'DELETE'])
def qr_code_detail(request, unique_id):
    qr_code = get_object_or_404(QRCode, unique_id=unique_id)

    if request.method == 'DELETE':
        qr_code.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    qr_code.scans_count += 1
    qr_code.save(update_fields=['scans_count'])
    serializer = QRCodeSerializer(qr_code)
    return Response(serializer.data)
