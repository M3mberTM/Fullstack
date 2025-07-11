import {useEffect, useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from './components/Login.jsx'
import {useApolloClient} from "@apollo/client";
import Recommendations from "./components/Recommendations.jsx";
import {useSubscription} from "@apollo/client";
import {BOOK_ADDED} from "./queries.js";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(undefined)
    const [error, setError] = useState(undefined)
    const client = useApolloClient()

    useSubscription(BOOK_ADDED, {
        onData: ({data}) => {
            console.log('subscription data: ', data)
            window.alert(JSON.stringify(data.data.bookAdded))
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
