var _ = require('lodash')

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (!blogs.length) return null
    return blogs.reduce((favorite, current) => current.likes > (favorite.likes || 0) ? current : favorite, {})
}

const mostBlogs = (blogs) => {
    if (!blogs.length) return null

    const blogsByAuthor = _.countBy(blogs, 'author')
    const authorWithMostBlogs = _.maxBy(Object.keys(blogsByAuthor), (author) => blogsByAuthor[author])

    return {
        author: authorWithMostBlogs,
        blogs: blogsByAuthor[authorWithMostBlogs],
    }
}

const mostLikes = (blogs) => {
    if (!blogs.length) return null

    const mostLikesByAuthor = _(blogs).groupBy('author').map((blogs, author) =>
        ({ author: author, likes: _.sumBy(blogs, 'likes') })).maxBy('likes')

    return mostLikesByAuthor
}

module.exports = {
    totalLikes, favoriteBlog, mostBlogs, mostLikes
}