// set environment object
const environments = {
    staging: {
        httpPort : 3000,
        httpsPort: 3001,
        envName: 'staging'
    },
    production: {
        httpPort: 8080,
        httpsPort: 8081,
        envName: 'production'
    }
}

// check current environment or set default if non exists
const env = typeof(process.env.NODE_ENV) !== 'undefined' ? process.env.NODE_ENV.toLowerCase() : ''
const environment = typeof(environments[env]) === 'object' ? environments[env] : environments.staging

module.exports = environment
