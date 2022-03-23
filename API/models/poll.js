'use distinct'


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PollSchema = new Schema({
    Song1: { type: Schema.Types.ObjectId, ref: 'Song' },
    Song2: { type: Schema.Types.ObjectId, ref: 'Song' },
    Song3: { type: Schema.Types.ObjectId, ref: 'Song' },
    Song4: { type: Schema.Types.ObjectId, ref: 'Song' }
})


module.exports = mongoose.model('Poll', PollSchema)