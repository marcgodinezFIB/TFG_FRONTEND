'use strict'

const express = require('express');
const api = express.Router();
const UserCtrl = require('../controllers/user');
const ProductCtrl = require('../controllers/product');
const TypeProdCtrl = require('../controllers/typeprod');
const AnimalCtrl = require('../controllers/animal');
const VegetalCtrl = require('../controllers/vegetal');

const RecipientCtrl = require('../controllers/recipient');

const TransportCtrl = require('../controllers/transport');

const auth = require('../middlewares/auth');
const isAuth = require('../middlewares/auth');

api.post('/signup', UserCtrl.signUp);
api.post('/login', UserCtrl.signIn);
api.get('/profile', UserCtrl.showUser);
api.post('/signinadmin', UserCtrl.signInAdmin);

api.post('/addproduct', auth, ProductCtrl.addProduct);
api.get('/getallproducts', ProductCtrl.getAllProducts);
api.get('/getproduct/:id', ProductCtrl.getProduct);
api.delete('/removeproduct', auth, ProductCtrl.removeProduct);

api.post('/addtypeprod', auth, TypeProdCtrl.addTypeProd);
api.get('/getalltypeprod', TypeProdCtrl.getAllTypeProd);
api.get('/gettypeprod/:id', TypeProdCtrl.getTypeProd);
api.delete('/removetypeprod', auth, TypeProdCtrl.removeTypeProd);
api.get('/getalltypeprods', TypeProdCtrl.getAllTypeProd);

api.post('/addAnimal', auth, AnimalCtrl.addAnimal);
api.get('/getallAnimal', AnimalCtrl.getAllAnimals);
api.get('/getAnimal/:id', AnimalCtrl.getAnimal);
api.delete('/removeAnimal', auth, AnimalCtrl.removeAnimal);
api.get('/getallAnimals', AnimalCtrl.getAllAnimals);

api.post('/addVegetal', auth, VegetalCtrl.addVegetal);
api.get('/getallVegetal', VegetalCtrl.getAllVegetals);
api.get('/getVegetal/:id', VegetalCtrl.getVegetal);
api.delete('/removeVegetal', auth, VegetalCtrl.removeVegetal);
api.get('/getallVegetals', VegetalCtrl.getAllVegetals);

api.post('/addRecipient', auth, RecipientCtrl.addRecipient);
api.get('/getallRecipient', RecipientCtrl.getAllRecipients);
api.get('/getRecipient/:id', RecipientCtrl.getRecipient);
api.delete('/removeRecipient', auth, RecipientCtrl.removeRecipient);
api.get('/getallRecipients', RecipientCtrl.getAllRecipients);

api.post('/addtransport', auth, TransportCtrl.addTransport);
api.get('/getAllTransports', TransportCtrl.getAllTransports);
api.get('/gettransport/:id', TransportCtrl.getTransport);
api.delete('/removetransport/:id', auth, TransportCtrl.removeTransport);
api.get('/distance',TransportCtrl.distanceBetweenTwoCities);
api.get('/getCity/:name',TransportCtrl.getCity);
api.get('/getAllCities',TransportCtrl.getAllCities);

module.exports = api