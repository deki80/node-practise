// set environment object
const environments = {
    staging: {
        port : 3000,
        envName: 'staging'
    },
    production: {
        port: 8080,
        envName: 'production'
    }
}

// check current environment or set default if non exists
const env = typeof(process.env.NODE_ENV) !== 'undefined' ? process.env.NODE_ENV.toLowerCase() : ''
const environment = typeof(environments[env]) === 'object' ? environments[env] : environments.staging

module.exports = environment
