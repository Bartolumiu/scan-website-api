const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    id: { type: String, required: true }, // Author ID
    type: 'author',
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
    relationships: [
        {
            id: { type: String, required: true }, // The id of the related entity
            type: { type: String, required: true }, // The type of the related entity
            related: { type: String, required: true, enum: ['monochrome', 'main_story', 'adapted_from', 'based_on', 'prequel', 'side_story', 'doujinshi', 'same_franchise', 'shared_universe', 'sequel', 'spin_off', 'alternate_story', 'alternate_version', 'preserialization', 'colored', 'serialization'] }, // The relationship type (manga type)
            attributes: { type: mongoose.Schema.Types.Mixed, default: {} } // Additional attributes
        }
    ]
});