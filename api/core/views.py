import time

import cloudinary.utils
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def upload_signature_view(request):
    """Sign a Cloudinary upload request so the browser can upload directly."""
    if not settings.CLOUDINARY_CLOUD_NAME:
        return Response(
            {'detail': 'Cloudinary is not configured on this server.'},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    timestamp = int(time.time())
    folder = request.data.get('folder') or settings.CLOUDINARY_FOLDER
    params_to_sign = {'timestamp': timestamp, 'folder': folder}

    signature = cloudinary.utils.api_sign_request(params_to_sign, settings.CLOUDINARY_API_SECRET)

    return Response({
        'signature': signature,
        'timestamp': timestamp,
        'api_key': settings.CLOUDINARY_API_KEY,
        'cloud_name': settings.CLOUDINARY_CLOUD_NAME,
        'folder': folder,
    })
