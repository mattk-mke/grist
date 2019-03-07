import React from 'react';
import { connect } from 'react-redux';
import classes from './NavItems.module.scss';
import NavItem from './NavItem/NavItem';

const navItems = (props) => {
  let logInOut = <NavItem link="/login" closed={props.closed} >Log in</NavItem> ;
  if (props.isAuthenticated) {
    logInOut = <NavItem link="/logout" closed={props.closed} >Log Out</NavItem> ;
  }

  return (
    <ul className={classes.NavItems} >
      <NavItem link="/" closed={props.closed}>Home | Lists</NavItem>
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