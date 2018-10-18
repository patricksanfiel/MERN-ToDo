import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

class ToDoList extends Component{
    state={
        todos: [],
        deleted: false
    }

    componentDidMount(){
        this.fetchToDos()
    }
    componentDidUpdate(){
        this.renderToDos()
    }

    fetchToDos = async () => {
        let todos = await axios.get("/todo/api")
        todos = todos.data
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

    createdNotification(){
        if(this.props.history.location.search==="?created"){
            return(
                <div className="created-notification-div row">
                    <span className="created-notification-text col-s-12 col-12">To-do list item successfully created</span>
                </div>
            )
        }
    }

    deletedNotification(){
        if(this.props.history.location.search==="?deleted"){
            return(
                <div className="deleted-notification-div row">
                    <span className="deleted-notification-text col-s-12 col-12">To-do list item successfully deleted</span>
                </div>
            )
        }
    }

    render(){
        return(
                <div className="container">
                    {this.deletedNotification()}
                    {this.createdNotification()}
                    <div className="row">
                        <h1 className="col-s-12 col-12" id="todo-list-header">To-Do List</h1>
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