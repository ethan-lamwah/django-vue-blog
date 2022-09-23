from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models
# from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here.


class Site(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    logo = models.ImageField(upload_to='site/logo')
    about = RichTextUploadingField(blank=True)

    class Meta:
        verbose_name = 'site'
        verbose_name_plural = 'Site'

    def __str__(self):
        return self.name


class User(AbstractUser):
    avatar = models.ImageField(
        default='users/avatars/default.jpg',
        upload_to='users/avatars/%Y/%m/%d/'
    )
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    website = models.CharField(max_length=100, blank=True)
    # joined_date = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username

    def get_display_name(self):
        full_name = self.get_full_name()
        if full_name:
            return full_name
        return self.username

    def get_avatar(self):
        if self.avatar:
            return self.avatar.url if settings.USE_S3 else 'http://localhost:8000' + self.avatar.url
        return ''


class Category(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField()

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField()

    class Meta:
        verbose_name = 'tag'
        verbose_name_plural = 'Tags'

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(unique=True)
    description = models.CharField(max_length=150, blank=True)
    # content = RichTextField()
    content = RichTextUploadingField(blank=True)
    preview_image = models.ImageField(
        default='posts/preview_images/default.jpg',
        upload_to='posts/preview_images/'
    )
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)
    date_published = models.DateTimeField(blank=True, null=True)
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    likes = models.ManyToManyField(User, related_name='post_like', blank=True)

    class Meta:
        verbose_name = 'post'
        verbose_name_plural = 'Posts'
        ordering = ["-date_published"]

    def __str__(self):
        return self.title

    def get_number_of_likes(self):
        return self.likes.count()

    def get_preview_image(self):
        if self.preview_image:
            return self.preview_image.url if settings.USE_S3 else 'http://localhost:8000' + self.preview_image.url
        return ''


class Comment(models.Model):
    content = models.TextField(max_length=1000)
    date_created = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True)
    likes = models.ManyToManyField(User, related_name='comment_like', blank=True)

    class Meta:
        verbose_name = 'comment'
        verbose_name_plural = 'Comments'

    def __str__(self):
        if len(self.content) > 50:
            return self.content[:50] + '...'
        return self.content

    def get_number_of_likes(self):
        return self.likes.count()
