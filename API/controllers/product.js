'use strict'

const mongoose = require('mongoose')
const Product = require('../models/product')
const User = require('../models/user')
const cities = require('cities')
const cities2 = require('all-the-cities');

function addProduct(req, res) {
    //var animals = vegetals = transports = recipients = [];
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            console.log(req.body)
            // req.body.animalsList.foreach(animal => animals.push(animal._id));
            // req.body.vegetalsList.foreach(vegetal => vegetals.push(vegetal._id));
            // req.body.transportsList.foreach(transport => transports.push(transport._id));
            // req.body.recipientsList.foreach(recipient => recipients.push(recipient._id));

            var product = new Product({
                //General info
                name: req.body.name,
                description: req.body.description,
                origin: req.body.origin,
                type: req.body.type,
                //Procurement
                waterObtention: req.body.waterObtention, //valor fijo
                electricityObtention: req.body.electricityObtention, //valor fijo
                animalList: req.body.animals,
                vegetalList: req.body.vegetals,
                //Transport
                transportList: req.body.transports,
                //Waste
                recipientList: req.body.recipients
            })
            product.save();
            return res.status(201).send({ message: "Se ha añadido correctamente el producto" })
        } else return res.status(403).send({ message: "No eres administrador" })
    })
}

function removeProduct(req, res) {
    User.findById(req.user, (err, user) => {
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: "no existe usuario" })
        if (user.role == "EMPRESA") {
            Product.findByIdAndDelete({ _id: req.params.id }, (err, not) => {
                if (err) res.status(500).send(`${err}`)
                else if (not) return res.status(201).send({ message: "Se ha eliminado correctamente el producto" })
            })
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