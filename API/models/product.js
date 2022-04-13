'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
    name: { type: String, required: [true] },
    description: { type: String, required: [true] },
    origin: { type: String, required: [true]},
    type: { type: String},
    //transport: { type: Schema.Types.ObjectId },
    animal: { type: Schema.Types.ObjectId},
    //vegetal: { type: Schema.Types.ObjectId },
    //recipient: { type: Schema.Types.ObjectId},

    //calculo de CO2
    //CO2 per transport (desglosado o lo meto directo en TransportInstance)
    //CO2 ...
    //
    //

})




module.exports = mongoose.model('Product', ProductSchema)