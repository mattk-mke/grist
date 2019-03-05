import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Landing from './containers/Landing/Landing';
import Login from './components/Auth/Login/Login';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" render={ () => <Login width="240px" />} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
