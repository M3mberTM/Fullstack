import Blog from './Blog.jsx'
import BlogForm from './BlogForm.jsx'
import Toggleable from './Toggleable.jsx'
import {Typography, Paper, TableContainer, Table, TableBody} from "@mui/material";

const BlogList = ({
    blogs,
    handleNewBlog,
    blogFormRef,
}) => {
    return (
        <div id={'blogList'} style={{marginTop: "10px"}}>
            <Typography variant={"h4"}>Create a blog</Typography>
            <Toggleable buttonLabel={'new note'} ref={blogFormRef}>
                <BlogForm handleNewBlog={handleNewBlog} />
            </Toggleable>
            <Typography sx={{marginTop:"10px"}} variant={"h4"}>Created Blogs</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {blogs.map((blog) => (
                            <Blog
                                key={blog.id}
                                blog={blog}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default BlogList
