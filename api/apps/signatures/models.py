import uuid

from django.db import models


class Signature(models.Model):
    unique_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    artwork = models.OneToOneField(
        'artworks.Artwork', on_delete=models.CASCADE, related_name='signature'
    )
    signature_image = models.URLField(blank=True)
    is_verified = models.BooleanField(default=True)
    verified_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Signature for {self.artwork.artwork_id}'
