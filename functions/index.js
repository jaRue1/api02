const functions = require("firebase-functions")
const express = require('express')
const app = express()
app.get('/test', (req,res) => {
  res.send('it is working !')
})
app.get('/test2', (req,res) => {
  res.send('this is test 2')
})
exports.app = functions.https.onRequest(app)

