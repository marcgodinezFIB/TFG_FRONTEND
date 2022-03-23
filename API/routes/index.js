'use strict'

const express = require('express');
const api = express.Router();
api.post('/signup', UserCtrl.signUp);
api.post('/signin', UserCtrl.signIn);
module.exports = api