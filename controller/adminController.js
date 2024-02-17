const sendEmail = require("../utils/email");


exports.contactEmail = async (req, res) => {
    try {
        const x = await sendEmail({
            subject: `Hello ,  ${req.body.subject}`,
            message: `My email is ${req.body.to}, \n  \n ${req.body.message} `
        })

        const y = await sendEmail({
            to: req.body.to,
            subject: "Thanks for contacting",
            message: `Hello ${req.body.subject} \n \n  Thank Your for reaching out! Your message has been received. \n \n
            Mobile No:8208543875 
            \n \n I'll get back to you soon!    \n Best Regards Samadhan Bodkhe😎 `
        })

        if (x || y) {
            res.status(200).json({ message: "email send success" })
        } else {
            res.status(400).json({ message: "Unable to send email" })

        }




    }


    catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" })
    }
}