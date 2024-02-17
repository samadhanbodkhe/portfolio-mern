const sendEmail = require("../utils/email");


exports.contactEmail = async (req, res) => {
    try {
        const x = await sendEmail({
            subject: `Hello ,  ${req.body.subject}`,
            message: `My email is ${req.body.to}, \n  \n ${req.body.message} `
        })
        if (x) {
            res.status(200).json({ message: "email send success" })
        } else {
            res.status(400).json({ message: "unable to send email" })
        }
    }


    catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" })
    }
}