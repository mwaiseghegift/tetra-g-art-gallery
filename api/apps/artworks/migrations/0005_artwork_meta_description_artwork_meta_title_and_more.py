from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('artworks', '0004_artwork_artist_statement_artwork_edition_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='artwork',
            name='meta_description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='artwork',
            name='meta_title',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='artwork',
            name='og_image',
            field=models.URLField(blank=True),
        ),
    ]
