const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
require('dotenv').config();

const UserRoutes = require('./routes/user')


const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.Mongo_Uri)
.then(()=>{
    console.log('mogoose connected')
}).catch((error)=>{
    console.log(error)
})

app.use('/shopify', UserRoutes)

app.listen(7000, ()=>{
    console.log(`Server is running at 7000`)
})