const mongoose = require('mongoose');
const MultiLangSchema = require('./MultiLang');

const TagSchema = new mongoose.Schema({
    name: MultiLangSchema,
    description: MultiLangSchema,
    group: { type: String, required: true },
    version: { type: Number, required: true },
    relationships: [
        {
            id: { type: String, required: true },
            type: { type: String, required: true },
            related: { type: String, required: true },
            attributes: { type: mongoose.Schema.Types.Mixed, default: {} }
        }
    ],
}, { _id: false });

module.exports = mongoose.model('Tag', TagSchema);