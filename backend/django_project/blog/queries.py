from unicodedata import category
import graphene
from .models import Site, User, Category, Tag, Post
from . import types


class Query(graphene.ObjectType):
    site = graphene.Field(types.SiteType)
    all_posts = graphene.List(types.PostType)
    all_categories = graphene.List(types.CategoryType)
    all_tags = graphene.List(types.TagType)
    post_by_slug = graphene.Field(types.PostType, slug=graphene.String())
    posts_by_category = graphene.List(
        types.PostType, category=graphene.String())
    posts_by_tag = graphene.List(types.PostType, tag=graphene.String())
    category_by_slug = graphene.Field(
        types.CategoryType, slug=graphene.String())
    tag_by_slug = graphene.Field(types.TagType, slug=graphene.String())

    def resolve_site(root, info):
        return (
            Site.objects.first()
        )

    def resolve_all_posts(root, info):
        return (
            Post.objects.all()
        )

    def resolve_all_categories(root, info):
        return (
            Category.objects.all()
        )

    def resolve_all_tags(root, info):
        return (
            Tag.objects.all()
        )

    def resolve_post_by_slug(root, info, slug):
        return (
            Post.objects.get(slug__iexact=slug)
        )

    def resolve_posts_by_category(root, info, category):
        return (
            Post.objects.filter(category__slug__iexact=category)
        )

    def resolve_posts_by_tag(root, info, tag):
        return (
            Post.objects.filter(tags__slug__iexact=tag)
        )

    def resolve_category_by_slug(root, info, slug):
        return Category.objects.get(slug__iexact=slug)
        
    def resolve_tag_by_slug(root, info, slug):
        return Tag.objects.get(slug__iexact=slug)
