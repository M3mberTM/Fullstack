const {test, after, beforeEach, describe} = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require("../utils/list_helper");
const assert = require("node:assert");

const api = supertest(app)

const initialBlogs = [
    {
        title: "testing ongoing",
        author: "Peter",
        url: "youtube.com",
        likes: 30
    },
    {
        title: "test2",
        author: "Richard",
        url: "test.com",
        likes: 10
    },
]


beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe("Getting methods of blog - /api/blogs", () => {

    test('Check that the notes are returned in JSON format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('Check correct number of blogs in db', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, 2)
    })

    test('Checking that the Blog Object has id property', async () => {
        const response = await api.get('/api/blogs')

        for (let blog of response.body) {

            assert(Object.hasOwn(blog, 'id'))
        }

    })
})

describe("Posting of blogs - /api/blogs", () => {

    const newBlog = {
        title: "posted new note",
        author: "test",
        url: "aaa.com",
        likes: 15
    }

    test('Checking if posting successfully adds to the database', async () => {
        await api.post('/api/blogs').send(newBlog)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
    })

    test('Checking that posted content equals that in the database', async () => {

        const response = await api.post('/api/blogs').send(newBlog)
        assert.strictEqual(response.body.title, newBlog.title)
    })

})

describe('Input testing', () => {

    const missingLikesBlog = {
        title: "posted new note",
        author: "test",
        url: "aaa.com"
    }

    const missingInfoBlogs = [
        {
            author: "test",
            url: "aaa.com"
        },
        {
            title: 'aljsdf',
            author: 'richard',
            likes: 10
        },
        {
            author: 'missingNo'

        }
    ]

    test('Likes property defaults to 0 if it isnt provided', async () => {
        const response = await api.post('/api/blogs').send(missingLikesBlog)
        assert.strictEqual(response.body.likes, 0)
    })

    test('Error if title or url is missing in a blog', async () => {

        for (let blog of missingInfoBlogs) {
            await api.post('/api/blogs').send(blog).expect(400)

        }
    })

})

after(async () => {
    await mongoose.connection.close()
})