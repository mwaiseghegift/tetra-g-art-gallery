from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Artwork
from .serializers import ArtworkSerializer


@api_view(['GET', 'POST'])
def artwork_list(request):
    if request.method == 'POST':
        serializer = ArtworkSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    artworks = Artwork.objects.all()
    serializer = ArtworkSerializer(artworks, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def artwork_detail(request, artwork_id):
    artwork = get_object_or_404(Artwork, artwork_id=artwork_id)

    if request.method in ('PUT', 'PATCH'):
        serializer = ArtworkSerializer(
            artwork, data=request.data, partial=request.method == 'PATCH'
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    if request.method == 'DELETE':
        artwork.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer = ArtworkSerializer(artwork)
    return Response(serializer.data)
