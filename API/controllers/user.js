'use strict'

const service = require('../services')
const bcrypt = require('bcrypt')
const User = require('../models/user')


function signUp(req, res) {
    console.log("entro")
    let newuser = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: bcrypt.hashSync(req.body.password, 10),
        role: "DJ",

    })
    User.findOne({ email: newuser.email }, (err, user) => {
        if (user) return res.status(403).send({ message: err })
        else if (!user) {
            newuser.save((err) => {
                if (err) res.status(500).send({
                    message: `Error al crear el usuario ${err}`
                })
                return res.status(201)
            })
        }
    })
}

function signIn(req, res) {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }
        req.user = user
        res.status(200).send({
            message: "Te has logueado correctamente",
            token: service.createToken(user),
            displayName: user.displayName,
            role: user.role

        })
    });
}


module.exports = {
    signUp,
    signIn
}