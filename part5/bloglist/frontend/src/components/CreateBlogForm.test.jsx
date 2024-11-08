import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Juan Bautista',
        url: 'https://github.com/bautista225',
    }

    let conatiner
    const createBlogHandler = vi.fn()

    beforeEach(() => {
        conatiner = render(<CreateBlogForm createBlog={createBlogHandler} />).container
    })

    test('clicking create button submits form data', async () => {
        const user = userEvent.setup()

        const titleInput = screen.getByPlaceholderText('title')
        await userEvent.type(titleInput, blog.title)

        const authorInput = screen.getByPlaceholderText('author')
        await userEvent.type(authorInput, blog.author)

        const urlInput = screen.getByPlaceholderText('url')
        await userEvent.type(urlInput, blog.url)

        const createButton = screen.getByText('create')
        await user.click(createButton)

        expect(createBlogHandler.mock.calls[0][0]).toStrictEqual(blog)
    })
})