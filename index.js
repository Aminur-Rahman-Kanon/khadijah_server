const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const paymentIntent = require('./routes/createPaymentIntent');
const confirmPayment = require('./routes/confirmPayment');
const contactQuery = require('./routes/contactQuery');
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000', 'https://khadijah-client.onrender.com'] }));
require('dotenv').config();
const { cronJob } = require('./utilities/utilities');
const { orderModel } = require('./schema/schema');

app.use('/payment-intent', paymentIntent);
app.use('/confirm-payment', confirmPayment);
app.use('/contact-query', contactQuery);

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
}).then(conn => console.log('database connected')).catch(err => console.log('database connection error'));


app.listen('4000', (err) => {
    if (err){
        throw Error(err);
    }
    
    cronJob();
    console.log('server is listeing on port 4000');
    
})