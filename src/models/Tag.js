const { Schema, model, default: mongoose } = require('mongoose');

const TagSchema = new Schema({
    _id: Schema.Types.ObjectId, // Object ID
    id: { type: String, required: true, unique: true }, // Tag ID
    type: { type: String, default: 'tag' }, // Type of document (tag)
    attributes: {
        name: { type: Map, of: String, required: true }, // Tag name (multi-language)
        description: { type: Map, of: String, default: {} }, // Tag description (multi-language)
        group: { type: String, enum: ['format', 'genre', 'theme', 'content'] }, // Tag group (format, genre, theme, content rating)
        version: { type: Number, required: true }, // Version number (>= 1)
    },
    relationships: [{ type: Schema.Types.Mixed, default: [] }], // Empty array of relationships
}, {
    versionKey: false
});

module.exports = model('Tag', TagSchema, 'tag');