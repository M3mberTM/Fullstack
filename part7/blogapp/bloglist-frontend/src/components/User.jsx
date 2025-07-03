
const User = ({userObject}) => {

    if (!userObject) {
        return (
            <div id={"user"}>
                <h3>No user found</h3>
            </div>
        )
    }
    return (
        <div id={"user"}>
            <h2>{userObject.username}</h2>
            <h3>added blogs</h3>
            <ul>
                {userObject.blogs.map((blog)=> {
                    return <li key={blog.id}>{blog.title}</li>
                })}
            </ul>
        </div>
    )
}

export default User