import graphene
import graphql_jwt
from blog import models, types


class CreateUser(graphene.Mutation):
    # The input arguments for this mutation
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    # The class attributes define the response of the mutation when it is resolved
    user = graphene.Field(types.UserType)

    # mutate is the function that will be applied once the mutation is called
    def mutate(self, info, username, password, email):
        user_instance = models.User(
            username=username,
            email=email,
        )
        user_instance.set_password(password)
        user_instance.save()

        # return an instance of this mutation
        return CreateUser(user=user_instance)


class CreateComment(graphene.Mutation):
    class Arguments:
        content = graphene.String(required=True)
        user_id = graphene.ID(required=True)
        post_id = graphene.ID(required=True)

    comment = graphene.Field(types.CommentType)

    def mutate(self, info, content, user_id, post_id):
        comment_instance = models.Comment(
            content=content,
            user_id=user_id,
            post_id=post_id
        )
        comment_instance.save()

        return CreateComment(comment=comment_instance)


class UpdatePostLike(graphene.Mutation):
    class Arguments:
        post_id = graphene.ID(required=True)
        user_id = graphene.ID(required=True)
    
    post = graphene.Field(types.PostType)

    def mutate(self, info, post_id, user_id):
        post_instance = models.Post.objects.get(pk=post_id)

        if post_instance.likes.filter(pk=user_id):
            post_instance.likes.remove(user_id)
        else:
            post_instance.likes.add(user_id)

        post_instance.save()

        return UpdatePostLike(post=post_instance)           


# Customize the ObtainJSONWebToken
class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(types.UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    create_comment = CreateComment.Field()
    update_post_like = UpdatePostLike.Field()
    # JWT Authentication
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()