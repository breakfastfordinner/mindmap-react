import React from 'react';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter, Route, Link, NavLink, withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Flare from 'material-ui/svg-icons/image/flare';

import FlatButton from 'material-ui/FlatButton';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const styles = {
  title: {
    cursor: 'pointer',
    color: 'white'
  },
};

const Nav = ({logout}) => (
  <AppBar
    title={<NavLink className='logo' activeStyle={{ color: 'white', textDecoration: 'none' }}to="/"><span style={styles.title}><Flare style={styles.title}/> Mindflare</span></NavLink>}
    iconElementLeft={<IconButton></IconButton>}
    iconElementRight={ cookies.get('user') ? <FlatButton label="logout" onClick={ () => logout() } /> : <FlatButton label="Login" containerElement={<Link to="/login"/>} />} />
);

export default Nav;
