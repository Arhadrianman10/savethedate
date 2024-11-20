const mongoose = require('mongoose');

const partidaSchema = new mongoose.Schema({
    GAME__c: Number,
    RESULTADO__c: String,
    KILLS__c: Number,
    DEATHS__c: Number,
    ASSISTS__c: Number,
    DANO__c: Number,
    ORO__c: Number,
    CAMPEON__c: String,
    POSICION__c: String,
    FIRST_BLOOD__c: Boolean,
    VISION_SCORE__c: Number,
    RACHA_ASESINATOS__c: Number,
    GAPEADA_DANO__c: Number,
    GAPEADA_ORO__c: Number,
    KILL_PARTICIPATION__c: Number,
    DURACION__c: Number,
    INVOCADOR__c: String,
    Season__c: String,
    GAMEID__c: Number,
    SOLO_KILLS__c: Number,
    SOLO_KILLEADO__c: Number,
    SOLO_KILLS_EARLY__c: Number,
    SOLO_KILLEADO_EARLY__c: Number
}, { timestamps: true });

module.exports = mongoose.model('partidas', partidaSchema, 'partidas');
