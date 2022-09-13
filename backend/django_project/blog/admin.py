from django.contrib import admin
from .models import Site, User, Category, Tag, Post, Comment


@admin.register(Site)
class SiteAdmin(admin.ModelAdmin):
    pass


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email', 'date_joined',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',), }
    list_display = ('title', 'is_published', 'is_featured', 'date_created', 'date_published',)
    list_filter = ('is_published', 'date_published',)
    list_editable = ('is_published', 'is_featured',)
    search_fields = ('title',)
    date_hierarchy = 'date_published'
    save_on_top = True


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'is_approved', 'date_created',)
    list_editable = ('is_approved',)


# admin.site.register(Site)
# admin.site.register(User, UserAdmin)
# admin.site.register(Category, CategoryAdmin)
# admin.site.register(Tag, TagAdmin)
# admin.site.register(Post, PostAdmin)
# admin.site.register(Comment, CommentAdmin)