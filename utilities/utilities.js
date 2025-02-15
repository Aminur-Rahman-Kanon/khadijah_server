const nodeMailer = require('nodemailer')
const https = require('https');

function cronJob (){
    setInterval(() => {
        https.get('https://khadijah-server.onrender.com', (res) => {
            console.log('pinging...');
        })
    }, 840000);
}

function sendOrderConfirmationPromise (booking) {
    return new Promise( async (resolve, reject) => {
    
        try {
            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'khadijahwebservice@gmail.com',
                  pass: 'bjdrbgzhgxrtlqfd'
                }
            });
    
            if (!transporter) return { status: 'failed', message: 'no transporter found' };
            
            const adminMailOption = {
                from: 'khadijahwebservice@gmail.com',
                to: 'kanon754@gmail.com',
                subject: 'A new booking received',
                text: 'Here is the booking details',
                html: `<div>
                    <div>
                        <h2 style="margin: 5px 0; color: black;">Service Details</h2>
                        <p style="margin: 5px 0; color: black;">Payment: <span style="display:block; color:green;">Verified</span></p>
                        <p style="margin: 5px 0; color: black;">Price: &#163;${booking.price/100}</p>
                        <p style="margin: 5px 0; color: black;">Date: ${booking.date}</p>
                        <p style="margin: 5px 0; color: black;">Type: ${booking.service}</p>
                        <p style="margin: 5px 0; color: black;">Duration: ${booking.duration}</p>
                        <p style="margin: 5px 0; color: black;">Start Time: ${booking.beginTime}</p>
                        <p style="margin: 5px 0; color: black;">End Time: ${booking.endTime}</p>
                    </div>
                    <div>
                        <h2 style="margin: 5px 0">Client's Details</h2>
                        <p style="margin: 5px 0; color: black;">Name: ${booking.details.name}</p>
                        <p style="margin: 5px 0; color: black;">Email: ${booking.details.email}</p>
                        <p style="margin: 5px 0; color: black;">Phone number: ${booking.details.phoneNumber}</p>
                        <p style="margin: 5px 0; color: black;">Additional Notes: ${booking.details.notes}</p>
                    </div>
                </div>`
            };

            const clientMailOption = {
                from: 'khadijahwebservice@gmail.com',
                to: 'aminur.rahman.dev@gmail.com',
                subject: 'Booking confirmed',
                text: 'Here is the booking details',
                html: `<div>
                    <div>
                        <p style="margin: 5px 0; color: black;">Hi ${booking.details.name}, we delighted to inform you that your booking has been confirmed and we are egerly waiting to see you</p>
                        <h3 style="color: black">Here is the details:</h3>
                        <p style="margin: 5px 0; color: black;">Date: ${booking.date}</p>
                        <p style="margin: 5px 0; color: black;">massage type: ${booking.service}</p>
                        <p style="margin: 5px 0; color: black;">Duration: ${booking.duration}</p>
                        <p style="margin: 5px 0; color: black;">Start Time: ${booking.beginTime}</p>
                        <p style="margin: 5px 0; color: black;">End Time: ${booking.endTime}</p>
                        <p style="margin: 5px 0; color: black;">Price: &#163;${booking.price/100}</p>
                    </div>
                    <div>
                        <p style="margin: 5px 0; color: black;">Please note that we require at least 24 hours' notice for cancellations or rescheduling. If you cancel within this time frame, you will receive a full refund or credit towards a future appointment. Late cancellations or no-shows may be subject to a fee.</p>
                        <h3 style="color: black;">Kind regerts</h3>
                        <h3 style="margin: 5px 0; color: black;">Divine Touch by Ola</h3>
                    </div>
                </div>`
            };
            
            await transporter.sendMail(adminMailOption, async function(error, info){
                if (error) {
                    reject({ status: 'failed', message:'failed to send mail to admin' });
                } else {
                    await transporter.sendMail(clientMailOption, function(err, info){
                        if (err) {
                            reject({ status: 'failed', message: 'failed to send mail to client' })
                        }
                        else {
                            resolve({ status: 'success', message: info })
                        }
                    })
                }
            });
            
        } catch (error) {
            reject({ status: 'failed', message: error.message })
        }
    })
}

function sendContactQueryPromise (data) {
    return new Promise( async (resolve, reject) => {
    
        try {
            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'khadijahwebservice@gmail.com',
                  pass: 'bjdrbgzhgxrtlqfd'
                }
            });
    
            if (!transporter) return { status: 'failed', message: 'no transporter found' };
            
            const mailOptions = {
                from: 'khadijahwebservice@gmail.com',
                to: 'kanon754@gmail.com',
                subject: 'A contact query received',
                text: 'Here is the details',
                html: `<div>
                    <div>
                        <h2 style="margin: 5px 0; color: black;">Contact Details</h2>
                        <p style="margin: 5px 0; color: black;">Name: ${data.name}</p>
                        <p style="margin: 5px 0; color: black;">Email: ${data.email}</p>
                        <p style="margin: 5px 0; color: black;">Message: ${data.message}</p>
                    </div>
                </div>`
            };
            
            await transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    reject({ status: 'failed', message: error.message });
                } else {
                    resolve({ status: 'success', message: info })
                }
            });
            
        } catch (error) {
            reject({ status: 'failed', message: error.message })
        }
    })
}


module.exports = {
    cronJob,
    sendOrderConfirmationPromise,
    sendContactQueryPromise
}