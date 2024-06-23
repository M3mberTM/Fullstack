import {useState} from "react";

const Blog = ({blog, handleLike, handleDelete}) => {
    const [isInfoVisible, setInfoVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }


    if (!isInfoVisible) {
        return (

            <div style={blogStyle}>
                <div>
                    {blog.title} - by {blog.author}
                    <button onClick={() => setInfoVisible(true)}>View</button>
                </div>
            </div>
        )
    } else {
        return (
            <div style={blogStyle}>
                {blog.title} - by {blog.author}
                <button onClick={() => setInfoVisible(false)}>Hide</button>
                <br/>
                {blog.url}
                <br/>
                Likes: {blog.likes}
                <button onClick={() => handleLike(blog)}>Like</button>
                <br/>
                {blog.user.username}
                <br/>
                <button onClick={() => handleDelete(blog)}>Remove</button>
            </div>
        )
    }


}

export default Blog