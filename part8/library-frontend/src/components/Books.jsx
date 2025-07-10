import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../queries.js";
import {useState} from "react";

const Books = (props) => {
  if (!props.show) {
    return null
  }
  const [pickedGenre, setPickedGenre] = useState(null)

  const booksRequest = useQuery(ALL_BOOKS)
  const books = booksRequest.loading ? null : booksRequest.data.allBooks
  let allGenres = []
  let filteredBooks = []
  if (books) {
    for (const book of books) {
      for (const genre of book.genres) {
        if (!allGenres.includes(genre)) {
          allGenres.push(genre)
        }
      }
    }
    if (!pickedGenre) {
      filteredBooks = books
    } else {
      filteredBooks = books.filter((a) => a.genres.includes(pickedGenre))
    }
  }

  if (!books) {
    return (
        <div>loading...</div>
    )
  }
  return (
    <div>
      <h2>books</h2>
      {pickedGenre &&
          <p>In genre {pickedGenre}</p>
      }
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((a) => {
          return <button key={a} onClick={() => setPickedGenre(a)}>{a}</button>
        })}
        <button onClick={() => setPickedGenre(null)}>CLEAR</button>
      </div>
    </div>
  )
}

export default Books
