const { validationResult } = require("express-validator")
const UserModel = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const getAllUser = async (req, res) => {
    try {
        const allUsers = await UserModel.find()
        res.status(200).json({ msg: 'usuarios encontrados', allUsers })
    } catch (error) {
        res.status(500).json({ error })
    }
}


const getOneUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(422).json({ msg: errors.array() })
        }
        const oneUser = await UserModel.findOne({ _id: req.params.id })
        res.status(200).json({ msg: 'usuario encontrado', oneUser })
    } catch (error) {
        res.status(500).json({ msg: 'error', error })
    }
}


const createUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: errors.array() })
        }
        const userExist = await UserModel.findOne({ username: req.body.username })
        if (userExist) {
            return res.status(400).json({ msg: 'el usuario ya existe' })
        }

        const newUser = new UserModel(req.body)
        const salt = await bcrypt.genSaltSync()
        newUser.pass = await bcrypt.hash(req.body.pass, salt)
        await newUser.save()
        res.status(201).json({ msg: 'usuario creado correctamente', newUser })
    } catch (error) {
        res.status(500).json({ msg: 'error', error })
    }
}

const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: errors.array() })
        }
        const updateDataUser = await UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json({ msg: 'usuario actualizado', updateDataUser })
    } catch (error) {
        res.status(500).json({ msg: 'error en los datos', error })
    }
}

const deleteUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: errors.array() })
        }
        const deleteDataUser = await UserModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ msg: 'Usuario eliminado', deleteDataUser })
    } catch (error) {
        res.status(500).json({ msg: 'error', error })
    }
}

const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ msg: errors.array() })
        }

        const userExist = await UserModel.findOne({ username: req.body.username })
        if (!userExist) {
            return res.status(400).json({ msg: 'el usuario no existe' })
        }
        const passCheck = await bcrypt.compare(req.body.pass, userExist.pass)
        if (passCheck) {
             const payload_jwt = {
                user:{
                    id : userExist._id,
                    role:userExist.role
                }
             }   

        const token = jwt.sign(payload_jwt, '')
            res.status(200).json({ msg: 'usuario logueado', token })
        } else {
            res.status(400).json({ msg: 'usuario y/o contraseña incorrecta' })
        }

    } catch (error) {
        res.status(500).json({ msg: 'error', error })
    }
}


const logout = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ msg: 'error', error })
    }

}



module.exports = {
    getAllUser, getOneUser, createUser, updateUser, deleteUser, loginUser
}


