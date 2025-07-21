import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`query Repositories {
  repositories {
    edges {
      node {
        language
        id
        reviews {
          totalCount
        }
        stargazersCount
        forksCount
        ratingAverage
        description
        fullName
        ownerAvatarUrl
      }
    }
  }
}`