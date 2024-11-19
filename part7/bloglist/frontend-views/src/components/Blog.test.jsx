import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    const user = {
        username: 'bautista225',
        name: 'Juan Bautista'
    }

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Juan Bautista',
        url: 'https://github.com/bautista225',
        likes: 33,
        user: user
    }

    let conatiner
    const updateBlogHandler = vi.fn()

    beforeEach(() => {
        conatiner = render(<Blog blog={blog} user={user} updateBlog={updateBlogHandler} />).container
    })

    test('at start shows title and author but not url and likes', () => {
        const element = screen.getByText(`${blog.title} ${blog.author}`)
        expect(element).toBeDefined()

        const hiddenElement = screen.getByText(blog.url)
        expect(hiddenElement.parentNode).toHaveStyle('display:none')
    })

    test('clicking the view button shows url and likes', async () => {
        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const hiddenElement = screen.getByText(blog.url)
        expect(hiddenElement.parentNode).not.toHaveStyle('display:none')
    })

    test('clicking twice the like button calls event handler twice', async () => {
        const user = userEvent.setup()
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(updateBlogHandler.mock.calls).toHaveLength(2)
    })
})
