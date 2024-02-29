const nodemailer = require("nodemailer")


const sendEmail = ({ to, subject, message, html }) => new Promise((resolve, reject) => {
    try {
        const mailer = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })
        mailer.sendMail({
            from: process.env.FROM_EMAIL,
            to,
            subject: subject,
            text: message,
            html: html
        }, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            } else {
                console.log("Email Sent Successfully")
                return resolve("Email Send Success")
            }
        })
    } catch (error) {
        console.log(error)
        return reject(error.message)
    }
})


module.exports = sendEmail