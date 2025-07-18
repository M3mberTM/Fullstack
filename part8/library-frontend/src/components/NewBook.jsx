import {useState} from 'react'
import {useMutation} from "@apollo/client";
import {ADD_BOOK, ALL_BOOKS, ALL_GENRES, ALL_PERSONS} from "../queries.js";

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [addBook, bookResult] = useMutation(ADD_BOOK, {
        onError: (error) => {
            console.log(error)
            props.notifyError(error.graphQLErrors[0].message)
        },
        refetchQueries: [{query: ALL_PERSONS}, {query: ALL_GENRES}, {query: ALL_BOOKS, variables: {genre: null}}]
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        console.log('add book...')
        addBook({variables: {title, author, published: parseInt(published), genres}}).then()
        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    title
                    <input
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type="number"
                        value={published}
                        onChange={({target}) => setPublished(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({target}) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        add genre
                    </button>
                </div>
                <div>genres: {genres.join(' ')}</div>
                <button type="submit">create book</button>
            </form>
        </div>
    )
}

export default NewBook