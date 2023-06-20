const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
const { Router } = require('express');
const router = Router();
router.post('/send', function(req, res, next) {
    var transporter =  nodemailer.createTransport(smtpTransport({ // config mail server
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'hongcdtkpmnc@gmail.com',
            pass: 'fqcraecziawdvgqk'
        }
    }));
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'hongcdtkpmnc@gmail.com',
        to: req.body.email,
        subject: 'Test Nodemailer',
        text: 'You recieved message from ' + req.body.email,
        html: '<p>You have Voucher:' + req.body.message 
        //bỏ voucher vào chỗ  req.body.message
    }
    transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
            
        } else {
            console.log('Message sent: ' +  info.response);
            
        }
    });
});
module.exports = router;