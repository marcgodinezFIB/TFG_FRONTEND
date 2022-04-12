'use strict'

const mongoose = require('mongoose')
const Product = require('../models/product')
const User = require('../models/user')
const cities = require('cities')
const cities2 = require('all-the-cities');

function addProduct(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            var product = new Product({
                name: req.body.name,
                description: req.body.description,
                type: req.body.type,
                extraction: req.body.extraction,
                elaboration: req.body.elaboration,
                distribution: req.body.distribution,
                use: req.body.use
            })
            if (!isAType(req.body.type)) return res.status(501).send({ message: "El tipo de producto no existe" });
            product.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el producto" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeProduct(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "ADMIN") {
            var product = Product.findById(req.body.product_id)
            product.remove()
            return res.status(201).send({ message: "Se ha eliminado correctamente el producto" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function getProduct(req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err) return res.status(500).send({ message: err })
        if (!product) return res.status(404).send({ message: "no existe producto" })
        if (product) return res.status(200).send({ product })
    })
}

function getAllProducts(req, res) {
    Product.find({}, (err, prods) => {
        if (err) return res.status(500).send({ message: err })
        if (!prods) return res.status(404).send({ message: "no existen productos" })
        if (prods) return res.status(200).send({ message: prods })
    })

}

function isAType(type) {
    let typeProds = {
        values: ["Leche y derivados", "Carnes, Pescado y huevos", "Patatas, legumbres, frutos secos", "Verduras y hortalizas", "Frutas", "Cereales y derivados, azúcar y dulces", "Grasas, aceite y mantequilla"],
    }
    for (var i = 0; i < typeProds.values.length; ++i)
        if (type == typeProds.values[i]) return true;
    return false;
}



module.exports = {
    addProduct,
    removeProduct,
    getProduct,
    getAllProducts,
    isAType,
}