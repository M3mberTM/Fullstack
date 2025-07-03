import { useState } from 'react'

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
                    Title
                    <input
                        id={'titleInput'}
                        placeholder={'title'}
                        type={'text'}
                        name={'title'}
                        value={title}
                        onChange={({ target }) =>
                            setTitle(target.value)
                        }></input>
                </div>

                <div>
                    Author
                    <input
                        id={'authorInput'}
                        placeholder={'author'}
                        type={'text'}
                        name={'author'}
                        value={author}
                        onChange={({ target }) =>
                            setAuthor(target.value)
                        }></input>
                </div>

                <div>
                    Url
                    <input
                        id={'urlInput'}
                        placeholder={'url'}
                        type={'text'}
                        name={'url'}
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}></input>
                </div>
                <button id={'blogFormSubmit'} type={'submit'}>
                    Create
                </button>
            </form>
        </div>
    )
}

export default BlogForm
