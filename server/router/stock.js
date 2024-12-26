
const express = require('express');
const { updateStock } = require('../controller');

const router = express.Router();

router.route('/').patch(updateStock)

module.exports = router