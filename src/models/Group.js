const { Schema, model } = require('mongoose');

const GroupSchema = new Schema({
    id: { type: String, required: true, unique: true }, // Scanlation group ID
    type: { type: String, default: 'scanlation_group' }, // Type of document (scanlation group)
    attributes: {
        name: { type: String, required: true }, // Scanlation group name
        altNames: { type: [String], default: [] }, // Alternative names
        description: { type: String, default: null }, // Description
        locked: { type: Boolean, default: false }, // Lock status (only group members can upload)
        website: { type: String, default: null }, // Website URL
        ircServer: { type: String, default: null }, // IRC server
        ircChannel: { type: String, default: null }, // IRC channel
        discord: { type: String, default: null }, // Discord server
        contactEmail: { type: String, default: null }, // Contact email
        twitter: { type: String, default: null }, // Twitter handle
        mangaUpdates: { type: String, default: null }, // MangaUpdates ID
        focusedLanguages: { type: [String], default: [] }, // Focused languages
        official: { type: Boolean, default: false }, // Official group
        verified: { type: Boolean, default: false }, // Verified group
        inactive: { type: Boolean, default: false }, // Inactive group
        publishDelay: { type: Number, default: null }, // Publish delay (regex: ^(P([1-9]|[1-9][0-9])D)?(P?([1-9])W)?(P?T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$)
        exLicensed: { type: Boolean, default: false }, // Ex-Licenses group
        createdAt: { type: Date, default: Date.now }, // Date of creation
        updatedAt: { type: Date, default: Date.now }, // Date of last update
        version: { type: Number, required: true }, // Version number
    },
    relationships: [{
        entityType: { type: String, enum: ['leader', 'member'], required: true }, // Entity type (leader, member)
        entity: { type: String, required: true } // ID of the related leader or member
    }]
}, {
    _id: false
});

module.exports = model('Group', GroupSchema, 'scanlation_group');