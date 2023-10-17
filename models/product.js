const {Schema, model} = require ('mongoose')

const ProductSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
   precio:{
    type: Number,
    required: true
   },
    codigo:{
        type: String,
        unique: true,
        required: true
    }
})

const ProductModel = model('products', ProductSchema);
module.exports = ProductModel