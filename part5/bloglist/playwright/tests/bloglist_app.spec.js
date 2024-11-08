const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
    }

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', { data: user })
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        await expect(page.getByText('username')).toBeVisible()
        await expect(page.getByText('password')).toBeVisible()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByPlaceholder('Username').fill(user.username)
            await page.getByPlaceholder('Password').fill(user.password)
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText(`${user.name} logged in`)).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByPlaceholder('Username').fill(user.username)
            await page.getByPlaceholder('Password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()

            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        const blog = {
            title: 'A blog created with Playwright',
            author: 'Playwright',
            url: 'playwright.dev'
        }

        beforeEach(async ({ page }) => {
            await page.getByPlaceholder('Username').fill(user.username)
            await page.getByPlaceholder('Password').fill(user.password)
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()

            await page.getByPlaceholder('title').fill(blog.title)
            await page.getByPlaceholder('author').fill(blog.author)
            await page.getByPlaceholder('url').fill(blog.url)
            await page.getByRole('button', { name: 'create' }).click()

            await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
        })

        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'new blog' }).click()

                await page.getByPlaceholder('title').fill(blog.title)
                await page.getByPlaceholder('author').fill(blog.author)
                await page.getByPlaceholder('url').fill(blog.url)
                await page.getByRole('button', { name: 'create' }).click()
            })

            test('a blog can be marked as liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()

                await expect(page.getByText('likes 0')).toBeVisible()

                await page.getByRole('button', { name: 'like' }).click()

                await expect(page.getByText(`${blog.title} by ${blog.author} updated`)).toBeVisible()
                await expect(page.getByText('likes 1')).toBeVisible()
            })

            test('a blog can be deleted', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                page.on('dialog', dialog => dialog.accept())
                await page.getByRole('button', { name: 'remove' }).click()

                await expect(page.getByText(`${blogObject.title} by ${blogObject.author} removed`)).toBeVisible()
                await expect(page.getByText(`${blog.title} ${blog.author}`)).not.toBeVisible()
            })
        })
    })
})