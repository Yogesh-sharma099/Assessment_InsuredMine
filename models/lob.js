const mongoose = require('mongoose');

const lobSchema = new mongoose.Schema({
  name: String
});

const LOB = mongoose.model('LOB', lobSchema);

module.exports = LOB;