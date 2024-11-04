const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const mainUrlAPI = '/api/blogs'

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

test('a valid blog can be added', async () => {
    const newBlog = {
        "title": "Adding Hola mundo",
        "author": "Juan Bautista",
        "url": "https://github.com/bautista225",
        "likes": 33
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

test('a blog without likes has the property equal to 0', async () => {
    const newBlog = {
        "title": "Hola mundo sin likes",
        "author": "Juan Bautista",
        "url": "https://github.com/bautista225",
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

test('blog without title is not added', async () => {
    const newBlog = {
        "author": "Juan Bautista",
        "url": "https://github.com/bautista225",
        "likes": 33
    }

    await api
        .post(mainUrlAPI)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
    const newBlog = {
        "title": "Hola mundo",
        "author": "Juan Bautista",
        "likes": 33
    }

    await api
        .post(mainUrlAPI)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

/* test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    
    const resultBlog = await api
        .get(`${mainUrlAPI}/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
}) */

/* test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`${mainUrlAPI}/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const ids = blogsAtEnd.map(r => r.id)
    assert(!ids.includes(blogToDelete.id))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
}) */

after(async () => {
    await mongoose.connection.close()
})