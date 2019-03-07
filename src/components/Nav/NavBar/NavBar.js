import React from 'react';
import Logo from '../../../components/UI/Logo/Logo';
import * as classes from './NavBar.module.scss';
import BurgerToggle from '../SideDrawer/BurgerToggle/BurgerToggle';
import NavItems from '../NavItems/NavItems';

const navBar = (props) => (
	<header className={classes.NavBar}>
		<Logo height='60%' />
		<BurgerToggle clicked={props.opened} />
		<nav className={classes.DesktopOnly}>
			<NavItems closed={props.closed} />
		</nav>
	</header>
);

export default navBar;