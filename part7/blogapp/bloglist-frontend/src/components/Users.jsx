import { useEffect, useState } from 'react'
import UserService from '../services/users.js'

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        UserService.getAll().then((data) => {
            console.log('Retrieved users: ', data)
            setUsers(data)
        })
    }, [])

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
                        <td>{user.username}</td>
                        <td>{user.blogs.length}</td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Users