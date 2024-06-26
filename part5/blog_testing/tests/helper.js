const login = async (page, username, password) => {
    await page.locator("#loginUsernameInput").fill(username)
    await page.locator('#loginPasswordInput').fill(password)
    await page.getByRole('button', {name: "Log in"}).click()

}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', {name: "new note"}).click() // click the initial button to show the form

    // fill in the form fields
    await page.locator("#titleInput").fill(title)
    await page.locator("#authorInput").fill(author)
    await page.locator("#urlInput").fill(url)
    await page.getByRole('button', {name: "Create"}).click()
}

export {login, createBlog}