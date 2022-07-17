// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()
server.use(express.json())

// POST ENDPOINT
server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
       Users.insert(user)
       .then(stuff => {
        res.status(201).json(stuff)
       })
       .catch(err => {
        res.status(500).json({ message: "Weird Error" })
       })
    }
    
})

// GET ENDPOINTS
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

//DELETE ENDPOINT
server.delete('/api/users/:id', async (req, res) => {
    try {
        const maybe = await Users.findById(req.params.id)
    console.log(maybe)
    if (!maybe) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    } else {
        const deleteUser = await Users.remove(req.params.id)
        res.status(200).json(deleteUser)
    }
    }
    catch (err) {
        res.status(404).json({ message: "The user with the specified ID does not exist" })
    }
})

// CATCH ALL
server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER

// http get :9000/api/users
// http post :9000/api/users name=foo bio=bar
// http delete :9000/api/users/