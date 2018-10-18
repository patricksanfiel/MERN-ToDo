import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ToDoForm from './ToDoForm';

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
                    <button onClick={()=>this.deleteItem()} className="btn red lighten-1 left todo-item-button col-s-3 col-3" id="todo-item-left-button"><i className="material-icons left">delete</i>Delete</button>
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
        if(this.state.displayEditForm){
            return(
                <ToDoForm  
                    todo={this.state.item} 
                    cancelClicked={(event)=>this.toggleEditForm(event)}
                    params={this.props.match.params}
                    formType="update"    
                />
            )
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
                <div className="container">
                    {this.displayEditForm()}
                </div>
            </div>
        )
    }
}

export default withRouter(ToDoItem)