const GRAPHQL_QUERIES = {
  FEATURED_ARTICLES: `{
    posts(first: 3, where: {categoryName: "Featured"}) {
      edges {
        node {
          title
          uri
          featuredImage {
            node {
              altText
              link
              srcSet
            }
          }
          categories(where: {}) {
            edges {
              node {
                name
              }
              isPrimary
            }
          }
        }
      }
    }
  }`,
  FEATURED_POST_PAGE_ARTICLES: `{
    posts(first: 6, where: {categoryName: "Featured"}) {
      edges {
        node {
          title
          uri
          featuredImage {
            node {
              altText
              link
              srcSet
            }
          }
        }
      }
    }
  }`,
  NEWS_AND_RUMORS_ARTICLES: (num: number = 12) => `{
    posts(first: ${num}, where: {categoryIn: [22, 1525]}) {
      edges {
        node {
          title
          uri
          featuredImage {
            node {
              altText
              link
              srcSet
            }
          }
          categories(where: {}) {
            edges {
              node {
                name
              }
              isPrimary
            }
          }
          excerpt(format: RENDERED)
        }
      }
      pageInfo {
        endCursor
      }
    }
  }`,
  LOAD_MORE_NEWS_AND_RUMORS_ARTICLES(cursor: string) {
    return `{
    posts(first: 12, where: {categoryIn: [22, 1525]}, after: "${cursor}") {
      edges {
        node {
          title
          uri
          featuredImage {
            node {
              altText
              link
              srcSet
            }
          }
          categories(where: {}) {
            edges {
              node {
                name
              }
              isPrimary
            }
          }
          excerpt(format: RENDERED)
        }
      }
      pageInfo {
        endCursor
      }
    }
  }`;
  },
  PAY_PER_VIEW_ARTICLE: `{
    posts(first: 1, where: {categoryName: "PPV"}) {
      edges {
        node {
          title
          uri
          featuredImage {
            node {
              altText
              link
              srcSet
            }
          }
          categories(where: {}) {
            edges {
              node {
                name
              }
              isPrimary
            }
          }
          excerpt(format: RENDERED)
        }
      }
    }
  }`,
  RESULTS_ARTICES: `{ 
    posts(first: 4, where: {categoryName: "Results"}) {
      edges {
        node {
          title
          uri
          featuredImage {
            node {
              altText
              link
              srcSet
            }
          }
          excerpt(format: RENDERED)
        }
      }
    }
  }`,
  ARTICLES_BOTTOM_PAGE: `{
    posts(first: 5, where: {categoryName: "Lists"}) {
      edges {
        node {
          title
          uri
          featuredImage {
            node {
              altText
              link
              srcSet
            }
          }
          categories(where: {}) {
            edges {
              node {
                name
              }
              isPrimary
            }
          }
          excerpt(format: RENDERED)
        }
      }
    }
  }`,
  GET_ALL_CATEGORIES: `{
    categories(first: 999) {
      nodes {
        slug
      }
    }
  }`,
  GET_ALL_TAGS: `{
    tags(first: 999) {
      nodes {
        slug
      }
    }
  }`,
  GET_CATEGORY_DATA(slug: string) {
    return `{
      categories(where: {slug: "${slug}"}) {
        nodes {
          name
          databaseId 
          seo {
            title
            fullHead
          }
        }
      }
    }`;
  },
  GET_TAG_DATA(slug: string) {
    return `{
      tags(where: {slug: "${slug}"}) {
        nodes {
          name
          databaseId 
          seo {
            title
            fullHead
          }
        }
      }
    }`;
  },

  GET_CATEGORY_POSTS(id: number, offset: number) {
    return `{
      posts(first: 12, where: {categoryId: ${id}, offsetPagination: { size: 10, offset: ${offset} }}) {
        edges {
          node {
            title
            slug
            uri
            featuredImage {
              node {
                altText
                link
                srcSet
              }
            }
            categories {
              edges {
                node {
                  name
                }
                isPrimary
              }
            }
            excerpt(format: RENDERED)
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          offsetPagination {
            hasMore
            hasPrevious
            total
          }
        }
      }
    }`;
  },
  GET_TAG_POSTS(id: number, offset: number) {
    return `{
      posts(first: 12, where: {tagId: "${id}", offsetPagination: { size: 10, offset: ${offset} }}) {
        edges {
          node {
            title
            slug
            uri
            featuredImage {
              node {
                altText
                link
                srcSet
              }
            }
            categories(where: {}) {
              edges {
                node {
                  name
                }
                isPrimary
              }
            }
            excerpt(format: RENDERED)
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          offsetPagination {
            hasMore
            hasPrevious
            total
          }
        }
      }
    }`;
  },
  GET_URI_POSTS: `{ 
    posts(first: 99999) {
      nodes {
        uri
        content(format: RENDERED)
      }
    }
  }`,
  GET_SITEMAP_URI_POSTS: `{ 
    posts(first: 99999) {
      nodes {
        uri
        title
        date
      }
    }
  }`,
  GET_POST(slug: string) {
    return `{
      post(id: "${slug}", idType: SLUG) {
        author {
          node {
            uri
            firstName
            lastName
            nicename
            nickname
            name
          }
        }
        databaseId
        seo {
          title
          fullHead
        }
        uri
        date
        title(format: RENDERED)
        content(format: RENDERED)
        featuredImage {
          node {
            link
            altText
            title
            caption
            srcSet
          }
        }
        featuredVideo {
          url
        }
      }
    }`;
  },
  GET_POST_CURSOR(id: string) {
    return `{
      posts(where: {id: ${id}}, first: 1) {
        pageInfo {
          endCursor
        }
      }
    }`;
  },
  GET_NEXT_POST(cursor: string) {
    return `{
      posts(first: 1, after: "${cursor}") {
        nodes {
          author {
            node {
              uri
              firstName
              lastName
              nicename
              nickname
              name
            }
          }
          databaseId
          seo {
            title
          }
          categories {
            edges {
              node {
                name
              }
              isPrimary
            }
          }
          uri
          date
          title(format: RENDERED)
          content(format: RENDERED)
          featuredImage {
            node {
              link
              altText
              title
              caption
              srcSet
            }
          }
          featuredVideo {
            url
          }
        } 
      }
    }`;
  },
  GET_ALL_AUTHORS: `{
    users(first: 99) {
      nodes {
        slug
        description
        seo {
          title
          fullHead
        }
      }
    }
  }`,
  GET_AUTHOR_DATA(slug: string) {
    return `{
      users(where: {search: "${slug}", hasPublishedPosts: POST}) {
        nodes {
          name
          databaseId 
          description
          seo {
            title
            fullHead
          }
        }
      }
    }`;
  },
  GET_AUTHOR_POSTS(id: number, offset: number) {
    return `{
      posts(first: 12, where: {author: ${id}, offsetPagination: { size: 10, offset: ${offset} }}) {
        edges {
          node {
            title
            slug
            uri
            featuredImage {
              node {
                altText
                link
                srcSet
              }
            }
            categories(where: {}) {
              edges {
                node {
                  name
                }
                isPrimary
              }
            }
            excerpt(format: RENDERED)
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          offsetPagination {
            hasMore
            hasPrevious
            total
          }
        }
      }
    }`;
  },
  GET_PAGE_HEAD_SEO(id: string) {
    return `{
      page(id: "${id}", idType: DATABASE_ID) {
        seo {
          fullHead
          title
          metaDesc
        }
      }
    }`;
  },
  SEARCH_POSTS(query: string, offset: number) {
    return `{
      posts(first: 12, where: {search: "${query}", offsetPagination: { size: 10, offset: ${offset} }}) {
        edges {
          node {
            title
            slug
            uri
            featuredImage {
              node {
                altText
                link
                srcSet
              }
            }
            categories(where: {}) {
              edges {
                node {
                  name
                }
                isPrimary
              }
            }
            excerpt(format: RENDERED)
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
          offsetPagination {
            hasMore
            hasPrevious
            total
          }
        }
      }
    }`;
  },
};

export default GRAPHQL_QUERIES;
