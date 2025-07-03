import PropTypes from 'prop-types'
const Login = ({
    setUsername,
    username,
    setPassword,
    password,
    handleLogin,
}) => {
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
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}
export default Login
