const asyncHandler = require("express-async-handler")
const sendEmail = require("../utils/email")

const validator = require("validator");
const Portfolio = require("../model/Portfolio");

exports.emailSendByUser = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;


    // if (!validator.isLength(name, { min: 2, max: 50 })) {
    //     return res.status(400).json({ error: "Name must be between 2 and 50 characters" });
    // }

    // Validate email
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email address" });
    }

    // // Validate subject
    // if (!validator.isLength(subject, { min: 2, max: 100 })) {
    //     return res.status(400).json({ error: "Subject must be between 2 and 100 characters" });
    // }

    // // Validate message
    // if (!validator.isLength(message, { min: 10, max: 1000 })) {
    //     return res.status(400).json({ error: "Message must be between 10 and 1000 characters" });
    // }


    // Construct the HTML content with styles
    const styledServer = ` <html>
    <head>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                color: #333;
            }
            h1 {
                color: #007BFF;
            }
            p {
                font-size: 16px;
                line-height: 1.6;
                color: #555;
            }
            .phone-number {
                background-color: #87CEEB;
                padding: 10px;
                display: inline-block;
                color:white;
            }
            .center-text {
                text-align: left;
            }

            .left-text {
                text-align: left;
            }
            
            .signature {
                margin-top: 20px;
                font-style: italic;
            }
        </style>
    </head>
    <body>
        <p class="left-text" style="font-weight: bold;">Hello, ${name},</p>
        <p class="center-text phone-number">
            Phone Number: <a href="tel:+918208543875">+91 8208543875</a>
        </p>
        <p class="center-text">
            Thank you for reaching out! Your message has been received.
            <br>
            I'll get back to you soon!
        </p>
        <p class="center-text signature">Best regards,<br>Samadhan Bodkhe</p>
    </body>
</html>
            `


    const styledClient = `
    <html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h3 {
            color: #007BFF;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
        }

        .email {
            color: #007BFF;
        }
    </style>
</head>
<body>

    <div class="container">
        <h3>Hi, I'm ${name}</h3>
        <p class="email">Email: ${email}</p>
        <p>${message}</p>
    </div>

</body>
</html>

    `


    // Send the email to me
    await sendEmail({
        to: process.env.FROM_EMAIL,
        html: styledClient,
        subject: subject,
    });



    //Done
    //Send email to client
    await sendEmail({
        to: email,
        html: styledServer,
        subject: `Thank You For Contacting`
    });

    // Optionally, you can save the user data to the database
    const result = await Portfolio.create(req.body);

    res.status(201).json({ message: "Email Send Success", result });
});

exports.getEmail = asyncHandler(async (req, res) => {
    const data = await Portfolio.find()
    res.status(200).json({ message: "Email Data Get  Success", data })
})
exports.deleteEmail = asyncHandler(async (req, res) => {
    const { adminId } = req.params
    await Portfolio.findByIdAndDelete(adminId)
    res.status(201).json({ message: "Email Data Delete  Success", })
})