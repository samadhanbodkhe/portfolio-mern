const { emailSendByUser, getEmail, deleteEmail } = require("../controller/adminController")


const router = require("express").Router()

router
    .get("/get-email", getEmail)
    .post("/send-email", emailSendByUser)
    .delete("/delete-email/:adminId", deleteEmail)


module.exports = router