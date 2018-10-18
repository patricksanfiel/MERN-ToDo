const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
    todoTitle: String,
    createdAt: Date,
    updatedAt: Date,
    todoBody: String
})

mongoose.model('todo', todoSchema)