import React, { Component } from 'react';
import axios from 'axios'

class ToDoNew extends Component{

    submitHandler(event) {
        const todoTitle = this.refs.todoTitle.value;
        const todoBody = this.refs.todoBody.value;
        axios
            .post("/todo/new/api", {
                todoTitle: todoTitle,
                todoBody:todoBody
            })
        .then(res => console.log(res))
        .catch(error => console.log(`Error: ${error.message}`))
    }

    render(){
        return(
            <form onSubmit={(event)=>this.submitHandler(event)}>
                <label>ToDo Title</label>
                <input type="text" ref="todoTitle"/>
                <label>ToDo Body</label>
                <input type="text" ref="todoBody" />
                <button type="submit" value="submit">Save ToDo</button> 
            </form>
        )
    }
}



export default ToDoNew