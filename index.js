const express = require('express');
const app = express();
const cors = require('cors');
const paymentIntent = require('./routes/createPaymentIntent');
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'https://khadijah-client.onrender.com'] }));
require('dotenv').config();

app.use('/payment-intent', paymentIntent);



app.listen('4000', (err) => {
    if (err){
        throw Error(err);
    }
    console.log('server is listeing on port 4000');
    
})