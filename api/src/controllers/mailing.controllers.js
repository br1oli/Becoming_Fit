const { response, request } = require("express");
const nodemailer = require("nodemailer");
const { BECOMINGFIT_MAIL_PASSWORD } = process.env;


const postMail = async (req = request, res = response) => {
    try {
        const { email } = req.body;

       const output = `
            <div>
            <h3>Purchase Confirmation Email</h3>

            <h4>We have recieved an order from you, and we are happy to serve you! </4>
            <br/>
            <p>We are processing your order, wait for it!</p>
            </div>
        `

       let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
            user: "henry.becomingfit@gmail.com",
            pass: BECOMINGFIT_MAIL_PASSWORD,
            }
        });

        // send mail with defined transport object
        let mailOptions = {
            from: '"Becoming Fit" <henry.becomingfit@gmail.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "Hello from Becoming fit ✔", // Subject line
            text: "Purchase Confirmation Email", // plain text body
            html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                res.status(500).send(error.message)
            }else{
                console.log("Email has been sent");
                res.status(200).send(req.body)
            }
        })

    } catch (error) {
        res.status(500).send(error.message);
    }
  };

  module.exports = {
    postMail,
};