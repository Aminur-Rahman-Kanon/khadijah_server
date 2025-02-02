const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const data = req.body;
    
    if (!data) return res.status(404).json({ status: 'no data provided' });

    //implement whatsapp and email integration
    return res.status(200).json({ status: 'success' });
    
})

module.exports = router;
