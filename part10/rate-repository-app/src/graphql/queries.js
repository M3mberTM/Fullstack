import { gql } from '@apollo/client';
import {REPOSITORY_INFO} from "./fragments";

export const GET_REPOSITORIES = gql`query Repositories {
  repositories {
    edges {
      node {
        ...RepositoryInformation
      }
    }
  }
}
${REPOSITORY_INFO}`

export const ME = gql`
query Me {
    me {
        id
        username
    }
}   
`

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
        url
        ...RepositoryInformation
    }
}    
${REPOSITORY_INFO}
`