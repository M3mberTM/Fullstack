import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog.jsx";


describe("Rendering without events", () => {

    let container
    const blog = {
        title: "Content",
        author: "Richard",
        url: "youtube.com",
        likes: 40,
        user: {
            username: "m3mber"
        }
    }


    beforeEach(() => {
        container = render(
            <Blog blog={blog}/>
        ).container
    })

    test('renders content', () => {

        const title = screen.getByText(blog.title, {exact: false})
        const author = screen.getByText(blog.author, {exact: false})
        expect(title).toBeDefined()
        expect(author).toBeDefined()
    })

    test("doesn't render toggleable content", () => {

        const element = container.querySelector(".note")

        expect(element).not.toHaveTextContent(blog.url)
    })

})


describe("Rendering with user events", () => {

    let container
    const blog = {
        title: "Content",
        author: "Richard",
        url: "youtube.com",
        likes: 40,
        user: {
            username: "m3mber"
        }
    }


    beforeEach(() => {
        container = render(
            <Blog blog={blog}/>
        ).container
    })

    test("Url and likes are rendered after toggling the element", async () => {

        const user = userEvent.setup()
        const button = container.querySelector(".blogToggleButton")
        await user.click(button)


        const element = container.querySelector(".note")

        expect(element).toHaveTextContent(blog.url)
        expect(element).toHaveTextContent(blog.likes)
    })
})

describe('Event handlers', () => {

    let container
    const blog = {
        title: "Content",
        author: "Richard",
        url: "youtube.com",
        likes: 40,
        user: {
            username: "m3mber"
        }
    }
    const likeHandler = vi.fn()


    beforeEach(() => {

        container = render(
            <Blog blog={blog} handleLike={likeHandler}/>
        ).container
    })

    test('Like handling', async () => {

        const user = userEvent.setup()
        const toggleButton = container.querySelector('.blogToggleButton')
        await user.click(toggleButton)

        const likeButton = container.querySelector('.likeButton')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeHandler.mock.calls).toHaveLength(2)
    })
})