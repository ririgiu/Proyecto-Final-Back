
const express = require('express') 
const morgan = require('morgan')

class Server {
    constructor() {
        this.app = express()
        this.middleware()
        this.routes()
    }

    middleware(){
        this.app.use(express.json())
        this.app.use(morgan('dev'))
    }


    routes() {
        this.app.use('/api/products', require('../routes/products'))
        this.app.use('/api/users', require('../routes/user'))
        this.app.use('/api/image',  require('../routes/img'))
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('servidor en linea', process.env.PORT)
        })

    }
}

module.exports = Server
