import Blog from './Blog.jsx'
import BlogForm from './BlogForm.jsx'
import Toggleable from './Toggleable.jsx'

const BlogList = ({
    blogs,
    handleNewBlog,
    blogFormRef,
}) => {
    return (
        <div id={'blogList'}>
            <h3>Create a blog</h3>
            <Toggleable buttonLabel={'new note'} ref={blogFormRef}>
                <BlogForm handleNewBlog={handleNewBlog} />
            </Toggleable>
            <h3>Created Blogs</h3>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                />
            ))}
        </div>
    )
}

export default BlogList
