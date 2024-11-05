const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Timestamp:', new Date())
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const ERROR_HANDLERS = {
    defaultError: response =>
        response.status(500).end(),
    CastError: response =>
        response.status(400).send({ error: 'malformatted id' }),
    ValidationError: (response, error) =>
        response.status(400).json({ error: error.message }),
    MongoServerError: (response, error) => {
        if (error.message.includes('E11000 duplicate key error'))
            return response.status(400).json({ error: 'expected `username` to be unique' })
        else
            return ERROR_HANDLERS.defaultError
    },
    JsonWebTokenError: response =>
        response.status(401).json({ error: 'token invalid' }),
    TokenExpiredError: response =>
        response.status(401).json({ error: 'token expired' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    const errorHandler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

    errorHandler(response, error)
    next(error)
}

const tokenExtractor = (request, response, next) => {
    request.token = null

    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer '))
        request.token = authorization.replace('Bearer ', '')

    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id)
        return response.status(401).json({ error: 'token invalid' })

    const user = await User.findById(decodedToken.id)

    request.user = user

    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}