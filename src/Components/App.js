
import React, { Component } from 'react';
import '../Assets/scss/main.scss';
import { Router, Route, Switch } from "react-router-dom";
import Admin from './Admin';
import history from './history';

class App extends Component {

  constructor() {
    super();
    this.state = {
      authed: false,
      guid:"985b5ddb-f755-417b-a3c0-865832314454"
      }
  }

  render() {
    let router = 
                  <Router history = {history}>
                    <Switch>
                      <Route path="/" component={Admin} />
                    </Switch>
                  </Router>
    return (
      <div>
        {router}
      </div>    
    );
  }
}

export default App;