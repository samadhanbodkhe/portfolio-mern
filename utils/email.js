const nodemailer = require("nodemailer")

const sendEmail = ({
    to,
    message = "test email",
    subject = "test subject"
}
) => new Promise((resole, reject) => {
    try {
        const miler = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.EMAIL_PASS,
            },

        });
        console.log(to);
        miler.sendMail({
            to: process.env.FROM_EMAIL,
            subject,
            text: message,
            from: process.env.FROM_EMAIL
        }, (err) => {

            if (err) {
                console.log(err)
                return reject(err)
            } else {

                console.log("email send success")
                return resole("email send success")
            }
        })
    } catch (error) {
        console.log(error)
        return reject(error.message)
    }
})

module.exports = sendEmail