from dataclasses import field
import graphene
from graphene_django import DjangoObjectType
from .models import Site, User, Category, Tag, Post, Comment


class SiteType(DjangoObjectType):
    class Meta:
        model = Site


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ('password',)
    
    display_name = graphene.String(source='get_display_name')
    avatar = graphene.String(source='get_avatar')


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category


class TagType(DjangoObjectType):
    class Meta:
        model = Tag


class PostType(DjangoObjectType):
    class Meta:
        model = Post

    preview_image = graphene.String(source='get_preview_image')
    number_of_likes = graphene.String(source='get_number_of_likes')


class CommentType(DjangoObjectType):
    class Meta:
        model = Comment
    
    number_of_likes = graphene.String(source='get_number_of_likes')
