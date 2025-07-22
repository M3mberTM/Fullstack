import {gql} from "@apollo/client";

export const REPOSITORY_INFO = gql`
fragment RepositoryInformation on Repository {
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
`