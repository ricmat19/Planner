const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const { gmail } = require('googleapis/build/src/apis/gmail');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const nodemailer = require('nodemailer');

const clientId = process.env.GMAIL_CLIENT_ID;
const clientSecret = process.env.GMAIL_CLIENT_SECRET;
const redirectURI = process.env.GMAIL_REDIRECT_URI;
const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI)
oAuth2Client.setCredentials({refresh_token: refreshToken})

router.post("/email", async(req, res) => {

    const accessToken = await oAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({ 
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth:{
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: clientId,
            clientSecret: clientSecret,
            refresh_token: refreshToken,
            accessToken: accessToken,
        }
    })

    const output = `
        Message Details:
            Name: ${req.body.name}
            Email: ${req.body.email}
            Message: ${req.body.message}
    `

    const html = `
    <h3>Message Details:</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Message: ${req.body.message}</li>
    </ul>`

    let mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL, 
        subject: req.body.subject,
        text: output,
        html: html,
    }

    transporter.sendMail(mailOptions)
        .then(function(response){
            console.log('Email sent');
            res.sendStatus(200);
        })
        .catch(function(error){
            console.log('Error', error);
        });
})

module.exports = router;