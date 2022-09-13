# Generated by Django 4.0.5 on 2022-08-05 20:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_remove_post_featured_image_post_preview_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'category', 'verbose_name_plural': 'Categories'},
        ),
        migrations.AlterModelOptions(
            name='comment',
            options={'verbose_name': 'comment', 'verbose_name_plural': 'Comments'},
        ),
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-date_published'], 'verbose_name': 'post', 'verbose_name_plural': 'Posts'},
        ),
        migrations.AlterModelOptions(
            name='site',
            options={'verbose_name': 'site', 'verbose_name_plural': 'Site'},
        ),
        migrations.AlterModelOptions(
            name='tag',
            options={'verbose_name': 'tag', 'verbose_name_plural': 'Tags'},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'user', 'verbose_name_plural': 'Users'},
        ),
        migrations.AlterField(
            model_name='comment',
            name='is_approved',
            field=models.BooleanField(default=True),
        ),
    ]
