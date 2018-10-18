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
        return (
            todos
            .sort(
                (a,b)=>{
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                }
            )
            .map((todo) => {
                return(
                    <Link key={todo._id} id={todo._id} to={`/todo/${todo._id}`}>
                        <div className="row">
                            <div className="card teal lighten-3">
                                <div className="card-content white-text">
                                    <span className="card-title">{todo.todoTitle}</span>
                                    <p>{todo.todoBody}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })
        )
    }

    render(){
        return(
                <div className="container">
                    <div className="row">
                        <h1>To-Do List</h1>
                    </div>
                    {this.renderToDos()}
                    <div className="row fixed-action-btn">
                        <Link to="/todo/new"><button className="btn-floating btn-large waves-effect waves-light red left"><i className="material-icons">add</i></button></Link>
                    </div>
                </div>
            )
    }
}


export default ToDoList