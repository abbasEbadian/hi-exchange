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
            
            console.log(response.data)
            res.send(response.data)
        })
        .catch(err => {
            console.log(err)
            // res.send(err.response.data)
        })
})

app.post("/create_payment_link", (req , res)=>{

    const url = process.env.IDPAY_GENERATE_LINK

    const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.IDPAY_TOKEN,
        "X-SANDBOX": '0'
    }
    
    const {order_id, amount, name, phone, mail, desc} = req.body
    const data  =JSON.stringify({order_id, amount, callback:"https://hi-exchange.herokuapp.com/wallet"})
    console.log({order_id, amount, name, phone, mail, desc, callback:"https://hi-exchange.herokuapp.com/wallet"});
    
    axios.post(url, data, {headers}).then(response=>{
        const {data} = response
        res.send(data)
    }).catch(error=>{
        // console.log(error);
        
        res.send(error)
    })

})
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Listening on port ',port)
})