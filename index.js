const express = require('express')
const app = express()
const router = require("./routes/data")

const PORT = 5001;



app.get("/", (req, res) => {
    res.send("Hey welcome to my server")
})

app.use('/parks', router)

app.listen(PORT, () => console.log(`I am listening on PORT: ${PORT}`))

