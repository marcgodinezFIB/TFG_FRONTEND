'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    name: { type: String, unique: true, lowercase: true, required: [true] },
    album: { type: String, unique: true, lowercase: true, required: [true] },
    artist: { type: String, required: [true] },
    apparences: { type: Number, required: [true] },
    votes: { type: Number, required: [true] }
})


module.exports = mongoose.model('Song', SongSchema)