import {gql} from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author
      genres
      id
      published
      title
    }
  }
  `
export const ALL_BOOKS = gql`
  query {
    allBooks {
      author
      published
      title
      id
    }
  }
 `
export const ALL_PERSONS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
 `

export const EDIT_AUTHOR = gql`
   mutation EditAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
            bookCount
            id
        }
    } 
    `