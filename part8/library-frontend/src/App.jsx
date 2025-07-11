import {useEffect, useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from './components/Login.jsx'
import {useApolloClient} from "@apollo/client";
import Recommendations from "./components/Recommendations.jsx";
import {useSubscription} from "@apollo/client";
import {ALL_BOOKS, BOOK_ADDED} from "./queries.js";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(undefined)
    const [error, setError] = useState(undefined)
    const client = useApolloClient()

    const updateCache = (cache, query, addedBook) => {
        const uniqByName = (a) => {
            let seen = new Set()
            return a.filter((item) => {
                let k = item.title
                return seen.has(k) ? false : seen.add(k)
            })
        }
        cache.updateQuery(query, (data) => {
            return {
                allBooks: uniqByName(data.allBooks.concat(addedBook))
            }
        })
    }

    useSubscription(BOOK_ADDED, {
        onData: ({data, client}) => {
            const addedBook = data.data.bookAdded
            notifyError(`New book added: ${addedBook.title}`)
            updateCache(client.cache, {query: ALL_BOOKS, variables: {genre: null}}, addedBook)

        }
    })

    useEffect(() => {
        const savedToken = localStorage.getItem('book-token')
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])
    const handleTokenAdd = (currToken) => {
        setToken(currToken)
        localStorage.setItem('book-token', currToken)
        setPage('authors')
    }

    const logout = () => {
        setToken(undefined)
        client.resetStore().then()
        localStorage.clear()
        setPage('authors')
    }

    const notifyError = (message) => {
        setError(message)
        setTimeout(() => setError(undefined), 3000)
    }
    return (
        <div>
            {error}
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                {token &&
                    <span>
                        <button onClick={() => setPage("add")}>add book</button>
                        <button onClick={() => setPage('recommend')}>recommend</button>
                        <button onClick={() => logout()}>logout</button>
                    </span>
                }
                {!token &&
                    <button onClick={() => setPage("login")}>login</button>
                }
            </div>

            <Authors show={page === "authors"} token={token}/>

            <Books show={page === "books"} />
            <Recommendations show={ page==='recommend' }/>
            <NewBook show={page === "add"} notifyError={notifyError} />
            <Login show={page === 'login'} notifyError={notifyError} handleTokenAdd={handleTokenAdd}/>
        </div>
    );
};

export default App;
