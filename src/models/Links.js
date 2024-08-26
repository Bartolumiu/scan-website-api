const mongoose = require('mongoose');

const LinksSchema = new mongoose.Schema({
    property1: { type: String },
    property2: { type: String },
}, { _id: false });

module.exports = mongoose.model('Links', LinksSchema);