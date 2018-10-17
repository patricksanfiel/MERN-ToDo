import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

class ToDoList extends Component{
    state={
        todos: []
    }

    componentDidMount(){
        this.fetchToDos()
    }

    fetchToDos = async () => {
        let todos = await axios.get("/todo/api")
        todos = todos.data
        // console.log(todos)
        this.setState({todos: todos})
    }

    renderToDos(){
        const todos = this.state.todos
        return (todos.map((todo) => {
                return(
                    <Link key={todo._id} id={todo._id} to={`/todo/${todo._id}`}>
                        <h1>{todo.todoTitle}</h1>
                        <p>{todo.todoBody}</p>
                    </Link>
                )
            })
        )
    }

    render(){
        return(
                <div>
                    <h1>ToDo List</h1>
                    {this.renderToDos()}
                </div>
            )
    }
}


export default ToDoList