const {test, expect, beforeEach, describe} = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({page, request}) => {
        await request.post('http:localhost:3003/api/testing/reset')
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
            await page.locator("#loginUsernameInput").fill(correctUser.username)
            await page.locator('#loginPasswordInput').fill(correctUser.password)
            await page.getByRole('button', {name: "Log in"}).click()
            await page.getByText(`${correctUser.username} is logged in`).waitFor()
            await expect(page.getByText(`${correctUser.username} is logged in`)).toBeVisible()
        })

        test('fails with wrong credentials', async ({page}) => {
            await page.locator("#loginUsernameInput").fill(incorrectUser.username)
            await page.locator('#loginPasswordInput').fill(incorrectUser.password)
            await page.getByRole('button', {name: "Log in"}).click()

            await expect(page.getByText("Wrong username or password")).toBeVisible()
        })
    })
})