const mongoose = require ('mongoose')

try{
    mongoose.connect(process.env.MONGO_CONNECT)
    .then (()=> console.log('base de dato en linea'));
}catch (error){
    console.log('error de servidor', error)
}