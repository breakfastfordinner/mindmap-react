import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './Home.jsx';
import Canvas from './Canvas.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Nav from './Nav.jsx';
import AuthModel from './actions/auth';
import Cookies from 'universal-cookie';

import { Route, Link, Switch, withRouter } from 'react-router-dom';

const cookies = new Cookies();

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      user: {},
      maps: [{
        id: '1234qwer', 
        name: 'Map1'
      }, 
      { 
        id: '5678asdf',
        name: 'Another Map'
      }, 
      {
        id: '9999qqqq',
        name: 'test3'
      }],


    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  // componentWillMount() {
  //   //an ajax call to check if session exist
  //   // UserModel.getUser((data) => {
  //   //   if (data.passport) {
  //   //     this.setState({
  //   //       signedIn: true,
  //   //       user: data.passport.user
  //   //     })
  //   //   }
  //   // })
  //   //something like this
  // }

  componentDidMount() {
    //import from ajax file cookie
    /*
    if (cookie.user) {
      this.setState({
        signedIn: true,
        user: cookie.user
      })

<<<<<<< HEAD
    }
    */
    // console.log(this, 'when i clicked, did this happen?')
    if (cookies.get('user')) {
      this.setState({
        signedIn: true,
        user: cookies.get('user')
      })
    }
    this.state.signedIn? this.props.history.push('/') : this.props.history.push('/login');


    //asyn ajax call that updates
    //the array of maps after the user id was
    //obtained from previous syn fall
    /*
    MapModel.getMap((maps)=>{
      this.setState({
        maps: maps
      })
    })
    */

  }

  async handleLogin(username, password, typeObj) {
    //also send a axio request to the server to varify
    const response = await AuthModel.authenticateUser(username, password, typeObj);
    // console.log(cookies.get('user'));
    this.setState({
      signedIn: true,
      user: cookies.get('user')
    })
    console.log(this.state.user)
    // console.log(username, password, typeObj, 'check on data')
    console.log(this, 'this did invoked right??? why didnt this reredner????????')
  }

  async handleLogout() {
    await AuthModel.logOutUser();
    this.setState({
      signedIn: false,
      user: {}
    })
    this.props.history.push("/login");
  }

  render() {
    // console.log(this, 'here?')
    // this.state.signedIn? this.props.history.push('/') : this.props.history.push('/auth');

    return (
      <div>
      <button className="logout" onClick={this.handleLogout}>Log out</button>
        <MuiThemeProvider>
          <div>
            <Nav />
              <Switch>
                <Route exact path="/" render={()=><Home maps={this.state.maps} signedIn={this.state.signedIn}/>} />
                <Route path="/canvas/:id" render={()=><Canvas user={this.state.user}/>} />
                <Route path="/login" render={()=><Login updateUser={this.handleLogin} signedIn={this.state.signedIn}/>} />
                <Route path="/register" render={()=><Register updateUser={this.handleLogin}/>} />
              </Switch>
          </div>
        </MuiThemeProvider>
     </div>



    )
  }
}


export default withRouter(App);
