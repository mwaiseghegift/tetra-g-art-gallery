from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Signature
from .serializers import SignatureSerializer


@api_view(['GET', 'POST'])
def signature_list(request):
    if request.method == 'POST':
        serializer = SignatureSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    signatures = Signature.objects.select_related('artwork').all()
    serializer = SignatureSerializer(signatures, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def signature_detail(request, unique_id):
    signature = get_object_or_404(Signature, unique_id=unique_id)

    if request.method in ('PUT', 'PATCH'):
        serializer = SignatureSerializer(
            signature, data=request.data, partial=request.method == 'PATCH'
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    if request.method == 'DELETE':
        signature.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer = SignatureSerializer(signature)
    return Response(serializer.data)
