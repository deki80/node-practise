// dependencies
const http = require('http')
const https = require('https')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const fs = require('fs')

// require config
const config = require('./config')

// create a http server and pass the request to unified handler
const httpServer = http.createServer((req, res) => {
    unifiedServer(req,res)
})
//listen on configured port
httpServer.listen(config.httpPort, () => console.log(`Server is listening on port ${config.httpPort} on environment ${config.envName}`))

// create https server and pass the request to unified handler
const httpsOptions = {
    key: fs.readFileSync('./https/key.pem'),
    cert: fs.readFileSync('./https/cert.pem')
}
const httpsServer = https.createServer(httpsOptions, (req, res) => {
    unifiedServer(req,res)
})
// listen on configured port
httpsServer.listen(config.httpsPort, () => console.log(`Server listening on port ${config.httpsPort}`))

// set the unified req, res handler
const unifiedServer = (req,res) => {
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
            
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode)
            res.end(payloadString)
        })
    })
}

// set route handler
const handler = {}

handler.sample = (data, callback) => {
    callback(406, {'name' : 'Dejan'})
}

handler.ping = (data, callback) => {
    callback(200)
}

handler.notFound = (data, callback) => {
    callback(404)
}
// set router
const router = {
    'sample': handler.sample,
    'ping': handler.ping
}
