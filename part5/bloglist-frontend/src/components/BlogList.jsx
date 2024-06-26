import Blog from './Blog.jsx'
import BlogForm from './BlogForm.jsx'
import Toggleable from './Toggleable.jsx'

const BlogList = ({ blogs, user, handleLogout, handleNewBlog, handleLike, handleDelete, blogFormRef }) => {


  return <div id={'blogList'}>
    <h1>blogs</h1>
    <p>{user.username} is logged in <button onClick={handleLogout}>Log out</button></p>
    <h3>Create a blog</h3>
    <Toggleable buttonLabel={'new note'} ref={blogFormRef}>
      <BlogForm handleNewBlog={handleNewBlog} />
    </Toggleable>
    <h3>Created Blogs</h3>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>
    )}
  </div>
}

export default BlogList