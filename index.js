const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./user/user-router')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/api',router)

const db = mongoose.connect('mongodb+srv://waila:Linux-199219@cluster0.9ymwl.mongodb.net/?retryWrites=true&w=majority').then((open)=>{
    console.log('connection estrablished')
}).catch((error)=>{console.log('error'+error)})

const server = app.listen(4000,()=>{
    const host = server.address().address
    const port = server.address().port
    console.log('connection estrablished HTTP://$$$:',host,port)
})