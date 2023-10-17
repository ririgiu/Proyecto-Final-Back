require ('dotenv').config()
require ('./database/config')


const Server = require('./server/app')
const server = new Server
const cloudinary = require('./utils/cloudinaryConfig')

server.listen()
