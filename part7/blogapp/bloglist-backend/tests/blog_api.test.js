const { test, after, beforeEach, describe, before } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'testing ongoing',
        author: 'Peter',
        url: 'youtube.com',
        likes: 30,
    },
    {
        title: 'test2',
        author: 'Richard',
        url: 'test.com',
        likes: 10,
    },
]

const initialUser = {
    username: 'Peter',
    name: 'Peter Bjorn',
    password: 'password',
}

let token = ''

before(async () => {
    await User.deleteMany({})
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(initialUser.password, saltRounds)

    const user = new User({
        username: initialUser.username,
        name: initialUser.name,
        passwordHash,
    })

    await user.save()

    const loginResult = await api
        .post('/api/login')
        .send({
            username: initialUser.username,
            password: initialUser.password,
        })
    token = loginResult.body.token
    const getResult = await api.get('/api/users')
    initialUser.id = getResult.body[0].id
})

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
        blog.user = initialUser.id
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('Getting methods of blog - /api/blogs', () => {
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

describe('Posting of blogs - /api/blogs', () => {
    const newBlog = {
        title: 'posted new note',
        author: 'test',
        url: 'aaa.com',
        likes: 15,
        userId: initialUser.id,
    }

    test('Checking if posting successfully adds to the database', async () => {
        const result = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
    })

    test('Checking that posted content equals that in the database', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
        assert.strictEqual(response.body.title, newBlog.title)
    })
})

describe('Deleting of blogs', () => {
    test('Checking if deleting content works', async () => {
        const result = await api.get('/api/blogs')
        const dbBlogs = result.body
        await api
            .del(`/api/blogs/${dbBlogs[0].id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
    })

    test('Checking if deleting content removes from the database', async () => {
        const result = await api.get('/api/blogs')
        const dbBlogs = result.body
        await api
            .del(`/api/blogs/${dbBlogs[0].id}`)
            .set('Authorization', `Bearer ${token}`)
        const newResult = await api.get('/api/blogs')
        const newDbBlogs = newResult.body
        assert.strictEqual(newDbBlogs.length, initialBlogs.length - 1)
    })
})

describe('Updating of blogs', () => {
    const newBlog = {
        title: 'Updated',
        author: 'test',
        url: 'aaa.com',
        likes: 15,
    }
    test('Checking if blog is correctly updated', async () => {
        const result = await api.get('/api/blogs')
        const updatedVal = await api
            .put(`/api/blogs/${result.body[0].id}`)
            .send(newBlog)

        for (let property of Object.keys(newBlog)) {
            assert.strictEqual(updatedVal.body[property], newBlog[property])
        }
    })
})

describe('Input testing', () => {
    const missingLikesBlog = {
        title: 'posted new note',
        author: 'test',
        url: 'aaa.com',
    }

    const missingInfoBlogs = [
        {
            author: 'test',
            url: 'aaa.com',
        },
        {
            title: 'aljsdf',
            author: 'richard',
            likes: 10,
        },
        {
            author: 'missingNo',
        },
    ]

    test('Likes property defaults to 0 if it isnt provided', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(missingLikesBlog)
        assert.strictEqual(response.body.likes, 0)
    })

    test('Error if title or url is missing in a blog', async () => {
        for (let blog of missingInfoBlogs) {
            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(blog)
                .expect(400)
        }
    })
})

after(async () => {
    await mongoose.connection.close()
})
