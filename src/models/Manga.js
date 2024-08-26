const mongoose = require('mongoose');
const MultiLangSchema = require('./MultiLang');
const LinksSchema = require('./Links');
const TagSchema = require('./Tag');
const RelationshipSchema = require('./Relationship');

const MangaSchema = new mongoose.Schema({
    title: { type: MultiLangSchema, required: true},
    altTitles: [MultiLangSchema],
    description: { type: MultiLangSchema },
    isLocked: { type: Boolean, required: true, default: false },
    links: LinksSchema,
    originalLanguage: { type: String, required: true },
    lastVolume: { type: String, default: '' },
    lastChapter: { type: String, default: '' },
    publicationDemographic: { type: String, enum: ['shounen', 'shoujo', 'seinen', 'josei', 'kodomo'], required: true },
    status: { type: String, enum: ['ongoing', 'completed', 'hiatus', 'cancelled'], required: true },
    year: { type: Number },
    contentRating: { type: String, enum: ['safe', 'suggestive', 'erotica', 'pornographic'], required: true },
    chapterNumberResetOnNewVolume: { type: Boolean, required: true, default: false },
    availableTranslatedLanguages: [String],
    latestUploadedChapter: { type: String },
    tags: [TagSchema],
    state: { type: String, enum: ['draft', 'published'], required: true },
    version: { type: Number, required: true, default: 1 },
    relationships: [RelationshipSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Manga', MangaSchema);