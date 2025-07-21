import {gql} from "@apollo/client";

export const AUTHENTICATE = gql`
    mutation($credentials: AuthenticateInput) {
      authenticate(credentials: $credentials) {
        accessToken
      }
    }
`