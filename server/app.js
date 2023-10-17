
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
        this.app.use('/api', require('../routes/products'))
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('servidor en linea', process.env.PORT)
        })

    }
}

module.exports = Server
