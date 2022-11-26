const mongoose = require('mongoose');

const AutoRoleSchema = new mongoose.Schema({
    AutoRoleID: String,
    GuildID: String,
});

const MessageModel = module.exports = mongoose.model('AutoRole', AutoRoleSchema);