import {Link} from "react-router-dom";
import {Typography, TableContainer, Table, Paper, TableBody, TableRow, TableCell, TableHead} from "@mui/material";

const Users = ({users}) => {

    if (users.length < 1) {
        return (
            <div id={'userlist'}>
                <Typography variant={'h4'}>Users</Typography>
                <Typography variant={'body1'}>Loading users...</Typography>
            </div>
        )}

    return (
        <div id={'userlist'} style={{marginTop: "10px"}}>
            <Typography variant={'h4'}>Users</Typography>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Blogs created</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user)=> {
                    return (<TableRow key={user.id}>
                        <TableCell><Link to={`/users/${user.id}`}>{user.username}</Link></TableCell>
                        <TableCell>{user.blogs.length}</TableCell>
                    </TableRow>)
                })}
                </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users