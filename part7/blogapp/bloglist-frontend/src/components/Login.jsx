import PropTypes from 'prop-types'
import {useState} from "react";
const Login = ({
    login,
}) => {

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        await login(username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <div id={'loginForm'}>
            <form onSubmit={handleLogin}>
                <h1>Log into the application</h1>
                <div>
                    Username
                    <input
                        id={'loginUsernameInput'}
                        type={'text'}
                        name={'Username'}
                        value={username}
                        onChange={({ target }) =>
                            setUsername(target.value)
                        }></input>
                </div>
                <div>
                    Password
                    <input
                        id={'loginPasswordInput'}
                        type={'text'}
                        name={'Password'}
                        value={password}
                        onChange={({ target }) =>
                            setPassword(target.value)
                        }></input>
                </div>
                <button type={'submit'}>Log in</button>
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}
export default Login
