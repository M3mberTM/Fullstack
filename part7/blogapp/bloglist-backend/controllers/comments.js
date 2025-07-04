const CommentRouter = require('express').Router()
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

CommentRouter.get('/', async (request, response) => {
    const result = await Comment.find({}).populate('blog', {
        title: 1,
        id: 1,
    })
    response.json(result)
})

CommentRouter.get('/blog/:id', async (request, response) => {
    const blogId = request.params.id
    const result = await Comment.find({blog: blogId}).populate('blog', {
        title: 1,
        id: 1,
    })
    response.json(result)
})

CommentRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    const comment = new Comment({
        content: body.content,
        blog: body.blog,
        user: user.id
    })

    const savedComment = await comment.save()

    response.status(201).json(savedComment)
})

CommentRouter.delete(
    '/:id',
    middleware.userExtractor,
    async (request, response) => {
        const comment = await Comment.findById(request.params.id)
        const user = request.user
        if (comment.user.toString() === user.id) {
            await Comment.findByIdAndDelete(request.params.id)
            response.status(204).end()
        } else {
            response
                .status(401)
                .json({ error: 'Only creator can delete a comment' })
        }
    }
)


module.exports = CommentRouter
