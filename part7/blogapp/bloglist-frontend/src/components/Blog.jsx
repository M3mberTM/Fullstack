import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
    const [isInfoVisible, setInfoVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    if (!isInfoVisible) {
        return (
            <div style={blogStyle} className={'note'}>
                <div>
                    {blog.title} - by {blog.author}
                    <button
                        className={'blogToggleButton'}
                        onClick={() => setInfoVisible(true)}>
                        View
                    </button>
                </div>
            </div>
        )
    } else {
        return (
            <div style={blogStyle} className={'note'}>
                {blog.title} - by {blog.author}
                <button onClick={() => setInfoVisible(false)}>Hide</button>
                <br />
                {blog.url}
                <br />
                Likes: {blog.likes}
                <button
                    className={'likeButton'}
                    onClick={() => handleLike(blog)}>
                    Like
                </button>
                <br />
                {blog.user.username}
                <br />
                {user.username === blog.user.username && (
                    <button
                        className={'blogToggleButton'}
                        onClick={() => handleDelete(blog)}>
                        Remove
                    </button>
                )}
            </div>
        )
    }
}

export default Blog
