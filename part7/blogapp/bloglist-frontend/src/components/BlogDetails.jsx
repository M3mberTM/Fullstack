import {useSelector} from "react-redux";
import {useState} from "react";

const BlogDetails = ({blogObject, handleLike, handleRemove, comments, handleNewComment}) => {

    const loggedUser = useSelector(state => state.user.loggedUser)
    const [content, setContent] = useState("")

    const handleAddComment = (event) => {
        event.preventDefault()
        if (content.length > 0) {
            handleNewComment(blogObject.id, content).then()
        }
        setContent('')
    }

    if (!blogObject) {
        return (
            <div id={"blogDetail"}>
                <h3>Unfortunately, we couldn't find your blog</h3>
            </div>
        )
    }

    return (
        <div id={"blogDetail"}>
            <h2>{blogObject.title} - {blogObject.author}</h2>
            <a href={blogObject.url}>{blogObject.url}</a>
            <p>{blogObject.likes} likes <button onClick={() => handleLike(blogObject)}>Like</button></p>
            <p>Added by {blogObject.user.username}</p>
            <h3>comments</h3>
            <form onSubmit={handleAddComment}>
                <input placeholder={"content"} name={"content"} value={content} onChange={({target}) => setContent(target.value)}/>
                <button type={"submit"}>Add comment</button>
            </form>
            <ul>
                {comments.map((comment) => {
                    return <li key={comment.id}>{comment.content}</li>
                })}
            </ul>
            {loggedUser.username === blogObject.user.username &&
                <button onClick={() => handleRemove(blogObject)}>Remove</button>
            }
        </div>
    )

}

export default BlogDetails