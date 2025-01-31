const express = require('express');
const router = express.Router();

//this route submit a payment request
router.get('/', async (req, res) => {
    res.send({ public_key: process.env.STRIPE_PUBLIC_KEY });
})

module.exports = router;