import gql from "graphql-tag";

export const postFragment = gql`
  fragment postData on PostType {
    id
    title
    slug
    description
    previewImage
    isPublished
    isFeatured
    dateCreated
    datePublished
    category {
      name
      slug
    }
    tags {
      name
      slug
    }
  }
`;

export const SITE_INFO_QUERY = gql`
  query getSite {
    site {
      id
      name
      about
    }
  }
`;

export const POST_BY_SLUG_QUERY = gql`
  query getPostBySlug($slug: String!) {
    postBySlug(slug: $slug) {
      ...postData
      user {
        id
        username
        displayName
        avatar
      }
      content
      numberOfLikes
      likes {
        id
      }
      commentSet {
        id
        content
        dateCreated
        isApproved
        user {
          id
          username
          avatar
        }
        numberOfLikes
        likes {
          id
        }
      }
    }
  }
  ${postFragment}
`;

export const POSTS_BY_CATEGORY_QUERY = gql`
  query getPostsByCategory($category: String!) {
    postsByCategory(category: $category) {
      ...postData
    }
    categoryBySlug(slug: $category) {
      id
      name
      description
    }
  }
  ${postFragment}
`;

export const POSTS_BY_TAG_QUERY = gql`
  query getPostsByTags($tag: String!) {
    postsByTag(tag: $tag) {
      ...postData
    }
    tagBySlug(slug: $tag) {
      id
      name
      description
    }
  }
  ${postFragment}
`;

export const ALL_POSTS_QUERY = gql`
  query getAllPosts {
    allPosts {
      ...postData
      previewImage
    }
  }
  ${postFragment}
`;

export const CATEGORIES_QUERY = gql`
  query getAllCategories {
    allCategories {
      id
      name
      slug
      description
    }
  }
`;

export const TAGS_QUERY = gql`
  query getAllTags {
    allTags {
      id
      name
      slug
      description
    }
  }
`;
