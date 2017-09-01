import React from 'react';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter, Route, Link, NavLink, withRouter } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

// function handleTouchTap() {
//   alert('onClick triggered on the title component');
// }

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const Nav = ({signedIn}) => {
  // console.log(signedIn)
  if (!signedIn) {
    return (
      <AppBar
        title={<NavLink activeStyle={{ color: 'white', textDecoration: 'none' }}to="/"><span style={styles.title}>MindMap</span></NavLink>}
        iconElementLeft={<IconButton></IconButton>}
        iconElementRight={<FlatButton label="Login" containerElement={<Link to="/login"/>} />}
      />
    )
  } else {
    return (
      <AppBar
      title={<NavLink activeStyle={{ color: 'white', textDecoration: 'none' }}to="/"><span style={styles.title}>MindMap</span></NavLink>}
      iconElementLeft={<IconButton></IconButton>}
      />
    )
  }
};


export default Nav;