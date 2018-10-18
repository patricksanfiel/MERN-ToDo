import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class ToDoForm extends Component{
    state = {
        item: {},
        displayEditForm: false,
        todoEmptyTitle: false,
        todoEmptyBody: false
    }
    
    editItem(event){
        this.setState({
            todoEmptyTitle:false,
            todoEmptyBody:false
        })
        const todoTitle = this.refs.todoTitle.value;
        const todoBody = this.refs.todoBody.value;
        axios.put(`/todo/api/${this.props.params.id}`, {
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

    createItem(event) {
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
            this.props.history.replace(
                    {
                        pathname:"/todo", 
                        search:"created"
                    }
                )
        } else {
            event.preventDefault()
            if(!todoTitle){
                this.setState({todoEmptyTitle: true})
            }
            if(!todoBody){
                this.setState({todoEmptyBody: true})
            }
        }
    }

    validate(event){
        if(event.target.value.length<1){
            if(event.target.name==="title"){
                this.setState({todoEmptyTitle: true})
            } else if(event.target.name==="body"){
                this.setState({todoEmptyBody: true})
            }
        } else if(event.target.value.length>=1) {
            if(event.target.name==="title"){
                this.setState({todoEmptyTitle: false})
            } else if(event.target.name==="body"){
                this.setState({todoEmptyBody: false})
            }
        }
    }
    
    
    render(){
        let todo = this.props.todo
        let greenButtonText = "Save"
        let submitAction = (event)=>this.createItem(event)
        let redButton = (
            <Link to="/todo"><button className="btn red left"><i className="material-icons left">cancel</i>Cancel</button></Link>
        )
        if(todo){
            greenButtonText = "Update"
            redButton = (
                <button onClick={(event)=>this.props.cancelClicked(event)} className="btn red left"><i className="material-icons left">cancel</i>Cancel</button>
            )
        }
        if(this.props.formType === "update"){
            submitAction = (event)=>this.editItem(event)
        }

        return(
            <div>
                    <form onSubmit={()=>submitAction()}>
                        <div className="row">
                            <label>ToDo Title</label>
                            <input type="text" ref="todoTitle" name="title" defaultValue={todo ? todo.todoTitle : "Enter a title"} onChange={(event)=>this.validate(event)}/>
                            {this.state.todoEmptyTitle ? <span className="empty-title-prompt">Title cannot be empty</span> : null}
                        </div>
                        <div className="row">
                            <label>ToDo Body</label>
                            <input type="text" ref="todoBody" name="body" defaultValue={todo ? todo.todoBody : "Enter a body"} onChange={(event) => this.validate(event)}/>
                            {this.state.todoEmptyBody ? <span className="empty-body-prompt">Body cannot be empty</span>: null}
                        </div>
                        {redButton}
                        <button type="submit" value="submit" className="btn right">{greenButtonText}<i className="material-icons right">check</i></button>
                    </form>
                </div>
        )
    }
}




export default withRouter(ToDoForm)