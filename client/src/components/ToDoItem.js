import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ToDoItem extends Component{
    state = {
        item: {},
        displayEditForm: false
    }
    componentDidMount(){
        this.fetchItem()
        this.setState({displayItem: true})
    }

    fetchItem(match){
        axios.get(`/todo/api/${this.props.match.params.id}`)
        .then(res => res.data)
        .then(data => this.setState({item: data}))
    }

    renderItem(){
        const todo = this.state.item
        let buttons, date, dateStatus
        if(!this.state.displayEditForm){
            buttons = (
                <div className="row">
                    <button onClick={()=>this.deleteItem()} className="btn red left"><i className="material-icons left">delete</i>Delete</button>
                    <button onClick={()=>this.toggleEditForm()} className="btn darken yellow darken-2 right">Edit<i className="material-icons right">edit</i></button>
                </div>
            )
        }
        // If a todo item is edited, the time and date it was edited preceded by "Updated: " will be rendered
        // Otherwise, the time and date it was created preceded by "Created: " will be rendered
        if(todo.updatedAt){
            dateStatus = "Updated: "
            date = todo.updatedAt;
        } else{
            dateStatus = "Created: "
            date = todo.createdAt
        }
        return (
            <div className="container">
                <div className="row">
                    <h1 className="col-s-12 col-12">{todo.todoTitle}</h1>
                </div>
                <div className="row">
                    <span className="col-s-12 col-12">{dateStatus} <span>{new Date(date).toLocaleString()}</span></span>
                </div>
                <div className="row">
                    <p className="flow-text col-s-12 col-12">{todo.todoBody}</p>
                </div>
                {buttons}
            </div>
        
        )
    }

    toggleEditForm(){
        let displayEditForm = this.state.displayEditForm
        displayEditForm = !displayEditForm;
        this.setState({displayEditForm: displayEditForm})
    }

    displayEditForm(){
        const todo = this.state.item
        if(this.state.displayEditForm){
            return(
                <div className="container">
                    <form onSubmit={(event)=>this.editItem(event)}>
                        <div className="row">
                            <label>ToDo Title</label>
                            <input type="text" ref="todoTitle" defaultValue={todo.todoTitle}/>
                        </div>
                        <div className="row">
                            <label>ToDo Body</label>
                            <input type="text" ref="todoBody" defaultValue={todo.todoBody}/>
                        </div>
                        <button onClick={()=>this.toggleEditForm()} className="btn red left"><i className="material-icons left">cancel</i>Cancel</button>
                        <button type="submit" value="submit" className="btn right">Update ToDo<i className="material-icons right">check</i></button>
                    </form>
                </div>
            )
        }
    }

    editItem(event){
        const todoTitle = this.refs.todoTitle.value;
        const todoBody = this.refs.todoBody.value;
        axios.put(`/todo/api/${this.props.match.params.id}`, {
            todoTitle: todoTitle,
            todoBody: todoBody,
            updatedAt: Date.now()
        })
        .then(res => console.log(res))
        .catch(error => console.log(`Error: ${error.message}`))
        if(!todoTitle || !todoBody){
            event.preventDefault()
        }
    }

    deleteItem(){
        axios.delete(`/todo/api/${this.props.match.params.id}`)
        .then(res => console.log(res))
        this.props.history.replace('/todo')
    }
    
    render(){
        return(
            <div>
                {this.renderItem()}
                {this.displayEditForm()}
            </div>
        )
    }
}

export default withRouter(ToDoItem)