const mongoose = require('mongoose');

const carrierSchema = new mongoose.Schema({
  name: String
});

const Carrier = mongoose.model('Carrier', carrierSchema);

module.exports = Carrier;