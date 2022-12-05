const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// Get volunteer route
app.use('/api/jobs', require('./routes/api/jobs'))

const PORT = process.env.EXPRESSPORT;
const msg = `Running on PORT ${PORT}`
app.get("/", (req, res) => {
    res.send(`<h1>Express Server</h1><p>${msg}<p>`)
})
app.listen(PORT, () => {
    console.log(msg)
})

