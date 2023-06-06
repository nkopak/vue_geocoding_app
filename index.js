const express = require('express')
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use('/api/search', require("./routes/searchResults"))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(`${__dirname}/public`))
}

app.listen(PORT, () => console.log(`App running on port ${PORT}`))