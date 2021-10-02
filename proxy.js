const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());       // to support JSON-encoded bodies
app.get('/cryptocurrency/*', (req,res) => {
    
    let url = `https://pro-api.coinmarketcap.com/v1${req.originalUrl}`
    axios.get(url,{headers: { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY }})
        .then(response => {
                        res.send(response.data)
        })
        .catch(err => {
            console.log(err)
            // res.send(err.response.data)
        })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Listening on port ',port)
})