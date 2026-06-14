from django.contrib import admin

from .models import Artwork, ArtworkImage, ArtworkSection, ArtworkSymbolismEntry


class ArtworkSectionInline(admin.TabularInline):
    model = ArtworkSection
    extra = 1


class ArtworkSymbolismEntryInline(admin.TabularInline):
    model = ArtworkSymbolismEntry
    extra = 1


class ArtworkImageInline(admin.TabularInline):
    model = ArtworkImage
    extra = 1


@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ('artwork_id', 'title', 'medium', 'year', 'availability', 'is_verified')
    list_filter = ('availability', 'is_verified', 'year', 'medium')
    search_fields = ('artwork_id', 'title', 'series')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ArtworkSectionInline, ArtworkSymbolismEntryInline, ArtworkImageInline]
