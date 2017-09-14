import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './Home.jsx';
import Canvas from './Canvas.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import View from './View.jsx';
import Nav from './Nav.jsx';
import d3 from 'd3';

import AuthModel from './actions/auth';
import MapModel from './actions/maps';
import Cookies from 'universal-cookie';
import { Route, Link, Switch, withRouter } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const cookies = new Cookies();

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      user: {},
      maps: [{
        id: '1234qwer',
        name: 'Loading...'
      }],
      // handleAuthErrorBox: false,
      openLoginError: false,
      openSignUpError: false

    }
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateMaps = this.updateMaps.bind(this);
    this.closeLoginError = this.closeLoginError.bind(this);
    this.closeSignUpError = this.closeSignUpError.bind(this);
    // this.openErrorBox = this.openErrorBox.bind(this);
    // this.closeErrorBox = this.closeErrorBox.bind(this);
  }


  componentDidMount() {
    this.updateMaps();
    // if (cookies.get('user')) {
    //   this.setState({
    //     signedIn: true,
    //     user: cookies.get('user')
    //   });

    //   this.updateMaps();
    // } else {
    //   this.props.history.push('/login');
    // }
  }


  closeLoginError() {
    this.setState({
      openLoginError: false
    });
  }

  closeSignUpError() {
    this.setState({
      openSignUpError: false
    });
  }

  async handleAuth(username, password, typeObj) {
    const response = await AuthModel.authenticateUser(username, password, typeObj);
    if (response.status === 201) {
      this.setState({
        signedIn: true,
        user: cookies.get('user')
      })
      this.props.history.push("/");
      this.updateMaps();
    } else if (response.status === 422) {
      //alert('username already exist');
      this.setState({
        openSignUpError: true
      })
    } else if (response.status === 401) {
      // alert('incorrect pw and username')
      this.setState({
        openLoginError: true
      })
    }
  }

  async handleLogout() {
    await AuthModel.logOutUser();
    this.setState({
      signedIn: false,
      user: {}
    })
    this.props.history.push("/login");
  }

  async updateMaps() {
    let getMapResponse = await MapModel.getMaps();
    if (!getMapResponse.maps) {
      if (cookies.get('user')) {
        this.handleLogout();
      }
    } else {
      this.setState({
        maps: getMapResponse.maps
      })
    }

  }
   // <Dialog
   //        actions={actions2}
   //        modal={false}
   //        open={this.state.openSignUpError}
   //        onRequsetClose={this.closeSignUpError}
   //      >
   //        afkdslajflds
   //      </Dialog>
  render() {
    const actions = [
    <FlatButton
      label="OK"
      primary={true}
      onClick={this.closeLoginError}
    />
    ];
    const actions2 = [
    <FlatButton
      label="OK"
      primary={true}
      onClick={this.closeSignUpError}
    />
    ]

    return (
      <div>
        <MuiThemeProvider>

        <div>
        <Dialog
        actions={actions}
        modal={false}
        open={this.state.openLoginError}
        onRequestClose={this.closeLoginError}
        contentStyle={{width: '500px'}}
        >
          Error: Incorrect Username or Password.
        </Dialog>
        <Dialog
        actions={actions2}
        modal={false}
        open={this.state.openSignUpError}
        onRequestClose={this.closeSignUpError}
        contentStyle={{width: '500px'}}
        >
          Error: Username already exist.
        </Dialog>
            <Nav logout={this.handleLogout} />
            <Switch>
              <Route path="/view/:id" render={()=><View/>} />
              <Route path="/canvas/:id" render={()=><Canvas updateMaps={this.updateMaps}/>} />
              <Route path="/login" render={()=><Login handleAuth={this.handleAuth} signedIn={this.state.signedIn} />} />
              <Route path="/register" render={()=><Register handleAuth={this.handleAuth}/>} />
              <Route exact path="/" render={()=><Home maps={this.state.maps} updateMaps={this.updateMaps}  />} />
            </Switch>
          </div>
        </MuiThemeProvider>
     </div>

    )
  }
}

export default withRouter(App);
