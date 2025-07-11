const {GraphQLError} = require('graphql')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const {PubSub} = require('graphql-subscriptions')

const pubsub = new PubSub()
const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let bookFilter = {}
            if (args.genre) {
                bookFilter = {...bookFilter, genres: args.genre}
            }
            if (args.author) {
                const pickedAuthor = await Author.findOne({name: args.author})
                bookFilter = {...bookFilter, author: pickedAuthor._id}
            }
            return Book.find(bookFilter).populate('author')
        },
        allAuthors: async () => {
            return Author.find({})
        },
        me: (root, args, context) => {
            console.log('current user: ', context.currentUser)
            return context.currentUser
        },
        allGenres: async () => {
            const books = await Book.find({})
            const genres = new Set(books.map((a) => a.genres).flat())
            return [...genres]
        }
    },
    Mutation: {
        addBook: async (root, args, {currentUser}) => {
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            const currAuthor = await Author.findOne({name: args.author})
            let newAuthor = null
            if (!currAuthor) {
                const author = Author({name: args.author, bookCount: 1})
                try {
                    await author.save()
                } catch (error) {
                    throw new GraphQLError('Saving author failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.author,
                            error
                        }
                    })
                }
                newAuthor = author
            } else {
                currAuthor.bookCount = currAuthor.bookCount + 1
                await currAuthor.save()
                newAuthor = currAuthor
            }
            const book = Book({...args, author: newAuthor._id})
            try {
                await book.save()
            } catch(error){
                throw new GraphQLError('Saving book failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.title,
                        error
                    }
                })
            }
            const finalBook = book.populate('author')
            await pubsub.publish('BOOK_ADDED', {bookAdded: finalBook})
            return finalBook
        },
        editAuthor: async (root, args, {currentUser}) => {
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            const author = await Author.findOne({name: args.name})
            try {
                author.born = args.setBornTo
                await author.save()
            } catch (error) {
                throw new GraphQLError('Editing author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }

            return author
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: [args.username, args.favoriteGenre],
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if ( !user || args.password !== 'secret' ) {
                throw new GraphQLError('wrong credentials', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers