import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

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
        if(todoTitle && todoBody){
            this.props.history.replace("/todo")
        } else {
            event.preventDefault()
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <h2 className="col-12 col-s-12" id="new-todo-header">Add a New To-Do Item</h2>
                </div>
                <form onSubmit={(event)=>this.submitHandler(event)}>
                    <div className="input-field">
                        <label>ToDo Title</label>
                        <input type="text" ref="todoTitle"/>
                    </div>
                    <div className="input-field">
                        <label>ToDo Body</label>
                        <input type="text" ref="todoBody" />
                    </div>
                    <div className="row">
                        <Link to="/todo"><button className="btn red left"><i className="material-icons left">cancel</i>Cancel</button></Link>
                        <button type="submit" value="submit" className="btn right">Save<i className="material-icons right">check</i></button>
                    </div> 
                </form>
            </div>
        )
    }
}



export default ToDoNew