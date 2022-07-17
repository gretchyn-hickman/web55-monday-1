// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()

server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        console.log(users)
        res.json(users)
        
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting users',
            err: err.message,
        })
    })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
    .then(user => {
        if (!user) {
            res.status(404).json({
                message: "The user with the specified ID does not exist",
            })
        } else
        console.log(user)
        res.json(user)
    })
    .catch(err => {
        res.status(404).json({
            message: "The user with the specified ID does not exist",
        })
    })
})

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER

// http get :9000/api/users
// http get :9000/api/users/TBzTg