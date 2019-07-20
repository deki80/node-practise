// dependencies
const http = require('http')

// create a server and response to request
const server = http.createServer((req, res) => {
    res.end('Server response...')
})

//listen on port 3000
server.listen(3000, () => console.log('Server is listening on port 3000'))
