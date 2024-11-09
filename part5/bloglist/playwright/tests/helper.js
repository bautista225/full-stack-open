const userOne = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
}

const userTwo = {
    name: 'Juan Bautista',
    username: 'bautista225',
    password: 'salainen'
}

const blogList = [
    {
        title: 'A first blog created with Playwright',
        author: 'Playwright',
        url: 'playwright.dev'
    },
    {
        title: 'A second blog created with Playwright',
        author: 'Playwright',
        url: 'playwright.dev'
    },
    {
        title: 'A third blog created with Playwright',
        author: 'Playwright',
        url: 'playwright.dev'
    },
]

const loginWith = async (page, user) => {
    await page.getByPlaceholder('Username').fill(user.username)
    await page.getByPlaceholder('Password').fill(user.password)
    await page.getByRole('button', { name: 'login' }).click()
}

const logout = async(page) => {
    await page.getByRole('button', { name: 'logout' }).click()
}

const createBlog = async (page, blog) => {
    await page.getByRole('button', { name: 'new blog' }).click()

    await page.getByPlaceholder('title').fill(blog.title)
    await page.getByPlaceholder('author').fill(blog.author)
    await page.getByPlaceholder('url').fill(blog.url)
    await page.getByRole('button', { name: 'create' }).click()

    // Wait the blog to be renderized to avoid start creating other one even 
    // before the server has responded, and the added blog is rendered on the screen.
    await page.getByText(`${blog.title} ${blog.author}`).waitFor()
}

const addLike = async (page, blog) => {
    await page.getByText(`${blog.title} ${blog.author}`).locator('..').getByRole('button', { name: 'like' }).click()

    await page.getByText(`${blog.title} by ${blog.author} updated`).waitFor()
}

export { userOne, userTwo, blogList, loginWith, logout, createBlog, addLike }