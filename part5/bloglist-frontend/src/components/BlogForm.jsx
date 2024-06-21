const BlogForm = ({title, setTitle, author, setAuthor, url, setUrl, handleNewBlog}) => {

    return <div id={"blogForm"}>
        <form onSubmit={handleNewBlog}>
            <div>
                Title
                <input type={"text"} name={"title"} value={title} onChange={({target}) => setTitle(target.value)}></input>
            </div>

            <div>
                Author
                <input type={"text"} name={"author"} value={author} onChange={({target}) => setAuthor(target.value)}></input>
            </div>

            <div>
                Url
                <input type={"text"} name={"url"} value={url} onChange={({target}) => setUrl(target.value)}></input>
            </div>
            <button type={"submit"}>Create</button>
        </form>
    </div>

}

export default BlogForm;