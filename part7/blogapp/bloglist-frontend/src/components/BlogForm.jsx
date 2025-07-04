import { useState } from 'react'
import {TextField, Typography, Button} from "@mui/material";

const BlogForm = ({ handleNewBlog }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    const createBlog = async (event) => {
        event.preventDefault()
        const blog = {
            title,
            author,
            url,
        }
        handleNewBlog(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div id={'blogForm'}>
            <form onSubmit={createBlog}>
                <div>
                    <Typography>Title: {' '}
                    <TextField
                        size={'small'}
                        variant={"standard"}
                        id={'titleInput'}
                        placeholder={'title'}
                        type={'text'}
                        name={'title'}
                        value={title}
                        onChange={({ target }) =>
                            setTitle(target.value)
                        }></TextField></Typography>
                </div>

                <div>
                    <Typography>Author: {' '}
                    <TextField
                        size={'small'}
                        variant={'standard'}
                        id={'authorInput'}
                        placeholder={'author'}
                        type={'text'}
                        name={'author'}
                        value={author}
                        onChange={({ target }) =>
                            setAuthor(target.value)
                        }></TextField></Typography>
                </div>

                <div>
                    <Typography>Url: {' '}
                    <TextField
                        size={'small'}
                        variant={"standard"}
                        id={'urlInput'}
                        placeholder={'url'}
                        type={'text'}
                        name={'url'}
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}></TextField></Typography>
                </div>
                <Button size={'small'}  variant={'outlined'} id={'blogFormSubmit'} type={'submit'}>
                    Create
                </Button>
            </form>
        </div>
    )
}

export default BlogForm
