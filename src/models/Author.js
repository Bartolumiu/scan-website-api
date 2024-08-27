const { Schema, model } = require('mongoose');

const AuthorSchema = new Schema({
    id: { type: String, required: true, unique: true }, // Author ID
    type: { type: String, default: 'author' }, // Type of document (author)
    attributes: {
        name: { type: String, required: true }, // Author name
        imageURL: { type: String }, // Author image URL
        biography: { type: Map, of: String }, // Biography (multi-language)
        twitter: { type: String }, // Twitter handle
        pixiv: { type: String }, // Pixiv ID
        melonBooks: { type: String }, // MelonBooks ID
        fanbox: { type: String }, // Fanbox ID
        booth: { type: String }, // Booth ID
        nicoVideo: { type: String }, // NicoVideo ID
        skeb: { type: String }, // Skeb ID
        fantia: { type: String }, // Fantia ID
        tumblr: { type: String }, // Tumblr ID
        youtube: { type: String }, // YouTube ID
        weibo: { type: String }, // Weibo ID
        naver: { type: String }, // Naver ID
        namicomi: { type: String }, // Namicomi ID
        website: { type: String }, // Website URL
        version: { type: Number, required: true }, // Version number
        createdAt: { type: Date, default: Date.now }, // Date of creation
        updatedAt: { type: Date, default: Date.now } // Date of last update
    },
    relationships: [{
        entityType: { type: String, enum: ['manga'], required: true }, // Entity type (manga)
        entity: { type: String, required: true } // ID of the related manga
    }],
}, {
    _id: false
});

module.exports = model('Author', AuthorSchema, 'author');