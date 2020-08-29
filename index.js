const express = require ('express');
const bodyParser=require("body-parser");
const app= express();
const db= require ('./queries');
const port=3000

const { request, response } = require('express');
app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
        extended :true,
    })
)

//Get request to root url (/)
app.get('/',(request,response)=> {
    response.json({ Welcome: 'How to create api with Node.js,express and Postgresql'})
})

//Endpoint

app.get('/states',db.getStates)
app.get('/states',db.getStatesById)
app.post('/states',db.createState)
app.put('/states',db.updateState)
app.delete('/states',db.deleteState)

app.listen(port,()=> {
    console.log(`App running on port ${port}.`)
})