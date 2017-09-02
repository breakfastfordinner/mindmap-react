import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Home from './Home.jsx';
import Canvas from './Canvas.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Nav from './Nav.jsx';
import d3 from 'd3';

import AuthModel from './actions/auth';
import MapModel from './actions/maps';
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
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateMaps = this.updateMaps.bind(this);
  }


  componentDidMount() {


    // console.log(this, 'when i clicked, did this happen?')
    // */
    // console.log(cookies.get('user'));
    // console.log(this, 'when i clicked, did this happen?')
    if (cookies.get('user')) {
      this.setState({
        signedIn: true,
        user: cookies.get('user')
      });
    }
    
    this.state.signedIn? this.props.history.push('/') : this.props.history.push('/login');

    this.updateMaps();
  }

  async handleAuth(username, password, typeObj) {
    const response = await AuthModel.authenticateUser(username, password, typeObj);
    if (response.status === 201) {
      this.setState({
        signedIn: true,
        user: cookies.get('user')
      })
      this.props.history.push("/");
    } else {
      alert('Something went wrong...');
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
    // console.log(this.state.maps)
    let getMapResponse = await MapModel.getMaps();
    // console.log(getMapResponse)
    this.setState({
      maps: getMapResponse.maps
    })
    // console.log(this.state.maps)
  }

  render() {

    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Nav signedIn={this.state.signedIn}/>
            <button className="logout" onClick={this.handleLogout}>Log out</button>
              <Switch>
                <Route exact path="/" render={()=><Home maps={this.state.maps} signedIn={this.state.signedIn}  updateMaps={this.updateMaps}  />} />
                <Route path="/canvas/:id" render={()=><Canvas user={this.state.user} updateMaps={this.updateMaps}/>} />
                <Route path="/login" render={()=><Login handleAuth={this.handleAuth} signedIn={this.state.signedIn} />} />
                <Route path="/register" render={()=><Register handleAuth={this.handleAuth}/>} />
              </Switch>
          </div>
        </MuiThemeProvider>
     </div>

    )
  }
}

export default withRouter(App);
