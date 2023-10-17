const ProductModel = require("../models/product")
const {validationResult} = require('express-validator')


const getAllProducts = async (req, res) => { 
try{
    const allProducts = await ProductModel.find()
    res.status(200).json({ msg: 'productos en el array', allProducts })
} catch (error){
    console.log(error)
    throw new Error ('no se pudo enviar los productos', error)
}
}

const getOneProducts = async (req, res) => { 
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()})
    }

    try{
        const oneProducts = await ProductModel.findOne({_id: req.params.id})
        res.status(200).json({ msg: 'productos en la base de datos', oneProducts })
    } catch (error){
        console.log(error)
        throw new Error ('no se pudo enviar los productos', error)
    }
    }

const createProduct = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()})
    }

    try{
        const { body } = req
        const newProduct = new ProductModel(body)
        await newProduct.save()
        res.status(201).json({ msg: 'producto creado correctamente', body: req.body })
    } catch (error){
        console.log(error)
        throw new Error ('no se pudo enviar el producto', error) 
       }    
}

const updateProduct = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()})
    }
    try{
    const updateProd = await ProductModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
   
    console.log(products)
    res.status(200).json({ msg: 'producto editado correctamente', updateProd })
    }catch (error){
        console.log(error)
        throw new Error ('no se pudo enviar el producto', error)}
}

const deleteProduct = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()})
    }
    try{
        const deleteProd = await ProductModel.findByIdAndDelete ({_id: req.params.id})
    products.filter((prod) => prod.id !== id)
    res.status(200).json({ msg: 'se borro correctamente el producto', deleteProd })
    } catch (error){
    console.log(error)
    throw new Error ('no se pudo enviar el producto', error)}
}

module.exports = {
    getAllProducts,
    getOneProducts,
    createProduct,
    updateProduct,
    deleteProduct

}

