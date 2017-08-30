import React from 'react';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter, Route, Link, NavLink, withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

function handleTouchTap() {
  alert('onClick triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

/**
 * This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title`
 * through the `onClick` property, and a [FlatButton](/#/components/flat-button) on the right.
 */
const Nav = () => (
  <AppBar
    title={<NavLink activeStyle={{ color: 'white', textDecoration: 'none' }}to="/"><span style={styles.title}>MindMap</span></NavLink>}
    onTitleTouchTap={<NavLink to="/home"></NavLink>}
    iconElementLeft={<IconButton></IconButton>}
    iconElementRight={<FlatButton label="Login" containerElement={<Link to="/login"/>} />}
  />
);


export default Nav;
