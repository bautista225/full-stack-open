const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', { data: helper.userOne })
        await request.post('/api/users', { data: helper.userTwo })
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
            await helper.loginWith(page, helper.userOne)

            await expect(page.getByText(`${helper.userOne.name} logged in`)).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await helper.loginWith(page, {username: helper.userOne.username, password: 'wrong'})

            await expect(page.getByText('wrong username or password')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await helper.loginWith(page, helper.userOne)
        })

        test('a new blog can be created', async ({ page }) => {
            const blog = helper.blogList[0]
            await helper.createBlog(page, blog)

            await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
        })

        describe('and a blog exists', () => {
            const blog = helper.blogList[0]

            beforeEach(async ({ page }) => {
                await helper.createBlog(page, blog)
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

                await expect(page.getByText(`${blog.title} by ${blog.author} removed`)).toBeVisible()
                await expect(page.getByText(`${blog.title} ${blog.author}`)).not.toBeVisible()
            })

            test('a user that is not the owner of the blog can not remove it', async ({page}) => {    
                await helper.logout(page)
                
                await helper.loginWith(page, helper.userTwo)

                await page.getByRole('button', { name: 'view' }).click()

                await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
            })
        })

        describe('and multiple blogs exists', () => {
            beforeEach(async ({ page }) => {
                for (const blog of helper.blogList)
                    await helper.createBlog(page, blog)
            })

            test('they are ordered by number of likes in descend', async ({page}) => {
                const [firstBlog, secondBlog, thirdBlog] = helper.blogList

                await page.getByText(`${thirdBlog.title} ${thirdBlog.author}`).locator('..').getByRole('button', { name: 'view' }).click()
                await helper.addLike(page, thirdBlog)
                await helper.addLike(page, thirdBlog)
                await helper.addLike(page, thirdBlog)

                await page.getByText(`${firstBlog.title} ${firstBlog.author}`).locator('..').getByRole('button', { name: 'view' }).click()
                await helper.addLike(page, firstBlog)

                await page.goto('/')

                const firstElement = page.getByText(`${thirdBlog.title} ${thirdBlog.author}`).locator('..')

                const secondBlogElement = firstElement.locator('xpath=following-sibling::*[1]')
                await expect(secondBlogElement).toContainText(`${firstBlog.title} ${firstBlog.author}`)

                const thirdElement = secondBlogElement.locator('xpath=following-sibling::*[1]')
                await expect(thirdElement).toContainText(`${secondBlog.title} ${secondBlog.author}`)
            })
        })
    })
})