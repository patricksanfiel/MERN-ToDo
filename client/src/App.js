import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ToDoNew from './components/ToDoNew';
import ToDoItem from './components/ToDoItem';
import ToDoList from './components/ToDoList';
import NavBar from './components/NavBar';
import './assets/CSS/todo.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/todo/new" component={ToDoNew} />
            <Route exact path="/todo" component={ToDoList}/>
            <Route path="/todo/:id" component={ToDoItem} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
