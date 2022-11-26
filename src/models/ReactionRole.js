const mongoose = require('mongoose');

const ReactionRoleSchema = new mongoose.Schema({
    Emoji: String,
    MessageID: String,
    RoleID: String,
    GuildID: String,
});

const MessageModel = module.exports = mongoose.model('ReactionRole', ReactionRoleSchema);