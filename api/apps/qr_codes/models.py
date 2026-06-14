import uuid

from django.db import models


class QRCode(models.Model):
    unique_id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    artwork = models.OneToOneField(
        'artworks.Artwork', on_delete=models.CASCADE, related_name='qr_code'
    )
    scans_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'QR code for {self.artwork.artwork_id}'
