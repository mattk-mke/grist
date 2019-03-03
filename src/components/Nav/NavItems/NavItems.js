import React from 'react';

import classes from './NavItems.module.scss';
import NavItem from './NavItem/NavItem';

const navItems = () => (
  <ul className={classes.NavItems}>
    <NavItem link="/" >Home / List</NavItem>
    <NavItem link="/login" >Log in</NavItem>
    <NavItem link="/logout" >Log Out</NavItem>
  </ul>
);

export default navItems;