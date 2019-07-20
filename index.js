// dependencies
const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

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

    // get request headers
    const headers = req.headers

    // get request stream
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
    req.on('data', (data) => {
        buffer += decoder.write(data)
    })

    req.on('end', () => {
        buffer += decoder.end()

        // data object to send to router
        const data = {
            trimPath,
            queryStringObj,
            method,
            headers,
            buffer
        }

        // detect a route handler
        const routerHandler = typeof(router[trimPath]) !== 'undefined' ? router[trimPath] : handler.notFound

        routerHandler(data, (statusCode, payload) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200
            payload = typeof(payload) == 'object' ? payload : {}
            
            const payloadString = JSON.stringify(payload)

            res.writeHead(statusCode)
            res.end(payloadString)
        })
    })

})

//listen on port 3000
server.listen(3000, () => console.log('Server is listening on port 3000'))

// set route handler
const handler = {}

handler.sample = (data, callback) => {
    callback(406, {'name' : 'Dejan'})
}

handler.notFound = (data, callback) => {
    callback(404)
}
// set router
const router = {
    'sample': handler.sample
}
