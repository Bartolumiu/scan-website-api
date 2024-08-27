const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    id: { type: String, required: true, unique: true }, // User ID
    type: { type: String, default: 'user' }, // Type of document (user)
    attributes: {
        username: { type: String, required: true }, // Username
        roles: [{ type: String, enum: ['ROLE_BOT', 'ROLE_USER', 'ROLE_GROUP_MEMBER', 'ROLE_GROUP_LEADER', 'ROLE_CONTRIBUTOR','ROLE_POWER_UPLOADER', 'ROLE_STAFF', 'ROLE_MODERATOR', 'ROLE_ADMIN'], required: true }], // User roles
        version: { type: Number, required: true }, // Version number (>= 1)
    },
    relationships: [{
        entityType: { type: String, enum: ['scanlation_group'], required: true }, // Entity type (scanlation_group)
        entity: { type: String, required: true } // ID of the scanlation group
    }]
}, {
    _id: false,
    versionKey: false
})

module.exports = model('User', UserSchema, 'user');