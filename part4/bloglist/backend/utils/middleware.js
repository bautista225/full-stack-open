const logger = require('./logger')

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
    defaultError: (response, error) => {
        console.error(error.name)
        response.status(500).end()
    },
    CastError: response =>
        response.status(400).send({ error: 'malformatted id' }),
    ValidationError: (response, error) =>
        response.status(400).json({ error: error.message }),
    MongoServerError: (response, error) => {
        if (error.message.includes('E11000 duplicate key error'))
            return response.status(400).json({ error: 'expected `username` to be unique' })
        else
            return ERROR_HANDLERS.defaultError
    }
}

const errorHandler = (error, request, response) => {
    logger.error(error.message)

    const errorHandler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

    errorHandler(error, response)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}