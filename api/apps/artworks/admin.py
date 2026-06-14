from django.contrib import admin

from .models import Artwork


@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('artwork_id', 'title', 'medium', 'year', 'availability', 'is_verified')
    list_filter = ('availability', 'is_verified', 'year', 'medium')
    search_fields = ('artwork_id', 'title', 'series')
    prepopulated_fields = {'slug': ('title',)}
