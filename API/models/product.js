'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: { type: String, required: [true] },
    description: { type: String, required: [true] },
    origin: { type: String, required: [true]},
    type: { type: String},
    water: { type: Number},
    electricity:{ type: Number},
    animal: { type: Array},
    vegetal: { type: Array},
    transport: { type: Array},
    recipient: { type: Array},

    //calculo de CO2
    //CO2 per transport (desglosado o lo meto directo en TransportInstance)
    //CO2 ...
    //
    //

})




module.exports = mongoose.model('Product', ProductSchema)