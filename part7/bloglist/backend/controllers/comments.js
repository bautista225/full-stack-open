const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

commentsRouter.get('/:id/comments', async (request, response) => {
    const comments = await Comment.find({ blog: request.params.id })
    response.json(comments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
    const { content } = request.body
    const blogId = request.params.id

    const comment = new Comment({
        content: content,
        blog: blogId,
    })

    const savedComment = await comment.save()

    const blog = await Blog.findById(blogId)

    blog.comments = [...blog.comments, savedComment.id]

    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { comments: savedComment.id } }, // Añade el comentario al array
        { new: true, runValidators: true }
    )

    response.json(savedComment)
})

module.exports = commentsRouter
