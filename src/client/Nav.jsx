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

const Nav = () => (
  <AppBar
    title={<NavLink activeStyle={{ color: 'white', textDecoration: 'none' }}to="/"><span style={styles.title}>MindMap</span></NavLink>}
    iconElementLeft={<IconButton></IconButton>}
    iconElementRight={<FlatButton label="Login" containerElement={<Link to="/login"/>} />}
  />
);


export default Nav;


// import React from 'react';
// import AppBar from 'material-ui/AppBar';
// import { BrowserRouter, Route, Link, Redirect, NavLink, withRouter } from 'react-router-dom';
// import IconButton from 'material-ui/IconButton';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
// import FlatButton from 'material-ui/FlatButton';
// import AuthModel from './actions/auth';
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

// const styles = {
//   title: {
//     cursor: 'pointer',
//   },
// };

// class Nav extends React.Component {
//   constructor(props) {
//     super(props);

//     console.log(props.signedIn);
//     const buttonLabel = props.signedIn ? console.log(props.signedIn) : 'Login';

//     this.handleLogout = this.handleLogout.bind(this);
//   }

//   async handleLogout() {
//     await AuthModel.logOutUser();
//     this.setState({
//       signedIn: false,
//       user: {}
//     })
//     //console.log('made it to handleLogout!', this.props.history)
//     this.props.history.push("/login");
//     // this.context.history.push("/login");
//   }


//   render() {

//     return (
//       <div>
//       <AppBar
//         title={<NavLink activeStyle={{ color: 'white', textDecoration: 'none' }}to="/"><span style={styles.title}>MindMap</span></NavLink>}
//         iconElementLeft={<IconButton></IconButton>}
//         iconElementRight={<FlatButton label="Login" containerElement={<Link to="/login"/>} />}
//         //iconElementRight={ <FlatButton label="Logout" className="logout" onClick={this.handleLogout.bind(this)} containerElement={<Link to="/login"/>} />}
//       />
//       </div>
//     )
//   };

// }






// export default withRouter(Nav);
