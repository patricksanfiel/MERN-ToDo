const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
    todoTitle: String,
    createdAt: Date,
    todoBody: String
})

mongoose.model('todo', todoSchema)