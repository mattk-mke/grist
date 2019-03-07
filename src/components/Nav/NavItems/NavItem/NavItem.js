import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.scss';

const navItem = (props) => (
  <li className={classes.NavItem} onClick={props.closed}>
    <NavLink
      activeClassName={classes.active}
      to={props.link}
      exact 
      >{props.children}</NavLink>
  </li>
);

export default navItem;