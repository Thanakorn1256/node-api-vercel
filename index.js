 
const express = require('express')
const app = express()
const PORT = 4000


app.listen(PORT,() => {
    console.log('API ON PORT ${PORT')

})

module.exports = app