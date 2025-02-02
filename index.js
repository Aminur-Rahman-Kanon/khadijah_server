const express = require('express');
const app = express();
const cors = require('cors');
const paymentIntent = require('./routes/createPaymentIntent');
const confirmPayment = require('./routes/confirmPayment');
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'https://khadijah-client.onrender.com'] }));
require('dotenv').config();
const { cronJob } = require('./utilities/utilities');

app.use('/payment-intent', paymentIntent);
app.use('/confirm-payment', confirmPayment);



app.listen('4000', (err) => {
    if (err){
        throw Error(err);
    }
    
    cronJob();
    console.log('server is listeing on port 4000');
    
})