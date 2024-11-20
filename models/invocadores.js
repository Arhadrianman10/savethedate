const mongoose = require('mongoose');

const invocadorSchema = new mongoose.Schema({
    Name: String,
    IconCode__c: String,
    Ranking__c: String,
    Sanciones_Leves__c: Number,
    Sanciones_Graves__c: Number,
    Sanciones_Muy_Graves__c: Number
}, { timestamps: true });

module.exports = mongoose.model('invocadores', invocadorSchema, 'invocadores');
