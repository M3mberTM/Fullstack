import {Link, useNavigate} from "react-router-dom";

const Users = ({users}) => {

    if (users.length < 1) {
        return (
            <div id={'userlist'}>
                <h2>Users</h2>
                <p>Loading users...</p>
            </div>
        )}

    return (
        <div id={'userlist'}>
            <h2>Users</h2>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>Blogs created</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user)=> {
                    return (<tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Users