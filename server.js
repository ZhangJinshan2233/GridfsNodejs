'use strict'

const http = require('http')

const app = require('./app')

const improveeServer = http.Server(app)

improveeServer.listen(process.env.PORT ||3000,()=>{
    console.log('improvee server is running')
})