const express = require('express');
const { createProduct, getProducts } = require('../controller');
const router = express.Router();

const { uploadImage } = require('../utils/aws')

router.route('/').post(uploadImage.single("image"), createProduct).get(getProducts)
// router.route('/temporary').patch(updateTemporary).post(stealFromTemporary)
// router.route('/temporary/:tempId').get(getTemporary)
// router.route('/:deckName').get(getDeckCards).post(createCard).delete(deleteCards)

module.exports = router