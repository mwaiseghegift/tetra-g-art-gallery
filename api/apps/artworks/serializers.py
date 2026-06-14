from rest_framework import serializers

from apps.collections.models import Collection

from .models import Artwork


class ArtworkSerializer(serializers.ModelSerializer):
    collection = serializers.SlugRelatedField(
        slug_field='slug',
        queryset=Collection.objects.all(),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = Artwork
        fields = [
            'id',
            'unique_id',
            'artwork_id',
            'title',
            'slug',
            'medium',
            'year',
            'dimensions',
            'collection',
            'description',
            'story',
            'origin',
            'creation_time',
            'availability',
            'image',
            'video',
            'is_verified',
            'views_count',
            'likes_count',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'unique_id',
            'artwork_id',
            'slug',
            'views_count',
            'likes_count',
            'created_at',
            'updated_at',
        ]
