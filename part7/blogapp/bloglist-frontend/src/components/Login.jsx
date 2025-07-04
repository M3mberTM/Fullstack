import PropTypes from 'prop-types'
import {useState} from "react";
import {Typography, Button, TextField} from "@mui/material";

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
                <Typography variant={'h4'}>Log into the application</Typography>
                <div>
                    <Typography>Username</Typography>
                    <TextField
                        size={'small'}
                        id={'loginUsernameInput'}
                        type={'text'}
                        name={'Username'}
                        value={username}
                        onChange={({ target }) =>
                            setUsername(target.value)
                        }></TextField>
                </div>
                <div>
                    <Typography>Password</Typography>
                    <TextField
                        size={'small'}
                        id={'loginPasswordInput'}
                        type={'text'}
                        name={'Password'}
                        value={password}
                        onChange={({ target }) =>
                            setPassword(target.value)
                        }></TextField>
                </div>
                <Button variant={'contained'} type={'submit'}>Log in</Button>
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
}
export default Login
