import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog.jsx";


describe("Rendering without events", () => {
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
        const {container} = render(<Blog blog={blog}/>)

        const element = container.querySelector(".note")

        expect(element).not.toHaveTextContent(blog.url)
    })

})


describe("Rendering with user events", () => {

    test("Url and likes are rendered after toggling the element", async () => {
        const blog = {
            title: "Content",
            author: "Richard",
            url: "youtube.com",
            likes: 40,
            user: {
                username: "m3mber"
            }
        }
        const {container} = render(<Blog blog={blog}/>)

        const user = userEvent.setup()
        const button = container.querySelector(".blogToggleButton")
        await user.click(button)


        const element = container.querySelector(".note")

        expect(element).toHaveTextContent(blog.url)
        expect(element).toHaveTextContent(blog.likes)
    })
})

describe('Event handlers', () => {

    test('Like handling', () => {

    })
})