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

// ...

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
})