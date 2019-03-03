import React, { Fragment } from 'react';

import Logo from '../../UI/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDrawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <Logo height='11%' marginBottom='32px' />
        <nav>
          <NavItems />
        </nav>
      </div>
    </Fragment>
  );
}

export default sideDrawer;