import {Typography, List, ListItem, ListItemText, ListItemIcon, Paper} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const User = ({userObject}) => {

    if (!userObject) {
        return (
            <div id={"user"}>
                <Typography variant={'h4'}>No user found</Typography>
            </div>
        )
    }
    return (
        <div id={"user"} style={{marginTop: "10px"}}>
            <Typography variant={'h4'}>{userObject.username}</Typography>
            <Typography variant={'h6'}>added blogs</Typography>
            <List dense={true} component={Paper}>
                {userObject.blogs.map((blog)=> {
                    return <ListItem key={blog.id}>
                        <ListItemIcon><ArrowForwardIosIcon/></ListItemIcon>
                        <ListItemText primary={blog.title}/>
                    </ListItem>
                })}
            </List>
        </div>
    )
}

export default User