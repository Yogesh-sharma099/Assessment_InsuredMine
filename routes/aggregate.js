const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  const users = await User.find().populate('policies');
  const aggregatedPolicies = users.reduce((acc, user) => {
    acc[user.email] = user.policies.length;
    return acc;
  }, {});
  res.json(aggregatedPolicies);
});

module.exports = router;