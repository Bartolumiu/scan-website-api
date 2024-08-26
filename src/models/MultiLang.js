const mongoose = require('mongoose');

const MultiLangSchema = new mongoose.Schema({
    property1: { type: String, required: true },
    property2: { type: String, required: true },
}, { _id: false });

module.exports = mongoose.model('MultiLang', MultiLangSchema);