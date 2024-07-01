const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ email: username });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    const policies = await Policy.find({ userId: user._id });
    res.json(policies);
  }
});

module.exports = router;