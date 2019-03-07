import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Layout.module.scss';
import NavBar from '../Nav/NavBar/NavBar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true})
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.sideDrawerCloseHandler();
    }
  }

  render() {
    return (
      <Fragment>
        <NavBar
          opened={this.sideDrawerOpenHandler}
          closed={this.sideDrawerCloseHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default withRouter(Layout);