const Login = ({setUsername, username, setPassword, password, handleLogin}) => {

    return <div id={"loginForm"}>
        <form onSubmit={handleLogin}>
        <h1>Log into the application</h1>
        <div>
            Username
            <input type={"text"} name={"Username"} value={username} onChange={({target}) => setUsername(target.value)}></input>
        </div>
        <div>
            Password
            <input type={"text"} name={"Password"} value={password} onChange={({target}) => setPassword(target.value)}></input>
        </div>
        <button type={"submit"}>Log in</button>
        </form>
    </div>

}

export default Login;