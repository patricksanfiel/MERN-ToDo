import React, { Component } from 'react';
import axios from 'axios';

class ToDoItem extends Component{
    state = {
        item: {},
        displayEditForm: false
    }
    componentDidMount(){
        this.fetchItem()
    }

    fetchItem(match){
        axios.get(`/todo/api/${this.props.match.params.id}`)
        .then(res => res.data)
        .then(data => this.setState({item: data}))
    }

    renderItem(){
        const todo = this.state.item
        return (
            <div>
                <h1>{todo.todoTitle}</h1>
                <span>{todo.createdAt}</span>
                <p>{todo.todoBody}</p>
                <div>
                    <button onClick={()=>this.deleteItem()}>Delete</button>
                    <button onClick={()=>this.toggleEditForm()}>Edit</button>
                </div>
            </div>
        )
    }

    toggleEditForm(){
        let displayEditForm = this.state.displayEditForm
        displayEditForm = !displayEditForm;
        this.setState({displayEditForm: displayEditForm})
    }

    displayEditForm(){
        if(this.state.displayEditForm){
            return(
                <form onSubmit={()=>this.editItem()}>
                    <label>ToDo Title</label>
                    <input type="text" ref="todoTitle"/>
                    <label>ToDo Body</label>
                    <input type="text" ref="todoBody" />
                    <button type="submit" value="submit">Update ToDo</button>
                </form>
            )
        }
    }

    editItem(){
        axios.put(`/todo/api/${this.props.match.params.id}`, {
            todoTitle: this.refs.todoTitle.value,
            todoBody: this.refs.todoBody.value
        })
        .then(res => console.log(res))
        .catch(error => console.log(`Error: ${error.message}`))
    }

    deleteItem(){
        axios.delete(`/todo/api/${this.props.match.params.id}`)
        .then(res => console.log(res))
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

export default ToDoItem