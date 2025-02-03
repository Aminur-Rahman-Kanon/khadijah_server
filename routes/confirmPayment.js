const express = require('express');
const router = express.Router();
const { sendOrderConfirmationPromise } = require('../utilities/utilities');

router.post('/', async (req, res) => {
    const { userInput } = req.body;    
    
    if (!userInput) return res.status(404).json({ status: 'no data provided' });

    //implement whatsapp and email integration
    sendOrderConfirmationPromise(userInput).then(result => {
        if (result.status === 'success'){
            return res.status(200).json({ status: 'success' })
        }
        else {
            return res.status(400).json({ status: result.status, message: result.message })
        }
    }).catch(err => res.status(400).json({ status: 'failed', message: err.message }));
})

module.exports = router;
