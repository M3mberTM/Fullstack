const logger = require('./logger')
const {request} = require("express");
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}


const errorHandler = (error, request, response, next) => {

    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    } else if (error.name === "MongoServerError" && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({
            error: "Expected 'username' to be unique"
        })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({error: 'token invalid'})
    }

    next(error)
}

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {

        return authorization.replace('Bearer ', '')
    }
    return null
}


const tokenExtractor = (request, response, next) => {
    request.token = getTokenFrom(request)
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (decodedToken) {

        request.user = await User.findById(decodedToken.id)

    } else {
        response.status(401).json({error: "token is invalid"})
    }

    next()
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

module.exports = {
    unknownEndpoint, errorHandler, requestLogger, tokenExtractor, userExtractor
}