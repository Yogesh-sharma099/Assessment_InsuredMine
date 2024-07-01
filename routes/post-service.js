const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', async (req, res) => {
  const { message, day, time } = req.body;
  const db = mongoose.connection;
  const collection = db.collection('messages');

  collection.insertOne({ message, day, time }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error inserting message' });
    } else {
      res.json({ message: 'Message inserted successfully' });
    }
  });
});

module.exports = router;