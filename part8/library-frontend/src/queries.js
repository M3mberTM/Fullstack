import {gql} from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      author{
        name
        }
      genres
      id
      published
      title
    }
  }
  `
export const ALL_BOOKS = gql`
  query AllBooks($genre: String, $author: String) {
    allBooks(genre: $genre, author: $author) { 
      author {
        name
      }
      published
      title
      id
      genres
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

export const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        value
      }
    }
`
export const ME = gql`
    query {
      me {
        username
        id
        favoriteGenre
      }
    }    
`

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            author {
                name
            }
            title
            published
            genres
            id
        }
    }
`