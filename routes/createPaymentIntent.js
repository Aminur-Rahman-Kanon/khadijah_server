const express = require('express');
const router = express.Router()
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-01-27.acacia'
})

router.post('/', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'gbp',
            amount: '120',
            automatic_payment_methods: {
                enabled: true
            }
        });        
    
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        return res.status(400).send({
            error: error.message
        })
    }
})

module.exports = router;