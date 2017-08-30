import React from 'react';
import Home from './Home.jsx';
import Auth from './Auth.jsx';
import Canvas from './Canvas.jsx';
import Register from './Register.jsx';


import {
  Route,
  Link,
  Switch
} from 'react-router-dom';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      user: {},
      maps: [],


    }
    this.handleLogin = this.handleLogin.bind(this);
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

    } 
    */

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

  handleLogin(userObj) {
    this.setState({
      signedIn: true,
      user: userObj
    })
    //send a post request to server inside of auth components and call this funciton to set state
  }

  handleLogout() {
    this.setState({
      signedIn: false,
      user: {}
    })
  }



  render() {
    return (
      <div>
        <h1>Home</h1>
          <Switch>
            <Route exact path="/" render={()=><Home maps={this.state.maps}/>} />
            <Route path="/canvas/:id" render={()=><Canvas />} />
            <Route path="/auth" render={()=><Auth updateUser={this.handleLogin}/>} />
            <Route path="/register" render={()=><Register updateUser={this.handleLogin}/>} />
          </Switch>

        <footer>
            <Link to="/">Home </Link>
            <Link to="/auth">Auth</Link>
        </footer>

      </div>


    )
  }
}


export default App;