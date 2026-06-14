from rest_framework import serializers

from .models import Collection


class CollectionSerializer(serializers.ModelSerializer):
    artworks_count = serializers.IntegerField(source='artworks.count', read_only=True)

    class Meta:
        model = Collection
        fields = [
            'id',
            'unique_id',
            'name',
            'slug',
            'description',
            'cover_image',
            'artworks_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'unique_id', 'slug', 'created_at', 'updated_at']
