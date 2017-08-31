import React from 'react';
import {
  withRouter,
  Route,
  Link
} from 'react-router-dom';


class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(e) {
    e.preventDefault();
    // console.log('hi is it here', e.target.username.value, e.target.password.value)
    // console.log('auth props:', this.props);
    await this.props.handleAuth(e.target.username.value, e.target.password.value, {type: 'login'});
    // this.props.history.push("/");
    // this.props.signedIn? this.props.history.push("/") : null;
  }

  componentDidMount() {
    this.props.signedIn? this.props.history.push("/") : null;
  }

  

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}> 
          <input className="username" name="username" type="text" placeholder="username" />
          <input className="password" name="password" type="text" placeholder="password" />
          <input className="submit" type="submit" value="Log In"/>
        </form>
        <div>
        Need to <Link to="/register">signed-up</Link>?
        </div>
      </div>
    )
  }
}

export default withRouter(Auth);