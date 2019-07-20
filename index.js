// dependencies
const http = require('http')
const url = require('url')

// create a server and response to request
const server = http.createServer((req, res) => {
    // parse the url
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    
    const trimPath = path.replace(/^\/+|\/+$/g, '')

    // parse the query string
    const queryStringObj = parsedUrl.query

    // parse the request method
    const method = req.method.toLowerCase()

    // send the response
    res.end('Server response...')

    console.log(`Requested path: ${trimPath} with method: ${method}`)
    console.log('Query string object: ', queryStringObj)
})

//listen on port 3000
server.listen(3000, () => console.log('Server is listening on port 3000'))
