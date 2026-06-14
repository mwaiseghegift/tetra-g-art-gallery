from django.contrib import admin

from .models import QRCode


@admin.register(QRCode)
class QRCodeAdmin(admin.ModelAdmin):
    list_display = ('unique_id', 'artwork', 'scans_count', 'created_at')
    search_fields = ('unique_id', 'artwork__artwork_id', 'artwork__title')
