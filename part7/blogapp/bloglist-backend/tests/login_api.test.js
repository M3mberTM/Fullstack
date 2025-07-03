const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const user = {
    username: 'Peter',
    password: 'password',
}

test('Logging in', async () => {
    const result = await api.post('/api/login').send(user).expect(200)
    console.log(result.body)
})

after(async () => {
    await mongoose.connection.close()
})
