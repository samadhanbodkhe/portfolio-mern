const express = require("express")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")
require("dotenv").config({ path: "./.env" }
)

mongoose.connect(process.env.MONGO_URL)
const app = express()

app.use(express.static(path.join(__dirname, "dist")))
app.use(express.json())
app.use(cors({
    // origin: "https://samadhanbodkhe-portfolio.onrender.com",
    origin: "http://localhost:5173"
}))
app.use("/api/admin", require("./routes/adminRoute"))
app.use("/api/admin/portfolio", require("./routes/adminRoute"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    res.status(404).json({ message: "resource Not foudn" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Something Went Wrring" })
})

mongoose.connection.once("open", () => {
    console.log("MONGOOSE ONNECTED");
    app.listen(process.env.PORT, console.log("server running"))
})