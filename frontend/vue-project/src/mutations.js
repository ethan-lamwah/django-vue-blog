import gql from "graphql-tag";

export const USER_SIGNUP = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        id
        username
      }
    }
  }
`;

export const USER_SIGNIN = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      payload
      refreshExpiresIn
      user {
        id
        username
        firstName
        lastName
        email
        avatar
      }
    }
  }
`;

export const SUBMIT_COMMENT = gql`
  mutation SubmitComment($content: String!, $userID: ID!, $postID: ID!) {
    createComment(content: $content, userId: $userID, postId: $postID) {
      comment {
        content
      }
    }
  }
`;

export const UPDATE_POST_LIKE = gql`
  mutation UpdatePostLike($postID: ID!, $userID: ID!) {
    updatePostLike(postId: $postID, userId: $userID) {
      post {
        id
        title
        numberOfLikes
        likes {
          id
        }
      }
    }
  }
`;
