import {useEffect, useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from './components/Login.jsx'
import {useApolloClient} from "@apollo/client";

const App = () => {
    const [page, setPage] = useState("authors");
    const [token, setToken] = useState(undefined)
    const [error, setError] = useState(undefined)
    const client = useApolloClient()

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
        localStorage.clear()
        client.resetStore().then()
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
                        <button onClick={() => logout()}>logout</button>
                    </span>
                }
                {!token &&
                    <button onClick={() => setPage("login")}>login</button>
                }
            </div>

            <Authors show={page === "authors"} token={token}/>

            <Books show={page === "books"} />

            <NewBook show={page === "add"} notifyError={notifyError} />
            <Login show={page === 'login'} notifyError={notifyError} handleTokenAdd={handleTokenAdd}/>
        </div>
    );
};

export default App;
