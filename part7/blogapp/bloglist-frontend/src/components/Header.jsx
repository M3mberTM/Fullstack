import Login from "./Login.jsx";
import {Link} from "react-router-dom";

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
        <div id={"header"} style={{display: "flex", backgroundColor: "#94bdff"}}>
            <div>
                <Link to={"/"} style={{marginRight: "5px"}}>Blogs</Link>
                <Link to={"/users"} style={{marginRight: "5px"}}>Users</Link>
            </div>
            <div>
                <p style={{margin: "0"}}>
                    {user.username} is currently logged in{' '}
                    <button onClick={handleLogout}>Log out</button>
                </p>
            </div>
        </div>
    )

}

export default Header