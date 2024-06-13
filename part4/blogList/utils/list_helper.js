const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    for (let i = 0; i < blogs.length; i++) {
        likes = likes + blogs[i].likes
    }

    return likes
}

const favoriteBlog = (blogs) => {
    let topBlog = {likes: -99}
    for (let i = 0; i < blogs.length; i++) {

        if (topBlog.likes < blogs[i].likes) {
            topBlog = blogs[i]
        }
    }

    return {
        title: topBlog.title,
        author: topBlog.author,
        likes: topBlog.likes
    }
}

const mostBlogs = (blogs) => {
    const authors = {}

    for (let i = 0; i < blogs.length; i++) {
        if (Object.hasOwn(authors, blogs[i].author)) {
            authors[blogs[i].author] = authors[blogs[i].author] + 1
        } else {
            authors[blogs[i].author] = 1
        }
    }

    console.log(authors)
    let topAuthor = {blogs: -99}
    Object.keys(authors).forEach((val) => {
        if (topAuthor.blogs < authors[val]) {
            topAuthor = {
                author: val,
                blogs: authors[val]
            }
        }
    })
    return topAuthor

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}