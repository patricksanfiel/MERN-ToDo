import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = ({match}) => {
    return(
        <div id="dashboard-component" className="container">
            <div className="row">
                <h2 id="dashboard-header" className="col-12 col-s-12">Dashboard</h2>
            </div>
            <div id="dashboard-buttons" className="row container">
                <Link to="/todo/new"><button className="col-5 btn left dashboard-button" id="dashboard-left-button">Add New ToDo</button></Link>
                <Link to="/todo"><button className="col-5 btn right dashboard-button" id="dashboard-right-button">View ToDo List</button></Link>
            </div>
        </div>
    )
}






export default Dashboard