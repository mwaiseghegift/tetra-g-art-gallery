from rest_framework import serializers

from apps.collections.models import Collection

from .models import Artwork, ArtworkImage, ArtworkSection, ArtworkSymbolismEntry


class ArtworkSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtworkSection
        fields = ['id', 'heading', 'body', 'order']


class ArtworkSymbolismEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtworkSymbolismEntry
        fields = ['id', 'label', 'meaning', 'swatch', 'order']


class ArtworkImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArtworkImage
        fields = ['id', 'image', 'caption', 'order']


class ArtworkSerializer(serializers.ModelSerializer):
    collection = serializers.SlugRelatedField(
        slug_field='slug',
        queryset=Collection.objects.all(),
        required=False,
        allow_null=True,
    )
    sections = ArtworkSectionSerializer(many=True, required=False)
    symbolism_entries = ArtworkSymbolismEntrySerializer(many=True, required=False)
    gallery_images = ArtworkImageSerializer(many=True, required=False)

    class Meta:
        model = Artwork
        fields = [
            'id',
            'unique_id',
            'artwork_id',
            'title',
            'subtitle',
            'slug',
            'medium',
            'year',
            'dimensions',
            'edition',
            'materials',
            'framing',
            'collection',
            'description',
            'story',
            'artist_statement',
            'origin',
            'creation_time',
            'availability',
            'image',
            'video',
            'is_verified',
            'views_count',
            'likes_count',
            'sections',
            'symbolism_entries',
            'gallery_images',
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

    def create(self, validated_data):
        sections_data = validated_data.pop('sections', [])
        symbolism_data = validated_data.pop('symbolism_entries', [])
        images_data = validated_data.pop('gallery_images', [])

        artwork = Artwork.objects.create(**validated_data)
        self._sync_related(artwork, sections_data, symbolism_data, images_data)
        return artwork

    def update(self, instance, validated_data):
        sections_data = validated_data.pop('sections', None)
        symbolism_data = validated_data.pop('symbolism_entries', None)
        images_data = validated_data.pop('gallery_images', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        self._sync_related(instance, sections_data, symbolism_data, images_data)
        return instance

    def _sync_related(self, artwork, sections_data, symbolism_data, images_data):
        if sections_data is not None:
            artwork.sections.all().delete()
            ArtworkSection.objects.bulk_create(
                ArtworkSection(artwork=artwork, **item) for item in sections_data
            )

        if symbolism_data is not None:
            artwork.symbolism_entries.all().delete()
            ArtworkSymbolismEntry.objects.bulk_create(
                ArtworkSymbolismEntry(artwork=artwork, **item) for item in symbolism_data
            )

        if images_data is not None:
            artwork.gallery_images.all().delete()
            ArtworkImage.objects.bulk_create(
                ArtworkImage(artwork=artwork, **item) for item in images_data
            )
