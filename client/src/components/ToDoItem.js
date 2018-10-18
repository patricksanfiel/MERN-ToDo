import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ToDoItem extends Component{
    state = {
        item: {},
        displayEditForm: false,
        todoEmptyTitle: false,
        todoEmptyBody: false
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
                <div className="row card-action">
                    <button onClick={()=>this.deleteItem()} className="btn red left todo-item-button col-s-3 col-3" id="todo-item-left-button"><i className="material-icons left">delete</i>Delete</button>
                    <button onClick={()=>this.toggleEditForm()} className="btn darken yellow darken-2 right todo-item-button col-s-3 col-3"><i className="material-icons left">edit</i>Edit</button>
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
                <div className="card teal teal lighten-3 white-text">
                    <div className="card-content">
                        <div className="card-head">
                            <div className="row" id="todo-item-header-row">
                                <span className="col-s-12 col-12 card-title" id="todo-item-header-text">{todo.todoTitle}</span>
                            </div>
                            <div className="row">
                                <span className="col-s-12 col-12" id="todo-item-date-span">{dateStatus} <span id="todo-item-date-text">{new Date(date).toLocaleString()}</span></span>
                            </div>
                        </div>
                        <div className="row card-body">
                            <p className="flow-text col-s-12 col-12">{todo.todoBody}</p>
                        </div>
                    </div>
                    {buttons}
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
        const todo = this.state.item
        if(this.state.displayEditForm){
            return(
                <div className="container">
                    <form onSubmit={(event)=>this.editItem(event)}>
                        <div className="row">
                            <label>ToDo Title</label>
                            <input type="text" ref="todoTitle" defaultValue={todo.todoTitle}/>
                            {this.state.todoEmptyTitle ? <span className="empty-title-prompt">Title cannot be empty</span> : null}
                        </div>
                        <div className="row">
                            <label>ToDo Body</label>
                            <input type="text" ref="todoBody" defaultValue={todo.todoBody}/>
                            {this.state.todoEmptyBody ? <span className="empty-body-prompt">Body cannot be empty</span>: null}
                        </div>
                        <button onClick={()=>this.toggleEditForm()} className="btn red left"><i className="material-icons left">cancel</i>Cancel</button>
                        <button type="submit" value="submit" className="btn right">Update<i className="material-icons right">check</i></button>
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
            if(!todoTitle){
                this.setState({todoEmptyTitle: true})
            }
            if(!todoBody){
                this.setState({todoEmptyBody: true})
            }
        }
    }

    deleteItem(){
        axios.delete(`/todo/api/${this.props.match.params.id}`)
        .then(res => console.log(res))
        this.props.history.replace({
            pathname:"/todo",
            search: "deleted"
        })
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