const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
require('./models/ToDo');
const ToDo = mongoose.model('todo')
const keys = require('./config/keys')

// Dev Only ------------------------------------------------------------------------
let mongooseReadyStateCodes = ["disconnected", "connected", "connecting", "disconnecting"]
mongoose.connect(`mongodb://${keys.mongooseConnectUsername}:${keys.mongooseConnectPassword}@cluster0-shard-00-00-rx76y.mongodb.net:27017,cluster0-shard-00-01-rx76y.mongodb.net:27017,cluster0-shard-00-02-rx76y.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, () => console.log(`${mongooseReadyStateCodes[mongoose.connection.readyState]} with a status code of`, mongoose.connection.readyState))
// ---------------------------------------------------------------------------------

app.use(bodyParser.json())

// Get all ToDo Items
app.get("/todo/api", async (req, res) => {
    const ToDos = await ToDo.find({})
    // console.log(ToDos)
    try{
        res.send(ToDos)
    } catch{
        error => {
            res.status(500).send({
            message: error.message || "An error occurred while attempting to retrive to-do items"
            });
        }
    }
});

// Create a New ToDo Item
app.post("/todo/new/api", async (req, res) => {
    // console.log("request body",req.body)
    if(!req.body.todoTitle){
        return res.status(400).send("To-do items must have a title to be saved.")
    }
    if(!req.body.todoBody){
        return res.status(400).send("To-do items must have a body to be saved.")
    }
    const todo = await new ToDo({
        todoTitle: req.body.todoTitle,
        todoBody: req.body.todoBody,
        createdAt: Date.now(),
        updatedAt: null
    })
    try{
        await todo.save()
        // console.log(todo)
        res.status(200).send(todo)
    } catch {
        error => {
            res.status(500).send({
                message: error.message || "An error occurred while attempting to create to-do item"
            })
        } 
    }
})

// Get One ToDo
app.get("/todo/api/:_id", async (req, res) => {
        // console.log(req.params)
        try{
            const todo = await ToDo.findById(req.params._id)
            if(!todo){
                return res.status(404).send({
                    message: `Note not found with ID: ${req.params._id}` 
                })
            }
            // console.log(todo.todoTitle)
        
            res.status(200).send(todo)
        } catch {
            error => {
                return res.send({message: `Error name:${error.name}\n Error message:${error.message}`})
            }
        }
})

// Edit One ToDo
app.put("/todo/api/:_id", async (req, res) => {
    if(!req.body.todoTitle){
        return res.status(400).send({message: "Todo items must have a title"})
    }
    if(!req.body.todoBody){
        return res.status(400).send({message: "Todo items must have a body"})
    }
    const todo = await ToDo.findByIdAndUpdate(req.params._id, {
       todoTitle: req.body.todoTitle,
       todoBody: req.body.todoBody,
       updatedAt: Date.now() 
    }, {new:true})
    console.log(todo)
    if(!todo){
        return res.status(404).send({message: `No To-do item with the ID:${req.params._id} found`})
    }
    console.log(todo)
    try{
        res.send(todo)
    } catch {
        error => {
            return res.send({message: `Error name:${error.name}\nError message:${error.message}`})
        }
    }
})

// Delete one ToDo item
app.delete("/todo/api/:_id", async (req, res) => {
    const todo = await ToDo.findByIdAndRemove(req.params._id)
    if(!todo){
       return res.status(404).send({message:`No note found with ID:${req.params._id}`})
    }
    try{
        res.send({message: "Todo item successfully deleted"})
    } catch{
        error => {
            return res.send({message: `Error name:${error.name}\nError message:${error.message}`})
        }
    }
})


const PORT = process.env.PORT || 5000
console.log(`Listening on port: ${PORT}`)
app.listen(PORT)