const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const mainUrlAPI = '/api/blogs'

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        for (let blog of helper.initialBlogs) {
            let blogObject = new Blog(blog)
            await blogObject.save()
        }
    })

    test('blogs are returned as json', async () => {
        await api
            .get(mainUrlAPI)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get(mainUrlAPI)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('a specific blog contains the identifier id instead of _id', async () => {
        const response = await api.get(mainUrlAPI)

        assert('id' in response.body[0])
        assert(!('_id' in response.body[0]))
    })

    describe('addition of a new blog', () => {
        test('succeeds with valid data', async () => {
            const newBlog = {
                'title': 'Adding Hola mundo',
                'author': 'Juan Bautista',
                'url': 'https://github.com/bautista225',
                'likes': 33
            }

            await api
                .post(mainUrlAPI)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

            assert.strictEqual(blogsAtEnd.slice(-1)[0].title, 'Adding Hola mundo')
        })

        test('without likes property, saves the property equal to 0', async () => {
            const newBlog = {
                'title': 'Hola mundo sin likes',
                'author': 'Juan Bautista',
                'url': 'https://github.com/bautista225',
            }

            await api
                .post(mainUrlAPI)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

            assert.strictEqual(blogsAtEnd.slice(-1)[0].likes, 0)
        })

        test('without title is not added, failing with status code 400', async () => {
            const newBlog = {
                'author': 'Juan Bautista',
                'url': 'https://github.com/bautista225',
                'likes': 33
            }

            await api
                .post(mainUrlAPI)
                .send(newBlog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })

        test('without url is not added, failing with status code 400', async () => {
            const newBlog = {
                'title': 'Hola mundo',
                'author': 'Juan Bautista',
                'likes': 33
            }

            await api
                .post(mainUrlAPI)
                .send(newBlog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`${mainUrlAPI}/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            const ids = blogsAtEnd.map(r => r.id)
            assert(!ids.includes(blogToDelete.id))

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        })
    })

    describe('updating a blog', () => {
        test('succeeds with valid data', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const oldBlog = blogsAtStart[1]

            const blogToUpdate = {
                title: oldBlog.title,
                author: oldBlog.author,
                url: oldBlog.url,
                likes: 33
            }

            await api
                .put(`${mainUrlAPI}/${oldBlog.id}`)
                .send(blogToUpdate)
                .expect(200)

            const blogsAtEnd = await helper.blogsInDb()

            const updatedBlog = blogsAtEnd.find(blog => blog.id === oldBlog.id)

            assert.strictEqual(updatedBlog.likes, 33)
            assert.notStrictEqual(blogsAtStart[1].likes, updatedBlog.likes)
        })
    })
})

after(async () => {
    await mongoose.connection.close()
})