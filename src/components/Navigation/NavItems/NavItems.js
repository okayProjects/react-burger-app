import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';


const navItems = (props) => (

    <ul className={classes.NavItems}>
        <NavItem link='/' exact>Burger Builder</NavItem>
        {props.isAuth ? <NavItem link='/orders'>My Orders</NavItem> : null}

        {!props.isAuth ? <NavItem link='/auth'>Authenticate</NavItem> : <NavItem link='/logout'>{props.email + ' / '}Logout</NavItem>}
    </ul>

)


export default navItems;