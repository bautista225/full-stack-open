const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const note = await Blog
        .findById(request.params.id)
    if (note)
        response.json(note)
    else
        response.status(404).end()
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const { title, author, url } = request.body
    const user = request.user

    const blog = new Blog({
        title,
        author,
        url,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blogToUpdate = {
        title,
        author,
        url,
        likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true, runValidators: true })

    response.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if (blog.user.toString() !== user._id.toString())
        return response.status(401).json({ error: 'user is not the owner of the blog' })

    await blog.deleteOne()
    response.status(204).end()
})

module.exports = blogsRouter