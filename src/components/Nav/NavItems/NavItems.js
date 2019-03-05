import React from 'react';
import { connect } from 'react-redux';
import classes from './NavItems.module.scss';
import NavItem from './NavItem/NavItem';

const navItems = (props) => {
  let logInOut = <NavItem link="/login" >Log in</NavItem> ;
  if (props.isAuthenticated) {
    logInOut = <NavItem link="/logout" >Log Out</NavItem> ;
  }

  return (
    <ul className={classes.NavItems}>
      <NavItem link="/" >Home / List</NavItem>
      {logInOut}
    </ul>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  }
}

export default connect(mapStateToProps)(navItems);