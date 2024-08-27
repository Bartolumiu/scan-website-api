const { Schema, model } = require('mongoose');

const CoverArtSchema = new Schema({
    id: { type: String, required: true, unique: true }, // Cover ID
    type: { type: String, default: 'cover_art' }, // Type of document (cover_art)
    attributes: {
        volume: { type: String, required: true }, // Volume number
        fileName: { type: String, required: true }, // File name
        description: { type: String, default: '' }, // Description of the cover art (optional)
        locale: { type: String, required: true }, // Locale (language code)
        version: { type: Number, required: true, default: 1 }, // Version number
        createdAt: { type: Date, default: Date.now }, // Date of creation
        updatedAt: { type: Date, default: Date.now } // Date of last update
    },
    relationships: [{
        entityType: { type: String, enum: ['manga', 'user'], required: true }, // Entity type (manga, user)
        entity: { type: String, required: true }, // Manga or user ID
    }]
}, {
    _id: false
});

module.exports = model('Cover', CoverArtSchema, 'cover_art');