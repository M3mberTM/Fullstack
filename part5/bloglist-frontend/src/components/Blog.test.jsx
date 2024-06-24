import {render, screen} from '@testing-library/react'
import Blog from "./Blog.jsx";

test('renders content', () => {

    const blog = {
        title: "Content",
        author: "Richard",
        url: "youtube.com",
        likes: 40,
        user: {
            username: "m3mber"
        }
    }
    render(<Blog blog={blog}/>)

    const title = screen.getByText(blog.title, {exact: false})
    const author = screen.getByText(blog.author, {exact: false})
    expect(title).toBeDefined()
    expect(author).toBeDefined()
})

test("doesn't render toggleable content", () => {

    const blog = {
        title: "Content",
        author: "Richard",
        url: "youtube.com",
        likes: 40,
        user: {
            username: "m3mber"
        }
    }
    const { container} = render(<Blog blog={blog}/>)

    const element = container.querySelector(".note")
    screen.debug()
    expect(element).not.toHaveTextContent(blog.url)
})