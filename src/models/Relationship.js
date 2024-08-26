const mongoose = require('mongoose');

const RelationshipSchema = new mongoose.Schema({
    id: { type: String, required: true }, // The id of the related entity
    type: { type: String, required: true }, // The type of the related entity
    attributes: {
        name: { type: String, required: true }, // The name of the related entity
        imageURL: { type: String }, // The image URL of the related entity
        biography: { type: Map, of: String }, // Biography (multi-language)
        twitter: { type: String }, // Twitter handle
        pixiv: { type: String }, // Pixiv ID
    }
}, { _id: false });