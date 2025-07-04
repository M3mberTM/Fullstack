import {useSelector} from "react-redux";
import {useState} from "react";
import {Link, Typography, Button, TextField, List, ListItem, ListItemText, Paper} from "@mui/material";

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
                <Typography variant={"h4"}>Unfortunately, we couldn't find your blog</Typography>
            </div>
        )
    }

    return (
        <div id={"blogDetail"} style={{marginTop: '10px'}}>
            <Typography variant={'h4'}>{blogObject.title} - {blogObject.author}</Typography>
            <Link href={blogObject.url}>{blogObject.url}</Link>
            <Typography variant={'body1'}>{blogObject.likes} likes <Button variant={'contained'} size={'small'} onClick={() => handleLike(blogObject)}>Like</Button></Typography>
            <Typography variant={'body1'}>Added by {blogObject.user.username}</Typography>
            <Typography variant={'h5'}>comments</Typography>
            <form onSubmit={handleAddComment}>
                <TextField variant={'outlined'} size={'small'} placeholder={"content"} name={"content"} value={content} onChange={({target}) => setContent(target.value)}/>
                <Button variant={'contained'} size={'medium'} type={"submit"}>Add comment</Button>
            </form>
            {comments.length > 0 &&
                <List component={Paper}>
                    {comments.map((comment) => {
                        return <ListItem key={comment.id}><ListItemText primary={comment.content}/></ListItem>
                    })}
                </List>
            }
            {loggedUser.username === blogObject.user.username &&
                <Button variant={'contained'} onClick={() => handleRemove(blogObject)}>Remove Blog</Button>
            }
        </div>
    )

}

export default BlogDetails