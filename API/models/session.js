'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SessionSchema = new Schema({
    name: { type: String, unique: true, lowercase: true, required: [true] },

})


module.exports = mongoose.model('Session', SessionSchema)