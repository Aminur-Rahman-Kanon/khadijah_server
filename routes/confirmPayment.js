const express = require('express');
const router = express.Router();
const { sendOrderConfirmationPromise } = require('../utilities/utilities');
const { orderModel } = require('../schema/schema');

router.post('/', async (req, res) => {
    const { userInput } = req.body;    
    
    if (!userInput) return res.status(404).json({ status: 'no data provided' });

    //implement whatsapp and email integration
    await orderModel.create({ ...userInput }).then(async result => {
        await sendOrderConfirmationPromise(userInput).then(result => {
            if (result.status === 'success'){
                return res.status(200).json({ status: 'success' })
            }
            else {
                return res.status(400).json({ status: result.status, message: result.message })
            }
        }).catch(err => res.status(400).json({ status: 'failed', message: err.message }));
    }).catch(error => res.status(400).json({ status: 'failed', message: 'failed to write data to database' }));
})

module.exports = router;
