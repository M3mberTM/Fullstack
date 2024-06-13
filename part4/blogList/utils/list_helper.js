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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}