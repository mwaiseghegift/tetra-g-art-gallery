import uuid

from django.db import models
from django.utils.text import slugify


class Artwork(models.Model):
    class Availability(models.TextChoices):
        AVAILABLE = 'available', 'Available'
        SOLD = 'sold', 'Sold'
        NOT_FOR_SALE = 'not_for_sale', 'Not for Sale'

    unique_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    artwork_id = models.CharField(max_length=32, unique=True, editable=False)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    medium = models.CharField(max_length=120)
    year = models.PositiveIntegerField()
    dimensions = models.CharField(max_length=100, blank=True)
    collection = models.ForeignKey(
        'collections.Collection',
        on_delete=models.SET_NULL,
        related_name='artworks',
        null=True,
        blank=True,
    )
    description = models.TextField(blank=True)
    story = models.TextField(blank=True)
    origin = models.CharField(max_length=120, blank=True)
    creation_time = models.CharField(max_length=100, blank=True)
    availability = models.CharField(
        max_length=20, choices=Availability.choices, default=Availability.AVAILABLE
    )
    image = models.URLField(blank=True)
    is_verified = models.BooleanField(default=False)
    views_count = models.PositiveIntegerField(default=0)
    likes_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.title} ({self.artwork_id})'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.artwork_id:
            self.artwork_id = self._generate_artwork_id()
        super().save(*args, **kwargs)

    def _generate_artwork_id(self):
        count = Artwork.objects.filter(year=self.year).count() + 1
        return f'ART-{self.year}-{count:03d}'
