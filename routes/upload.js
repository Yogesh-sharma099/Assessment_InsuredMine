const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Worker } = require('worker_threads');
const csv = require('csv-parser');
const fs = require('fs');

router.post('/', async (req, res) => {
  const file = req.body.file;
  const worker = new Worker('./utils/upload-worker.js', { workerData: file });
  worker.on('message', (data) => {
    res.json({ message: 'Data uploaded successfully' });
  });
  worker.on('error', (err) => {
    console.error(err);
    res.status(500).json({ message: 'Error uploading data' });
  });
});

module.exports = router;