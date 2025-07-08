import {gql, useQuery} from "@apollo/client";

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const ALL_PERSONS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
 `
  const authorsRequest = useQuery(ALL_PERSONS)
  const authors = authorsRequest.loading ? null : authorsRequest.data.allAuthors

  if (!authors) {
    return (
        <div>loading...</div>
    )
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
