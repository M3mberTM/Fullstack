import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm.jsx'

describe('Input checking', () => {
    test('Same output as input', async () => {
        const mockHandler = vi.fn()
        const input = {
            title: 'Test',
            author: 'program',
            url: 'intellij.idea',
        }

        const { container } = render(<BlogForm handleNewBlog={mockHandler} />)
        const user = userEvent.setup()

        const titleInput = container.querySelector('#titleInput')
        const authorInput = container.querySelector('#authorInput')
        const urlInput = container.querySelector('#urlInput')
        const submitButton = container.querySelector('#blogFormSubmit')

        await user.type(titleInput, input.title)
        await user.type(authorInput, input.author)
        await user.type(urlInput, input.url)
        await user.click(submitButton)

        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0].title).toBe(input.title)
        expect(mockHandler.mock.calls[0][0].author).toBe(input.author)
        expect(mockHandler.mock.calls[0][0].url).toBe(input.url)
    })
})
