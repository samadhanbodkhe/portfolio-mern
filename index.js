const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config({ path: "./.env" }
)


const app = express()
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.json())
app.use(cors({
    origin: "https://samadhanbodkhe-portfolio.onrender.com"
}))
app.use("/api/admin", require("./routes/adminRoute"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    // res.status(404).json({ message: "resource Not foudn" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Something Went Wrring" })
})

app.listen(process.env.PORT, console.log("server running"))