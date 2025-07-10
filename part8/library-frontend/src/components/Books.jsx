import {useQuery} from "@apollo/client";
import {ALL_BOOKS, ALL_GENRES} from "../queries.js";
import {useState} from "react";

const Books = (props) => {
  if (!props.show) {
    return null
  }
  const [pickedGenre, setPickedGenre] = useState(null)

  const genreRequest = useQuery(ALL_GENRES)
  const filteredBookRequest = useQuery(ALL_BOOKS, {variables: {genre: pickedGenre}})

  if (!genreRequest.data || !filteredBookRequest.data) {
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
          {filteredBookRequest.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genreRequest.data.allGenres.map((a) => {
          return <button key={a} onClick={() => setPickedGenre(a)}>{a}</button>
        })}
        <button onClick={() => setPickedGenre(null)}>CLEAR</button>
      </div>
    </div>
  )
}

export default Books
