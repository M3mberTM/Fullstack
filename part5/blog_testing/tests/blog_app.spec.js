const {test, expect, beforeEach, describe} = require('@playwright/test')
const {login, createBlog} = require('./helper')
describe('Blog app', () => {
    beforeEach(async ({page, request}) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                username: "m3mber",
                name: "Richard",
                password: "tryout123",
                blogs: []
            }
        })



        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({page}) => {
        const locator = await page.getByText("Log into the application")
        await expect(locator).toBeVisible()
        await expect(page.getByRole('button', {name: "Log in"})).toBeVisible()
    })

    describe('Login', () => {

        const correctUser = {
            username: "m3mber",
            name: "Richard",
            password: "tryout123",
            blogs: []
        }

        const incorrectUser = {
            username: "peter",
            name: "Peter",
            password: "password"
        }
        test('succeeds with correct credentials', async ({page}) => {

            await login(page, correctUser.username, correctUser.password)
            await page.getByText(`${correctUser.username} is logged in`).waitFor()


            await expect(page.getByText(`${correctUser.username} is logged in`)).toBeVisible()
        })

        test('fails with wrong credentials', async ({page}) => {

            await login(page, incorrectUser.username, incorrectUser.password)
            await expect(page.getByText("Wrong username or password")).toBeVisible()
        })
    })


})

describe('When logged in', () => {
    const correctUser = {
        username: "m3mber",
        name: "Richard",
        password: "tryout123",
        blogs: []
    }

    beforeEach(async ({page, request}) => {
        await request.post('http://localhost:3003/api/testing/reset')

        await request.post('http://localhost:3003/api/users', {
            data: {
                username: "m3mber",
                name: "Richard",
                password: "tryout123",
                blogs: []
            }
        })

        await page.goto('http://localhost:5173')

        await login(page, correctUser.username, correctUser.password)
        await page.getByText(`${correctUser.username} is logged in`).waitFor()
    })

    test('a new blog can be created', async ({page}) => {

        const blog = {
            title: "E2E testing",
            author: "testing program",
            url: "test.com"
        }

        await createBlog(page, blog.title, blog.author, blog.url)
        await page.getByText(`${blog.title} - by ${blog.author}`).waitFor()
        // test for whether the blog was created
        await expect(page.getByText(`${blog.title} - by ${blog.author}`)).toBeVisible()
    })

    test('blog can be liked', async ({page}) => {

        const blog = {
            title: "Liking a blog",
            author: "testing program",
            url: "test.com"
        }

        await createBlog(page, blog.title, blog.author, blog.url)
        await page.getByRole('button', {name: 'View'}).waitFor()

        await page.getByRole('button', {name: 'View'}).click()
        await page.getByRole('button', {name: "Like"}).click()

        await expect(page.getByText("Likes: 1")).toBeVisible()
    })

    test('blog can be deleted', async({page}) => {

        const blog = {
            title: "to be deleted",
            author: "testing program",
            url: "test.com"
        }
        // creation of the blog
        await createBlog(page, blog.title, blog.author, blog.url)
        await page.getByRole('button', {name: 'View'}).waitFor()

        await page.getByRole('button', {name: 'View'}).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', {name: 'Remove'}).click()

        await expect(page.getByRole('button', {name: 'View'})).not.toBeVisible()

    })
})