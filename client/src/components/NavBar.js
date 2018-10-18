import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
class NavBar extends Component{
    state={
        responsive: false
    }
    
    render(){

        let toggleResponsive = () => {
            let responsive = this.state.responsive
            this.setState({responsive:!responsive})
        }
        let renderResponsive = () => {
            if(this.state.responsive){
                return(
                    <nav className="responsive container red lighten-1" id="dropdown-div">
                        <ul className="right">
                            <li className="dropdown-link"><Link to="/todo" onClick={()=>toggleResponsive()}>Todo List</Link></li>
                            {backButton}
                        </ul>
                    </nav>
                )
            }
        }

        let backButton = <li className="dropdown-link" onClick={()=>toggleResponsive()}><Link to="" onClick={()=>this.props.history.goBack()}>Back</Link></li>
        if(this.props.history.location.pathname==="/todo/new"){
            backButton = null
        }

        return(
            <div>
                <nav className="container">
                    <div className="nav-wrapper">
                        <div className="row">
                            <span className="brand-logo left"><Link to="/">Toodley Doo</Link></span>
                            <ul className="right navbar-links hide-on-small-and-down">
                                <li><Link to="/todo">Todo List</Link></li>
                                {backButton}
                            </ul>
                            <ul className="hamburger navbar-links right">
                                <li onClick={()=>toggleResponsive()}><i className="material-icons">menu</i></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {renderResponsive()}
            </div>
        )
    }
}



export default withRouter(NavBar)