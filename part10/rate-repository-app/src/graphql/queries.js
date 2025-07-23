import { gql } from '@apollo/client';
import {REPOSITORY_INFO} from "./fragments";

export const GET_REPOSITORIES = gql`query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
    edges {
      node {
        ...RepositoryInformation
      }
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
query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
        url
        ...RepositoryInformation
        reviews {
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
        }
    }
}    
${REPOSITORY_INFO}
`