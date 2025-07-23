import {gql} from '@apollo/client';
import {REPOSITORY_INFO} from "./fragments";

export const GET_REPOSITORIES = gql`query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
    edges {
      node {
        ...RepositoryInformation
      }
    }
    pageInfo {
        hasNextPage 
        endCursor
    }
  }
}
${REPOSITORY_INFO}`

export const ME = gql`
query Me($includeReviews: Boolean = false) {
    me {
        id
        username
        reviews @include(if: $includeReviews) {
            edges {
                node {
                    text
                    createdAt
                    rating
                    id
                    repositoryId
                    repository {
                        fullName
                    }
                } 
            }
        }
    }
}   
`

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
        url
        ...RepositoryInformation
        reviews(first: $first, after: $after) {
            edges {
                node {
                    id
                    text
                    rating
                    createdAt
                    user {
                        id
                        username 
                    } 
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
}    
${REPOSITORY_INFO}
`