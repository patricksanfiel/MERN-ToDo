import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = ({match}) => {
    return(
        <div id="dashboard-component">
            <h2>Dashboard</h2>
            <div id="dashboard-buttons">
                <Link to="/todo/new"><button>Add New ToDo Item</button></Link>
                <Link to="/todo"><button>View ToDo List</button></Link>
            </div>
        </div>
    )
}






export default Dashboard