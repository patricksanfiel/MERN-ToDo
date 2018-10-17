import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ToDoNew from './components/ToDoNew';
import ToDoItem from './components/ToDoItem';
import ToDoList from './components/ToDoList';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>App</h1>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/todo/new" component={ToDoNew} />
          <Route exact path="/todo" component={ToDoList}/>
          <Route path="/todo/:id" component={ToDoItem} />
        </div>
      </Router>
    );
  }
}

export default App;
