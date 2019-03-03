import React, { Component, Fragment } from 'react';

import classes from './Layout.module.scss';
import NavBar from '../Nav/NavBar/NavBar';
import SideDrawer from '../Nav/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showMenu: false
  };

  sideDrawerCloseHandler() {
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpenHandler() {
    this.setState({showSideDrawer: true})
  }

  render() {
    return (
      <Fragment>
        <NavBar
          opened={this.sideDrawerOpenHandler.bind(this)} />
        <SideDrawer
          open={this.state.showMenu}
          closed={this.sideDrawerCloseHandler.bind(this)} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Fragment>
    );
  }
}

export default Layout;