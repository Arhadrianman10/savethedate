const mongoose = require('mongoose');

const banSchema = new mongoose.Schema({
    GAME__c: String,
    CAMPEON__c: String,
    RESULTADO__c: String,
    GAMEID__c: Number,
    PRIORITY_BAN__c: Boolean,
    Season__c: String
}, { timestamps: true });

module.exports = mongoose.model('bans', banSchema, 'bans');
