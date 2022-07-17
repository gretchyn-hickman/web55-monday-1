const server = require('./api/server');

const port = 9000;

// START YOUR SERVER HERE
console.log("Working", port)

server.listen(port, () => {
    console.log("Server Listening")
})