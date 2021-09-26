const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')

require('dotenv').config()

const app = express()

app.use(morgan('tiny'))
app.use(cors())

app.get('/cryptocurrency/*', (req,res) => {
    console.log("######", req.originalUrl);
    
    let url = `https://pro-api.coinmarketcap.com/v1${req.originalUrl}`
    console.log(url)
    axios.get(url,{headers: { 'X-CMC_PRO_API_KEY':"8a00c428-798d-4461-99cc-3aa30573fc3f" }})
        .then(response => {
            
            console.log(response.data)
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