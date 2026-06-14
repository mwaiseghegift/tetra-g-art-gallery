from django.contrib import admin

from .models import Signature


@admin.register(Signature)
class SignatureAdmin(admin.ModelAdmin):
    list_display = ('unique_id', 'artwork', 'is_verified', 'verified_at')
    search_fields = ('unique_id', 'artwork__artwork_id', 'artwork__title')
