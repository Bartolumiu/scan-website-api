const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const TagSchema = mongoose.model('Tag').schema;

const MangaSchema = new Schema({
    id: { type: String, required: true, unique: true }, // Manga ID
    type: { type: String, default: 'manga' }, // Type of document (manga)
    attributes: {
        title: { type: Map, of: String, required: true }, // Manga title
        altTitles: { type: [Map], default: [] }, // Alternative titles (multiple languages)
        description: { type: [Map], default: [] }, // Description (multiple languages)
        isLocked: { type: Boolean, default: false },
        links: { type: Map, of: String, default: {} }, // Links (website, social media, etc.)
        originalLanguage: { type: String, required: true },
        lastVolume: { type: String, default: '' },
        lastChapter: { type: String, default: '' },
        publicationDemographic: { type: String, enum: ['shounen', 'shoujo', 'seinen', 'josei', 'kodomo'], default: null },
        status: { type: String, enum: ['ongoing', 'completed', 'hiatus', 'cancelled'], required: true },
        year: { type: Number },
        contentRating: { type: String, enum: ['safe', 'suggestive', 'erotica', 'pornographic'], required: true },
        tags: [TagSchema],
        state: { type: String, enum: ['draft', 'published'], required: true },
        chapterNumberResetOnNewVolume: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        availableTranslatedLanguages: [{ type: String }],
        latestUploadedChapter: { type: String },
        version: { type: Number, required: true, default: 1 },
    },
    relationships: [{
        id: { type: String, required: true }, // ID of the related author or artist
        type: { type: String, enum: ['author', 'artist', 'cover_art', 'creator'], required: true }, // Entity type (author, artist)
    }]
}, {
    _id: false,
    versionKey: false
});

module.exports = model('Manga', MangaSchema, 'manga');