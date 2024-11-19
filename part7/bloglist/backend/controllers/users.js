const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const middleware = require('../utils/middleware')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!password || typeof (password) !== 'string' || password.length < 3)
        return response.status(400).json({ error: '`password` is not valid' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', middleware.userExtractor, async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, url: 1 })
    response.json(users)
})

module.exports = usersRouter