const mongoose = require('mongoose');

const miSchema = new mongoose.Schema({
  // Define aquí tus campos
});

const Models = mongoose.model('Models', miSchema);

module.exports = Models;
