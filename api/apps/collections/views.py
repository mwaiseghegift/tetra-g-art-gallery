from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.artworks.serializers import ArtworkSerializer

from .models import Collection
from .serializers import CollectionSerializer


@api_view(['GET', 'POST'])
def collection_list(request):
    if request.method == 'POST':
        serializer = CollectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    collections = Collection.objects.all()
    serializer = CollectionSerializer(collections, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def collection_detail(request, slug):
    collection = get_object_or_404(Collection, slug=slug)

    if request.method in ('PUT', 'PATCH'):
        serializer = CollectionSerializer(
            collection, data=request.data, partial=request.method == 'PATCH'
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    if request.method == 'DELETE':
        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer = CollectionSerializer(collection)
    return Response(serializer.data)


@api_view(['GET'])
def collection_artworks(request, slug):
    collection = get_object_or_404(Collection, slug=slug)
    serializer = ArtworkSerializer(collection.artworks.all(), many=True)
    return Response(serializer.data)
