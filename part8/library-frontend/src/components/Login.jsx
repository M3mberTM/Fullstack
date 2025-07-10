import {ALL_BOOKS, LOGIN} from "../queries.js";
import {useMutation} from "@apollo/client";
import {useEffect} from "react";
const Login = ({show, handleTokenAdd, notifyError}) => {
    if (!show) {
       return null
    }
    const [login, result] = useMutation(LOGIN, {refetchQueries: [{query: ALL_BOOKS}], onError: (error) => notifyError(error.graphQLErrors[0].message)})

    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value
            handleTokenAdd(token)
        }
    }, [result.data])
    const handleSubmit = (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        login({variables: {username: username, password: password}}).then()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username:
                    <input name={'username'}/><br/>
                </div>
                <div>
                    Password:
                    <input type={'password'} name={'password'}/><br/>
                </div>
                <button type={'submit'}>Login</button>
            </form>
        </div>
    )
}

export default Login