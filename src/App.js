import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions';

import Layout from './components/Layout/Layout';
import Landing from './containers/Landing/Landing';
import Login from './components/Auth/Login/Login';
import Logout from './components/Auth/Logout/Logout';
import ListForm from './components/List/ListForm/ListForm';
import List from './components/List/List';

class App extends Component {
  componentDidMount() {
		let token = null;
		// Check for existing token in local storage
		let jwt = JSON.parse(window.localStorage.getItem("jwt"));
		if (jwt && new Date(jwt.expiresIn) < new Date()) {
			window.localStorage.removeItem('jwt'); // remove if expired
		} else if (jwt && new Date(jwt.expiresIn) > new Date()) {
			token = jwt.token;
		}
		if (token) { this.props.signIn(token); }
  }
  
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/" render={(props) => <Landing {...props}/>} />
            <Route exact path="/login" render={ (props) => <Login width="240px" {...props} />} />
            <Route exact path="/logout" render={ (props) => <Logout {...props} />} />
            <Route exact path="/list/new" render={(props) => <ListForm {...props} />} />
            <Route exact path="/list/:id" render={(props) => <List {...props} />} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    loading: state.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (token) => dispatch(actions.signIn(token))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
