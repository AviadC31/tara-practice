const express = require('express')
const path = require('path')
const app = express()
var nodemailer = require('nodemailer');

require('dotenv').config()
const { nameofuser, password } = process.env 
const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/send', function (req, res) {
    const { name, phone, email } = req.body

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: nameofuser,
            pass: password
        }
    })

    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'aviadcoh1@gmail.com',
        subject: 'tara-test-check',
        text: `name: ${name}\nphone: ${phone}\nemail: ${email}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
})
app.listen(port, () => console.log("Server up and running on port " + port))
