import {useQuery} from "@apollo/client";
import {ALL_BOOKS, ME} from '../queries.js'

const Recommendations = ({show}) => {

    if (!show) {
        return null
    }

    const meRequest = useQuery(ME, {fetchPolicy: "no-cache"})
    console.log(meRequest)
    const me = meRequest.loading ? null : meRequest.data.me
    const favoriteGenre = me ? me.favoriteGenre : null
    const result = useQuery(ALL_BOOKS, {variables: {genre: favoriteGenre}, skip: !me})


    if (!me || !result.data) {
        return (
            <div>Loading data...</div>
        )
    }

    return (
        <div>
            <h2>Recommendations</h2>
            <p>Books in your favorite genre: <strong>{me.favoriteGenre}</strong></p>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {result.data.allBooks.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations