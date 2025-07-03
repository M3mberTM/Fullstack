import Login from "./Login.jsx";

const Header = ({user, handleLogout, handleLogin}) => {


   if (user==null) {
       return (
           <div id={"header"}>
               <Login
                   login={handleLogin}
               />
           </div>
       )
   }

    return (
        <div id={"header"}>
            <h1>blogs</h1>
            <p>
                {user.username} is currently logged in{' '}
                <button onClick={handleLogout}>Log out</button>
            </p>
        </div>
    )

}

export default Header