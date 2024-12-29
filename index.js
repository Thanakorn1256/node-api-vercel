 
const express = require('express')
const app = express()
const PORT = 4000


app.listen(PORT,() => {
    console.log('API ON PORT ${PORT')

})

app.get('/', (req,res) => {
    res.send('This is my API ruunig.....')
})

module.exports = app
