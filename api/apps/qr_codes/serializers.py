from rest_framework import serializers

from apps.artworks.models import Artwork
from apps.artworks.serializers import ArtworkSerializer

from .models import QRCode


class QRCodeSerializer(serializers.ModelSerializer):
    artwork = serializers.SlugRelatedField(
        slug_field='artwork_id', queryset=Artwork.objects.all()
    )
    artwork_detail = ArtworkSerializer(source='artwork', read_only=True)

    class Meta:
        model = QRCode
        fields = [
            'id',
            'unique_id',
            'artwork',
            'artwork_detail',
            'scans_count',
            'created_at',
        ]
        read_only_fields = ['id', 'unique_id', 'scans_count', 'created_at']
