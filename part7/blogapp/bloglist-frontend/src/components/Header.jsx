import Login from "./Login.jsx";
import {Link} from "react-router-dom";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";

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
        <AppBar id={"header"} position={"static"}>
            <Toolbar>
                <div style={{flexGrow: 1}}>
                    <Button color={"inherit"} component={Link} to={"/"}>
                        Blogs
                    </Button>
                    <Button color={"inherit"} component={Link} to={"/users"}>
                        Users
                    </Button>
                </div>
                <Typography sx={{marginRight: "5px"}}>{user.username} is currently logged in</Typography>
                <Button onClick={handleLogout} color={"inherit"} variant={"outlined"}>Log out</Button>
            </Toolbar>
        </AppBar>
    )

}

export default Header