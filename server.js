const session = require('express-session')
const knexSessionStore = require('conenect-session-knex')('session')
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const restrict = require('./auth/restricted-middleware')

//pull in our express routers
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')

//create the server object
const server = express()

//create a config object for express session
const sessionConfig = {
    name: 'effmerunning',
    secret: 'wabashcounty',
    cookie: {
        maxAge: 3600 * 1000,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,

    store: new KnexSessionStore (
        {
            knex: require('./db.config'),
            tablename: 'sessions',
            sidfieldname: 'sid',
            createtable: true,
            clearInterval: 3600 * 1000
        }
    )
}
//global middleware
server.use(helmet());
server.use(express.json);
server.use(cors())
server.use(session(sessionConfig))
server.use('/users', restricted, usersRouter)
server.use('/auth', authRouter)

server.get('/', (req, res) => {
    res.json({api: 'up'})
})

module.exports = server;