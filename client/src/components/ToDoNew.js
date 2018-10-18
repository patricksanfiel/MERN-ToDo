import React from 'react';
import ToDoForm from './ToDoForm';

const ToDoNew = () => {
    return(
        <div className="container">
            <div className="row">
                <h2 className="col-s-12 col-12" id="new-todo-header">Add New To-Do Item</h2>
            </div>
            <div className="row">
                <ToDoForm  
                    todo={null} 
                    params={null}
                    formType="create"    
                />
            </div>
        </div>
    )
}



export default ToDoNew