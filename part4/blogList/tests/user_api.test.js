const {test, after, beforeEach, describe} = require('node:test')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require("node:assert");


const api = supertest(app)

const initialUser = [
    {
        username: "m3mber",
        name: "Richard",
        password: "tryout"
    },
    {
        username: "levis094",
        name: "Lewis",
        password: "password123"
    }
]


beforeEach(async () => {
    await User.deleteMany({})

    for (let user of initialUser) {
        let userObject = new User(user)
        await userObject.save()
    }
})


describe('User creation validation testing', () => {

    const invalidUsers = [
        {
            username: "m3mber",
            name: "Richard",
            password: "tryout"
        },
        {
            username: "aa",
            name: "rich",
            password: "asljdf"
        },
        {
            username: "levi",
            name: "a",
            password: "password"
        },
        {
            name: "asvd",
            password: "asdlkjf"
        },
        {
            username: "Peter",
            password: "password"
        }
    ]

    const validUsers = [
        {
            username: "Peter",
            name: "Peter Bjorn",
            password: "password"
        },
        {
            username: "Lewis",
            name: "Lewis",
            password: "password"
        }
    ]


    test('Checking duplicate usernames in db', async () => {
        await api.post('/api/users').send(invalidUsers[0]).expect(400)
    })

    test('Checking too short username', async () => {
        await api.post('/api/users').send(invalidUsers[1]).expect(400)
    })

    test('Checking too short name', async () => {
        await api.post('/api/users').send(invalidUsers[2]).expect(400)
    })

    test('Checking missing username', async () => {
        await api.post('/api/users').send(invalidUsers[3]).expect(400)
    })

    test('Checking missing name', async () => {
        await api.post('/api/users').send(invalidUsers[4]).expect(400)
    })

    test('Checking adding of new users', async () => {

        for (let user of validUsers) {
            const result = await api.post('/api/users').send(user).expect(201)
                .expect('Content-Type', /application\/json/)
        }

    })
})

after(async () => {
    await mongoose.connection.close()
})