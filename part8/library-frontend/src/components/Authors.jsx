import {useQuery, useMutation} from "@apollo/client";
import {ALL_PERSONS, EDIT_AUTHOR} from "../queries.js";

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const [editAuthor] = useMutation(EDIT_AUTHOR, {refetchQueries: [{query: ALL_PERSONS}]})
  const authorsRequest = useQuery(ALL_PERSONS)
  const authors = authorsRequest.loading ? null : authorsRequest.data.allAuthors

  const changeBirthYear = (event) => {
    event.preventDefault()
    const authorName = event.target.name.value
    const birthYear = parseInt(event.target.birthyear.value)

    editAuthor({variables: {name: authorName, setBornTo: birthYear}}).then()
  }


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

      <div>
        <h2>Set birth year</h2>
        <form onSubmit={changeBirthYear}>
          <div>
            name:
            <select name={'name'}>
              {authors.map((a)=> {
                return <option key={a.id}>{a.name}</option>
              })}
            </select>
          </div>
          <div>
            birth year:
            <input name={'birthyear'} type={'number'}/>
          </div>
          <button type={'submit'}>Update Author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
