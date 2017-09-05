import React from 'react';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter, Route, Link, NavLink, withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const Nav = ({ signedIn, logout}) => (
  <AppBar
    title={<NavLink className='logo' activeStyle={{ color: 'white', textDecoration: 'none' }}to="/"><span style={styles.title}>Mindflare</span></NavLink>}
    iconElementLeft={<IconButton></IconButton>}
    iconElementRight={ signedIn ? <FlatButton label="logout" onClick={ () => logout() } /> : <FlatButton label="Login" containerElement={<Link to="/login"/>} />} />
);

export default Nav;
