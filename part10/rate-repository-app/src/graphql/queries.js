import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`query Repositories {
  repositories {
    edges {
      node {
        language
        id
        reviewCount
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

export const ME = gql`
query Me {
    me {
        id
        username
    }
}   
`