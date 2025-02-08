const express = require('express');
const router = express.Router();
const { sendContactQueryPromise } = require('../utilities/utilities');

router.post('/', async (req, res) => {
    const data = req.body;

    if (!data) return res.status(400).json({ status: 'failed', message: 'no data provided' });

    await sendContactQueryPromise(data).then(result => {
        if (result.status === 'success'){
            return res.status(200).json({ status: 'success' })
        }
        else {
            return res.status(400).json({ status: result.status, message: result.message })
        }
    }).catch(err => res.status(400).json({ status: 'failed', message: err.message }));
    
})

module.exports = router;
