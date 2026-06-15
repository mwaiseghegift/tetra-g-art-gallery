from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('collections', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='meta_description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='collection',
            name='meta_title',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='collection',
            name='og_image',
            field=models.URLField(blank=True),
        ),
    ]
